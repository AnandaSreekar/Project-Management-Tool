🚀 Project Overview

The Project Management Tool is a full-stack MERN (MongoDB, Express.js, React.js, Node.js) web application developed as part of the CodeAlpha Full Stack Development Internship.

The application helps users manage projects efficiently by allowing them to create projects, organize tasks, assign priorities, track progress, and communicate through task comments.

It follows the CRUD (Create, Read, Update, Delete) concept and uses REST APIs to connect the React frontend with the Node.js backend and MongoDB database.

🎯 Objectives
Manage projects efficiently.
Break large projects into smaller tasks.
Track task completion.
Enable discussion using comments.
Learn Full Stack Development using the MERN Stack.
✨ Features
Authentication
User Registration
User Login
Password Encryption using bcrypt
Protected Dashboard
Project Management

Users can:

Create Projects
View Projects
Edit Projects
Delete Projects
Search Projects
Filter Projects
Sort Projects
Mark Projects as Completed

Each project stores:

Title
Description
Priority
Status
Due Date
Task Management

Every project contains multiple tasks.

Users can:

Add Tasks
Edit Tasks
Delete Tasks
Mark Tasks as Completed
Assign Tasks
Set Due Dates
Set Priority
Comment System

Every task has its own discussion section.

Users can:

Add Comments
View Comments
Delete Comments

Comments help team members communicate about a particular task without creating additional tasks.

Additional Features
Loading Spinner
Toast Notifications
Edit Modal
Delete Confirmation Modal
Protected Routes
Custom 404 Page
Responsive Dashboard
🛠 Technologies Used
Frontend
React.js
React Router DOM
Axios
React Toastify
CSS
Backend
Node.js
Express.js
Database
MongoDB Atlas
Mongoose
Authentication
bcrypt
📂 Folder Structure

Frontend

frontend/

components/
pages/
services/
App.jsx
main.jsx

Backend

backend/

controllers/
models/
routes/
config/
server.js
🗄 Database Collections
User

Stores registered users.

Fields

name
email
password (hashed)
Project

Stores project information.

Fields

title
description
priority
status
dueDate
userId
Task

Stores tasks belonging to a project.

Fields

title
description
assignedTo
priority
status
dueDate
projectId
Comment

Stores discussion related to a task.

Fields

message
userName
taskId
🔄 Project Workflow

User Login

↓

Dashboard

↓

Create Project

↓

Manage Tasks

↓

Create Task

↓

Add Comments

↓

MongoDB

CRUD Operations
Create

Create a new Project or Task.

HTTP Method

POST

Read

Display existing Projects and Tasks.

HTTP Method

GET

Update

Edit Project or Task details.

HTTP Method

PUT

Delete

Remove a Project, Task, or Comment.

HTTP Method

DELETE

🌐 REST API Endpoints
Authentication

POST /api/auth/register

POST /api/auth/login

Projects

GET /api/projects

POST /api/projects

PUT /api/projects/

DELETE /api/projects/

PUT /api/projects//status

Tasks

GET /api/tasks/project/

POST /api/tasks

PUT /api/tasks/

DELETE /api/tasks/

Comments

GET /api/comments/task/

POST /api/comments

PUT /api/comments/

DELETE /api/comments/

🔐 Authentication Flow

Register

↓

Password

↓

bcrypt

↓

Salt

↓

Hash Password

↓

MongoDB

During Login

↓

User enters Email & Password

↓

Backend finds user

↓

bcrypt.compare()

↓

Login Successful

🔄 Overall Architecture

React Frontend

↓

Axios

↓

Express Routes

↓

Controllers

↓

Mongoose Models

↓

MongoDB Atlas

↓

Response

↓

React UI Updates

📋 Project Hierarchy

Project

↓

Tasks

↓

Comments

Example

Project

College Mini Project

↓

Tasks

Design UI
Build Backend
Connect Database
Testing

↓

Comments

"Backend completed."

"Testing started."

"Database issue fixed."

📌 New Components Added

Loader.jsx

Displays a loading spinner while data is loading.

EditProjectModal.jsx

Provides a professional popup for editing projects.

EditTaskModal.jsx

Provides a professional popup for editing tasks.

DeleteModal.jsx

Displays a confirmation popup before deleting.

ProtectedRoute.jsx

Prevents unauthorized users from accessing the dashboard.

NotFound.jsx

Displays a custom 404 page for invalid routes.

CommentSection.jsx

Allows users to communicate within individual tasks.

⚠ Challenges Faced
MongoDB connection issues
React compilation errors
Route configuration issues
Prompt dialogs replaced with reusable modals
Added loading spinner for better user experience
Implemented project-task relationship
Added comment functionality
🚀 Future Enhancements
JWT Authentication
WebSocket Notifications
Real-time Collaboration
Email Notifications
Team Management
File Upload Support
📚 Key Learning Outcomes

Through this project I learned:

MERN Stack Architecture
React Component Structure
React Hooks (useState & useEffect)
Routing using React Router
REST API Development
MongoDB CRUD Operations
Password Hashing using bcrypt
Axios API Communication
State Management
Component Reusability
Error Handling
Frontend & Backend Integration
👨‍💻 Developed By

Ananda Satya Sai Sreekar Pula

B.Tech Computer Science & Engineering

PVPSIT

CodeAlpha Full Stack Development Internship
