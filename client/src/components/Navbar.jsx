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
    <nav className="sticky top-0 z-50 backdrop-blur-md bg-[#0E0F13]/90 border-b border-slate-800/60 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-8 py-4 flex items-center justify-between">
        
        {/* Logo - Bybit Style */}
        <Link
          to="/"
          className="flex items-center gap-2 group"
        >
          <div className="bg-[#F7A600] text-black font-black px-1.5 py-0.5 rounded-sm text-sm transition-transform group-hover:scale-110">
            BY
          </div>
          <span className="text-xl font-black text-white tracking-tighter uppercase">
            TaskMaster<span className="text-[#F7A600]">.</span>
          </span>
        </Link>

        {/* Navigation Actions */}
        <div className="flex items-center gap-6">
          
          <Link
            to="/login"
            className="text-xs font-black text-slate-400 uppercase tracking-widest hover:text-white transition-colors"
          >
            Login
          </Link>

          <Link
            to="/register"
            className="px-6 py-2.5 rounded-md bg-[#F7A600] text-black text-xs font-black uppercase tracking-widest hover:bg-[#ffb700] transition-all shadow-lg shadow-[#F7A600]/10 active:scale-95"
          >
            Sign Up
          </Link>

          {/* Theme Toggle - Styled for Terminal Look */}
          <div className="h-8 w-[1px] bg-slate-800 mx-2 hidden sm:block"></div>

          <button
            onClick={handleThemeToggle}
            className="p-2 rounded-lg bg-[#17181E] border border-slate-800 text-slate-400 hover:text-[#F7A600] hover:border-[#F7A600]/30 transition-all active:scale-90"
            aria-label="Toggle Theme"
          >
            {darkMode ? (
              <Sun size={18} strokeWidth={2.5} />
            ) : (
              <Moon size={18} strokeWidth={2.5} />
            )}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;