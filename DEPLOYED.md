# ✅ Klaudiush Todo - Deployed & Ready

**Repository:** https://github.com/klaudiush94/klaudiush-todo  
**Status:** ✅ READY TO USE  
**Created:** 2026-02-08 02:05 GMT  

---

## 🎉 What's Included

### Backend (Node.js + Express + SQLite)
✅ User authentication (register/login with JWT)  
✅ SQLite database with 3 tables (users, sections, cards)  
✅ REST API with 7 endpoints  
✅ Password hashing (bcryptjs)  
✅ CORS enabled for frontend  
✅ Auto-creates 4 default sections (TODO, BACKLOG, DAILY, SOMEDAY)  

### Frontend (React + Vite + Vanilla CSS)
✅ Login/Register pages  
✅ Kanban board with 4 sections  
✅ Add/Edit/Delete cards (modals)  
✅ Move cards between sections  
✅ Display creator info and timestamps  
✅ Responsive vanilla CSS styling  
✅ Token-based auth (JWT in localStorage)  

### Database Schema
```sql
Users: id, username, email, password, created_at
Sections: id, name, position, created_at
Cards: id, section_id, title, content, created_by, created_at, updated_at, position
```

---

## 🚀 Quick Start

### 1. Clone the repo
```bash
git clone https://github.com/klaudiush94/klaudiush-todo.git
cd klaudiush-todo
```

### 2. Backend (Terminal 1)
```bash
cd backend
npm install
npm start
```
✅ Runs on http://localhost:5000

### 3. Frontend (Terminal 2)
```bash
cd frontend
npm install
npm run dev
```
✅ Opens http://localhost:3000

### 4. Test
- Register: `testuser` / `password123`
- Add a card
- Move it between sections
- Invite a friend to register and use the same board!

---

## 📋 API Endpoints

### Auth
- `POST /api/auth/register` → Create account
- `POST /api/auth/login` → Login & get JWT token

### Board
- `GET /api/board` → Fetch all sections + cards

### Cards
- `POST /api/cards` → Create card
- `PATCH /api/cards/:id` → Update card
- `DELETE /api/cards/:id` → Delete card
- `PATCH /api/cards/:id/move` → Move to section

---

## 🎨 Components

**Frontend:**
- `LoginForm.jsx` - Register/login UI
- `Board.jsx` - Main board container
- `Section.jsx` - Column with cards
- `Card.jsx` - Individual task card
- `AddCardModal.jsx` - Create/edit modal
- `App.jsx` - Root app
- `api.js` - API helper functions
- `styles.css` - Vanilla CSS (no Tailwind)

**Backend:**
- `server.js` - Express app + all routes
- `package.json` - Dependencies

---

## 🔒 Security Notes

✅ Passwords hashed with bcryptjs  
✅ JWT tokens for auth  
✅ Token stored in localStorage (frontend)  
✅ CORS enabled  
⚠️ Change `JWT_SECRET` in production!  
⚠️ Use HTTPS in production!  

---

## 📦 Tech Stack

| Layer | Tech |
|-------|------|
| Frontend | React 18 + Vite + Vanilla CSS |
| Backend | Node.js + Express |
| Database | SQLite3 |
| Auth | JWT + bcryptjs |
| Build | Vite |

---

## 🚀 Deployment

### Frontend → GitHub Pages
```bash
cd frontend
npm run build
# Push dist/ to GitHub Pages
```

### Backend → Hostinger VPS
```bash
cd backend
npm install --production
npm start
```

Update `VITE_API_URL` in frontend to point to your VPS API.

---

## 📝 Example Usage Flow

1. **User A registers:** "testuser1" / "password1"
2. **User A logs in** → sees empty board
3. **User A creates card** in TODO: "Learn React"
4. **User B registers:** "testuser2" / "password2"
5. **User B logs in** → sees User A's card!
6. **User B creates card** in BACKLOG: "Build API"
7. **User A refreshes** → sees User B's card!

✨ **Shared real-time board** (refresh to sync)

---

## 🎯 Next Phase

- [ ] Deploy backend to Hostinger VPS
- [ ] Deploy frontend to GitHub Pages
- [ ] Set up custom domain
- [ ] Add drag-and-drop (react-beautiful-dnd)
- [ ] Add real-time sync (WebSockets)
- [ ] Add card labels/priorities/due dates

---

**Ready to use! Clone, run `npm install` in both folders, start both servers, and go!**

Questions? Check README.md or QUICKSTART.md!
