import React from "react";

const ThemeToggle = ({ darkMode, setDarkMode }) => {

  return (
    <button
      onClick={() => setDarkMode(!darkMode)}
    >

      {darkMode ? (
        <i className="fas fa-sun"></i>
      ) : (
        <i className="fas fa-moon"></i>
      )}

    </button>
  );
};

export default ThemeToggle;