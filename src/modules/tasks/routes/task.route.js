import express from 'express'
import authMiddleware from '../../../shared/middleware/auth.middleware.js'
import taskController from '../controller/create.task.controller.js'
import getTasksController from '../controller/geTasks.controller.js'
import deleteTskController from '../controller/deleteTask.controller.js'
import updateTaskController from '../controller/updateTask.controller.js'

const router = express.Router()



router.post('/create',authMiddleware(),taskController)
router.delete('/delete/:id',authMiddleware(),deleteTskController)// add delete task controller
  // add get task controller
//for the update task route
 router.get('/get-tasks',authMiddleware(),getTasksController)
 router.put('/update-task/:id',authMiddleware(),updateTaskController)

router.get('/all',authMiddleware())

export default router
