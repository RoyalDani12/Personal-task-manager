import axios from "axios";

const deleteTask = async (id) => {
  try {
    const token = localStorage.getItem("accessToken");
    const URL = `http://localhost:5000/api/tasks/delete/${id}`;

    const response = await axios.delete(URL, {
      headers: {
        Authorization: `Bearer ${token}`, // Corrected
      },
      withCredentials: true,
    });

    return response;
  } catch (error) {
    // Throw the error so frontend can catch it
    if (error.response) {
      // Server responded with a status other than 2xx
      throw new Error(error.response.data.message || "Failed to delete task");
    } else if (error.request) {
      // Request made but no response received
      throw new Error("No response from server");
    } else {
      // Something else
      throw new Error(error.message || "Failed to delete task");
    }
  }
};

export default deleteTask;