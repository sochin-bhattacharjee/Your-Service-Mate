import { useTheme } from "../context/ThemeContext";
// import { MdOutlineWbSunny } from "react-icons/md";
// import { MdOutlineDarkMode } from "react-icons/md";


const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className=""
    >
      {theme === "dark" ? 'light' : 'dark'}
    </button>
  );
};

export default ThemeToggle;
