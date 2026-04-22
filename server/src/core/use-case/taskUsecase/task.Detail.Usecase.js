const taskDetailUsecase = async (taskId, userId, taskRepository) => {
  try {
    if (!taskId) {
      throw new Error("Task Id messing");
    }
    if (!userId) {
      throw new Error("task not found userId messing");
    }

    const response = await taskRepository.taskDetail(taskId, userId);

    return response;
  } catch (error) {}
};

export default taskDetailUsecase;
