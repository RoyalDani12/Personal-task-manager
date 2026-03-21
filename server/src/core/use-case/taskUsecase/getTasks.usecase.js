
const getTasksUseCase=async(id,taskRepository)=>{

  if(!id){
  throw new Error(" User Id required")
  }
  
  const tasks = await   taskRepository.getTasksByUser(id)

  return tasks

}

export default getTasksUseCase