import React, { useEffect,useState } from "react";
import { useNavigate } from "react-router-dom";
import { calculateProgress } from "../../utils/progress.utils";

const TaskCard = ({ item, onAddNote }) => {
    const [progress, setProgress] = useState(0);
  const navigate = useNavigate();

  useEffect(()=>{
    if(!item) return
    const updateUI=()=>{
      setProgress(calculateProgress(item))
    }
    updateUI()

    const timer = setInterval(()=>{
      updateUI()
    },1000)

    return ()=>clearInterval(timer)
  },[item])

  const priorityColors = {
    high: "bg-red-100 text-red-600 border-red-300 ",
    medium: "bg-yellow-100 text-yellow-600 border-yellow-300",
    low: "bg-green-100 text-green-600 border-green-300",
  };

  // Helper to determine status icon
  const getStatusIcon = (status) => {
    switch (status?.toLowerCase()) {
      case "completed":
        return "fa-circle-check";
      case "in-progress":
        return "fa-spinner fa-spin";
      default:
        return "fa-clock";
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-2xl h-full flex flex-col transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:border-green-300 group overflow-hidden border-l-green-400 border-l-4">
      {/* Clickable Area for Details */}
      <div
        onClick={() => navigate(`/task-detail/${item._id}`)}
        className="p-6 flex-1 cursor-pointer"
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-5">
          <span
            className={`text-[12px] font-bold px-2.5 py-1 rounded-md flex items-center gap-1.5 border ${priorityColors[item.priority] || "bg-gray-100 text-gray-600 border-gray-300"}`}
          >
            <div className="w-1.5 h-1.5 rounded-full bg-current animate-pulse"></div>
            {item.priority}
          </span>

          <span className={`text-[12px] px-2 py-1 rounded font-semibold  flex items-center gap-1.5 border ${item.status == "completed" 
            ? "border-green-300 bg-green-200 text-green-500"
            : " border-orange-200 text-orange-700 bg-orange-50"
            }`}>
            <i className={`fas ${getStatusIcon(item.status)}`}></i>
            {item.status}
          </span>
        </div>

        {/* Body */}
        <div>
          <h3 className="text-black text-lg font-bold mb-2.5 group-hover:text-indigo-600 transition-colors duration-300">
            {item.title}
          </h3>
          <p className="text-gray-500 text-sm leading-relaxed line-clamp-2">
            {item.description}
          </p>
        </div>
      </div>

      {/* Footer - The Missing Piece */}
      <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-between items-center">
        <span className="text-[10px] font-mono text-gray-400">
          ID: {item._id?.slice(-6).toUpperCase()}
        </span>

        <button
          onClick={(e) => {
            e.stopPropagation(); // Prevents triggering the parent div's navigate
            onAddNote();
          }}
          className="bg-green-500 hover:bg-green-600 text-white text-xs font-black py-2 px-4 rounded-xl transition-all shadow-sm active:scale-95"
        >
          Add Note
        </button>
      </div>
               {/* 2. CUSTOM PROGRESS BAR */}
        <div className="space-y-2 mb-2 flex flex-col items-center">
          <div className="flex gap-2 items-center">
            <span className="text-[12px] font-black text-rose-400  ml-2">Progress</span>
            <span className="text-[10px] font-bold text-green-500">{progress}%</span>
          </div>
          <div className="w-70 h-2  bg-gray-100 rounded-full overflow-hidden">
            <div 
              className="h-full bg-green-500 rounded-full transition-all duration-1000 ease-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
    </div>
  );
};

export default TaskCard;
