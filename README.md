# 📝 Task Tracker App

A full-stack **Task Management System** built with **Node.js, Express, MongoDB, React, and TailwindCSS**.  
Supports **Google Login**, secure **JWT authentication with refresh tokens**, and includes **API & UI testing**.

---

## 🚀 Features

- 🔐 User Authentication  
  - Register / Login  
  - Google OAuth Login  
  - JWT + Refresh Token  

- 📋 Task Management  
  - Create, Update, Delete Tasks  
  - Start / Stop Task Timer  
  - Track working sessions  

- 📊 Progress Tracking  
  - Calculate progress based on worked time vs required time  

- 🎨 Responsive UI  
  - Built with TailwindCSS (mobile-friendly)

- 🔒 Security  
  - HTTP-only cookies  
  - CORS protection  
  - Secure token handling  

- 🧪 Testing  
  - API tested using Postman  
  - (Optional) UI testing ready for Cypress  

---

## 🛠️ Tech Stack

<p align="center">
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" alt="Node.js" width="50"/>
<img src="https://cdn.simpleicons.org/express/ffffff"alt="Express" width="50"/>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" alt="MongoDB" width="50"/>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" alt="React" width="50"/>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg" alt="TailwindCSS" width="50"/>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg" alt="Postman" width="50"/>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg" alt="Google Login" width="50"/>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" alt="GitHub" width="50"/>
</p>

---

## 📸 Screenshots

### 🖥️ Dashboard
<img width="1910" height="967" alt="task_updated dashboard" src="https://github.com/user-attachments/assets/35e59243-07e2-440f-ad83-932723d0106e" />


### 📋 Task Management
![Tasks](https://github.com/user-attachments/assets/e3fc74c6-2ed7-42de-996c-8253d11a6509)

---

## 🧪 Testing Evidence

### 🔧 API Testing (Postman)
![Postman Testing](https://github.com/user-attachments/assets/1dcc9bd2-bbae-4c88-b31f-1d1e37ba2bd2)

✔ All endpoints tested (Auth, Tasks, Sessions)  
✔ Verified responses and status codes  

---

## 📂 Project Structure

```bash
task-tracker/
├── client/             # React frontend (Vite/CRA)
│   ├── src/            # Components, Hooks, State
│   └── public/         # Static assets
├── server/             # Node.js & Express backend
│   ├── controllers/    # Request logic
│   ├── models/         # Mongoose Schemas
│   ├── routes/         # API Endpoints
│   ├── middleware/     # Auth (JWT) & Validation (Joi)
│   └── config/         # DB & Passport setup
└── package.json

 ## Clone the repository
      git clone https://github.com/your-username/task-tracker.git
       cd task-tracker

## Install dependencies
    cd server
      npm install

    cd ../client
      npm install
## Setup environment variables
    PORT=5000
    MONGO_URI=your_mongodb_connection
    JWT_SECRET=your_secret
    REFRESH_TOKEN_SECRET=your_refresh_secret
    GOOGLE_CLIENT_ID=your_google_client_id
##  Run the app
    cd server
    npm run dev
    
    # Run frontend
    cd client
    npm start
