// import React, { useContext } from "react";
import { MdOutlineDarkMode, MdDarkMode } from "react-icons/md";
// import { ThemeContext } from "../context/ThemeContext";
import { useTheme } from "../context/useTheme";

const ThemeToggleButton = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <button
      className={`theme-toggle-button ${isDarkMode ? "dark" : "light"}`}
      onClick={toggleTheme}
    >
      {isDarkMode ? <MdOutlineDarkMode /> : <MdDarkMode />}
    </button>
  );
};

export default ThemeToggleButton;
