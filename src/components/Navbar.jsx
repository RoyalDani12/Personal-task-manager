import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Sun, Moon } from "lucide-react";

const Navbar = () => {
  const [darkMode, setDarkMode] = useState(false);

  // Sync state with the attribute on load
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

  // Toggle dark/light mode
  const handleThemeToggle = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    
    const themeValue = newMode ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", themeValue);
    localStorage.setItem("theme", themeValue);
  };

  return (
    <nav className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 shadow-sm transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-blue-600 dark:text-blue-400">
          TaskMaster
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center space-x-6">
          <Link
            to="/register"
            className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition"
          >
            Sign Up
          </Link>
          <Link
            to="/login"
            className="px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
          >
            Login
          </Link>

          {/* Dark/Light Mode Toggle */}
          <button
            onClick={handleThemeToggle}
            className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-yellow-400 hover:ring-2 hover:ring-blue-400 transition-all duration-300"
            aria-label="Toggle Theme"
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} className="text-gray-700" />}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;