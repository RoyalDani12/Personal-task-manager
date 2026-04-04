export const calculateProgress = (task) => {
  if (!task || !task.required_time) return 0;

  // 1. Convert Required Time (minutes) to Milliseconds
  const totalRequiredMs = task.required_time * 60 * 1000;

  // 2. Get saved worked time (milliseconds)
  let totalWorkedMs = task.totalWorkedTime || 0;

  // 3. Add live session time if the timer is currently running
  if (task.isRunning && task.sessions?.length > 0) {
    const lastSession = task.sessions[task.sessions.length - 1];
    if (lastSession.startTime && !lastSession.endTime) {
      const liveSessionDuration = new Date().getTime() - new Date(lastSession.startTime).getTime();
      totalWorkedMs += liveSessionDuration;
    }
  }

  // 4. Calculate percentage based on effort, not calendar dates
  let percent = (totalWorkedMs / totalRequiredMs) * 100;

  // Clamp between 0 and 100
  if (percent < 0) percent = 0;
  if (percent > 100) percent = 100;

  return percent.toFixed(2); // 2 decimal places is usually enough for UI
};