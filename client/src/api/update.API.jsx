
import api from "./central.api";
const updateAPI = async (id, updatedData) => {
  try {
    const response = await api.put(`/tasks/update-task/${id}`, updatedData);

    return response;
  } catch (error) {
    console.log(error);
  }
};

export default updateAPI;
