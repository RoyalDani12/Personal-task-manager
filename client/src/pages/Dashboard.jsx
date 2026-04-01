import React, { useState, useEffect } from "react";
import Sidebar from "../components/dashboardComponent/Sidebar";
import Header from "../components/dashboardComponent/Headers";
import TaskCard from "../components/dashboardComponent/TaskCard";
import getTask from "../api/getTask.api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faPlayCircle, faClock, faTasks, faPlus } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import TaskDistributionChart from "../components/dashboardComponent/chart";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [user, setUserData] = useState(null); // Initialize as null to handle loading
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchTasks();
    const userDataString = localStorage.getItem("user");
    if (userDataString && userDataString !== "undefined") {
      try {
        const userData = JSON.parse(userDataString);
        // Look for user data in both common formats
        const foundUser = userData?.user || userData?.data || userData;
        if (foundUser) {
          setUserData(foundUser);
        }
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    }
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await getTask();
      setTasks(response?.data || []);
    } catch (error) {
      console.error("Failed to fetch tasks:", error);
    }
  };

  const completed = tasks.filter((task) => task.status === "completed").length;
  const active = tasks.filter((task) => task.status === "in-progress").length;
  const pending = tasks.filter((task) => task.status === "pending").length;

  // Prevent "Cannot read properties of undefined" by checking if user exists
  if (!user) {
    return <div className="min-h-screen bg-[#0E0F13] flex items-center justify-center text-indigo-500">Loading...</div>;
  }

  return (
    <div className="bg-[#0E0F13] flex min-h-screen overflow-hidden text-indigo-500 font-sans">
      
      <Sidebar 
        UserName={user.name} 
        avatar={user.avatar} 
        onCollapse={setIsSidebarCollapsed} 
      />

      <main className={`flex-1 transition-all duration-300 overflow-y-auto h-screen scrollbar-hide
        ${isSidebarCollapsed ? "lg:pl-20" : "lg:pl-64"} pl-0`}>
        
        <Header UserName={user.name} />

        <div className="px-4 md:px-10 py-8">
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mt-12 md:mt-8 mb-10 gap-6">
            <div className="w-full">
              <h1 className="text-2xl md:text-3xl font-extrabold text-indigo-600">
                Task Management Overview
              </h1>
              <p className="text-slate-500 text-sm mt-1">
                Real-time task tracking and performance metrics.
              </p>
            </div>
            
            <button
              onClick={() => navigate('/create-task')}
              className="w-full md:w-auto bg-indigo-600 hover:bg-green-500 text-white px-8 py-3 rounded-lg flex items-center justify-center gap-3 font-bold transition-all active:scale-95 shadow-lg whitespace-nowrap"
            >
              <FontAwesomeIcon icon={faPlus} className="text-sm" />
              Add Task
            </button>
          </div>

          {/* Chart - Container must have height for Recharts */}
          <div className="mb-10 bg-[#17181E] border border-slate-800/60 rounded-2xl p-4 md:p-6 animation-float">
            <div style={{ width: '100%', height: '300px' }}>
              <TaskDistributionChart 
                completed={completed} 
                active={active} 
                pending={pending} 
              />
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
            {[
              { label: "Completed", count: completed, icon: faCheckCircle, color: "text-[#00B464]", bg: "bg-[#00B464]/10" },
              { label: "Active", count: active, icon: faPlayCircle, color: "text-indigo-500", bg: "bg-indigo-500/10" },
              { label: "Pending", count: pending, icon: faClock, color: "text-slate-400", bg: "bg-slate-800/20" },
              { label: "Total Tasks", count: tasks.length, icon: faTasks, color: "text-indigo-500", bg: "bg-indigo-500/10" }
            ].map((stat, index) => (
              <div key={index} className="bg-[#17181E] border border-slate-800/60 rounded-xl p-5 flex flex-col transition-all hover:border-slate-700">
                <div className="flex justify-between items-start mb-4">
                  <p className="text-slate-500 text-[10px] md:text-xs font-bold uppercase tracking-wider">
                    {stat.label}
                  </p>
                  <div className={`${stat.bg} p-2 rounded-lg`}>
                    <FontAwesomeIcon icon={stat.icon} className={`${stat.color} text-xs md:text-sm`} />
                  </div>
                </div>
                <p className="text-2xl md:text-3xl font-mono font-bold text-indigo-500">
                  {stat.count.toString().padStart(2, '0')}
                </p>
              </div>
            ))}
          </div>

          {/* Tasks Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 mt-12 mb-10 ">
            {tasks.length > 0 ? (
              tasks.map((task) => (
                <Link key={task._id} to={`/task-detail/${task._id}`} className="block h-full no-underline transition-transform hover:-translate-y-1 ">
                  <TaskCard item={task} />
                </Link>
              ))
            ) : (
              <div className="col-span-full py-20 text-center bg-[#17181E] rounded-2xl border border-dashed border-slate-800">
                <p className="text-slate-500 font-medium">
                  No active tasks found.
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;