import axios from "axios";

const getTaskDetailApi = async (id) => {

  try {

    const token = localStorage.getItem("accessToken");

    const URL = `http://localhost:5000/api/tasks/task-detail/${id}`;

    const result = await axios.get(URL, {
      headers: {
        Authorization: `Bearer ${token}`
      },
      withCredentials: true
    });

    return result;

  } catch (error) {

    console.error(
      "API Call Failed:",
      error.response?.data || error.message
    );

    throw error;
  }
};

export default getTaskDetailApi;