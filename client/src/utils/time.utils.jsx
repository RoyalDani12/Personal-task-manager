
export const calculateTimeLeft=(task)=>{


  if(!task || !task.dueDate){
    return 
  }
    const now = new Date()
    const due = new Date(task.dueDate)
    //time remaining  between the current moment and a task's deadline
    const diff =  due - now

    if(diff <= 0){
      return "Expired"
    }


    const days = Math.floor(diff /(1000*60*60*24))
    const hours = Math.floor((diff /(1000*60*60))% 24)
    const minutes = Math.floor((diff /(1000*60)) % 60)
    const seconds = Math.floor(( diff/1000)% 60)


      const d = days > 0 ? `${days}` : "";
      const h = hours.toString().padStart(2,"0")
      const m = minutes.toString().padStart(2,"0")
      const s = seconds.toString().padStart(2,"0")

       return `${d}d, ${h}h : ${m}m: ${s}s`
  }


    export const  formatDate = (data)=>{

     if(!data){
      return " note data set"
     }

     return new Date(data).toLocaleDateString("en-US",{
      month:"short",
      day:"numeric",
      year:"numeric"
     })
  }
