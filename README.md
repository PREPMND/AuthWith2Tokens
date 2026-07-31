# MERN Authentication System

A production-inspired MERN authentication application built using **MongoDB, Express.js, React, and Node.js**. The project implements a secure two-token authentication flow with JWT access and refresh tokens, protected routes and a modular backend architecture focused on scalability and maintainability.

---
Live:https://auth2token.netlify.app
---
# Features

- User Registration
- User Login
- JWT Access Token Authentication
- Refresh Token Rotation
- Protected Dashboard
- Secure Cookie-based Authentication
- Logout
- Input Validation
- Centralized Error Handling
- Responsive React Frontend

---

# Tech Stack

## Frontend

- React
- React Router
- Axios
- Tailwind CSS

## Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcrypt

---

# Backend Architecture

The backend follows a modular architecture where every layer has a single responsibility. Business logic is separated from routing, validation, and utility functions to keep the codebase clean and maintainable.

```text
Backend
│
├── Controllers
├── Services
├── DBConnection
├── Models
├── ModelPlugins
├── Routes
├── Middlewares
├── Validators
├── Utils
│
├── app.js
└── index.js
```

## Controllers

Controllers handle incoming HTTP requests and responses. They validate the request flow and delegate business logic to the service layer, keeping controllers lightweight.

---

## Services

The service layer contains the application's core business logic such as authentication, token generation, user management, and database interactions. This separation improves maintainability and testability.

---

## Models

Contains all MongoDB schemas and Mongoose models used throughout the application.

---

## ModelPlugins

Stores reusable Mongoose plugins that extend model functionality while keeping schemas clean.

---

## Routes

Defines all API endpoints and maps them to their respective controllers.

---

## Middlewares

Contains reusable middleware responsible for authentication, authorization, request validation, and centralized error handling.

---

## Validators

Handles request validation before data reaches the controller layer, ensuring only valid input is processed.

---

## Utils

Reusable helper functions and utilities shared across the project, including response wrappers and common helper methods.

---

## DBConnection

Responsible for establishing and managing the MongoDB database connection.

---

## app.js

Initializes the Express application by registering middleware, routes, and application-level configuration.

---

## index.js

Application entry point responsible for connecting to the database and starting the server.

---

# Authentication Flow

1. User registers or logs in.
2. Server validates the credentials.
3. A short-lived Access Token and a long-lived Refresh Token are generated.
4. Tokens are securely stored using HTTP-only cookies.
5. Protected routes verify the Access Token.
6. When the Access Token expires, a new one is issued using the Refresh Token.
7. Logout clears authentication cookies and invalidates the session.

---

# API Overview

### Authentication

- `POST /signup`
- `POST /login`
- `POST /logout`
- `POST /refresh-token`

### User

- `GET /current-user`
- `GET /dashboard`

---

# Project Structure

```text
Frontend
│
├── Components
├── Pages
├── Hooks
├── Utils
└── App.jsx

Backend
│
├── Controllers
├── Services
├── DBConnection
├── Models
├── ModelPlugins
├── Routes
├── Middlewares
├── Validators
├── Utils
├── app.js
└── index.js
```

---

# Running Locally

```bash
git clone <repository-url>

cd backend
npm install
npm run dev

cd ../frontend
npm install
npm run dev
```

---

# Environment Variables

```env
PORT=
MONGODB_URI=

ACCESS_TOKEN_SECRET=
ACCESS_TOKEN_EXPIRY=

REFRESH_TOKEN_SECRET=
REFRESH_TOKEN_EXPIRY=

CLIENT_URL=
NODE_ENV=
```

---

# Design Principles

- Modular architecture
- Separation of concerns
- Service-oriented business logic
- Reusable middleware
- Centralized validation
- Clean and maintainable codebase
- Scalable folder structure

---

# Author

Developed as part of a MERN Stack Authentication assessment with emphasis on clean architecture, secure authentication practices, and maintainable backend design.

As future improvements->
1.Role based authentication 
2.Integrating O-auth
3.Add a "Authorization-Required" layer for protected routes
