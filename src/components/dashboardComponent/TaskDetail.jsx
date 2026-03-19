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

const TaskDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [timeLeft, setTimeLeft] = useState("");
  const [progress, setProgress] = useState(0);
  
  // State to sync with Sidebar width
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

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
    const update = () => {
      setTimeLeft(calculateTimeLeft(task));  
      setProgress(calculateProgress(task));   
    };
    update();
    const timer = setInterval(update, 1000);
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

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-screen bg-[#0E0F13] text-white">
        <div className="relative">
          <div className="absolute inset-0 border-t-2 border-[#F7A600] rounded-full animate-spin"></div>
          <div className="w-12 h-12 border-2 border-slate-800 rounded-full"></div>
        </div>
        <p className="mt-4 text-[10px] font-mono tracking-[0.4em] text-slate-500 uppercase">Synchronizing_Node...</p>
      </div>
    );
  }

  if (!task) {
    return (
      <div className="text-white p-10 bg-[#0E0F13] h-screen flex flex-col items-center justify-center">
        <h1 className="text-xl font-black mb-6 uppercase tracking-widest text-slate-600">Entry_Not_Found</h1>
        <button onClick={() => navigate('/dashboard')} className="border border-slate-700 px-8 py-3 rounded-lg text-xs font-bold uppercase hover:bg-slate-800 transition-all">Return to Hub</button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0E0F13] text-[#EAECEF] font-sans flex">
      
      {/* SIDEBAR - Pass state down if needed, but here we use the CSS logic */}
      <Sidebar onCollapse={setIsSidebarCollapsed} />

      {/* MAIN CONTENT 
          Logic: 
          - On Mobile: pl-0 (Sidebar is an overlay)
          - On Desktop: transition padding based on Sidebar width
      */}
      <div className={`flex-1 transition-all duration-300 flex flex-col min-h-screen w-full
        ${isSidebarCollapsed ? "lg:pl-20" : "lg:pl-64"} pl-0`}>

        {/* NAV: Responsive stacking */}
        <nav className="border-b border-slate-800 bg-[#17181E] px-4 md:px-8 py-6 sticky top-0 z-50 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <h1 className="text-xl md:text-2xl font-black text-white uppercase truncate mt-12 md:mt-0">
            {task.title}
          </h1>

          <div className="flex gap-2 w-full md:w-auto">
            <button onClick={() => navigate(`/update/${task._id}`)} className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-2 rounded-xl bg-slate-800 text-slate-300 border border-slate-700 hover:text-[#F7A600] text-sm font-bold">
              <FontAwesomeIcon icon={faUpload} /> Modify
            </button>
            <button onClick={() => handleDelete(task._id)} className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-2 rounded-xl bg-red-500 text-white text-sm font-bold">
              <FontAwesomeIcon icon={faTrash} /> Delete
            </button>
          </div>
        </nav>

        {/* MAIN BODY */}
        <main className="max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-12 flex-grow w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-10">

            {/* LEFT SIDE */}
            <div className="lg:col-span-8 space-y-8">
              <div className="bg-[#17181E] border border-slate-800 p-6 md:p-8 rounded-2xl">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                  <div className="w-14 h-14 bg-[#F7A600]/10 rounded-xl flex items-center justify-center text-[#F7A600]">
                    <FontAwesomeIcon icon={faHourglassHalf} className="text-2xl" />
                  </div>
                  <div>
                    <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">Time Remaining</p>
                    <p className={`text-2xl md:text-3xl font-mono font-bold ${timeLeft === "EXPIRED" ? "text-red-500" : "text-white"}`}>
                      {timeLeft}
                    </p>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-slate-800 flex flex-col sm:flex-row justify-between items-center gap-4">
                  <div className="text-center sm:text-left">
                    <p className="text-slate-500 text-xs font-bold uppercase">Priority</p>
                    <p className="text-[#F7A600] font-bold">{task.priority}</p>
                  </div>
                  <div className="flex gap-2 w-full sm:w-auto">
                    <button className="flex-1 sm:px-8 py-2 bg-[#F7A600] rounded font-bold text-black">Start</button>
                    <button className="flex-1 sm:px-8 py-2 bg-slate-800 rounded font-bold text-white">Stop</button>
                  </div>
                </div>
              </div>

              {/* PROGRESS */}
              <div className="bg-[#17181E] border border-slate-800 p-6 md:p-8 rounded-2xl">
                <p className="text-slate-500 text-xs font-bold uppercase mb-4">Progress Status</p>
                <div className="bg-slate-900 rounded-full h-3 w-full overflow-hidden">
                  <div className="h-full bg-green-600 transition-all duration-500" style={{ width: `${progress}%` }}></div>
                </div>
                <p className="mt-2 text-sm font-bold text-white">{progress}% Completed</p>
              </div>

              {/* DESCRIPTION */}
              <div className="bg-[#17181E] border border-slate-800 p-6 md:p-8 rounded-2xl">
                <div className="flex items-center gap-3 mb-4 text-[#F7A600]">
                  <FontAwesomeIcon icon={faLayerGroup} />
                  <span className="text-white font-bold text-xs uppercase">Description</span>
                </div>
                <p className="text-slate-400 leading-relaxed">{task.description}</p>
              </div>
            </div>

            {/* RIGHT SIDE */}
            <div className="lg:col-span-4 space-y-6">
              <div className="bg-[#17181E] border border-slate-800 p-6 rounded-2xl">
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-slate-400">
                    <FontAwesomeIcon icon={faCalendarCheck} />
                    <span className="text-xs font-bold uppercase">Metadata</span>
                  </div>
                  <p className="text-sm text-slate-300">Created: <span className="text-white">{formatDate(task.createdAt)}</span></p>
                  <p className="text-sm text-slate-300">Due: <span className="text-white">{formatDate(task.dueDate)}</span></p>
                  <div className="pt-4 border-t border-slate-800">
                    <span className="px-3 py-1 bg-[#F7A600]/10 text-[#F7A600] text-[10px] font-bold rounded-full uppercase">Status: {task.status}</span>
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