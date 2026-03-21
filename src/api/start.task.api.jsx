import api from "./api.Centeral";


export const startTaskApi = async(taskId)=>{
     try {
     const response = await  api.post(`/tasks/start-task/${taskId}`)
     return response
     } catch (error) {
      console.log("start api error",error)
      throw error
     }
}