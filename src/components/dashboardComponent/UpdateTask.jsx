import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRotate, faXmark, faDatabase } from "@fortawesome/free-solid-svg-icons";
import getTaskDetailApi from '../../api/task.Detail.Api'
import updateAPI from '../../api/update.API'

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
    if (!window.confirm("Confirm: Update_Existing_Task?")) return;
    try {
      await updateAPI(id, taskData)
      window.alert('Success: Task_Updated')
      navigate('/dashboard')
    } catch (error) {
      console.error("Error:", error)
    }
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
        console.error("Fetch_Error:", error)
      }
    }
    if (id) getTask()
  }, [id])

  const inputStyle = "w-full bg-[#0E0F13] border border-slate-800 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#F7A600]/50 transition-all placeholder:text-slate-700 text-[#EAECEF]";
  const labelStyle = "text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1 mb-2 block";

  return (
    <div className="min-h-screen bg-[#0E0F13] flex items-center justify-center p-6 font-sans">
      <div className="w-full max-w-3xl bg-[#17181E] border border-slate-800/60 rounded-2xl shadow-2xl p-10 relative">
        
        <div className="flex justify-between items-start mb-10">
          <div>
            <h1 className="text-3xl font-black text-white  font-serif">
              Update <span className="text-[#F7A600]">Task ID: {id}</span>
            </h1>
            <p className="text-slate-500 text-[10px] font-black  tracking-[0.2em] mt-2">
               Modify existing metadata
            </p>
          </div>
          <FontAwesomeIcon icon={faDatabase} className="text-slate-800 text-2xl" />
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className={labelStyle}>entry title:</label>
            <input type="text" name="title" value={taskData.title} onChange={handleChange} className={inputStyle} />
          </div>

          <div>
            <label className={labelStyle}>entry description:</label>
            <textarea name="description" value={taskData.description} onChange={handleChange} rows={3} className={inputStyle} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className={labelStyle}>current status:</label>
              <select name="status" value={taskData.status} onChange={handleChange} className={inputStyle}>
                <option value="pending">pending</option>
                <option value="in-progress">in-progress</option>
                <option value="completed">completed</option>
              </select>
            </div>
            <div>
              <label className={labelStyle}>priority val:</label>
              <select name="priority" value={taskData.priority} onChange={handleChange} className={inputStyle}>
                <option value="low">low</option>
                <option value="medium">medium</option>
                <option value="high">high</option>
              </select>
            </div>
            <div>
              <label className={labelStyle}>difficulty val:</label>
              <select name="difficulty" value={taskData.difficulty} onChange={handleChange} className={inputStyle}>
                <option value="easy">easy</option>
                <option value="medium">medium</option>
                <option value="hard">hard</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={labelStyle}>timestamp start:</label>
              <input type="date" name="startDate" value={taskData.startDate} onChange={handleChange} className={inputStyle} />
            </div>
            <div>
              <label className={labelStyle}>timestamp due:</label>
              <input type="date" name="dueDate" value={taskData.dueDate} onChange={handleChange} className={inputStyle} />
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-4 pt-6 border-t border-slate-800/50">
            <button
              type="button"
              onClick={() => navigate('/dashboard')}
              className="flex-1 border border-slate-800 text-slate-400 py-4 rounded-lg font-black text-xm  hover:bg-white/5 transition-all flex items-center justify-center gap-2"
            >
              <FontAwesomeIcon icon={faXmark} /> Cancel Update         </button>
            <button
              type="submit"
              className="flex-2 bg-[#F7A600] hover:bg-[#ffb700] text-black py-4 px-12 rounded-lg font-black text-xm  transition-all shadow-lg shadow-[#F7A600]/10 flex items-center justify-center gap-2"
            >
              <FontAwesomeIcon icon={faRotate} /> Save Update
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default UpdateTask;