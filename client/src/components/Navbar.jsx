import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Sun, Moon } from "lucide-react";

const Navbar = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const theme = localStorage.getItem("theme") || "light";
    if (theme === "dark") {
      setDarkMode(true);
      document.documentElement.setAttribute("data-theme", "dark");
    } else {
      setDarkMode(false);
      document.documentElement.setAttribute("data-theme", "light");
    }
  }, []);

  const handleThemeToggle = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    const themeValue = newMode ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", themeValue);
    localStorage.setItem("theme", themeValue);
  };

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-md bg-white/90 border-b border-gray-200 transition-all duration-300 overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-8 py-4 flex items-center justify-between">
        
        <Link to="/" className="flex items-center gap-2 group">
          <div className="bg-green-600 text-white font-black px-1.5 py-0.5 rounded-sm text-sm transition-transform group-hover:scale-110">
            BY
          </div>
          <span className="text-xl font-black text-black tracking-tighter">
            TaskMaster<span className="text-[#F7A600]">.</span>
          </span>
        </Link>

        {/* Navigation Actions */}
        <div className="flex items-center gap-6">
          <Link
            to="/"
            className="p-2 text-black w-25 text-center hover:bg-gray-200 transition-all duration-500"
          >
            Home
          </Link>

          <Link
            to="/login"
            className="text-[17px] text-black p-2 w-25 text-center hover:text-bold hover:bg-gray-200 transition-colors"
          >
            Login
          </Link>

          <Link
            to="/register"
            className="p-2 w-30 text-center bg-black text-white text-[17px] border border-gray-400 rounded-3xl hover:bg-gray-200 transition-all"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;