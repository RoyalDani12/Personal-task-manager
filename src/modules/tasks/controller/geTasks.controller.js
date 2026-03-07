
import expressAsyncHandler from "express-async-handler"
import taskRepository  from "../../../infrastructure/repositories/task.repository.js"
import getTasksUseCase from "../../../core/use-case/taskUsecase/getTasks.usecase.js"
const getTasksController = expressAsyncHandler( async(req ,res)=>{
     const id = req.user.id
  const response = await getTasksUseCase(id,taskRepository)

  res.status(200).json({
    success:true,
    message:" task fetch succeffully",
    data:response
  })

} )

export default getTasksController