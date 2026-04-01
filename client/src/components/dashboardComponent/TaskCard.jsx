import React from "react";

const TaskCard = ({ item, onDelete }) => {
  return (
    <div className="bg-bg-[#2e56d0] backdrop-blur-md border border-slate-800 rounded-xl p-6 h-full flex flex-col transition-all duration-300 hover:border-[#F7A600]/40 hover:bg-[#2e56d0] hover:-translate-y-1.5 hover:shadow-[0_12px_30px_rgba(0,0,0,0.4)] group">
      
      {/* Header: Priority + Status */}
      <div className="flex justify-between items-center mb-5">
        <span className="text-[10px] font-black uppercase tracking-[0.1em] bg-[#F7A600]/10 text-[#F7A600] px-2.5 py-1 rounded-md border border-[#F7A600]/20 flex items-center gap-1.5">
          <div className="w-1.5 h-1.5 rounded-full bg-[#F7A600] animate-pulse"></div>
          {item.priority}
        </span>

        <span className="text-[11px] font-semibold text-slate-500 flex items-center gap-1.5 uppercase tracking-wide">
          <i className="fas fa-circle-check text-[#00B464]"></i> {/* Bybit Green */}
          {item.status}
        </span>
      </div>

      {/* Body: Title + Description */}
      <div className="flex-1">
        <h3 className="text-[#EAECEF] text-lg font-bold mb-2.5 flex items-center gap-2 group-hover:text-[#F7A600] transition-colors duration-300">
          {item.title}
        </h3>

        <p className="text-slate-400 text-sm leading-relaxed mb-6 line-clamp-2 font-normal">
          {item.description}
        </p>
      </div>

      {/* Footer: Actions */}
      <div className="flex justify-between items-center pt-4 border-t border-slate-800/80 mt-auto">
        <div className="text-[10px] text-slate-600 font-mono">
          REF_{item._id?.slice(-6).toUpperCase()}
        </div>
        
        <div className="flex gap-2.5">
          <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-slate-800/50 text-slate-400 hover:bg-[#F7A600]/10 hover:text-[#F7A600] transition-all border border-transparent hover:border-[#F7A600]/20">
            <i className="fas fa-pen text-[10px]"></i>
          </button>

          <button
            onClick={(e) => {
              e.preventDefault();
              onDelete(item._id);
            }}
            className="w-8 h-8 flex items-center justify-center rounded-lg bg-slate-800/50 text-slate-400 hover:bg-red-500/10 hover:text-red-500 transition-all border border-transparent hover:border-red-500/20"
          >
            <i className="fas fa-trash text-[10px]"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;