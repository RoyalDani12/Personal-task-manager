
import axios from "axios";


//  create axios instance
const api = axios.create({
  baseURL:"http://localhost:5000/api",
  withCredentials:true 
})


// request interceptors
api.interceptors.request.use((config)=>{
  const token = localStorage.getItem("accessToken")

  if(token){
    config.headers["Authorization"] = `Bearer ${token}`
  }
  return config
})


//response interceptors
api.interceptors.response.use((response)=>response,
    
async(error)=>{
   const originalRequest = error.config

   if(
    error.response &&
    error.response.status === 401 &&
    !originalRequest._retry 
   ){
  
    originalRequest._retry = true 

    try {
      
      // call refresh token
      const  res = await axios.post(
         "http://localhost:5000/api/auth/refresh-token",
         {},
         { withCredentials :true }
      )

      const newToken = res.data.accessToken
      //  save the new access token
       localStorage.setItem('accessToken',newToken)

       // update header and retry the original request

       originalRequest.headers["Authorization"] =`Bearer ${newToken}`
       return api(originalRequest)
    } catch (refreshError) {
      console.log('refresh token failed',refreshError)

      // redirect to the login page
      window.location.href ="/login"
      return Promise.reject(refreshError)
      
    }
    
   }
   return Promise.reject(error);
}

  )


  export default api