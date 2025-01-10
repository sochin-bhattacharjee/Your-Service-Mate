import { NavLink, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../provider/AuthProvider";
import { FaUserCircle, FaCaretDown, FaCaretUp, FaBars } from "react-icons/fa";
import Swal from "sweetalert2";
import logo from "../assets/images/YourServiceMate_Logo.png";
import { useTheme } from "../context/ThemeContext";
import { RiLightbulbFill, RiLightbulbFlashFill } from "react-icons/ri";
import { FaBarsStaggered } from "react-icons/fa6";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const { signOutUser, user } = useContext(AuthContext);
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
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

  const toggleDashboardDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const dropdownVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0 },
  };

  const menuVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <div
      className={`sticky top-0 z-50 ${
        isScrolled
          ? theme === "dark"
            ? "bg-gray-900 text-white"
            : "bg-gray-100 text-black"
          : theme === "dark"
          ? "bg-gray-800 text-white"
          : "bg-white text-black"
      } transition-colors duration-300`}
    >
      <div className="navbar relative w-11/12 mx-auto flex justify-between items-center">
        <div className="flex items-center gap-4">
          <div className="lg:hidden">
            <button onClick={toggleMenu}>
              {isMenuOpen ? (
                <FaBarsStaggered size={20} />
              ) : (
                <FaBars size={20} />
              )}
            </button>
          </div>
          <NavLink
            to="/"
            className={`text-2xl font-bold flex items-center ${
              theme === "dark" ? "text-blue-500" : "text-blue-600"
            }`}
          >
            <img
              className="w-10 sm:w-8"
              src={logo}
              alt="Your Service Mate Logo"
            />
            <span className="text-xs sm:text-lg">Your Service Mate</span>
          </NavLink>
        </div>

        <div className="hidden lg:flex items-center gap-6">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "text-blue-500 border-b-2 border-blue-500 text-lg font-semibold"
                : "text-lg font-semibold hover:text-blue-600"
            }
          >
            Service
          </NavLink>

          <button
            onClick={toggleDashboardDropdown}
            className="text-lg font-semibold hover:text-blue-500 flex items-center gap-1"
          >
            Dashboard
            {isDropdownOpen ? <FaCaretUp /> : <FaCaretDown />}
          </button>
          <AnimatePresence>
            {isDropdownOpen && (
              <motion.div
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={dropdownVariants}
                className={`absolute left-1/2 transform -translate-x-1/2 top-[100%] shadow-md p-4 rounded-md ${
                  theme === "dark" ? "bg-gray-700 text-white" : "bg-gray-100"
                }`}
                style={{ maxWidth: "800px", width: "25%" }}
              >
                <ul className="flex flex-col gap-2">
                  <li>
                    <NavLink
                      to="/allServices"
                      className={({ isActive }) =>
                        isActive
                          ? "text-blue-500 border-b-2 border-blue-500 text-lg font-semibold"
                          : "text-lg font-semibold hover:text-blue-600"
                      }
                    >
                      All Services
                    </NavLink>
                  </li>
                  {user && (
                    <>
                      <li>
                        <NavLink
                          to="/addService"
                          className={({ isActive }) =>
                            isActive
                              ? "text-blue-500 border-b-2 border-blue-500 text-lg font-semibold"
                              : "text-lg font-semibold hover:text-blue-600"
                          }
                        >
                          Add Service
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          to="/manageService"
                          className={({ isActive }) =>
                            isActive
                              ? "text-blue-500 border-b-2 border-blue-500 text-lg font-semibold"
                              : "text-lg font-semibold hover:text-blue-600"
                          }
                        >
                          Manage Service
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          to="/bookedServices"
                          className={({ isActive }) =>
                            isActive
                              ? "text-blue-500 border-b-2 border-blue-500 text-lg font-semibold"
                              : "text-lg font-semibold hover:text-blue-600"
                          }
                        >
                          Booked Services
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          to="/serviceToDo"
                          className={({ isActive }) =>
                            isActive
                              ? "text-blue-500 border-b-2 border-blue-500 text-lg font-semibold"
                              : "text-lg font-semibold hover:text-blue-600"
                          }
                        >
                          Service To Do
                        </NavLink>
                      </li>
                    </>
                  )}
                </ul>
              </motion.div>
            )}
          </AnimatePresence>

          {user ? (
            <button
              onClick={handleLogout}
              className="text-lg font-semibold hover:text-blue-600"
            >
              Logout
            </button>
          ) : (
            <>
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  isActive
                    ? "text-blue-500 border-b-2 border-blue-500 text-lg font-semibold"
                    : "text-lg font-semibold hover:text-blue-600"
                }
              >
                Login
              </NavLink>
              <NavLink
                to="/register"
                className={({ isActive }) =>
                  isActive
                    ? "text-blue-500 border-b-2 border-blue-500 text-lg font-semibold"
                    : "text-lg font-semibold hover:text-blue-600"
                }
              >
                Register
              </NavLink>
            </>
          )}
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-xl bg-base-200 hover:bg-base-300"
          >
            {theme === "dark" ? <RiLightbulbFill /> : <RiLightbulbFlashFill />}
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

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={menuVariants}
            className="absolute flex flex-col gap-4 bg-gray-700 p-4 rounded-lg lg:hidden"
          >
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "text-red-600 border-b-2 border-red-600 text-md font-semibold"
                  : "text-lg font-semibold hover:text-red-600"
              }
            >
              Service
            </NavLink>
            <button
              onClick={toggleDashboardDropdown}
              className="text-md font-semibold hover:text-red-600 flex items-center gap-1"
            >
              Dashboard
              {isDropdownOpen ? <FaCaretUp /> : <FaCaretDown />}
            </button>
            {isDropdownOpen && (
              <ul
                className={`p-2 shadow rounded-lg ${
                  theme === "dark" ? "bg-gray-500 text-white" : "bg-gray-100"
                }`}
              >
                <li>
                  <NavLink
                    to="/allServices"
                    className={({ isActive }) =>
                      isActive
                        ? "text-red-600 border-b-2 border-red-600 text-lg font-semibold"
                        : "text-lg font-semibold hover:text-red-600"
                    }
                  >
                    All Services
                  </NavLink>
                </li>
                {user && (
                  <>
                    <li>
                      <NavLink
                        to="/addService"
                        className={({ isActive }) =>
                          isActive
                            ? "text-red-600 border-b-2 border-red-600 text-lg font-semibold"
                            : "text-lg font-semibold hover:text-red-600"
                        }
                      >
                        Add Service
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/manageService"
                        className={({ isActive }) =>
                          isActive
                            ? "text-red-600 border-b-2 border-red-600 text-lg font-semibold"
                            : "text-lg font-semibold hover:text-red-600"
                        }
                      >
                        Manage Service
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/bookedServices"
                        className={({ isActive }) =>
                          isActive
                            ? "text-red-600 border-b-2 border-red-600 text-lg font-semibold"
                            : "text-lg font-semibold hover:text-red-600"
                        }
                      >
                        Booked Services
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/serviceToDo"
                        className={({ isActive }) =>
                          isActive
                            ? "text-red-600 border-b-2 border-red-600 text-lg font-semibold"
                            : "text-lg font-semibold hover:text-red-600"
                        }
                      >
                        Service To Do
                      </NavLink>
                    </li>
                  </>
                )}
              </ul>
            )}
            {user ? (
              <button
                onClick={handleLogout}
                className="text-md font-semibold hover:text-red-600"
              >
                Logout
              </button>
            ) : (
              <>
                <NavLink
                  to="/login"
                  className={({ isActive }) =>
                    isActive
                      ? "text-red-600 border-b-2 border-red-600 text-lg font-semibold"
                      : "text-lg font-semibold hover:text-red-600"
                  }
                >
                  Login
                </NavLink>
                <NavLink
                  to="/register"
                  className={({ isActive }) =>
                    isActive
                      ? "text-red-600 border-b-2 border-red-600 text-lg font-semibold"
                      : "text-lg font-semibold hover:text-red-600"
                  }
                >
                  Register
                </NavLink>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Navbar;
