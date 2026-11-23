# Task Management API

A RESTful backend application developed using Node.js, Express.js and MongoDB. It allows users to register, log in and manage their tasks securely.

## Technologies Used
- Node.js
- Express.js
- MongoDB
- Mongoose
- JavaScript
- JWT Authentication
- bcryptjs
- Express Validator

## Features
- User Registration and Login
- Password Hashing using bcrypt
- JWT-based Authentication
- Protected API Routes
- Create, Read, Update and Delete Tasks
- Task Input Validation
- Search Tasks by Title
- Filter Tasks by Status
- Sort Tasks
- Pagination
- User-specific Task Management
- Global Error Handling

## Project Structure

```text
Backend/
├── config/
├── controllers/
├── middleware/
├── models/
├── routes/
├── validators/
├── .env
├── .gitignore
├── package.json
└── server.js
```

## Installation

Clone the repository:

```bash
git clone https://github.com/SNEHA28062001/task-management-api.git
```

Navigate to the backend folder:

```bash
cd task-management-api/Backend
```

Install dependencies:

```bash
npm install
```

## Environment Setup

Create a `.env` file and configure:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
CLIENT_ORIGIN=http://localhost:3000
```

Keep your `.env` file private. Do not upload it to GitHub.

## Run the Application

```bash
npm run dev
```

Server URL: `http://localhost:5000`

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/register` | Register user |
| POST | `/api/auth/login` | User login |
| GET | `/api/tasks` | Get all tasks |
| POST | `/api/tasks` | Create task |
| GET | `/api/tasks/:id` | Get task by ID |
| PUT | `/api/tasks/:id` | Update task |
| DELETE | `/api/tasks/:id` | Delete task |

## API Testing

All major APIs are tested using Postman, including authentication, task CRUD operations, validation, pagination, filtering, sorting and user data isolation.

## Project Status

Backend development and core API testing completed successfully.
