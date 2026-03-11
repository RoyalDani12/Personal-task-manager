import React from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket, faSearch, faUser } from "@fortawesome/free-solid-svg-icons";

const Header = ({ UserName }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear("user");
    localStorage.clear("accessToken");
    navigate("/login");
  };

  return (
    <header className="w-full bg-slate-900 h-20 px-6 flex items-center justify-between border-b border-slate-800 shadow-sm">
      
      {/* Title */}
      <div className="flex items-center gap-4">
        <h1 className="text-3xl font-bold text-indigo-500 tracking-wide">
          Task Dashboard
        </h1>
      </div>

      {/* Search */}
      <div className="flex-1 mx-10">
        <div className="relative w-full max-w-md">
          <input
            type="text"
            placeholder="Search here..."
            className="
              w-full
              rounded-full
              px-4
              py-2
              pr-10
              border
              border-slate-700
              bg-slate-800
              text-white
              placeholder-slate-400
              focus:outline-none
              focus:ring-2
              focus:ring-indigo-500
              transition
            "
          />
          <FontAwesomeIcon
            icon={faSearch}
            className="absolute right-3 top-2.5 text-slate-400"
          />
        </div>
      </div>

      {/* User & Logout */}
      <div className="flex items-center gap-4">
        
        {/* User Info */}
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-indigo-500 flex items-center justify-center text-white">
            <FontAwesomeIcon icon={faUser} />
          </div>
          <span className="text-sm font-medium text-indigo-400">{UserName}</span>
        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="
            bg-indigo-700
            hover:bg-indigo-600
            text-white
            px-4
            py-2
            rounded-full
            flex items-center gap-2
            transition
          "
        >
          Logout
          <FontAwesomeIcon icon={faRightFromBracket} />
        </button>

      </div>

    </header>
  );
};

export default Header;