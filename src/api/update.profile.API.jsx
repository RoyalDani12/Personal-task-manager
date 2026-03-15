import axios from "axios";


const updateProfile=async(id,profileData)=>{

try {
  const URL=`http://localhost:5000/api/users/upload-profile/${id}`

  const token = localStorage.getItem('accessToken')

  const response = await axios.post(URL,profileData,{
    headers:{
      Authorization:`Bearer ${token}`,
      "Content-Type":"multipart/form-data"
    },
    withCredentials:true
  })

  return response
} catch (error) {
  console.log(error);
  
  throw error
}

}

export default updateProfile