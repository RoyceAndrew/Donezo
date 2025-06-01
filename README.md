# Donezo Frontend

## Overview
Donezo Frontend is a React application for a To-Do List web app. It provides:
- User authentication (login/register) using JWT issued by the backend
- Task creation, editing, completion, and deletion
- Global state management via React’s `useContext` + `useReducer` for user session and task list
- Dark mode toggle with preference persisted in `localStorage`
- Responsive UI built with Tailwind CSS

## Tech Stack
- **Framework & Libraries:**  
  - React (JavaScript)  
  - React Context API + `useReducer` (state management)  
  - Tailwind CSS (utility-first styling)  
  - Axios (HTTP client)  

- **Tooling:**  
  - Create React App (build & dev server)  
  - ESLint + Prettier (linting & formatting)  


---

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
