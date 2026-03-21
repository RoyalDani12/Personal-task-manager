import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faGear, faGauge, faUser, faChevronLeft, 
  faBars, faXmark 
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

const menuItems = [
  { icon: faGauge, label: "Dashboard", path: "/dashboard" },
  { icon: faGear, label: "Settings", path: "/settings" }
];

const Sidebar = ({ UserName, avatar, onCollapse }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isOpen, setIsOpen] = useState(false); // Mobile Menu State

  // This is the logic that tells TaskDetail to adjust its padding
  useEffect(() => {
    if (onCollapse) {
      onCollapse(isCollapsed);
    }
  }, [isCollapsed, onCollapse]);

  return (
    <>
      {/* 1. MOBILE HAMBURGER BUTTON */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-14 left-4 z-[100] bg-[#F7A600] text-black p-3 rounded-xl shadow-lg active:scale-90 transition-all"
      >
        <FontAwesomeIcon icon={isOpen ? faXmark : faBars} className="text-xl" />
      </button>

      {/* 2. OVERLAY */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[70] lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* 3. SIDEBAR CONTAINER */}
      <div className={`
        fixed top-0 left-0 h-screen z-[80]
        bg-[#0E0F13] border-r border-slate-800/60 
        flex flex-col justify-between
        transition-all duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"} 
        ${isCollapsed ? "lg:w-20" : "lg:w-64"} 
        w-72 
      `}>
        
        {/* Desktop Collapse Toggle */}
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="hidden lg:flex absolute -right-3 top-10 w-6 h-6 bg-[#F7A600] rounded-full items-center justify-center text-black text-[10px] shadow-lg z-50 hover:scale-110 transition-transform"
        >
          <FontAwesomeIcon icon={faChevronLeft} className={`${isCollapsed ? "rotate-180" : ""}`} />
        </button>

        {/* Branding */}
        <div>
          <div className="flex items-center gap-3 px-6 py-10 mb-4">
            <div className="min-w-[32px] h-8 bg-[#F7A600] rounded flex items-center justify-center text-black font-black italic">AX</div>
            {(!isCollapsed || isOpen) && (
              <h1 className="text-white text-lg font-bold tracking-tighter">
                AXONE.<span className="text-[#F7A600]">PRO</span>
              </h1>
            )}
          </div>

          {/* Navigation */}
          <ul className="space-y-1 px-3">
            {menuItems.map((item, index) => {
              const isActive = location.pathname === item.path;
              return (
                <li
                  key={index}
                  onClick={() => { navigate(item.path); setIsOpen(false); }}
                  className={`relative flex items-center gap-4 px-4 py-3 rounded-lg cursor-pointer transition-all
                    ${isActive ? "bg-[#F7A600]/10 text-[#F7A600]" : "text-slate-400 hover:bg-[#F7A600]/5"}
                  `}
                >
                  <FontAwesomeIcon icon={item.icon} className="text-lg min-w-[20px]" />
                  {(!isCollapsed || isOpen) && <span className="text-sm font-semibold">{item.label}</span>}
                </li>
              );
            })}
          </ul>
        </div>

        {/* User Profile Footer */}
        <div className={`border-t border-slate-800/60 p-4 mb-4 flex items-center ${isCollapsed && !isOpen ? "justify-center" : "gap-4"}`}>
          <div className="w-10 h-10 rounded-full border border-slate-700 overflow-hidden">
            {avatar ? (
              <img src={avatar} alt="avatar" className="w-full h-full object-cover"  onClick={()=>navigate('/profile-page')} />
            ) : (
              <div className="w-full h-full bg-slate-800 flex items-center justify-center">
                <FontAwesomeIcon icon={faUser} className="text-white" onClick={()=>navigate('/profile-page')} />
              </div>
            )}
          </div>
          {(!isCollapsed || isOpen) && (
            <div className="overflow-hidden">
              <p className="text-white text-xs font-bold truncate">{UserName}</p>
              <p className="text-[#F7A600] text-[10px]">Pro Member</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Sidebar;