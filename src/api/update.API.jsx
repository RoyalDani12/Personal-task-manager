import api from "./api.Centeral"


const updateAPI =async(id,updatedData)=>{

  
   try {


    const response = await api.put(`/tasks/update-task/${id}`,updatedData)

    return response

   } catch (error) {
    console.log(error)
   }

}

export default updateAPI