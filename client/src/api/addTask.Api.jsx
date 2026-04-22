import api from "./central.api";

const addTaskApi = async (taskData) => {
   try {
    const response = await api.post("/tasks/create",taskData)
    return response
   } catch (error) {
    throw error.response || error
   }
};

export default addTaskApi;