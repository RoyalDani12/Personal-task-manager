import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGear,
  faTasks,
  faGauge,
  faFolder,
  faFlag,
  faUser,
  faBars,
  faNoteSticky,
  faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const menuItems = [
  { icon: faGauge, label: "Dashboard" },
  { icon: faTasks, label: "My Tasks" },
  { icon: faFolder, label: "Categories" },
  { icon: faFlag, label: "Priorities" },
  { icon: faNoteSticky, label: "Notes" },
  { icon: faGear, label: "Settings" }
];

const Sidebar = ({ UserName, avatar }) => {
  const navigate = useNavigate();
  // State to manage collapse
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className={`
      h-screen
      ${isCollapsed ? "w-20" : "w-64"} 
      bg-[#0E0F13] 
      border-r border-slate-800/60 
      flex flex-col justify-between
      transition-all duration-300 ease-in-out
      relative
    `}>
      
      {/* Toggle Button - Floating Style */}
      <button 
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3 top-10 w-6 h-6 bg-[#F7A600] rounded-full flex items-center justify-center text-black text-[10px] shadow-lg z-50 hover:scale-110 transition-transform"
      >
        <FontAwesomeIcon icon={faChevronLeft} className={`${isCollapsed ? "rotate-180" : ""} transition-transform`} />
      </button>

      {/* Top Section */}
      <div>
        {/* Logo Section */}
        <div className="flex items-center gap-3 px-6 py-8 mb-4">
          <div className="min-w-[32px] h-8 bg-[#F7A600] rounded flex items-center justify-center text-black font-black italic">
            AX
          </div>
          {!isCollapsed && (
            <h1 className="text-white text-lg font-bold tracking-tighter animate-in fade-in duration-500">
              AXONE.<span className="text-[#F7A600]">PRO</span>
            </h1>
          )}
        </div>

        {/* Menu Items */}
        <ul className="space-y-1 px-3">
          {menuItems.map((item, index) => (
            <li
              key={index}
              className="
                group
                flex items-center gap-4
                px-4 py-3
                rounded-lg
                text-slate-400
                cursor-pointer
                transition-all
                hover:bg-[#F7A600]/10
                hover:text-[#F7A600]
              "
            >
              <div className="min-w-[20px] flex justify-center">
                <FontAwesomeIcon icon={item.icon} className="text-lg" />
              </div>
              {!isCollapsed && (
                <span className="text-sm font-semibold tracking-wide whitespace-nowrap animate-in slide-in-from-left-2">
                  {item.label}
                </span>
              )}
              
              {/* Tooltip for collapsed mode */}
              {isCollapsed && (
                <div className="absolute left-16 bg-slate-800 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50">
                  {item.label}
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>

      {/* User Profile Section */}
      <div className={`
        border-t border-slate-800/60 
        p-4 mb-4
        flex items-center 
        ${isCollapsed ? "justify-center" : "gap-4"}
      `}>
        <div
          className="w-10 h-10 min-w-[40px] rounded-full overflow-hidden cursor-pointer border border-slate-700 hover:border-[#F7A600] transition-colors"
          onClick={() => navigate("/profile-page")}
        >
          {avatar ? (
            <img
              src={avatar.startsWith("/uploads") ? `http://localhost:5000${avatar}` : avatar}
              alt="User Avatar"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-slate-800 flex items-center justify-center text-slate-400">
              <FontAwesomeIcon icon={faUser} />
            </div>
          )}
        </div>

        {!isCollapsed && (
          <div className="overflow-hidden">
            <p className="text-[#EAECEF] text-xs font-bold truncate">
              {UserName?.toUpperCase()}
            </p>
            {/* <p className="text-slate-500 text-[10px] font-medium">Verified Account</p> */}
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;