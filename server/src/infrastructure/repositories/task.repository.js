
import Task from '../database/mongodb/models/task.model.js'

const taskRepository = {

  async createTask(task) {
    return await Task.create(task)
  },

  async getTasksByUser(userId) {
    return await Task.find({createdBy:userId})
  },
  async deleteTask (taskId,userId){
    return await  Task.findOneAndDelete({_id:taskId,createdBy:userId})
  },


  async updateTask(taskId,userId,data){
     return await Task.findOneAndUpdate({_id:taskId,createdBy:userId},
      data,
      { returnDocument:"after" }
     )
  },

  async taskDetail(taskId,userId){
     return await Task.findOne({_id:taskId,createdBy:userId})
  },

  // infrastructure/repositories/task.repository.js
async getAllRunningTasks() {
  return await Task.find({ isRunning: true })
  .populate("createdBy","email")
},


// find task where deadline has passed 
async getNewlyExpiredTasks() {
  return await Task.find({
    dueDate:{ $lt :new Date()},
    status: {$nin : ['completed','expired'] }
  }).populate("createdBy","email")
},

//  find task due in the next 24 hours
async getTasksNeedingWarning (){
   const tomorrow = new Date()
   tomorrow.setHours(tomorrow.getHours() + 24 )

   return await task.find({
    dueDate : { $gt : new Date(),$lt :tomorrow },
    status: { $nin : ["completed","expired"]},
    isExpiryWarningSent :false
   }).populate("createdBy","email")
}

}

export default taskRepository