import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import getTaskDetailApi from "../../api/task.Detail.Api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload, faTrash,faBackward } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import deleteTask from "../../api/delete.task.Api";
import UpdateTask from "./UpdateTask";

const TaskDetail = () => {

  const navigate = useNavigate()

  const { id } = useParams();

  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const fetchDetail = async () => {
      try {

        const result = await getTaskDetailApi(id);

        if (result.data && result.data.success) {
          setTask(result.data.response);
        }

      } catch (error) {
        console.error("Fetch error :", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchDetail();

  }, [id]);


  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-[#0f172a] text-white">
        <div className="animate-spin rounded-full h-14 w-14 border-t-2 border-indigo-500"></div>
      </div>
    );
  }

  if (!task) {
    return (
      <div className="text-white p-10 bg-[#0f172a] h-screen">
        <h1 className="text-3xl font-bold">Task not found</h1>
      </div>
    );
  }

  const formatDate = (date) => {
    if (!date) return "Not set";

    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric"
    });
  };

const handleDelete = async (id) => {
  // Ask for confirmation first
  const confirm = window.confirm("Are you sure you want to delete this task?");
  if (!confirm) return; // Stop if user cancels

  try {
    const result = await deleteTask(id);
    console.log("Task deleted successfully");
    navigate("/dashboard");
  } catch (error) {
    console.error(error.message || "Failed to delete the task");
    alert(error.message || "Failed to delete the task");
  }
};

  return (

    <div className="min-h-screen bg-[#0f172a] text-slate-200">

      {/* TOP BAR */}

      <div className="border-b border-slate-700 px-10 py-6 flex justify-between items-center">

        <div>
          <p className="text-xs text-slate-400 uppercase tracking-widest">
            Task #{task._id}
          </p>

          <h1 className="text-3xl font-bold mt-1 text-white">
            {task.title}
          </h1>
        </div>

        {/* ACTIONS */}

        <div className="flex gap-4">

          <button onClick={()=>navigate(`/update/${task._id}`)} className="flex items-center gap-2 px-5 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 transition">
            <FontAwesomeIcon icon={faUpload}/>
            Update
          </button>
          <button onClick={()=>handleDelete(task._id)} className="flex items-center gap-2 px-5 py-2 rounded-lg bg-red-600 hover:bg-red-500 transition">
            <FontAwesomeIcon icon={faTrash}/>
            Delete
          </button>

        </div>

      </div>


      {/* MAIN WORKSPACE */}

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 px-10 py-8">


        {/* MAIN CONTENT */}

        <div className="lg:col-span-3 space-y-8">


          {/* STATUS BAR */}

          <div className="flex flex-wrap gap-4">

            <span className="px-4 py-1 text-sm rounded-full bg-blue-500/20 text-blue-400">
              {task.status}
            </span>

            <span className="px-4 py-1 text-sm rounded-full bg-purple-500/20 text-purple-400">
              Priority: {task.priority}
            </span>

            <span className="px-4 py-1 text-sm rounded-full bg-emerald-500/20 text-emerald-400">
              Difficulty: {task.difficulityLevel}
            </span>

          </div>


          {/* DESCRIPTION */}

          <div className="bg-slate-800/40 border border-slate-700 rounded-xl p-8">

            <h3 className="text-lg font-semibold mb-4 text-white">
              Description
            </h3>

            <p className="text-slate-300 leading-relaxed text-[16px]">
              {task.description || "No description provided"}
            </p>

          </div>

        </div>



        {/* SIDEBAR */}

        <div className="space-y-6">


          {/* TASK INFO */}

          <div className="bg-slate-800/40 border border-slate-700 rounded-xl p-6">

            <h4 className="font-semibold text-white mb-4">
              Task Info
            </h4>

            <div className="space-y-3 text-sm">

              <div className="flex justify-between">
                <span className="text-slate-400">Created</span>
                <span>{formatDate(task.createdAt)}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-slate-400">Due Date</span>
                <span className="text-rose-400">{formatDate(task.dueDate)}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-slate-400">Visibility</span>
                <span>{task.isActive ? "Active" : "Archived"}</span>
              </div>

            </div>

          </div>


          {/* OWNERSHIP */}

          <div className="bg-slate-800/40 border border-slate-700 rounded-xl p-6">

            <h4 className="font-semibold text-white mb-4">
              Ownership
            </h4>

            <div className="space-y-3 text-sm">

              <div className="flex justify-between">
                <span className="text-slate-400">Assigned To</span>
                <span>{task.assignedTo?.name || "Unassigned"}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-slate-400">Owner</span>
                <span className="text-xs">{task.createdBy}</span>
              </div>

            </div>

          </div>

        </div>

        <div>
          <button  onClick={()=>navigate('/dashboard')} className="flex items-center gap-2 px-5 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 transition">
            <FontAwesomeIcon icon={faBackward}/>
            Back to Dashboard
          </button>
        </div>

      </div>

    </div>

  );
};

export default TaskDetail;