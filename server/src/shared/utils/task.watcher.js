import taskRepository from "../../infrastructure/repositories/task.repository.js";
import sendEmail from "../../infrastructure/services/email.service.js";

const startTaskWatcher = (io) => {
  setInterval(async () => {
    try {
      // --- FLOW 1: DEADLINE EXPIRATION (Calendar Check) ---
      const expiredByDate = await taskRepository.getNewlyExpiredTasks();
      
      for (const task of expiredByDate) {
        const userId = task.createdBy._id;
        const userEmail = task.createdBy.email;

        console.log(`[WATCHER] Task ${task._id} expired by deadline.`);
        
        // Update DB
        task.status = "expired";
        task.isExpiredEmailSent = true;
        await taskRepository.updateTask(task._id, userId, task);

        // Notify User
        if (userEmail) {
          await sendEmail({
            email: userEmail,
            subject: "Task Expired!",
            message: `The deadline for "${task.title}" has passed. Please reassign time.`,
            html: `<h3>Task Expired</h3><p>Your task <b>${task.title}</b> is overdue.</p>`
          });
        }

        if (io) {
          // Send to private user room
          io.to(userId.toString()).emit("notification", { 
            type: "EXPIRED", 
            message: `Task "${task.title}" has expired.` 
          });
        }
      }

      // --- FLOW 2: AUTO-COMPLETE (Timer Check) ---
      const activeTasks = await taskRepository.getAllRunningTasks();
      if (activeTasks.length === 0 && expiredByDate.length === 0) return;

      for (const task of activeTasks) {
        const sessions = task.sessions;
        if (!sessions || sessions.length === 0) continue;

        const lastSession = sessions[sessions.length - 1];
        if (!lastSession || !lastSession.startTime || lastSession.endTime) continue;

        const liveSessionMs = new Date().getTime() - new Date(lastSession.startTime).getTime();
        const totalWorkedMs = (task.totalWorkedTime || 0) + liveSessionMs;
        const requiredMs = (task.required_time || 0) * 60 * 1000;

        if (totalWorkedMs >= requiredMs) {
          console.log(`[WATCHER] Task ${task._id} hit time limit.`);
          
          const userId = task.createdBy._id;
          const userEmail = task.createdBy.email;

          lastSession.endTime = new Date();
          task.totalWorkedTime = totalWorkedMs;
          task.isRunning = false;
          task.status = "completed";

          const updatedTask = await taskRepository.updateTask(task._id, userId, task);

          // Notify Completion
          if (userEmail) {
            await sendEmail({
              email: userEmail,
              subject: "Task Completed!",
              message: `Congrats! You finished "${task.title}".`
            });
          }

          if (io) {
            io.to(userId.toString()).emit(`task_finished:${task._id}`, updatedTask);
            io.to(userId.toString()).emit("notification", { 
                type: "SUCCESS", 
                message: `Task "${task.title}" completed!` 
            });
          }
        }
      }
    } catch (error) {
      console.error("Watcher Error:", error);
    }
  }, 30000); // Check every 30 seconds
};

export default startTaskWatcher;