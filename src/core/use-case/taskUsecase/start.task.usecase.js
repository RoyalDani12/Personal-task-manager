
export const startTaskUseCase =async(userId,taskId,taskRepository)=>{
 if(!userId || !taskId){
  statusCode= 404
  throw Error(" taskId or UserId is messing ")
 }

 // get task
 const foundTask = await taskRepository.taskDetail(userId,taskId)

 if(!foundTask){
  throw new Error(" Task is not found")
 }

 if(foundTask.isRunning){
   throw new Error("Task is not found")
 }

   foundTask.isRunning = true

   //create new session
   const session ={
    startTime:new Date(),
    endTime:null
   }

   foundTask.sessions.push(session)

   // save the update task to DB

  const updateTask = await taskRepository.updateTask(taskId,userId,foundTask)

 return updateTask
 
}