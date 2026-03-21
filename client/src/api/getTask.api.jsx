
import api from "./api.Centeral";

const getTask=async()=>{
  try {

    const response = await api.get("/tasks/get-tasks")
    return response.data
  } catch (error) {
    const errorMsg = error.response?.data?.message || error.message || "Error happened";
    console.error("Fetch Task Error:", errorMsg);
    return null
  }

}

// getTask()
export default getTask