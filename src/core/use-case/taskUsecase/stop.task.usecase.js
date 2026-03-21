
export const stopTaskUseCase=async(taskId,userId,taskRepository)=>{

  if(!taskId || !userId){
    throw new Error("Task or User Id Messing")
  }

  // check the task is found in the DB

  const foundTask = await taskRepository.taskDetail(taskId,userId)

  if(!foundTask){
    const error = new Error(" task not found")
     error.statusCode = 404
    throw error
  }
   if(!foundTask.isRunning){
    throw new Error("task is not running")
   }

   
   // get the last session
   const sessions = foundTask.sessions
   if(sessions.length === 0){
    throw new Error("No active Session Found to Stop")
   }
   const lastSession = sessions[ sessions.length - 1]
   
   // set end time
   lastSession.endTime = new Date();

   // calculate the total work time
    const workedTime = lastSession.endTime - lastSession.startTime

    // update the total time
    foundTask.totalWorkTime = foundTask.totalWorkTime + workedTime

    // stop running
    foundTask.isRunning = false

    
 const updatedTask = await taskRepository.updateTask(taskId,userId,foundTask)

 return updatedTask

}