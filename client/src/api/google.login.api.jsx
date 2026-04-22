import api from "./central.api"

export const googleLoginAPI =(token)=>{
  try {
    if(!token){
      throw new Error("Id Token messing")
    }
  const response = api.post('/auth/google-login',{token})
  return response
  } catch (error) {
    console.error(error.message)
  }

}