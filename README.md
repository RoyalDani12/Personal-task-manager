# 🚀 Nexus Task Management System

[![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-20232A?style=flat-square&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=flat-square&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](https://opensource.org/licenses/MIT)

A production-grade **Task Management System** built for scale. This system implements **Clean Architecture**, advanced **JWT Refresh Token strategies**, and underwent rigorous **Stress Testing** to ensure stability under high concurrency.

---

## 🏗️ System Architecture & Key Features

### 🔐 Enterprise-Grade Authentication
- **Hybrid Auth:** Seamless Google OAuth 2.0 & traditional credential-based login.
- **Session Security:** Rotating Refresh Tokens via `HttpOnly` cookies to mitigate XSS/CSRF.
- **Middleware Gatekeeping:** Schema validation using **Joi** to ensure data integrity.

### ⏱️ Performance-Driven Core
- **Precision Tracking:** Start/Stop timers for granular task session management.
- **Atomic Operations:** Optimized MongoDB updates for real-time progress calculation.
- **Decoupled Logic:** Strict separation of Use Cases (Core) from Infrastructure (DB/Express).

---

## 🛠️ Tech Stack

| Frontend | Backend | Dev Ops & Testing |
| :--- | :--- | :--- |
| **React** (Hooks/Context) | **Node.js** / Express | **PM2** (Cluster Mode) |
| **TailwindCSS** | **MongoDB** / Mongoose | **k6** (Load Testing) |
| **Axios Interceptors** | **Passport.js** | **Postman** API Testing |

---

## 📈 Performance & Reliability Testing

### ⚡ Load Testing (k6)
Simulated **200 concurrent users** to identify bottlenecks.
- **Reliability:** 100% Success Rate over 5,000+ checks.
- **Observation:** p95 latency confirmed stable at 5.47s under peak stress (optimization in progress for bcrypt rounds).

<img width="100%" alt="k6 Load Test Results" src="https://github.com/user-attachments/assets/a5dd2426-c8ea-49d8-9216-4cda5fc31e91" />

### ⚙️ Cluster Monitoring (PM2)
Deployed in **Cluster Mode** across 8 CPU instances to maximize hardware utilization and zero-downtime.

<img width="100%" alt="PM2 Cluster Monitor" src="https://github.com/user-attachments/assets/4f6d03ea-2ffe-4da9-a938-5be25f294ace" />

---

## 📸 Interface Preview

### 🖥️ Dashboard & Task Workspace
<p align="center">
<img width="48%" alt="dashboard" src="https://github.com/user-attachments/assets/2b548689-45bf-40de-953a-aeaaf84b86d7" />
  <img src="https://github.com/user-attachments/assets/e64b12bf-5d7b-47cb-a0ce-b749cba6cda5" width="48%" />
</p>

### 📋 Task Management & Authentication
<p align="center">
  <img src="https://github.com/user-attachments/assets/adcb5ff8-8627-49d4-bc85-0bff6cdfb634" width="48%" />
  <img src="https://github.com/user-attachments/assets/fa944e2e-f259-4b33-9416-127abf45b457" width="48%" />
</p>

---

## 📂 Project Structure

```bash
server/
├── core/                # Pure Business Logic (Use Cases)
├── infrastructure/      # Repositories & External Services
├── interfaces/          # Controllers, Routes, & DTOs
├── middleware/          # Security & Validation
└── database/            # Schema Models & Config
<img width="1912" height="907" alt="dashboard" src="https://github.com/user-attachments/assets/eb942e17-fe31-4fdf-9e82-317b733090ad" />
<img width="1912" height="907" alt="dashboard" src="https://github.com/user-attachments/assets/807538fc-ebd7-419a-8e52-bb959fe62a92" />


## Installation & Setup
1. Clone the Project
git clone [https://github.com/RoyalDani12/Personal-task-manager.git](https://github.com/RoyalDani12/Personal-task-manager.git)
cd Personal-task-manager

2. Backend Configuration
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
REFRESH_TOKEN_SECRET=your_refresh_secret
GOOGLE_CLIENT_ID=your_id
GOOGLE_CLIENT_SECRET=your_secret

3. Spin Up Environment
# Install dependencies
# In /server
npm install 
# In /client
npm install

# Run Dev Mode
# Backend
cd server && npm run dev
# Frontend
cd client && npm run dev

