import taskRepository from "../../infrastructure/repositories/task.repository.js";

const startTaskWatcher = (io) => {
  // Check every 10 seconds for better responsiveness during testing
  // You can change this back to 30000 (30s) later for production
  setInterval(async () => {
    try {
      // 1. Get only tasks that are currently "isRunning"
      const activeTasks = await taskRepository.getAllRunningTasks(); 

      if (activeTasks.length === 0) return; // Save resources if nothing is running

      for (const task of activeTasks) {
        const sessions = task.sessions;
        if (!sessions || sessions.length === 0) continue;

        const lastSession = sessions[sessions.length - 1];
        if (!lastSession || !lastSession.startTime || lastSession.endTime) continue;

        // 2. Calculate current total time including the live session
        const liveSessionMs = new Date().getTime() - new Date(lastSession.startTime).getTime();
        const totalWorkedMs = (task.totalWorkedTime || 0) + liveSessionMs;
        const requiredMs = (task.required_time || 0) * 60 * 1000;

        // 3. The "Auto-Stop" Trigger
        if (totalWorkedMs >= requiredMs) {
          console.log(`[WATCHER] Task ${task._id} hit limit. Auto-completing...`);
          
          lastSession.endTime = new Date();
          task.totalWorkedTime = totalWorkedMs;
          task.isRunning = false;
          task.status = "completed";

          // 4. Save the update to the Database
          // Ensure your updateTask repository method handles the updated object correctly
          const updatedTask = await taskRepository.updateTask(task._id, task.createdBy, task);

          // 5. THE REAL-TIME SIGNAL (Socket.io)
          // Broadcast to anyone listening for this specific task ID
          if (io) {
            io.emit(`task_finished:${task._id}`, updatedTask);
            console.log(`[WATCHER] Broadcast sent for task: ${task._id}`);
          }
        }
      }
    } catch (error) {
      console.error("Watcher Error:", error);
    }
  }, 10000); 
};

export default startTaskWatcher;