import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import getTaskDetailApi from "../../api/task.Detail.Api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload, faTrash, faBackward, faCalendarCheck, faSignal, faLayerGroup } from "@fortawesome/free-solid-svg-icons";
import deleteTask from "../../api/delete.task.Api";
import Footer from "../Footer";

const TaskDetail = () => {
  const navigate = useNavigate();
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
      <div className="flex justify-center items-center h-screen bg-[#0E0F13] text-white">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-[#F7A600]"></div>
      </div>
    );
  }

  if (!task) {
    return (
      <div className="text-white p-10 bg-[#0E0F13] h-screen flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold mb-4">Task record not found</h1>
        <button onClick={() => navigate('/dashboard')} className="text-[#F7A600] uppercase text-xs font-bold tracking-widest">Return to Dashboard</button>
      </div>
    );
  }

  const formatDate = (date) => {
    if (!date) return "Not set";
    return new Date(date).toLocaleDateString("en-US", {
      month: "short", day: "numeric", year: "numeric"
    });
  };

  const handleDelete = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete this task?");
    if (!confirm) return;
    try {
      await deleteTask(id);
      navigate("/dashboard");
    } catch (error) {
      alert(error.message || "Failed to delete the task");
    }
  };

  return (
    <div className="min-h-screen bg-[#0E0F13] text-[#EAECEF] font-sans selection:bg-[#F7A600]/30">
      
      {/* HEADER: Minimal & Professional */}
      <div className="border-b border-slate-800/60 bg-[#17181E]/50 backdrop-blur-md px-8 py-6 sticky top-0 z-10 flex justify-between items-center">
        <div className="flex flex-col">
          <span className="text-[10px] font-mono text-slate-500 uppercase tracking-[0.2em] mb-1">
            Task ID: {task._id.slice(-8).toUpperCase()}
          </span>
          <h1 className="text-2xl font-black text-white tracking-tight">
            {task.title}
          </h1>
        </div>

        <div className="flex gap-3">
          <button 
            onClick={() => navigate(`/update/${task._id}`)} 
            className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#F7A600] text-black hover:bg-[#ffb700] transition-all font-bold text-sm shadow-lg shadow-[#F7A600]/10"
          >
            <FontAwesomeIcon icon={faUpload} className="text-xs"/>
            Update
          </button>
          <button 
            onClick={() => handleDelete(task._id)} 
            className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-red-500/10 text-red-500 border border-red-500/20 hover:bg-red-500 hover:text-white transition-all font-bold text-sm"
          >
            <FontAwesomeIcon icon={faTrash} className="text-xs"/>
            Delete
          </button>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* LEFT: PRIMARY CONTENT (8 cols) */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* META STRIP */}
            <div className="flex gap-4">
               <div className="bg-[#17181E] border border-slate-800 px-4 py-2 rounded-lg flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]"></div>
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-300">{task.status}</span>
               </div>
               <div className="bg-[#17181E] border border-slate-800 px-4 py-2 rounded-lg flex items-center gap-3">
                  <FontAwesomeIcon icon={faSignal} className="text-[#F7A600] text-[10px]" />
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-300">Level: {task.priority}</span>
               </div>
            </div>

            {/* DESCRIPTION BOX */}
            <div className="bg-[#17181E] border border-slate-800 rounded-2xl p-8 relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-1 h-full bg-[#F7A600] opacity-50 group-hover:opacity-100 transition-opacity"></div>
              <div className="flex items-center gap-3 mb-6 text-slate-500">
                <FontAwesomeIcon icon={faLayerGroup} className="text-xs" />
                <h3 className="text-xs font-black uppercase tracking-[0.2em]">Context & Description</h3>
              </div>
              <p className="text-slate-300 leading-relaxed text-[16px] whitespace-pre-line">
                {task.description || "No specific details provided for this entry."}
              </p>
            </div>

            {/* BACK ACTION */}
            <button 
              onClick={() => navigate('/dashboard')} 
              className="flex items-center gap-2 text-slate-500 hover:text-[#F7A600] transition-colors text-xs font-bold uppercase tracking-widest pt-4"
            >
              <FontAwesomeIcon icon={faBackward}/>
              Back to Dashboard
            </button>
          </div>

          {/* RIGHT: DATA SIDEBAR (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* INTEGRATED TASK INFO CARD */}
            <div className="bg-[#17181E] border border-slate-800 rounded-2xl p-6 shadow-xl">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-800/50">
                <FontAwesomeIcon icon={faCalendarCheck} className="text-[#F7A600]" />
                <h4 className="text-xs font-black text-white uppercase tracking-widest">Schedule Details</h4>
              </div>

              <div className="space-y-5">
                <div className="flex justify-between items-center">
                  <span className="text-[11px] text-slate-500 font-bold uppercase">Entry Date</span>
                  <span className="text-sm font-mono text-slate-200">{formatDate(task.createdAt)}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-[11px] text-slate-500 font-bold uppercase text-rose-500/80">Deadline</span>
                  <span className="text-sm font-mono text-rose-400 font-bold">{formatDate(task.dueDate)}</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-[11px] text-slate-500 font-bold uppercase">Complexity</span>
                  <span className="text-[10px] bg-purple-500/10 text-purple-400 px-2 py-0.5 rounded border border-purple-500/20 font-bold">
                    {task.difficulityLevel}
                  </span>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-800/50 flex justify-between items-center">
                  <span className="text-[11px] text-slate-500 font-bold uppercase tracking-tighter">Availability</span>
                  <span className={`text-[10px] font-black ${task.isActive ? 'text-[#00B464]' : 'text-slate-600'}`}>
                    {task.isActive ? "● ONLINE / ACTIVE" : "○ ARCHIVED"}
                  </span>
                </div>
              </div>
            </div>

            {/* PERSONAL NOTE TIP */}
            <div className="p-5 border border-dashed border-slate-800 rounded-2xl opacity-60">
               <p className="text-[10px] text-slate-500 leading-relaxed italic">
                 This is a private task entry. Data is stored locally and synced to your personal cloud instance.
               </p>
            </div>

          </div>
        </div>
      </main>
      <Footer/>
    </div>
  );
};

export default TaskDetail;