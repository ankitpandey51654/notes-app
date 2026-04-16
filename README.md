# 📝 Notes App (Next.js + MongoDB)

## 🚀 Overview

This is a full-stack Notes App built using Next.js and MongoDB.
Users can create, view, update, and delete notes with a clean and responsive UI.

This project demonstrates full CRUD operations, API handling, and database integration using modern web technologies.

---

## 🛠️ Tech Stack

- Next.js (App Router)
- MongoDB Atlas
- Mongoose
- Tailwind CSS
- React Hot Toast (for notifications)

---

## ✨ Features

- ✅ Create Notes
- 📖 Fetch & Display Notes
- ✏️ Edit / Update Notes (Inline Editing)
- 🗑️ Delete Notes
- 🔔 Toast Notifications for actions
- ⚡ REST API using Next.js Route Handlers
- 🌐 MongoDB Integration

---

## ⚙️ Setup Instructions

1. Clone the repository:

```
git clone <your-repo-link>
```

2. Install dependencies:

```
npm install
```

3. Add environment variables:

```
MONGODB_URL=your_mongodb_connection_string
```

4. Run the project:

```
npm run dev
```

---

## 🧠 Learning & Challenges

While building this project, I tackled several real-world issues:

- Fixed MongoDB connection error (ECONNREFUSED)
- Resolved DNS issue with SRV connection string
- Used non-SRV connection for better stability
- Fixed async/await issues in Mongoose queries
- Solved hydration mismatch in Next.js
- Debugged caching issues in API routes
- Implemented dynamic API routes (DELETE & UPDATE)
- Managed complex state for inline editing (edit mode)

---

## 📌 Future Improvements

- 🔐 Add Authentication (Login / Signup)
- 📊 Convert into Dashboard UI
- 🔍 Search & Filter Notes
- 🌙 Dark Mode
- ⚡ Real-time updates (WebSockets / polling)
- 📱 Make fully mobile responsive

---

## 👨‍💻 Author

Ankit Pandey
