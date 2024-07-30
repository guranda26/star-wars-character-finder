import { MdOutlineDarkMode, MdDarkMode } from "react-icons/md";
import { useTheme } from "../context/useTheme";

const ThemeToggleButton = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <button
      className={`theme-toggle-button ${isDarkMode ? "dark" : "light"}`}
      onClick={toggleTheme}
      data-testid="theme-toggle-button"
    >
      {isDarkMode ? (
        <MdOutlineDarkMode data-testid="dark-mode-icon" />
      ) : (
        <MdDarkMode data-testid="light-mode-icon" />
      )}
    </button>
  );
};

export default ThemeToggleButton;
