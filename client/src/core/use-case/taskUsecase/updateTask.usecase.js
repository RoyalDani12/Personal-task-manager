// import taskRepository from "../../../infrastructure/repositories/task.repository"

const updateUseCase=async(taskId,userId,data,taskRepository)=>{
  

  if(!taskId){
    throw new Error("Task id is required")
  }

  if(!userId){
    throw new Error("User Id is required")
  }

  const updateTask =  await taskRepository.updateTask(taskId,userId,data)

  return updateTask

}

export default updateUseCase