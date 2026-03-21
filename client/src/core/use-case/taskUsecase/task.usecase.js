
const taskUseCase =async(taskRepository,createdBy,userData)=>{

   const { title,description,status,priority,dueDate } = userData

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
      dueDate
    })

    return createdTask

}

export default taskUseCase