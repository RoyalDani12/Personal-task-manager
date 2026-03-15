import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTerminal, faXmark } from "@fortawesome/free-solid-svg-icons";
import addTaskApi from "../../api/addTask.Api";
import { useNavigate } from "react-router-dom";

const AddTask = () => {
  const navigate = useNavigate();
  const [taskData, setTaskData] = useState({
    title: "",
    description: "",
    status: "pending",
    priority: "medium",
    difficulityLevel: "meddium",
    assignedTo: "",
    startedDate: "",
    dueDate: "",
    isActive: true,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setTaskData({
      ...taskData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await addTaskApi(taskData);
      window.alert("Success: Task_Created");
      setTimeout(() => navigate('/dashboard'), 500);
    } catch (error) {
      console.log(error.data?.message || "Error: Execution_Failed");
    }
  };

  const inputStyle = "w-full bg-[#0E0F13] border border-slate-800 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#F7A600]/50 transition-all placeholder:text-slate-700 text-[#EAECEF]";
  const labelStyle = "text-[10px] font-black text-slate-500 uppercase  ml-1 mb-2 block";

  return (
    <div className="min-h-screen bg-[#0E0F13] flex items-center justify-center p-6 font-sans">
      <div className="w-full max-w-3xl bg-[#17181E] border border-slate-800/60 rounded-2xl shadow-2xl p-10 relative">
        
        <div className="flex justify-between items-start mb-10">
          <div>
            <h1 className="text-3xl font-black text-white  font-serif">
              Create <span className="text-[#F7A600]">New task</span>
            </h1>
            <p className="text-slate-400 text-[10px] font-black  mt-2">
                 initialize new process 
            </p>
          </div>
          <FontAwesomeIcon icon={faTerminal} className="text-slate-800 text-2xl" />
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div>
            <label className={labelStyle}>task title:</label>
            <input
              type="text"
              name="title"
              value={taskData.title}
              onChange={handleChange}
              required
              placeholder="Enter_Title..."
              className={inputStyle}
            />
          </div>

          {/* Description */}
          <div>
            <label className={labelStyle}>task description:</label>
            <textarea
              name="description"
              value={taskData.description}
              onChange={handleChange}
              placeholder="Enter_Task_Details..."
              rows={3}
              className={inputStyle}
            />
          </div>

          {/* Row 1: Status, Priority, Difficulty */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className={labelStyle}>status:</label>
              <select name="status" value={taskData.status} onChange={handleChange} className={inputStyle}>
                <option value="pending">pending</option>
                <option value="in-progress">in-progress</option>
                <option value="completed">completed</option>
              </select>
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
              <label className={labelStyle}>difficulty:</label>
              <select name="difficulityLevel" value={taskData.difficulityLevel} onChange={handleChange} className={inputStyle}>
                <option value="easy">easy</option>
                <option value="meddium">medium</option>
                <option value="hard">hard</option>
              </select>
            </div>
          </div>

          {/* Row 2: Dates */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={labelStyle}>start date:</label>
              <input type="date" name="startedDate" value={taskData.startedDate} onChange={handleChange} className={inputStyle} />
            </div>
            <div>
              <label className={labelStyle}>due date:</label>
              <input type="date" name="dueDate" value={taskData.dueDate} onChange={handleChange} className={inputStyle} />
            </div>
          </div>

          {/* Footer Actions */}
          <div className="flex flex-col md:flex-row gap-4 pt-6 border-t border-slate-800/50">
             <button
              type="button"
              onClick={() => navigate('/dashboard')}
              className="flex-1 border border-slate-800 text-slate-400 py-4 rounded-lg font-black text-xm  hover:bg-white/5 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <FontAwesomeIcon icon={faXmark} /> Cancel
            </button>
            <button
              type="submit"
              className="flex-2 bg-[#F7A600] hover:bg-[#ffb700] text-black py-4 px-12 rounded-lg font-black text-xm  transition-all shadow-lg shadow-[#F7A600]/10 flex items-center justify-center gap-2 cursor-pointer"
            >
              <FontAwesomeIcon icon={faPlus}  /> Add new task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTask;