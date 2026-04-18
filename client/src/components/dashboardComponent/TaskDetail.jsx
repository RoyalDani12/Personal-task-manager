import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUpload,
  faTrash,
  faCalendarCheck,
  faLayerGroup,
  faHourglassHalf,
} from "@fortawesome/free-solid-svg-icons";

// API & Components
import getTaskDetailApi from "../../api/task.Detail.Api";
import deleteTask from "../../api/delete.task.Api";
import Footer from "../Footer";
import Sidebar from "./Sidebar";
import { formatDate, calculateTimeLeft } from "../../utils/time.utils";
import { startTaskApi } from "../../api/start.task.api";
import { stopTaskApi } from "../../api/stop.task.api";
import { useSocket } from "../../context/Socket.Context";
import { toast } from "react-toastify";

// connect to the backend
// const socket = io("http://localhost:5000", { withCredentials: true });
const TaskDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [timeLeft, setTimeLeft] = useState("");
  const [progress, setProgress] = useState(0);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  // socket io
  const socket = useSocket()

  useEffect(() => {
    if (!socket || !id) return;

    const eventName = `task_finished:${id}`;
    socket.on(eventName, (updateTask) => {
      console.log("server signal : Task auto-complete");
      setTask(updateTask);
      toast.success("Task completed Automatically")
    }); 
       //  global notification
       socket.on("notification",(data)=>{
             if(data.type === "EXPIRED"){
              toast.error(data.message)
             }
       })
    return () => {
      socket.off(eventName);
      socket.off("notification")
    };
  }, [socket,id]);

  const strokeDasharray = 565.48;
  const strokeDashoffset = strokeDasharray - (progress / 100) * strokeDasharray;

  // --- 1. PROGRESS CALCULATION LOGIC ---
  const calculateLiveProgress = (currentTask) => {
    if (!currentTask || !currentTask.required_time) return 0;

    const totalRequiredMs = Number(currentTask.required_time) * 60 * 1000;
    let totalWorkedMs = Number(currentTask.totalWorkedTime) || 0;

    if (currentTask.isRunning && currentTask.sessions?.length > 0) {
      const lastSession = currentTask.sessions[currentTask.sessions.length - 1];
      if (lastSession.startTime && !lastSession.endTime) {
        const liveSessionDuration =
          new Date().getTime() - new Date(lastSession.startTime).getTime();
        totalWorkedMs += liveSessionDuration;
      }
    }

    let percent = (totalWorkedMs / totalRequiredMs) * 100;
    return Math.min(Math.max(percent, 0), 100).toFixed(4);
  };

  // --- 2. LIVE STATUS LOGIC ---
  const isExpired =
    task && new Date() > new Date(task.dueDate) && task.status !== "completed";

  const getStatusDisplay = () => {
    if (!task) return { text: "UNKNOWN", color: "text-gray-400 bg-gray-50" };
    if (task.status === "completed")
      return {
        text: "COMPLETED",
        color: "text-green-600 bg-green-50 border-green-200",
      };
    if (isExpired)
      return {
        text: "EXPIRED",
        color: "text-red-600 bg-red-50 border-red-200",
      };
    return {
      text: task.status.toUpperCase(),
      color: "text-blue-600 bg-blue-50 border-blue-200",
    };
  };

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
      setProgress(calculateLiveProgress(task));
    };
    updateUI();
    const timer = setInterval(updateUI, 1000);
    return () => clearInterval(timer);
  }, [task]);

  const handleDelete = async (taskId) => {
    if (!window.confirm("Permanent deletion requested. Proceed?")) return;
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
      }
    } catch {
      alert("Failed to initiate session.");
    }
  };

  const handleStop = async () => {
    try {
      const result = await stopTaskApi(task._id);
      if (result.data && result.data.success) {
        setTask(result.data.response);
      }
    } catch {
      alert("Failed to close session.");
    }
  };

  if (loading)
    return (
      <div className="h-screen bg-white flex items-center justify-center font-mono">
        {" "}
        <span className="animate-spin border-2 border-black border-t-transparent p-10 "></span>
        LOADING_SYSTEM...
      </div>
    );
  if (!task)
    return (
      <div className="h-screen bg-white flex items-center justify-center">
        Task Not Found
      </div>
    );

  const statusUI = getStatusDisplay();

  return (
    <div className="min-h-screen bg-white text-black font-sans flex">
      <Sidebar onCollapse={setIsSidebarCollapsed} />

      <div
        className={`flex-1 transition-all duration-300 flex flex-col min-h-screen w-full
        ${isSidebarCollapsed ? "lg:pl-20" : "lg:pl-64"} pl-0`}
      >
        <nav className="border-b border-gray-200 bg-white px-4 md:px-8 py-6 sticky top-0 z-50 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="mt-12 md:mt-0 ml-15 md:ml-0">
            <h1 className="text-xl md:text-2xl font-black text-black truncate capitalize">
              {task.title}
            </h1>
            <p className="text-[10px] text-gray-400 font-mono">
              ID: {task._id}
            </p>
          </div>

          <div className="flex gap-2 w-full md:w-auto">
            <button
              onClick={() => navigate(`/update/${task._id}`)}
              className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-2 rounded-xl bg-gray-50 text-gray-600 border border-gray-200 hover:text-black text-xs font-black uppercase"
            >
              <FontAwesomeIcon icon={faUpload} /> Modify
            </button>
            <button
              onClick={() => handleDelete(task._id)}
              className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-2 rounded-xl bg-red-600 text-white text-xs font-black uppercase"
            >
              <FontAwesomeIcon icon={faTrash} /> Delete
            </button>
          </div>
        </nav>

        <main className="max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-12 grow w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-10">
            <div className="lg:col-span-8 space-y-8">
              {/* Summary Card */}
              <div className="bg-white border border-gray-200 p-6 md:p-8 rounded-2xl shadow-sm">
                <div className="flex gap-6">
                  <div
                    className={`w-14 h-14 rounded-xl flex items-center justify-center ${task.isRunning ? "bg-black text-white animate-pulse" : "bg-gray-100 text-black"}`}
                  >
                    <FontAwesomeIcon
                      icon={faHourglassHalf}
                      className="text-2xl"
                    />
                  </div>
                  <div>
                    <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest">
                      Time Remaining
                    </p>
                    <p
                      className={`text-2xl md:text-3xl font-mono font-black ${timeLeft === "EXPIRED" || isExpired ? "text-red-500" : "text-green-500"}`}
                    >
                      {task.status === "completed"
                        ? "Mission Accomplished"
                        : isExpired
                          ? "EXPIRED"
                          : timeLeft}
                    </p>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-gray-200 flex flex-wrap gap-4 justify-between items-center">
                  <div>
                    <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest">
                      Priority Level
                    </p>
                    <p className="text-black font-black uppercase text-sm">
                      {task.priority}
                    </p>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={handleStart}
                      disabled={
                        task.isRunning ||
                        task.status === "completed" ||
                        isExpired
                      }
                      className={`px-8 py-3 rounded-lg font-black text-[10px] uppercase tracking-widest transition-all ${
                        task.isRunning ||
                        task.status === "completed" ||
                        isExpired
                          ? "bg-gray-100 text-gray-300 cursor-not-allowed"
                          : "bg-black text-white hover:bg-gray-800 shadow-lg shadow-gray-200"
                      }`}
                    >
                      {task.status === "completed"
                        ? "Task Finished"
                        : "Start Session"}
                    </button>
                    <button
                      onClick={handleStop}
                      disabled={!task.isRunning}
                      className={`px-8 py-3 rounded-lg font-black text-[10px] uppercase tracking-widest border transition-all ${
                        !task.isRunning
                          ? "bg-white text-gray-200 border-gray-100 cursor-not-allowed"
                          : "bg-white text-black border-black hover:bg-gray-50"
                      }`}
                    >
                      Stop Session
                    </button>
                  </div>
                </div>
              </div>

              {/* Progress Circle Card */}
              <div className="bg-white border border-gray-200 p-8 rounded-2xl flex flex-col items-center shadow-sm">
                <div className="w-full flex justify-between mb-8">
                  <div>
                    <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest">
                      Efficiency Tracking
                    </p>
                    <p className="text-[11px] text-gray-500 font-mono font-bold mt-1">
                      {Math.floor((task.totalWorkedTime || 0) / 60000)} /{" "}
                      {task.required_time} MINS USED
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-black font-mono text-2xl font-black">
                      {Math.floor(progress)}%
                    </span>
                  </div>
                </div>

                <div className="relative flex items-center justify-center w-48 h-48 md:w-64 md:h-64">
                  <svg
                    viewBox="0 0 224 224"
                    className="w-full h-full transform -rotate-90"
                  >
                    <circle
                      cx="112"
                      cy="112"
                      r="90"
                      stroke="#F3F4F6"
                      strokeWidth="15"
                      fill="transparent"
                    />
                    <circle
                      cx="112"
                      cy="112"
                      r="90"
                      stroke={task.status === "completed" ? "#22C55E" : "black"}
                      strokeWidth="12"
                      fill="transparent"
                      strokeDasharray={strokeDasharray}
                      strokeDashoffset={strokeDashoffset}
                      strokeLinecap="round"
                      className="transition-all duration-700 ease-in-out"
                    />
                  </svg>

                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <h2
                      className={`text-4xl md:text-5xl font-black tracking-tighter ${task.status === "completed" ? "text-green-500" : "text-black"}`}
                    >
                      {Math.floor(progress)}%
                    </h2>
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-1">
                      Completion
                    </p>
                  </div>
                </div>
              </div>

              {/* Description Card */}
              <div className="bg-white border border-gray-200 p-6 md:p-8 rounded-2xl shadow-sm">
                <div className="flex items-center gap-3 mb-6 text-black border-b border-gray-100 pb-4">
                  <FontAwesomeIcon
                    icon={faLayerGroup}
                    className="text-gray-400 text-xs"
                  />
                  <span className="font-black text-[10px] uppercase tracking-widest">
                    Description & Goals
                  </span>
                </div>
                <p className="text-gray-600 leading-relaxed text-sm">
                  {task.description}
                </p>
              </div>
            </div>

            {/* Sidebar Metadata */}
            <div className="lg:col-span-4 space-y-6">
              <div className="bg-white border border-gray-200 p-6 rounded-2xl shadow-sm">
                <div className="space-y-6">
                  <div className="flex items-center gap-3 text-gray-400">
                    <FontAwesomeIcon
                      icon={faCalendarCheck}
                      className="text-xs"
                    />
                    <span className="text-[10px] font-black uppercase tracking-widest">
                      Metadata Logs
                    </span>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <p className="text-[10px] font-black text-gray-400 uppercase mb-1">
                        Created On
                      </p>
                      <p className="text-sm font-bold text-black font-mono">
                        {formatDate(task.createdAt)}
                      </p>
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-gray-400 uppercase mb-1">
                        Due Deadline
                      </p>
                      <p className="text-sm font-bold text-black font-mono">
                        {formatDate(task.dueDate)}
                      </p>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-gray-100">
                    <p className="text-[10px] font-black text-gray-400 uppercase mb-3">
                      System Status
                    </p>
                    <div
                      className={`inline-flex px-4 py-2 border rounded-xl text-[10px] font-black uppercase tracking-tighter ${statusUI.color}`}
                    >
                      {statusUI.text}
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 border border-gray-100 p-6 rounded-2xl">
                <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-2">
                  Technical Reference
                </p>
                <p className="text-[10px] font-mono text-gray-400 break-all select-all">
                  {task._id}
                </p>
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
