
import api from "./api.Centeral";

const getTaskDetailApi = async (id) => {

  try {

    const result = api.get(`/tasks/task-detail/${id}`)

    return result;

  } catch (error) {
    console.error(
      error.response?.data || error.message
    );

    throw error;
  }
};

export default getTaskDetailApi;