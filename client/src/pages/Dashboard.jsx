import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faPlayCircle,
  faClock,
  faTasks,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";

import Sidebar from "../components/dashboardComponent/Sidebar";
import Header from "../components/dashboardComponent/Headers";
import TaskCard from "../components/dashboardComponent/TaskCard";
import TaskDistributionChart from "../components/dashboardComponent/chart";
import getTask from "../api/getTask.api";
import { getFilteredTasks } from "../utils/filter.function";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [user, setUserData] = useState(null);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const navigate = useNavigate();

  //make the filter button functional
  const [priorityFilter, setPriorityFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [sortOrder, setSortOrder] = useState("latest"); // Default to newest

  const filteredTask = getFilteredTasks(
    tasks,
    priorityFilter,
    statusFilter,
    sortOrder,
  );

  useEffect(() => {
    fetchTasks();
    const userDataString = localStorage.getItem("user");
    if (userDataString && userDataString !== "undefined") {
      try {
        const userData = JSON.parse(userDataString);
        const foundUser = userData?.user || userData?.data || userData;
        if (foundUser) setUserData(foundUser);
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

  const completed = tasks.filter((t) => t.status === "completed").length;
  const active = tasks.filter((t) => t.status === "in-progress").length;
  const pending = tasks.filter((t) => t.status === "pending").length;

  if (!user) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center text-gray-700 font-bold">
        Initializing System...
      </div>
    );
  }

  return (
    <div className="bg-[#F8FAFC] flex min-h-screen overflow-hidden text-gray-900 font-sans">
      <Sidebar
        UserName={user.name}
        avatar={user.avatar}
        onCollapse={setIsSidebarCollapsed}
      />

      <main
        className={`flex-1 transition-all duration-300 overflow-y-auto h-screen ${isSidebarCollapsed ? "lg:pl-20" : "lg:pl-64"} pl-0`}
      >
        <Header UserName={user.name} />

        <div className="px-4 md:px-10 py-8">
          {/* TOP BAR */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mt-12 mb-10 gap-6">
            <div>
              <h1 className="text-3xl font-extrabold text-gray-900">
                Dashboard Overview
              </h1>
              <p className="text-gray-500 text-sm mt-1">
                Real-time task synchronization active.
              </p>
            </div>
            <button
              onClick={() => navigate("/create-task")}
              className="bg-black hover:bg-gray-800 text-white px-6 py-3 rounded-xl flex items-center gap-2 font-semibold shadow-md transition-all"
            >
              <FontAwesomeIcon icon={faPlus} /> New Task
            </button>
          </div>

          {/* CHART SECTION */}
          <div className="mb-10 bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
            <TaskDistributionChart
              completed={completed}
              active={active}
              pending={pending}
            />
          </div>

          {/* STAT CARDS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                label: "Completed",
                count: completed,
                icon: faCheckCircle,
                color: "text-green-600",
                bg: "bg-green-100",
              },
              {
                label: "Active",
                count: active,
                icon: faPlayCircle,
                color: "text-indigo-600",
                bg: "bg-indigo-100",
              },
              {
                label: "Pending",
                count: pending,
                icon: faClock,
                color: "text-yellow-600",
                bg: "bg-yellow-100",
              },
              {
                label: "Total",
                count: tasks.length,
                icon: faTasks,
                color: "text-gray-800",
                bg: "bg-gray-200",
              },
            ].map((stat, i) => (
              <div
                key={i}
                className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition"
              >
                <div className="flex justify-between items-center mb-4">
                  <p className="text-xs font-black text-gray-400 uppercase tracking-widest">
                    {stat.label}
                  </p>
                  <div className={`${stat.bg} p-2 rounded-lg`}>
                    <FontAwesomeIcon icon={stat.icon} className={stat.color} />
                  </div>
                </div>
                <p className="text-3xl font-black text-gray-900">
                  {stat.count.toString().padStart(2, "0")}
                </p>
              </div>
            ))}
          </div>
          {/* FILTER BAR - Polished Version */}
          <div className="mt-8   p-4 flex flex-col lg:flex-row items-center justify-between gap-4 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="bg-gray-100 p-2 rounded-lg text-gray-500">
                <FontAwesomeIcon icon={faTasks} className="text-sm" />
              </div>
              <h3 className="text-sm font-black uppercase tracking-tight text-gray-700">
                Filter Tasks
              </h3>
            </div>

            <div className="flex flex-wrap justify-center gap-3 w-full lg:w-auto">
              {/* Priority Filter */}
              <div className="relative">
                <select
                  value={priorityFilter}
                  onChange={(e) => setPriorityFilter(e.target.value)}
                  className=" bg-gray-50 border border-gray-200 text-gray-700 text-xs font-bold py-2 px-4 pr-8 rounded-xl focus:outline-none focus:ring-2 focus:ring-black/5 cursor-pointer hover:bg-gray-100 transition-all"
                >
                  <option value="">Priority: All</option>
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </select>
              </div>

              {/* Date Filter */}
              <div className="relative">
                <select
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value)}
                  className=" bg-gray-50 border border-gray-200 text-gray-700 text-xs font-bold py-2 px-4 pr-8 rounded-xl focus:outline-none focus:ring-2 focus:ring-black/5 cursor-pointer hover:bg-gray-100 transition-all"
                >
                  <option value="">Sort: Latest First</option>
                  <option value="oldest">Sort: Oldest First</option>
                </select>
              </div>

              {/* Status Filter */}
              <div className="relative">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className=" bg-gray-50 border border-gray-200 text-gray-700 text-xs font-bold py-2 px-4 pr-8 rounded-xl focus:outline-none focus:ring-2 focus:ring-black/5 cursor-pointer hover:bg-gray-100 transition-all"
                >
                  <option value="">Status: All</option>
                  <option value="completed">Completed</option>
                  <option value="pending">Pending</option>
                  <option value="in-progress">In Progress</option>
                </select>
              </div>

              <button className="bg-rose-500 text-white text-[10px] font-black uppercase px-4 py-2 rounded-xl hover:bg-black transition-all active:scale-95">
                Reset
              </button>
            </div>
          </div>

          {/* TASK GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 mt-12 mb-10">
            {filteredTask.length > 0 ? (
              filteredTask.map((task) => (
                <TaskCard
                  key={task._id}
                  item={task}
                  onAddNote={() => navigate(`/add-note/${task._id}`)}
                />
              ))
            ) : (
              <div className="col-span-full py-20 text-center bg-white rounded-2xl border border-dashed border-gray-300 text-gray-400">
                No active tasks found in the database.
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
