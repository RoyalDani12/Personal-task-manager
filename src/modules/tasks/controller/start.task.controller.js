 import taskRepository from "../../../infrastructure/repositories/task.repository.js"
 import expressAsyncHandler from "express-async-handler"
 import { startTaskUseCase } from "../../../core/use-case/taskUsecase/start.task.usecase.js"
 const startTaskController = expressAsyncHandler(async(req,res)=>{
  // pass the request to the controller
  const { id } = req.params
  const userId = req.user.id
  const response = await startTaskUseCase(userId,id,taskRepository)

  res.status(200).json({
  success:true,
  message:" session starts successfully",
  response
 })
 }

 )

 export default startTaskController 