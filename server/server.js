import express from "express"
import { configDotenv } from "dotenv"
configDotenv()
import errorHandler from "./src/shared/middleware/error.middleware.js"
import cors from 'cors'
import connectDB from "./src/infrastructure/database/mongodb/connection.js"
import authRoutes from '../server/src/modules/auth/auth.route.js'
import cookieParser from "cookie-parser"
import taskRoutes from '../server/src/modules/tasks/routes/task.route.js'
import userRoutes from '../server/src/modules/users/user.route.js'
import startTaskWatcher from "./src/shared/utils/task.watcher.js"
import path from 'path'

// --- NEW IMPORTS FOR SOCKET.IO ---
import http from "http";
import { Server } from "socket.io";

const app = express()

// 1. Create HTTP Server
const server = http.createServer(app);

// 2. Initialize Socket.io
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // Your Vite frontend URL
    methods: ["GET", "POST"],
    credentials: true
  }
});

// 3. Setup Connection Listener (For testing)
io.on("connection", (socket) => {
  console.log(`[SOCKET] User connected: ${socket.id}`);
  
  socket.on("disconnect", () => {
    console.log("[SOCKET] User disconnected");
  });
});

// Make 'io' available to your routes or watchers if needed
app.set("io", io);

app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')))

//middleware 
app.use(express.json())
const corsOption = {
  origin: 'http://localhost:5173',
  credentials: true
}
app.use(cors(corsOption))
app.use(cookieParser())

app.use('/api/auth', authRoutes)
app.use('/api/tasks', taskRoutes)
app.use('/api/users', userRoutes)
app.use(errorHandler)

connectDB()

// 4. Pass 'io' to your watcher so it can send signals!
startTaskWatcher(io); 

const PORT = process.env.PORT || 8000

// 5. IMPORTANT: Use server.listen instead of app.listen
server.listen(PORT, () => {
  console.log(`Server & Real-time Socket running on port ${PORT}`);
});