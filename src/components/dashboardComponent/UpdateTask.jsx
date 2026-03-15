import React, { useEffect, useState } from 'react'
import getTaskDetailApi from '../../api/task.Detail.Api'
import { useParams } from 'react-router-dom'
import updateAPI from '../../api/update.API'
import { useNavigate } from 'react-router-dom'

const UpdateTask = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const [taskData, setTaskData] = useState({
    title: "",
    description: "",
    status: "",
    priority: "",
    difficulty: "",
    startDate: "",
    dueDate: ""
  })

  const handleChange = (e) => {
    setTaskData({ ...taskData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
       try {

       const ok =  window.confirm("Are you sure update this task")
         if(!ok){
          return
         }
        const updateTask = await updateAPI(id,taskData)
        console.log(updateTask.data || updateTask.data.data)
        window.alert('updated task succefully')
        setTimeout((navigate('/dashboard')),1000)
       } catch (error) {
        console.log(error);
        
       }
    // handle your update API here
    // console.log(taskData)
  }

  useEffect(() => {
    const getTask = async () => {
      try {
        const result = await getTaskDetailApi(id)
        if (result.data && result.data.success) {
          setTaskData({
            ...result.data.response,
            startDate: result.data.response.startDate?.split('T')[0] || '',
            dueDate: result.data.response.dueDate?.split('T')[0] || ''
          })
        }
      } catch (error) {
        console.error("Failed to fetch task:", error)
      }
    }

    if (id) getTask()
      //  updateTask()
  }, [id])

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-3xl bg-gray-800 rounded-3xl shadow-xl p-8 space-y-6">
        <h1 className="text-3xl font-bold text-white text-center">Update Task</h1>
        <p className="text-gray-400 text-center">Fill the fields below to update your task.</p>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
          <input
            type="text"
            placeholder="Enter Task Title"
            name="title"
            value={taskData.title}
            onChange={handleChange}
            className="w-full p-3 rounded-xl bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <textarea
            placeholder="Enter Task Description"
            name="description"
            value={taskData.description}
            onChange={handleChange}
            className="w-full p-3 rounded-xl bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <select
            name="status"
            value={taskData.status}
            onChange={handleChange}
            className="w-full p-3 rounded-xl bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Status</option>
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>

          <select
            name="priority"
            value={taskData.priority}
            onChange={handleChange}
            className="w-full p-3 rounded-xl bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Priority</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>

          <select
            name="difficulty"
            value={taskData.difficulty}
            onChange={handleChange}
            className="w-full p-3 rounded-xl bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Difficulty</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>

          <input
            type="date"
            name="startDate"
            value={taskData.startDate}
            onChange={handleChange}
            className="w-full p-3 rounded-xl bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="date"
            name="dueDate"
            value={taskData.dueDate}
            onChange={handleChange}
            className="w-full p-3 rounded-xl bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-bold p-3 rounded-2xl hover:bg-blue-700 transition-all duration-300 mt-4"
          >
            Submit Update Task
          </button>
        </form>
      </div>
    </div>
  )
}

export default UpdateTask