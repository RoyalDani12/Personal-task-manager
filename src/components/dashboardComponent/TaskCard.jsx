import React from "react";

const TaskCard = ({ item, onDelete }) => {
  return (
    <div className="bg-slate-800/40 border border-slate-700/50 rounded-2xl p-6 h-full flex flex-col transition-all duration-300 hover:border-indigo-500/50 hover:bg-slate-800 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(0,0,0,0.3)] group">
      
      {/* Header: Priority + Status */}
      <div className="flex justify-between items-center mb-6">
        <span className="text-[10px] font-bold uppercase tracking-widest bg-indigo-500/10 text-indigo-400 px-3 py-1 rounded-lg border border-indigo-500/20 flex items-center gap-2">
          <i className="fas fa-flag text-[8px]"></i>
          {item.priority}
        </span>

        <span className="text-[11px] font-medium text-slate-500 flex items-center gap-1.5 uppercase tracking-tighter">
          <i className="fas fa-circle-check text-green-500/70"></i>
          {item.status}
        </span>
      </div>

      {/* Body: Title + Description */}
      <div className="flex-1">
        <h3 className="text-white text-lg font-bold mb-3 flex items-center gap-3 group-hover:text-indigo-400 transition-colors">
          <i className="fas fa-note-sticky text-indigo-500/50 text-base"></i>
          {item.title}
        </h3>

        <p className="text-slate-400 text-sm leading-relaxed mb-6 line-clamp-3 italic font-light">
          {item.description}
        </p>
      </div>

      {/* Footer: Actions */}
      <div className="flex justify-end gap-3 pt-5 border-t border-slate-700/50 mt-auto">
        <button className="w-9 h-9 flex items-center justify-center rounded-xl bg-slate-700/30 text-slate-400 hover:bg-indigo-500/20 hover:text-indigo-400 transition-all">
          <i className="fas fa-pen text-xs"></i>
        </button>

        <button
          onClick={(e) => {
            e.preventDefault();
            onDelete(item._id);
          }}
          className="w-9 h-9 flex items-center justify-center rounded-xl bg-slate-700/30 text-slate-400 hover:bg-red-500/20 hover:text-red-400 transition-all"
        >
          <i className="fas fa-trash text-xs"></i>
        </button>
      </div>
    </div>
  );
};

export default TaskCard;