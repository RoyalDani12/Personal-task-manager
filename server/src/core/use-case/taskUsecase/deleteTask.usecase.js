

const  deleteTaskUseCase=async(taskId,userId,taskRepository)=>{

  if(!userId){
    throw new Error("Task Id is required")

  }
  // check the task is owned by the user
   
  const deleteTask = await taskRepository.deleteTask(taskId,userId)

  return deleteTask
   
}

export default deleteTaskUseCase