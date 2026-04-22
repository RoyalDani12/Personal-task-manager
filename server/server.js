import express from "express"
import { configDotenv } from "dotenv"
configDotenv()
import errorHandler from "./src/shared/middleware/error.middleware.js"
import cors from 'cors'
import connectDB from "./src/infrastructure/database/mongodb/connection.js"
import authRoutes from './src/modules/auth/auth.route.js'
import cookieParser from "cookie-parser"
import taskRoutes from './src/modules/tasks/routes/task.route.js'
import userRoutes from './src/modules/users/user.route.js'
import startTaskWatcher from "./src/shared/utils/task.watcher.js"
import path from 'path'
import http from "http";
import { Server } from "socket.io";
import helmet from 'helmet'
import morgan from 'morgan'
import compression from 'compression'

const app = express()
app.use(helmet())      // xss attacks
app.use(morgan('dev'))  // logging
app.use(compression()) // performance

// 1. Create HTTP Server
const server = http.createServer(app);

// 2. Initialize Socket.io
const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL, 
    methods: ["GET", "POST"],
    credentials: true
  }
});


io.on("connection", (socket) => {

   const userId = socket.handshake.query.userId;

   if(userId){
    socket.join(userId) // create private room for user
    console.log(`[SOCKET] user ${userId} connected and join room`);
   }
   else {
    console.log(`[SOCKET] Anonymous connection :${socket.id}`);
   }
  
  socket.on("disconnect", () => {
    console.log("[SOCKET] User disconnected");
  });
});

app.set("io", io);

app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')))

//middleware 
app.use(express.json())
const corsOption = {
  origin: process.env.CLIENT_URL,
  credentials: true
}
app.use(cors(corsOption))
app.use(cookieParser())

app.use('/api/auth', authRoutes)
app.use('/api/tasks', taskRoutes)
app.use('/api/users', userRoutes)
app.use(errorHandler)

const startServer = async () => {
  try {
    await connectDB();

    const PORT = process.env.PORT || 8000;

    server.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });

    startTaskWatcher(io);

  } catch (err) {
    console.error("Server failed to start", err);
    process.exit(1);
  }
};

startServer();;
