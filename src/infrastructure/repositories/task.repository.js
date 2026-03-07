
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
  }

}

export default taskRepository