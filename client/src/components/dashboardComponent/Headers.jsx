import React from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket, faSearch, faUser, faBell } from "@fortawesome/free-solid-svg-icons";

const Header = ({ UserName }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear("user");
    localStorage.clear("accessToken");
    navigate("/login");
  };

  return (
    <header className="w-full bg-[#0E0F13] h-20 px-4 md:px-8 flex items-center justify-between border-b border-slate-800/60 sticky top-0 z-50">
      
      {/* Brand */}
      <div className="flex items-center gap-2 md:gap-4">
        <h1 className="text-lg md:text-xl font-black text-indigo-500 flex items-center gap-2">
          <span className="bg-indigo-600 text-white px-1.5 py-0.5 rounded-sm text-sm">AX</span>
          <span className="hidden sm:inline">DASHBOARD</span>
        </h1>
      </div>

      {/* Search */}
      <div className="hidden md:flex flex-1 mx-6 lg:mx-12 justify-center">
        <div className="relative w-full max-w-sm">
          <input
            type="text"
            placeholder="Search assets..."
            className="w-full rounded-md px-4 py-1.5 pl-10 border border-slate-800 bg-[#17181E] text-indigo-500 placeholder-slate-500 text-sm focus:outline-none focus:border-indigo-600 transition-all"
          />
          <FontAwesomeIcon
            icon={faSearch}
            className="absolute left-3.5 top-2.5 text-slate-500 text-xs"
          />
        </div>
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-3 md:gap-6">
        
        {/* Notification */}
        <button className="text-slate-400 hover:text-indigo-600 transition-colors relative p-1">
          <FontAwesomeIcon icon={faBell} className="text-lg" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border-2 border-[#0E0F13]"></span>
        </button>

        {/* User */}
        <div className="flex items-center gap-3 border-l border-slate-800 pl-3 md:pl-6">
          <div className="hidden lg:block text-right">
            <p className="text-sm font-semibold text-indigo-500 leading-none">{UserName}</p>
          </div>
          <div className="w-8 h-8 md:w-9 md:h-9 rounded-full bg-slate-800 flex items-center justify-center text-indigo-500 border border-slate-700">
            <FontAwesomeIcon icon={faUser} className="text-xs" />
          </div>
        </div>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="
            text-slate-400
            hover:text-red-500
            text-sm
            font-bold
            flex items-center gap-2
            transition-all
            group
          "
        >
          <span className="hidden md:inline">Logout</span>
          <FontAwesomeIcon 
            icon={faRightFromBracket} 
            className="group-hover:translate-x-1 transition-transform" 
          />
        </button>

      </div>

    </header>
  );
};

export default Header;