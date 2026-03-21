import express from 'express'
import authMiddleware from '../../../shared/middleware/auth.middleware.js'
import taskController from '../controller/create.task.controller.js'
import getTasksController from '../controller/geTasks.controller.js'
import deleteTskController from '../controller/deleteTask.controller.js'
import updateTaskController from '../controller/updateTask.controller.js'
import taskDetailController from '../controller/task.Detail.Controller.js'
import startTaskController from '../controller/start.task.controller.js'
import { stopTaskController } from '../controller/stop.task.controller.js'

const router = express.Router()



router.post('/create',authMiddleware(),taskController)
router.delete('/delete/:id',authMiddleware(),deleteTskController) // add delete task controller
  // add get task controller
//for the update task route
 router.get('/get-tasks',authMiddleware(),getTasksController)
 router.put('/update-task/:id',authMiddleware(),updateTaskController)
 router.get('/task-detail/:id',authMiddleware() ,taskDetailController)

 
router.get('/all',authMiddleware())
 router.post('/start-task/:id',authMiddleware(),startTaskController)
 router.post('/stop-task/:id',authMiddleware(),stopTaskController)

export default router
