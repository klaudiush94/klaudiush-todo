const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

// Middleware
app.use(cors());
app.use(express.json());

// Initialize SQLite database
const db = new sqlite3.Database('./todo.db');

db.serialize(() => {
  // Users table
  db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);

  // Sections table
  db.run(`CREATE TABLE IF NOT EXISTS sections (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    position INTEGER,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`, () => {
    // Insert default sections if they don't exist
    db.all("SELECT COUNT(*) as count FROM sections", (err, rows) => {
      if (rows[0].count === 0) {
        const sections = ['TODO', 'BACKLOG', 'DAILY', 'SOMEDAY/MAYBE'];
        sections.forEach((name, index) => {
          db.run("INSERT INTO sections (name, position) VALUES (?, ?)", [name, index]);
        });
      }
    });
  });

  // Cards table
  db.run(`CREATE TABLE IF NOT EXISTS cards (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    section_id INTEGER NOT NULL,
    title TEXT NOT NULL,
    content TEXT,
    created_by INTEGER NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    position INTEGER,
    FOREIGN KEY (section_id) REFERENCES sections(id),
    FOREIGN KEY (created_by) REFERENCES users(id)
  )`);
});

// Auth middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.sendStatus(401);

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

// ==================== AUTH ROUTES ====================

// Register
app.post('/api/auth/register', (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const hashedPassword = bcrypt.hashSync(password, 10);

  db.run(
    'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
    [username, email, hashedPassword],
    function (err) {
      if (err) {
        return res.status(400).json({ error: 'Username or email already exists' });
      }

      const user = { id: this.lastID, username, email };
      const token = jwt.sign(user, JWT_SECRET);
      res.json({ user, token });
    }
  );
});

// Login
app.post('/api/auth/login', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Missing username or password' });
  }

  db.get('SELECT * FROM users WHERE username = ?', [username], (err, user) => {
    if (!user) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    const validPassword = bcrypt.compareSync(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    const userData = { id: user.id, username: user.username, email: user.email };
    const token = jwt.sign(userData, JWT_SECRET);
    res.json({ user: userData, token });
  });
});

// ==================== BOARD ROUTES ====================

// Get full board (sections + cards)
app.get('/api/board', authenticateToken, (req, res) => {
  db.all(`
    SELECT 
      s.id, s.name, s.position,
      c.id as card_id, c.title, c.content, c.created_by, 
      c.created_at, c.updated_at, c.position as card_position,
      u.username as created_by_name
    FROM sections s
    LEFT JOIN cards c ON s.id = c.section_id
    LEFT JOIN users u ON c.created_by = u.id
    ORDER BY s.position, c.position
  `, (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });

    // Group by section
    const board = {};
    rows.forEach(row => {
      if (!board[row.id]) {
        board[row.id] = {
          id: row.id,
          name: row.name,
          position: row.position,
          cards: []
        };
      }
      if (row.card_id) {
        board[row.id].cards.push({
          id: row.card_id,
          title: row.title,
          content: row.content,
          created_by: row.created_by,
          created_by_name: row.created_by_name,
          created_at: row.created_at,
          updated_at: row.updated_at,
          position: row.card_position
        });
      }
    });

    res.json(Object.values(board));
  });
});

// ==================== CARD ROUTES ====================

// Create card
app.post('/api/cards', authenticateToken, (req, res) => {
  const { section_id, title, content } = req.body;

  if (!section_id || !title) {
    return res.status(400).json({ error: 'Missing section_id or title' });
  }

  db.run(
    `INSERT INTO cards (section_id, title, content, created_by, position)
     VALUES (?, ?, ?, ?, (SELECT COALESCE(MAX(position), -1) + 1 FROM cards WHERE section_id = ?))`,
    [section_id, title, content || '', req.user.id, section_id],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });

      const card = {
        id: this.lastID,
        section_id,
        title,
        content: content || '',
        created_by: req.user.id,
        created_by_name: req.user.username,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
      res.status(201).json(card);
    }
  );
});

// Update card
app.patch('/api/cards/:id', authenticateToken, (req, res) => {
  const { id } = req.params;
  const { title, content, section_id } = req.body;

  db.run(
    `UPDATE cards SET title = ?, content = ?, section_id = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?`,
    [title, content || '', section_id, id],
    (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ id, title, content, section_id });
    }
  );
});

// Delete card
app.delete('/api/cards/:id', authenticateToken, (req, res) => {
  const { id } = req.params;

  db.run('DELETE FROM cards WHERE id = ?', [id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ success: true });
  });
});

// Move card to different section
app.patch('/api/cards/:id/move', authenticateToken, (req, res) => {
  const { id } = req.params;
  const { section_id } = req.body;

  db.run(
    'UPDATE cards SET section_id = ? WHERE id = ?',
    [section_id, id],
    (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ success: true });
    }
  );
});

// ==================== START SERVER ====================

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
  console.log(`📝 JWT_SECRET: ${JWT_SECRET}`);
});
