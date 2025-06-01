# Donezo Backend

## Overview
Donezo Backend is an Express.js API for the To-Do List web app. It handles:
- User registration & login with JWT authentication
- Password hashing with bcrypt
- CRUD operations for tasks: create, read (per user), update, delete
- Dark mode preference saved to user profile (optional)
- MongoDB (Atlas or local) for user and task data
- Middleware for JWT verification and error handling

## Tech Stack
- **Runtime & Framework:**  
  - Node.js & Express.js  

- **Database:**  
  - MongoDB (Mongoose ODM)  

- **Authentication & Security:**  
  - JSON Web Tokens (jsonwebtoken)  
  - bcrypt (password hashing)  

- **Utilities:**  
  - dotenv (environment variables)  
  - cors (CORS configuration)  
  - express-validator (input validation) 
