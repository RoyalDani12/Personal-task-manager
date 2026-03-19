
export const calculateProgress =(task)=>{


   if(!task || !task.createdAt || !task.dueDate){
    return 0
   }

   const start = new Date(task.createdAt)
   const end = new Date(task.dueDate)
   const now = new Date()

   const total =  end - start
   const passed = now - start 

   if(total <=0){
    return 0
   }
    let percent = (passed/total)*100

    if(percent < 0){
      percent = 0
    }
      

    if(percent > 100) {
      percent = 100
    }

    return percent.toFixed(1)
}