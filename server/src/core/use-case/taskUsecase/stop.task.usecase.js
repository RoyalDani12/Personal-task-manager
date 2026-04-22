export const stopTaskUseCase = async (taskId, userId, taskRepository) => {
  // 1. Validation
  if (!taskId || !userId) {
    throw new Error("Task ID or User ID is missing");
  }

  const foundTask = await taskRepository.taskDetail(taskId, userId);

  if (!foundTask) {
    const error = new Error("Task not found");
    error.statusCode = 404;
    throw error;
  }

  if (!foundTask.isRunning) {
    throw new Error("Task is not currently running");
  }

  // 2. Identify and Close Session
  const lastSession = foundTask.sessions[foundTask.sessions.length - 1];

  if (!lastSession || !lastSession.startTime) {
    throw new Error("No active session start time found");
  }

  lastSession.endTime = new Date();

  // 3. Precise Math
  const sessionDuration =
    lastSession.endTime.getTime() - new Date(lastSession.startTime).getTime();

  // Ensure we are adding numbers, not undefined
  foundTask.totalWorkedTime =
    (foundTask.totalWorkedTime || 0) + sessionDuration;
  foundTask.isRunning = false;

  // 4. THE COMPLETION CHECK (Add this!)
  // required_time is in minutes -> convert to milliseconds
  const requiredMs = foundTask.required_time * 60 * 1000;

  if (foundTask.totalWorkedTime >= requiredMs) {
    foundTask.status = "completed";
  }

  // 5. Final Save
  const updatedTask = await taskRepository.updateTask(
    taskId,
    userId,
    foundTask,
  );
  return updatedTask;
};
