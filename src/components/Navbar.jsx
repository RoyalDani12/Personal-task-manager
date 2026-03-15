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

    <nav className="sticky top-0 z-50 backdrop-blur-lg bg-white/80 dark:bg-slate-950/80 border-b border-gray-200 dark:border-slate-800 transition">

      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo */}

        <Link
          to="/"
          className="text-2xl font-bold bg-gradient-to-r from-indigo-500 to-blue-500 bg-clip-text text-transparent"
        >
          TaskMaster
        </Link>


        {/* Navigation */}

        <div className="flex items-center gap-5">

          <Link
            to="/register"
            className="px-5 py-2.5 rounded-lg bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-500 transition"
          >
            Sign Up
          </Link>

          <Link
            to="/login"
            className="px-5 py-2.5 rounded-lg border border-gray-300 dark:border-slate-700 text-gray-700 dark:text-gray-300 text-sm hover:bg-gray-100 dark:hover:bg-slate-800 transition"
          >
            Login
          </Link>


          {/* Theme Toggle */}

          <button
            onClick={handleThemeToggle}
            className="p-2.5 rounded-full bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-yellow-400 hover:ring-2 hover:ring-indigo-500 transition"
            aria-label="Toggle Theme"
          >

            {darkMode
              ? <Sun size={20} />
              : <Moon size={20} />
            }

          </button>

        </div>

      </div>

    </nav>

  );

};

export default Navbar;