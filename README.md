# 🚀 Project Management Tool

A Full Stack MERN application developed during the CodeAlpha Internship.

---

# 📌 Features

- User Authentication
- Project Management
- Task Management
- Comment System
- Protected Routes
- Responsive UI

---

# 🛠 Tech Stack

## Frontend
- React.js
- React Router DOM
- Axios
- CSS
- React Toastify

## Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- bcrypt

---

# 📂 Folder Structure

```text
ProjectManagementTool
│
├── frontend
│   ├── src
│   │   ├── components
│   │   ├── pages
│   │   ├── services
│   │   ├── App.jsx
│   │   └── main.jsx
│
├── backend
│   ├── controllers
│   ├── models
│   ├── routes
│   ├── config
│   └── server.js
```

---

# ✨ Features

## 🔐 Authentication

- Register User
- Login User
- Password Hashing (bcrypt)
- Protected Dashboard

---

## 📁 Project Module

- Create Project
- Edit Project
- Delete Project
- Search Projects
- Filter Projects
- Sort Projects
- Update Status

Each Project contains:

- Title
- Description
- Priority
- Due Date
- Status
- Team Members

---

## ✅ Task Module

Each Project can contain multiple Tasks.

Task Features:

- Create Task
- Edit Task
- Delete Task
- Assign Member
- Set Due Date
- Set Priority
- Mark Completed

---

## 💬 Comment Module

Each Task contains its own comments.

Users can:

- Add Comment
- Delete Comment
- View Comments

---

# 🗄 Database Collections

## User

- name
- email
- password

## Project

- title
- description
- priority
- status
- dueDate
- teamMembers
- userId

## Task

- title
- description
- assignedTo
- priority
- status
- dueDate
- projectId

## Comment

- message
- userName
- taskId

---

# 🔄 Application Flow

```text
Login/Register
       │
       ▼
 Dashboard
       │
       ▼
 Create Project
       │
       ▼
 Manage Tasks
       │
       ▼
 Create Task
       │
       ▼
 Add Comments
       │
       ▼
 MongoDB
```

---

# 🌐 REST APIs

## Authentication

POST /api/auth/register

POST /api/auth/login

## Projects

GET /api/projects

POST /api/projects

PUT /api/projects/:id

DELETE /api/projects/:id

PUT /api/projects/:id/status

## Tasks

GET /api/tasks/project/:projectId

POST /api/tasks

PUT /api/tasks/:id

DELETE /api/tasks/:id

## Comments

GET /api/comments/task/:taskId

POST /api/comments

PUT /api/comments/:id

DELETE /api/comments/:id

---

# 📚 Learning Outcomes

- MERN Stack
- CRUD Operations
- REST APIs
- React Hooks
- React Router
- Axios
- MongoDB
- Mongoose
- bcrypt Authentication
- Component Reusability
- Frontend-Backend Integration

---

# 🚀 Future Improvements

- JWT Authentication
- WebSockets
- Real-time Notifications
- File Uploads
- Team Roles
- Email Notifications

---

# 👨‍💻 Developed By

**Ananda Satya Sai Sreekar Pula**

B.Tech Computer Science & Engineering

PVPSIT

CodeAlpha Full Stack Development Internship
