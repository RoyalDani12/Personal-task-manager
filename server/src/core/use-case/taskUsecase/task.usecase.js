
const taskUseCase =async(taskRepository,createdBy,userData)=>{

   const { title,description,status,priority,dueDate,startedDate,required_time } = userData

    if(!title){
      const error = new Error("Title is required")
      error.statusCode=404
      throw error
    }
    const createdTask = await taskRepository.createTask({
      title,
      description,
      status,
      priority,
      createdBy,
      dueDate,
      startedDate,
      required_time
    })

    return createdTask

}

export default taskUseCase