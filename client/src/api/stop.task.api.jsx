import api from "./central.api";

export const stopTaskApi = async (taskId) => {
  try {
    const response = await api.post(`/tasks/stop-task/${taskId}`);
    return response;
  } catch (error) {
    console.log("Stop api error ", error.message);
    throw error;
  }
};
