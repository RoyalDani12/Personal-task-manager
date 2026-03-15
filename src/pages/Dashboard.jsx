import React, { useState, useEffect } from "react";
import Sidebar from "../components/dashboardComponent/Sidebar";
import Header from "../components/dashboardComponent/Headers";
import TaskCard from "../components/dashboardComponent/TaskCard";
import getTask from "../api/getTask.api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faPlayCircle, faClock, faTasks, faPlus } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [userName, setUserName] = useState('');
  const [user, setUserData] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchTasks();
    const userDataString = localStorage.getItem("user");
    if (userDataString) {
      const userData = JSON.parse(userDataString);
      if (userData?.data.name) {
        setUserName(userData.data.name);
        setUserData(userData.data);
      }
    }
  }, []);

  const fetchTasks = async () => {
    const response = await getTask();
    setTasks(response?.data || []);
  };

  const completed = tasks.filter((task) => task.status === "completed").length;
  const active = tasks.filter((task) => task.status === "in-progress").length;
  const pending = tasks.filter((task) => task.status === "pending").length;

  return (
    // Changed bg to Bybit's deep obsidian
    <div className="bg-[#0E0F13] flex h-screen overflow-hidden text-[#EAECEF] font-sans">
      <Sidebar UserName={user.name} avatar={user.avatar} />

      <main className="flex-1 px-10 py-8 overflow-y-auto h-full scrollbar-hide">
        <Header UserName={userName} />

        <div className="flex justify-between items-end mt-12 mb-10">
          <div>
            <h1 className="text-3xl font-extrabold text-white tracking-tight">Task Managment Overview</h1>
            <p className="text-slate-500 text-sm mt-1">Real-time task tracking and performance metrics.</p>
          </div>
          
          {/* Action Button: Bybit Yellow Style */}
          <button
            onClick={() => navigate('/create-task')}
            className="bg-[#F7A600] hover:bg-[#ffb700] text-black px-8 py-3 rounded-lg flex items-center gap-3 font-bold transition-all active:scale-95 shadow-[0_8px_20px_rgba(247,166,0,0.15)]"
          >
            <FontAwesomeIcon icon={faPlus} className="text-sm" />
            ADD Task
          </button>
        </div>

        {/* Stats Grid: Minimalist, Trading-Platform Style */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            { label: "Filled", count: completed, icon: faCheckCircle, color: "text-[#00B464]", bg: "bg-[#00B464]/10" },
            { label: "Active", count: active, icon: faPlayCircle, color: "text-[#F7A600]", bg: "bg-[#F7A600]/10" },
            { label: "Pending", count: pending, icon: faClock, color: "text-[#848E9C]", bg: "bg-slate-800/20" },
            { label: "All Assets", count: tasks.length, icon: faTasks, color: "text-white", bg: "bg-slate-800/40" }
          ].map((stat, index) => (
            <div key={index} className="bg-[#17181E] border border-slate-800/60 rounded-xl p-5 flex flex-col transition-all hover:border-slate-700">
              <div className="flex justify-between items-start mb-4">
                <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">{stat.label}</p>
                <div className={`${stat.bg} p-2 rounded-lg`}>
                  <FontAwesomeIcon icon={stat.icon} className={`${stat.color} text-sm`} />
                </div>
              </div>
              <p className="text-3xl font-mono font-bold text-white tracking-tighter">
                {stat.count.toString().padStart(2, '0')}
              </p>
            </div>
          ))}
        </div>

        {/* Task Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12 mb-10">
          {tasks.length > 0 ? (
            tasks.map((task) => (
              <Link key={task._id} to={`/task-detail/${task._id}`} className="block h-full no-underline">
                <TaskCard item={task} />
              </Link>
            ))
          ) : (
            <div className="col-span-full py-32 text-center bg-[#17181E] rounded-2xl border border-dashed border-slate-800">
              <p className="text-slate-600 font-medium">No active positions found.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;