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
    <header className="w-full bg-[#0E0F13] h-16 px-8 flex items-center justify-between border-b border-slate-800/60 sticky top-0 z-50">
      
      {/* Brand Title */}
      <div className="flex items-center gap-4">
        <h1 className="text-xl font-black text-white tracking-tighter flex items-center gap-2">
          <span className="bg-[#F7A600] text-black px-1.5 py-0.5 rounded-sm text-sm">AX</span>
          DASHBOARD
        </h1>
      </div>

      {/* Search: More integrated with the background */}
      <div className="flex-1 mx-12">
        <div className="relative w-full max-w-sm">
          <input
            type="text"
            placeholder="Search assets or tasks..."
            className=" w-full rounded-md  px-4  py-1.5  pl-10  border border-slate-800  bg-[#17181E] text-[#EAECEF] placeholder-slate-600 text-sm focus:outline-none  focus:border-[#F7A600]/50 transition-all"
          />
          <FontAwesomeIcon
            icon={faSearch}
            className="absolute left-3.5 top-2.5 text-slate-600 text-xs"
          />
        </div>
      </div>

      {/* User & Notifications & Logout */}
      <div className="flex items-center gap-6">
        
        {/* Simple Notification Icon (Bybit Style) */}
        <button className="text-slate-400 hover:text-[#F7A600] transition-colors relative">
          <FontAwesomeIcon icon={faBell} className="text-lg" />
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full border-2 border-[#0E0F13]"></span>
        </button>

        {/* User Info */}
        <div className="flex items-center gap-3 border-l border-slate-800 pl-6">
          <div className="text-right">
            {/* <p className="text-[10px] text-slate-500 font-bold uppercase leading-none mb-1">Authenticated</p> */}
            <p className="text-sm font-semibold text-[#EAECEF] leading-none">{UserName}</p>
          </div>
          <div className="w-9 h-9 rounded-full bg-slate-800 flex items-center justify-center text-slate-300 border border-slate-700">
            <FontAwesomeIcon icon={faUser} className="text-xs" />
          </div>
        </div>

        {/* Logout: Sharp and minimalist */}
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
          <span className="hidden sm:inline">Logout</span>
          <FontAwesomeIcon icon={faRightFromBracket} className="group-hover:translate-x-1 transition-transform" />
        </button>

      </div>

    </header>
  );
};

export default Header;