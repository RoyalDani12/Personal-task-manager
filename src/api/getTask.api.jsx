
import axios from "axios";


const getTask=async()=>{
  try {

    const URL ='http://localhost:5000/api/tasks/get-tasks'
    const token = localStorage.getItem('accessToken')
   const response = await axios.get(URL,{
      headers:{
        Authorization:`Bearer ${token}`
      },
      withCredentials:true
    })
    console.log( "Data fetch successfully" || response.data.data)
    return response.data
  } catch (error) {
    const errorMsg = error.response?.data?.message || error.message || "Error happened";
    console.error("Fetch Task Error:", errorMsg);
    return null
  }

}

// getTask()
export default getTask