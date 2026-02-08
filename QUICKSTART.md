# Quick Start Guide

## 🚀 Get Running in 5 Minutes

### Step 1: Start Backend (Terminal 1)
```bash
cd backend
npm install
npm start
```
✅ Should see: "✅ Server running on http://localhost:5000"

### Step 2: Start Frontend (Terminal 2)
```bash
cd frontend
npm install
npm run dev
```
✅ Should see: "VITE v... ready in ... ms" and open http://localhost:3000

### Step 3: Use the App
1. Open http://localhost:3000
2. Click "Register" and create an account (e.g., `testuser` / `password123`)
3. Login with your credentials
4. Click "+ Add Card" to create tasks
5. Edit/delete cards, move them between sections

## 📝 Test Accounts

After first run, you can create multiple accounts:
- Account 1: `user1` / `password1`
- Account 2: `user2` / `password2`

All accounts share the same board!

## 🛠️ Troubleshooting

**Port 5000 already in use?**
```bash
# Change in backend/server.js
const PORT = process.env.PORT || 5001;
```

**Port 3000 already in use?**
```bash
# Change in frontend/vite.config.js
server: {
  port: 3001,
  ...
}
```

**Database errors?**
```bash
# Delete the old database
rm backend/todo.db
npm start
```

**API not connecting?**
- Make sure backend is running on port 5000
- Check browser console for errors
- Verify `API_URL` in `frontend/src/api.js`

## 📦 Next Steps

1. **Test the app locally** - create cards, edit them, switch sections
2. **Customize styling** - edit `frontend/src/styles.css`
3. **Deploy backend** - push backend to Hostinger VPS
4. **Deploy frontend** - build and push to GitHub Pages

---

Questions? Check README.md for more details!
