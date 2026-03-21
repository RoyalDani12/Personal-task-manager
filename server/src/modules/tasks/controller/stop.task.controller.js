import expressAsyncHandler from "express-async-handler";
import taskRepository from "../../../infrastructure/repositories/task.repository.js";
import { stopTaskUseCase } from "../../../core/use-case/taskUsecase/stop.task.usecase.js";



export const stopTaskController =expressAsyncHandler( async(req ,res)=>{

  const{ id } = req.params
  const userId = req.user.id

  const response  = await stopTaskUseCase(id,userId,taskRepository)

  res.status(200).json({
    success:true,
    message:"Session stop successfully",
    response
  })
})