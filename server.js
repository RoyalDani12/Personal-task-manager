import express from "express"
import { configDotenv } from "dotenv"
configDotenv()
import errorHandler from "./src/shared/middleware/error.middleware.js"
import cors from 'cors'
const app = express()
import connectDB from "./src/infrastructure/database/mongodb/connection.js"
import authRoutes from '../server/src/modules/auth/auth.route.js'
import cookieParser from "cookie-parser"
import taskRoutes from '../server/src/modules/tasks/routes/task.route.js'


//middleware 
app.use(express.json())
app.use(cors())
// to read cookie
app.use(cookieParser())
app.use('/api/auth',authRoutes)
app.use('/api/tasks',taskRoutes)
app.use(errorHandler)

connectDB()
const PORT = process.env.PORT || 8000
app.listen(PORT ,()=>{
  console.log(`server running on port ${PORT}`);
  
})