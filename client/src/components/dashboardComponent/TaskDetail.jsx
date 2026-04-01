import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faUpload, faTrash, faCalendarCheck, 
  faLayerGroup, faHourglassHalf 
} from "@fortawesome/free-solid-svg-icons";

// API & Components
import getTaskDetailApi from "../../api/task.Detail.Api";
import deleteTask from "../../api/delete.task.Api";
import Footer from "../Footer";
import Sidebar from "./Sidebar";
import { calculateProgress } from "../../utils/progress.utils";
import { formatDate, calculateTimeLeft } from "../../utils/time.utils";
import { startTaskApi } from "../../api/start.task.api";
import { stopTaskApi } from "../../api/stop.task.api";

const TaskDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [timeLeft, setTimeLeft] = useState("");
  const [progress, setProgress] = useState(0);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const strokeDasharray = 565.48; 
  const strokeDashoffset = strokeDasharray - (progress / 100) * strokeDasharray;

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const result = await getTaskDetailApi(id);
        if (result.data && result.data.success) {
          setTask(result.data.response);
        }
      } catch (error) {
        console.error("Fetch error:", error);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchDetail();
  }, [id]);

  useEffect(() => {
    if (!task) return;
    const updateUI = () => {
      setTimeLeft(calculateTimeLeft(task));  
      setProgress(calculateProgress(task));   
    };
    updateUI();
    const timer = setInterval(updateUI, 1000);
    return () => clearInterval(timer);
  }, [task]);

  const handleDelete = async (taskId) => {
    const confirm = window.confirm("System Warning: Permanent deletion requested. Proceed?");
    if (!confirm) return;
    try {
      await deleteTask(taskId);
      navigate("/dashboard");
    } catch (error) {
      alert(error.message || "Failed to terminate the task");
    }
  };

  const handleStart = async () => {
    try {
      const result = await startTaskApi(task._id);
      if (result.data && result.data.success) {
        setTask(result.data.response); 
        alert("Session synchronized: Started");
      }
    } catch (error) {
      alert("Failed to initiate session node.");
    }
  };

  const handleStop = async () => {
    try {
      const result = await stopTaskApi(task._id);
      if (result.data && result.data.success) {
        setTask(result.data.response);
        alert("Session synchronized: Terminated");
      }
    } catch (error) {
      alert("Failed to close session node.");
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-screen bg-[#0E0F13] text-indigo-500">
        <div className="relative">
          <div className="absolute inset-0 border-t-2 border-indigo-600 rounded-full animate-spin"></div>
          <div className="w-12 h-12 border-2 border-slate-800 rounded-full"></div>
        </div>
        <p className="mt-4 text-[10px] font-mono text-slate-500">Synchronizing_Node...</p>
      </div>
    );
  }

  if (!task) {
    return (
      <div className="text-indigo-500 p-10 bg-[#0E0F13] h-screen flex flex-col items-center justify-center">
        <h1 className="text-xl font-black mb-6 text-slate-600">Entry_Not_Found</h1>
        <button onClick={() => navigate('/dashboard')} className="border border-slate-700 px-8 py-3 rounded-lg text-xs font-bold hover:bg-slate-800 transition-all">
          Return to Hub
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0E0F13] text-indigo-500 font-sans flex">
      <Sidebar onCollapse={setIsSidebarCollapsed} />

      <div className={`flex-1 transition-all duration-300 flex flex-col min-h-screen w-full
        ${isSidebarCollapsed ? "lg:pl-20" : "lg:pl-64"} pl-0`}>

        <nav className="border-b border-slate-800 bg-[#17181E] px-4 md:px-8 py-6 sticky top-0 z-50 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <h1 className="text-xl md:text-2xl font-black text-indigo-500 truncate mt-12 ml-15 md:mt-0">
            {task.title}
          </h1>

          <div className="flex gap-2 w-full md:w-auto">
            <button onClick={() => navigate(`/update/${task._id}`)} className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-2 rounded-xl bg-slate-800 text-slate-300 border border-slate-700 hover:text-indigo-600 text-sm font-bold">
              <FontAwesomeIcon icon={faUpload} /> Modify
            </button>
            <button onClick={() => handleDelete(task._id)} className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-2 rounded-xl bg-red-500 text-white text-sm font-bold">
              <FontAwesomeIcon icon={faTrash} /> Delete
            </button>
          </div>
        </nav>

        <main className="max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-12 grow w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-10">

            <div className="lg:col-span-8 space-y-8">
              <div className="bg-[#17181E] border border-slate-800 p-6 md:p-8 rounded-2xl">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                  <div className="w-14 h-14 bg-indigo-600/10 rounded-xl flex items-center justify-center text-indigo-600">
                    <FontAwesomeIcon icon={faHourglassHalf} className="text-2xl" />
                  </div>
                  <div>
                    <p className="text-slate-500 text-xs font-bold">Time Remaining</p>
                    <p className={`text-2xl md:text-3xl font-mono font-bold ${timeLeft === "EXPIRED" ? "text-red-500" : "text-indigo-500"}`}>
                      {timeLeft}
                    </p>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-slate-800 flex flex-col sm:flex-row justify-between items-center gap-4">
                  <div>
                    <p className="text-slate-500 text-xs font-bold">Priority</p>
                    <p className="text-indigo-600 font-bold">{task.priority}</p>
                  </div>

                  <div className="flex gap-2 w-full sm:w-auto">
                    <button 
                      onClick={handleStart}  
                      disabled={task.isRunning} 
                      className={`flex-1 sm:px-8 py-2 rounded font-bold text-white transition-all ${task.isRunning ? "bg-slate-700" : "bg-indigo-600 hover:scale-105"}`}
                    >
                      Start
                    </button>

                    <button 
                      onClick={handleStop} 
                      disabled={!task.isRunning} 
                      className={`flex-1 sm:px-8 py-2 rounded font-bold transition-all ${!task.isRunning ? "bg-slate-900 text-slate-600" : "bg-slate-800 text-indigo-500 hover:bg-slate-700"}`}
                    >
                      Stop
                    </button>
                  </div>
                </div>
              </div>

              {/* Progress */}
              <div className="bg-[#17181E] border border-slate-800 p-8 rounded-2xl flex flex-col items-center">
                <div className="w-full flex justify-between mb-6">
                  <p className="text-slate-500 text-[10px] font-black">Work Progress</p>
                  <span className="text-indigo-600 font-mono text-xs font-bold">{progress}%</span>
                </div>

                <div className="relative flex items-center justify-center w-48 h-48 md:w-64 md:h-64">
                  <svg viewBox="0 0 224 224" className="w-full h-full transform -rotate-90">
                    <circle cx="112" cy="112" r="90" stroke="#0E0F13" strokeWidth="15" fill="transparent" />

                    <circle 
                      cx="112" cy="112" r="90" 
                      stroke="indigo" 
                      strokeWidth="10" 
                      fill="transparent" 
                      strokeDasharray={strokeDasharray} 
                      strokeDashoffset={strokeDashoffset} 
                      strokeLinecap="round"
                    />
                  </svg>

                  <div className="absolute inset-0 flex items-center justify-center">
                    <h2 className="text-3xl font-black text-indigo-600">
                      {Math.floor(progress)}%
                    </h2>
                  </div>
                </div>
              </div>

              <div className="bg-[#17181E] border border-slate-800 p-6 md:p-8 rounded-2xl">
                <div className="flex items-center gap-3 mb-4 text-indigo-600">
                  <FontAwesomeIcon icon={faLayerGroup} />
                  <span className="text-indigo-500 font-bold text-xs">Description</span>
                </div>
                <p className="text-slate-400">{task.description}</p>
              </div>
            </div>

            <div className="lg:col-span-4 space-y-6">
              <div className="bg-[#17181E] border border-slate-800 p-6 rounded-2xl">
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-slate-400">
                    <FontAwesomeIcon icon={faCalendarCheck} />
                    <span className="text-xs font-bold">Metadata</span>
                  </div>
                  <p className="text-sm text-slate-300">Created: <span className="text-indigo-500">{formatDate(task.createdAt)}</span></p>
                  <p className="text-sm text-slate-300">Due: <span className="text-indigo-500">{formatDate(task.dueDate)}</span></p>
                  <div className="pt-4 border-t border-slate-800">
                    <span className="px-3 py-1 bg-indigo-600/10 text-indigo-600 text-[10px] font-bold rounded-full">
                      Status: {task.status}
                    </span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default TaskDetail;