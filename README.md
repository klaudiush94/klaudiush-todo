# 📋 Klaudiush Todo - Trello-Like Todo App

A simple, shared todo app with sections and cards. Built with React + Node.js + SQLite.

## Features

✅ User authentication (register/login)  
✅ Kanban-style board with 4 sections (TODO, BACKLOG, DAILY, SOMEDAY)  
✅ Create, edit, delete cards  
✅ Move cards between sections  
✅ See who created each card and when  
✅ Shared access for multiple users  
✅ Vanilla CSS styling  

## Project Structure

```
klaudiush-todo/
├── backend/          (Node.js + Express + SQLite)
├── frontend/         (React + Vite)
└── README.md
```

## Setup & Installation

### Backend Setup

1. Navigate to backend folder:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Start the server:
```bash
npm start
```

The backend will run on `http://localhost:5000` and create `todo.db` automatically.

### Frontend Setup

1. Navigate to frontend folder:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the dev server:
```bash
npm run dev
```

The frontend will run on `http://localhost:3000`

## Usage

1. Open `http://localhost:3000` in your browser
2. Register a new account or login
3. Create, edit, delete cards
4. Move cards between sections
5. Invite others to use the same backend (they can create their own accounts)

## Environment Variables

### Backend (.env)
```
PORT=5000
JWT_SECRET=your-secret-key-change-in-production
```

## API Endpoints

**Auth:**
- `POST /api/auth/register` - Create account
- `POST /api/auth/login` - Login

**Board:**
- `GET /api/board` - Fetch all sections + cards

**Cards:**
- `POST /api/cards` - Create card
- `PATCH /api/cards/:id` - Update card
- `DELETE /api/cards/:id` - Delete card
- `PATCH /api/cards/:id/move` - Move card to section

## Deployment

### Frontend - GitHub Pages
```bash
cd frontend
npm run build
# Push dist/ folder to GitHub Pages
```

### Backend - Hostinger VPS
```bash
cd backend
npm install
npm start
```

Then configure the frontend API URL in `.env`:
```
VITE_API_URL=https://your-vps-domain.com/api
```

## Tech Stack

**Frontend:**
- React 18
- Vite
- Vanilla CSS

**Backend:**
- Node.js
- Express
- SQLite3
- JWT (authentication)
- bcryptjs (password hashing)

## Database Schema

**Users Table**
- id (PK)
- username (UNIQUE)
- email (UNIQUE)
- password (hashed)
- created_at

**Sections Table**
- id (PK)
- name
- position
- created_at

**Cards Table**
- id (PK)
- section_id (FK)
- title
- content
- created_by (FK to users)
- created_at
- updated_at
- position

## License

MIT

---

Built with ❤️ by Klaudiush for Mac
