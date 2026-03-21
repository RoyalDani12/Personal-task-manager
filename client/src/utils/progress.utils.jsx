
export const calculateProgress = (task) => {
  if (!task || !task.createdAt || !task.dueDate) return 0;

  const start = new Date(task.createdAt).getTime();
  const end = new Date(task.dueDate).getTime();
  

  const totalAllocatedTime = end - start;

  if (totalAllocatedTime <= 0) return 0;

  
  let totalWorked = task.totalWorkedTime || 0;

  
  if (task.isRunning && task.sessions?.length > 0) {
    const lastSession = task.sessions[task.sessions.length - 1];
    if (lastSession.startTime && !lastSession.endTime) {
      const liveSessionDuration = new Date().getTime() - new Date(lastSession.startTime).getTime();
      totalWorked += liveSessionDuration;
    }
  }

  
  let percent = (totalWorked / totalAllocatedTime) * 100;

  // Clamp between 0 and 100
  if (percent < 0) percent = 0;
  if (percent > 100) percent = 100;

  return percent.toFixed(4);
};