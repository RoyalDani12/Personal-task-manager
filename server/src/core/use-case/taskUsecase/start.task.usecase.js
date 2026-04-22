export const startTaskUseCase = async (taskId, userId, taskRepository) => {
  if (!userId || !taskId) {
    // statusCode= 404
    throw Error(" taskId or UserId is messing ");
  }

  // get task
  const foundTask = await taskRepository.taskDetail(taskId, userId);

  if (!foundTask) {
    const error = new Error("Task not found in the database");
    error.statusCode = 404; // Only attach if you have an error handler middleware
    throw error;
  }

  if (foundTask.isRunning) {
    throw new Error("Task is already running");
  }

  foundTask.isRunning = true;

  //create new session
  const session = {
    startTime: new Date(),
    endTime: null,
  };

  foundTask.sessions.push(session);

  // save the update task to DB

  const updateTask = await taskRepository.updateTask(taskId, userId, foundTask);

  return updateTask;
};
