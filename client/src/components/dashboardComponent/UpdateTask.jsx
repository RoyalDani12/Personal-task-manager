import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRotate, faXmark, faDatabase } from "@fortawesome/free-solid-svg-icons";
import getTaskDetailApi from '../../api/task.Detail.Api'
import updateAPI from '../../api/update.API'
import { toast } from 'react-toastify';

const UpdateTask = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  
  // State matches your Mongoose Model exactly
  const [taskData, setTaskData] = useState({
    title: "",
    description: "",
    priority: "medium",
    difficultyLevel: "medium", // FIXED: Was 'difficulty'
    startedDate: "",           // FIXED: Was 'startDate'
    dueDate: ""
  })

  // State for calculating the 'required_time' Number
  const [timeParts, setTimeParts] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
  });

  const handleTimeChange = (e) => {
    const { name, value } = e.target;
    setTimeParts({
      ...timeParts,
      [name]: parseInt(value) || 0,
    });
  };

  const handleChange = (e) => {
    setTaskData({ ...taskData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!window.confirm("Confirm: are you sure update the task ?")) {
      return;
    }

    // Calculate the 'required_time' your Model requires
    const totalMinutes = timeParts.days * 1440 + timeParts.hours * 60 + timeParts.minutes;

    // set the time to 23:59:59
    const selectedDate = new Date(taskData.dueDate)
       selectedDate.setHours(23,59,59,999)
    const payload = {
      ...taskData,
      dueDate:selectedDate.toISOString(),
      required_time: totalMinutes, // FIXED: Now sending the required Number
    };
    
    try {
      await updateAPI(id, payload)
      toast.success("Update successful!");
    
      setTimeout(() => {
           navigate(`/task-detail/${id}`)
      }, 1500)
     
    } catch (error) {
      console.error("Update_Error:", error)
      toast.error("Update failed on the server")
    }
  }

  useEffect(() => {
    const getTask = async () => {
      try {
        const result = await getTaskDetailApi(id)
        if (result.data && result.data.success) {
          const res = result.data.response;

          // Hydrate the time parts from the database number
          const total = res.required_time || 0;
          setTimeParts({
            days: Math.floor(total / 1440),
            hours: Math.floor((total % 1440) / 60),
            minutes: total % 60
          });

          // Match the Model keys when loading data
          setTaskData({
            title: res.title || "",
            description: res.description || "",
            priority: res.priority || "medium",
            difficultyLevel: res.difficultyLevel || "medium",
            startedDate: res.startedDate?.split('T')[0] || '',
            dueDate: res.dueDate?.split('T')[0] || ''
          })
        }
      } catch (error) {
        console.error("Fetch_Error:", error)
      }
    }
    if (id) getTask()
  }, [id])

  const inputStyle = "w-full bg-white border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-black transition-all placeholder:text-gray-400 text-black";
  const labelStyle = "text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1 mb-2 block";

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-6 font-sans">
      <div className="w-full max-w-3xl bg-white border border-gray-200 rounded-2xl shadow-2xl p-10 relative">
        
        <div className="flex justify-between items-start mb-10">
          <div>
            <h1 className="text-3xl font-black text-black font-serif">
              Update <span className="text-black">Process Control</span>
            </h1>
            <p className="text-gray-400 text-[10px] font-black mt-2">
                MODIFYING METADATA FOR: {id.slice(-6).toUpperCase()}
            </p>
          </div>
          <FontAwesomeIcon icon={faDatabase} className="text-gray-300 text-2xl" />
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className={labelStyle}>task title:</label>
            <input type="text" name="title" value={taskData.title} onChange={handleChange} className={inputStyle} required />
          </div>

          <div>
            <label className={labelStyle}>task description:</label>
            <textarea name="description" value={taskData.description} onChange={handleChange} rows={3} className={inputStyle} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Added Required Time Fields to Match Model */}
            <div>
              <label className={labelStyle}>Required Time (D/H/M):</label>
              <div className="flex gap-2">
                <input type="number" name="days" value={timeParts.days} onChange={handleTimeChange} className={inputStyle} />
                <input type="number" name="hours" value={timeParts.hours} onChange={handleTimeChange} className={inputStyle} />
                <input type="number" name="minutes" value={timeParts.minutes} onChange={handleTimeChange} className={inputStyle} />
              </div>
            </div>

            <div>
              <label className={labelStyle}>priority level:</label>
              <select name="priority" value={taskData.priority} onChange={handleChange} className={inputStyle}>
                <option value="low">low</option>
                <option value="medium">medium</option>
                <option value="high">high</option>
              </select>
            </div>
            <div>
              <label className={labelStyle}>difficulty level:</label>
              <select name="difficultyLevel" value={taskData.difficultyLevel} onChange={handleChange} className={inputStyle}>
                <option value="easy">easy</option>
                <option value="medium">medium</option>
                <option value="hard">hard</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={labelStyle}>start date:</label>
              <input type="date" name="startedDate" value={taskData.startedDate} onChange={handleChange} className={inputStyle} required />
            </div>
            <div>
              <label className={labelStyle}>due date:</label>
              <input type="date" name="dueDate" value={taskData.dueDate} onChange={handleChange} className={inputStyle} required />
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-4 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={() => navigate(`/task-detail/${id}`)}
              className="flex-1 border border-gray-300 text-gray-500 py-4 rounded-lg font-black text-xs hover:bg-gray-100 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <FontAwesomeIcon icon={faXmark} /> Cancel
            </button>

            <button   
              type="submit"
              className="flex-2 bg-black hover:bg-gray-800 text-white py-4 px-12 rounded-lg font-black text-xs transition-all shadow-lg shadow-gray-300/10 flex items-center justify-center gap-2 cursor-pointer"
            >
              <FontAwesomeIcon icon={faRotate} /> Sync Update
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default UpdateTask;