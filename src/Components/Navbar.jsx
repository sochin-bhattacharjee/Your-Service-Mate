import { NavLink, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../provider/AuthProvider";
import { FaUserCircle } from "react-icons/fa";
import Swal from "sweetalert2";
import logo from "../assets/images/YourServiceMate_Logo.png";
import { useTheme } from "../context/ThemeContext";

const Navbar = () => {
  const { signOutUser, user } = useContext(AuthContext);
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleLogout = async () => {
    try {
      await signOutUser();
      Swal.fire({
        icon: "success",
        title: "Logout Successful!",
        text: "You have logged out successfully.",
        confirmButtonText: "OK",
      });
      navigate("/");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Logout Failed!",
        text: "There was an error logging you out. Please try again.",
        confirmButtonText: "OK",
      });
    }
  };

  return (
    <div
      className={`sticky top-0 z-50 ${isScrolled ? (theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-100 text-black") : (theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-black")} transition-colors duration-300`}
    >
      <div className="navbar w-full px-4 py-2 mx-auto flex justify-between items-center">
        <div className="navbar-start flex items-center gap-2">
          <NavLink
            to="/"
            className={`text-2xl font-bold flex items-center ${theme === "dark" ? "text-red-400" : "text-red-600"}`}
          >
            <img className="w-12" src={logo} alt="Your Service Mate Logo" />
            Your Service Mate
          </NavLink>

          <button
            className="lg:hidden p-2 text-gray-700"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>

        <div
          className={`navbar-center ${isMenuOpen ? "block" : "hidden"} lg:flex w-full lg:w-auto`}
        >
          <ul className="flex flex-col lg:flex-row gap-4 px-1 lg:px-0 lg:gap-6 py-4 lg:py-0">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive
                    ? "text-red-600 border-b-2 border-red-600 text-lg font-semibold"
                    : "text-lg font-semibold hover:text-red-600"
                }
              >
                Home
              </NavLink>
            </li>

            <li className="dropdown dropdown-hover relative">
              <a
                tabIndex={0}
                className="text-lg font-semibold hover:text-red-600 cursor-pointer"
              >
                Dashboard
              </a>
              <ul
                className={`dropdown-content rounded-box z-50 mt-3 w-40 p-2 shadow ${
                  theme === "dark" ? "bg-gray-700 text-white" : "bg-gray-100"
                }`}
              >
                <li>
                  <NavLink to="/allServices" className="hover:text-red-600">
                    All Services
                  </NavLink>
                </li>
                {user && (
                  <>
                    <li>
                      <NavLink to="/addService" className="hover:text-red-600">
                        Add Service
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/manageService"
                        className="hover:text-red-600"
                      >
                        Manage Service
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/bookedServices"
                        className="hover:text-red-600"
                      >
                        Booked Services
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/serviceToDo"
                        className="hover:text-red-600"
                      >
                        Service To Do
                      </NavLink>
                    </li>
                  </>
                )}
              </ul>
            </li>

            {user ? (
              <li>
                <button
                  onClick={handleLogout}
                  className="text-lg font-semibold hover:text-red-600"
                >
                  Logout
                </button>
              </li>
            ) : (
              <>
                <li>
                  <NavLink
                    to="/login"
                    className="text-lg font-semibold hover:text-red-600"
                  >
                    Login
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/register"
                    className="text-lg font-semibold hover:text-red-600"
                  >
                    Register
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>

        <div className="navbar-end flex items-center gap-4">

          <button
            onClick={toggleTheme}
            className="p-2 rounded-xl bg-base-200 hover:bg-base-300"
          >
            {theme === "dark" ? "Light Mode" : "Dark Mode"}
          </button>


          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                {user ? (
                  <img
                    alt={user.displayName}
                    src={user.photoURL}
                    title={user.displayName}
                  />
                ) : (
                  <FaUserCircle size={40} />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
