

import expressAsyncHandler from "express-async-handler";
import taskRepository from "../../../infrastructure/repositories/task.repository.js";
import deleteTaskUseCase from "../../../core/use-case/taskUsecase/deleteTask.usecase.js";

const deleteTskController = expressAsyncHandler( async(req ,res)=>{
   
  const taskId = req.params.id
   const response = await deleteTaskUseCase(taskId,req.user.id,taskRepository)

   res.status(200).json({
    success:true,
    message:"Task deleted succefully",
    data:response
   })
})

export default deleteTskController