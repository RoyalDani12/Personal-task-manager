import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faCalendarDays } from "@fortawesome/free-solid-svg-icons";
import addTaskApi from "../../api/addTask.Api";
import { useNavigate } from "react-router-dom";
const AddTask = ({ onSubmit }) => {
  const navigate = useNavigate()
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

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setTaskData({
      ...taskData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // Handle form submission
const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const response = await addTaskApi(taskData);
    // Now response exists and contains data
    console.log(response.data);
    setTimeout((
      navigate('/dashboard')
    ),1000)
    window.alert("Task created successfully")
  } catch (error) {
    // If using the throw logic above, error.data will contain your backend message
    console.log(error.data?.message || "Something went wrong");
  }
};

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-slate-800 rounded-xl shadow-lg text-white">
      <h1 className="text-2xl font-bold mb-6 text-indigo-400">
        <FontAwesomeIcon icon={faPlus} className="mr-2" />
        Add New Task
      </h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">

        {/* Title */}
        <div>
          <label className="block text-sm font-medium mb-1">Title *</label>
          <input
            type="text"
            name="title"
            value={taskData.title}
            onChange={handleChange}
            required
            placeholder="Enter task title"
            className="w-full p-3 rounded-xl bg-slate-700 border border-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            name="description"
            value={taskData.description}
            onChange={handleChange}
            placeholder="Enter task description"
            rows={4}
            className="w-full p-3 rounded-xl bg-slate-700 border border-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Status & Priority */}
        <div className="flex gap-4 flex-wrap">
          <div className="flex-1">
            <label className="block text-sm font-medium mb-1">Status</label>
            <select
              name="status"
              value={taskData.status}
              onChange={handleChange}
              className="w-full p-3 rounded-xl bg-slate-700 border border-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>

          <div className="flex-1">
            <label className="block text-sm font-medium mb-1">Priority</label>
            <select
              name="priority"
              value={taskData.priority}
              onChange={handleChange}
              className="w-full p-3 rounded-xl bg-slate-700 border border-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>

          <div className="flex-1">
            <label className="block text-sm font-medium mb-1">Difficulty</label>
            <select
              name="difficulityLevel"
              value={taskData.difficulityLevel}
              onChange={handleChange}
              className="w-full p-3 rounded-xl bg-slate-700 border border-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="easy">Easy</option>
              <option value="meddium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>
        </div>

        {/* Dates */}
        <div className="flex gap-4 flex-wrap">
          <div className="flex-1">
            <label className="block text-sm font-medium mb-1">Start Date</label>
            <input
              type="date"
              name="startedDate"
              value={taskData.startedDate}
              onChange={handleChange}
              className="w-full p-3 rounded-xl bg-slate-700 border border-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="flex-1">
            <label className="block text-sm font-medium mb-1">Due Date</label>
            <input
              type="date"
              name="dueDate"
              value={taskData.dueDate}
              onChange={handleChange}
              className="w-full p-3 rounded-xl bg-slate-700 border border-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        {/* Active Checkbox */}
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            name="isActive"
            checked={taskData.isActive}
            onChange={handleChange}
            className="w-5 h-5 text-indigo-500 bg-slate-700 border-slate-600 rounded"
          />
          <label className="text-sm font-medium">Is Active</label>
        </div>

        {/* Submit */}
        <button onClick={()=>navigate('/dashboard')}
          type="button"
          className="mt-4 bg-indigo-700 hover:bg-indigo-500 p-3 rounded-full font-semibold flex items-center justify-center gap-2 shadow-lg transition"
        >
        
          Cancel
        </button>
        <button
          type="submit"
          className="mt-4 bg-indigo-600 hover:bg-indigo-500 p-3 rounded-full font-semibold flex items-center justify-center gap-2 shadow-lg transition"
        >
          <FontAwesomeIcon icon={faPlus} />
          Add Task
        </button>

      </form>
    </div>
  );
};

export default AddTask;