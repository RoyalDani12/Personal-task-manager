
import axios from "axios";


//  create axios instance
const api = axios.create({
  baseURL:"http://localhost:5000/api",
  withCredentials:true // importand to send cookies
})


// request intercepter
api.interceptors.request.use((config)=>{
  const token = localStorage.getItem("accessToken")

  if(token){
    config.headers["Authorization"] = `Bearer ${token}`
  }
  return config
})


//response intercepter
api.interceptors.response.use((response)=>response,
    
async(error)=>{
   const originalRequest = error.config

   if(
    error.response &&
    error.response.status === 401 &&
    !originalRequest._retry // returns undefine    when we make !undefine it returns to  true
   ){
  
    originalRequest._retry = true // I alerady retride

    try {
      
      // call refrshe token
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
    } catch (refresherror) {
      console.log('refresh token faild',refresherror)

      // redirect to the login page
      window.location.href ="/login"
      return Promise.reject(refresherror)
      
    }
    
   }
   return Promise.reject(error);
}

  )


  export default api