import axios from "axios";


const updateAPI =async(id,updatedData)=>{

  
   try {
    

    const URL =`http://localhost:5000/api/tasks/update-task/${id}`
    const token = localStorage.getItem('accessToken')

    const response = await axios.put(URL,updatedData,
       {
        headers:{
          Authorization:`Bearer ${token}`
        },
        withCredentials:true
       }
    )

    return response

   } catch (error) {
    console.log(error)
   }

}

export default updateAPI