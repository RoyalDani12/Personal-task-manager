import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTerminal, faXmark } from "@fortawesome/free-solid-svg-icons";
import addTaskApi from "../../api/addTask.Api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { addTaskValidatorSchema } from "../../validators/add.task.validator";

const AddTask = () => {
  const navigate = useNavigate();
  const [taskData, setTaskData] = useState({
    title: "",
    description: "",
    priority: "medium",
    difficultyLevel: "medium",
    startedDate: "",
    dueDate: "",
  });

  const [timeParts, setTimeParts] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
  });

  const [errors, setError] = useState({});

  const handleTimeChange = (e) => {
    const { name, value } = e.target;
    setTimeParts({
      ...timeParts,
      [name]: parseInt(value) || 0,
    });
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setTaskData({
      ...taskData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const totalMinutes =
      timeParts.days * 1440 + timeParts.hours * 60 + timeParts.minutes;
   const selectedDate = new Date(taskData.dueDate);
   selectedDate.setHours(23,59,59,999)
    const payload = {
      ...taskData,
      dueDate:selectedDate.toISOString(),
      required_time: totalMinutes,
    };
    setError({}); // clear the previous error before validating
    const { error } = addTaskValidatorSchema.validate(payload, {
      abortEarly: false,
    });

    if (error) {
      const ValidationError = error.details.reduce((acc, curr) => {
        acc[curr.path[0]] = curr.message;
        return acc;
      }, {});

      setError(ValidationError);
      console.log(ValidationError);
      return toast.error("please fix the highlighted errors.");
    }
    try {
      await addTaskApi(payload);
      window.alert("Success: Task_Created");
      toast.success("Task created successfully");
      setTimeout(() => navigate("/dashboard"), 500);
    } catch (error) {
      console.log(error.data?.message || "Error: Execution_Failed");
    }
  };

  const inputStyle =
    "w-full bg-white border  rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-black transition-all placeholder:text-gray-400 text-black";

  const labelStyle =
    "text-[14px]  font-bold text-black  ml-1 mb-2 block";

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-6 font-sans text-black">
      <div className="w-full max-w-3xl bg-white border border-gray-200 rounded-2xl shadow-2xl p-10 relative">
        <div className="flex justify-between items-start mb-10">
          <div>
            <h1 className="text-3xl font-black text-black font-serif">
              Create <span className="text-black">New task</span>
            </h1>
            <p className="text-gray-400 text-[10px] font-black mt-2">
              initialize new process
            </p>
          </div>
          <FontAwesomeIcon
            icon={faTerminal}
            className="text-gray-300 text-2xl"
          />
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div>
            <label className={labelStyle}>task title:</label>
            {errors.title && (
              <p className="text-rose-600 font-bold text-xs mb-1">{errors.title}</p>
            )}
            <input
              type="text"
              name="title"
              value={taskData.title}
              onChange={handleChange}
              placeholder="Enter_Title..."
              className={`${inputStyle} ${
                errors.title ? " border-red-500 " : " border-gray-300 "
              }`}
            />
          </div>

          {/* Description */}
          <div>
            <label className={labelStyle}>task description:</label>
            {errors.description && (
              <p className="text-rose-600 font-bold text-xs mb-1">{errors.description}</p>
            )}
            <textarea
              name="description"
              value={taskData.description}
              onChange={handleChange}
              placeholder="Enter_Task_Details..."
              rows={3}
              className={`${inputStyle} ${
                errors.description
                  ? " border border-red-500 "
                  : " border-gray-300 "
              }`}
            />
          </div>

          {/* Row 1 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className={labelStyle}>
                Required time to complete task:
              </label>
              {errors.required_time && (
                <p className="text-rose-600 font-bold text-xs mb-1">{errors.required_time}</p>
              )}
              <div style={{ display: "flex", gap: "10px" }}>
                <div>
                  <input
                    type="number"
                    min="0"
                    name="days"
                    value={timeParts.days}
                    onChange={handleTimeChange}
                    className={`${inputStyle} ${
                      errors.required_time ? " border-red-500 " : " border-gray-300 "
                    }`}
                    placeholder="Days"
                  />
                  <span className="text-gray-500 text-xs">Days</span>
                </div>
                <div>
                  <input
                    type="number"
                    min="0"
                    name="hours"
                    value={timeParts.hours}
                    onChange={handleTimeChange}
                    className={`${inputStyle} ${
                      errors.required_time ? " border-red-500 " : " border-gray-300 "
                    }`}
                    placeholder="Hours"
                  />
                  <span className="text-gray-500 text-xs">Hours</span>
                </div>
                <div>
                  <input
                    type="number"
                    min="0"
                    name="minutes"
                    value={timeParts.minutes}
                    onChange={handleTimeChange}
                    className={`${inputStyle} ${
                      errors.required_time ? " border-red-500 " : " border-gray-300 "
                    }`}
                    placeholder="Minutes"
                  />
                  <span className="text-gray-500 text-xs">Minutes</span>
                </div>
              </div>
            </div>

            <div>
              <label className={labelStyle}>priority level:</label>
              {errors.priority && (
                <p className="text-rose-600 font-bold text-xs mb-1">{errors.priority}</p>
              )}
              <select
                name="priority"
                value={taskData.priority}
                onChange={handleChange}
                className={`${inputStyle} ${
                  errors.priority ? " border-red-500 " : " border-gray-300 "
                }`}
              >
                <option value="low">low</option>
                <option value="medium">medium</option>
                <option value="high">high</option>
              </select>
            </div>

            <div>
              <label className={labelStyle}>difficulty:</label>
              {errors.difficultyLevel && (
                <p className="text-rose-600 font-bold text-xs mb-1">{errors.difficultyLevel}</p>
              )}
              <select
                name="difficultyLevel"
                value={taskData.difficultyLevel}
                onChange={handleChange}
                className={`${inputStyle} ${
                  errors.difficultyLevel ? " border-red-500 " : " border-gray-300 "
                }`}
              >
                <option value="easy">easy</option>
                <option value="medium">medium</option>
                <option value="hard">hard</option>
              </select>
            </div>
          </div>

          {/* Row 2 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={labelStyle}>start date:</label>
              {errors.startedDate && (
                <p className="text-rose-600 font-bold text-xs mb-1">{errors.startedDate}</p>
              )}
              <input
                type="date"
                name="startedDate"
                value={taskData.startedDate}
                onChange={handleChange}
                className={`${inputStyle} ${
                  errors.startedDate ? " border-red-500 " : " border-gray-300 "
                }`}
              />
            </div>
            <div>
              <label className={labelStyle}>due date:</label>
              {errors.dueDate && (
                <p className="text-rose-600 font-bold text-xs mb-1">{errors.dueDate}</p>
              )}
              <input
                type="date"
                name="dueDate"
                value={taskData.dueDate}
                onChange={handleChange}
                className={`${inputStyle} ${
                  errors.dueDate ? " border-red-500 " : " border-gray-300 "
                }`}
              />
            </div>
          </div>

          {/* Footer */}
          <div className="flex flex-col md:flex-row gap-4 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={() => navigate("/dashboard")}
              className="flex-1 border border-gray-300 text-gray-500 py-4 rounded-lg font-black text-xm hover:bg-gray-100 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <FontAwesomeIcon icon={faXmark} /> Cancel
            </button>

            <button
              type="submit"
              className="flex-2 bg-black hover:bg-gray-800 text-white py-4 px-12 rounded-lg font-black text-xm transition-all shadow-lg shadow-gray-300/10 flex items-center justify-center gap-2 cursor-pointer"
            >
              <FontAwesomeIcon icon={faPlus} /> Add new task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTask;