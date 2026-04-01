
import expressAsyncHandler from "express-async-handler"
import taskRepository from "../../../infrastructure/repositories/task.repository.js"
import taskUseCase from "../../../core/use-case/taskUsecase/task.usecase.js"
const taskController = expressAsyncHandler( async (req,res)=>{
const response = await taskUseCase(taskRepository,req.user.id,req.body)

res.status(201).json({
  success:true,
  message:"Task created Successfully",
  data:response
})


})


export default taskController