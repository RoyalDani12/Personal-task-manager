import React, { useState, useEffect } from "react";
import Sidebar from "../components/dashboardComponent/Sidebar";
import Header from "../components/dashboardComponent/Headers";
import TaskCard from "../components/dashboardComponent/TaskCard";
import getTask from "../api/getTask.api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faPlayCircle, faClock, faTasks, faPlus } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [userName, setUserName] = useState('');
  const navigate = useNavigate()

  useEffect(() => {
    fetchTasks();
    const userDataString = localStorage.getItem("user");
    if (userDataString) {
      const userData = JSON.parse(userDataString);
      if (userData?.data.name) setUserName(userData.data.name);
    }
  }, []);

  const fetchTasks = async () => {
    const response = await getTask();
    setTasks(response?.data || []);
  };

  const handleDelete = async (id) => {

    console.log("Deleting task:", id);
  };



  const completed = tasks.filter((task) => task.status === "Completed").length;
  const active = tasks.filter((task) => task.status === "Active").length;
  const pending = tasks.filter((task) => task.status === "Pending").length;

  return (
    <div className=" bg-[#0f172a] flex h-screen overflow-hidden text-slate-200 font-sans">
      <Sidebar UserName={userName} />

      <main className="flex-1 p-8 overflow-y-auto overflow-hidden h-full">
        <Header UserName={userName} />

        <div className="flex justify-between items-center mt-10 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-white">Project Dashboard</h1>
            <p className="text-slate-400 text-sm">Manage your team and track progress.</p>
          </div>
          <button
            onClick={()=> navigate('/create-task')}
            className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3 rounded-xl flex items-center gap-2 font-semibold shadow-lg shadow-indigo-500/20 transition-all active:scale-95"
          >
            <FontAwesomeIcon icon={faPlus} />
            Add Task
          </button>
        </div>

        {/* Task Summary Cards - Updated for consistency */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { label: "Completed", count: completed, icon: faCheckCircle, color: "text-green-400", bg: "bg-green-400/10", shadow: "hover:shadow-green-500/10" },
            { label: "Active", count: active, icon: faPlayCircle, color: "text-blue-400", bg: "bg-blue-400/10", shadow: "hover:shadow-blue-500/10" },
            { label: "Pending", count: pending, icon: faClock, color: "text-yellow-400", bg: "bg-yellow-400/10", shadow: "hover:shadow-yellow-500/10" },
            { label: "Total Tasks", count: tasks.length, icon: faTasks, color: "text-indigo-400", bg: "bg-indigo-400/10", shadow: "hover:shadow-indigo-500/10" }
          ].map((stat, index) => (
            <div key={index} className={`bg-slate-800/40 border border-slate-700/50 rounded-2xl p-3 flex flex-col items-center transition-all duration-300 hover:bg-slate-800/60 shadow-xl ${stat.shadow}`}>
              <div className={`${stat.bg}  rounded-2xl mb-3`}>
                <FontAwesomeIcon icon={stat.icon} className={`${stat.color} text-2xl`} />
              </div>
              <p className="text-3xl font-bold text-white tracking-tight">{stat.count}</p>
              <p className="text-slate-400 text-sm font-medium uppercase tracking-wider mt-1">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Task Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {tasks.length > 0 ? (
            tasks.map((task) => (
              <Link key={task._id} to={'/task-detail'} className="block h-full">
                <TaskCard item={task} onDelete={handleDelete} />
              </Link>
            ))
          ) : (
            <div className="col-span-full py-20 text-center bg-slate-800/20 rounded-3xl border border-dashed border-slate-700">
              <p className="text-slate-500 text-lg">No tasks to show.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;