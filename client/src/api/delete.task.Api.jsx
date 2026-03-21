  
  
  import api from "./api.Centeral";
const deleteTask = async (id) => {
  try {
    
    const response = await api.delete(`/tasks/delete/${id}`); 
    return response.data;
  } catch (error) {
    console.error("Delete Error:", error.response?.data || error.message);
    throw error;
  }
};
export default deleteTask