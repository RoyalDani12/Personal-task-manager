
import expressAsyncHandler from "express-async-handler"
import taskRepository from "../../../infrastructure/repositories/task.repository.js"
import updateUseCase from "../../../core/use-case/taskUsecase/updateTask.usecase.js"
const updateTaskController=expressAsyncHandler(async (req ,res)=>{
  
  const userId = req.user.id
  const taskId =req.params.id
  const data = req.body

  const response = await updateUseCase(taskId,userId,data,taskRepository)

  res.status(200).json({
    success:true,
    message:"Task upadate Successfull",
    data:response
  })

})

export default updateTaskController