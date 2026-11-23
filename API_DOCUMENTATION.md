# Task Management API Documentation

## 1. Project Overview

A REST API built using Node.js, Express.js and MongoDB to manage tasks. Users can register, log in and manage their tasks securely.

## 2. Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT (Authentication)
- bcryptjs (Password hashing)
- express-validator (Validation)
- Postman (API testing)

## 3. Authentication APIs

| Method | Endpoint | Purpose |
|---|---|---|
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | Login user |
| GET | `/api/auth/protected` | Test protected access |

## 4. Task APIs

| Method | Endpoint | Purpose |
|---|---|---|
| POST | `/api/tasks` | Create a task |
| GET | `/api/tasks` | Get all user tasks |
| GET | `/api/tasks/:id` | Get a single task |
| PUT | `/api/tasks/:id` | Update a task |
| DELETE | `/api/tasks/:id` | Delete a task |

## 5. Task Features

- Create, read, update and delete tasks.
- Task validation.
- Pagination.
- Search by task title.
- Filter tasks by status.
- Sort tasks.
- Invalid task ID handling.
- User-specific task access.

## 6. Security Features

- Password hashing using bcryptjs.
- JWT-based authentication.
- Protected routes.
- Token verification.
- User data isolation.
- Helmet security middleware.
- CORS configuration.

## 7. Error Handling

- Invalid task IDs.
- Invalid task status.
- Invalid due date.
- Missing authentication token.
- Invalid or expired token.
- Invalid routes.
- Global error handling.

## 8. Testing

All major APIs were tested using Postman, including registration, login, CRUD operations, pagination, filtering, sorting, searching, token authentication and user data isolation.

## 9. Project Status

Backend development and core API testing completed successfully.