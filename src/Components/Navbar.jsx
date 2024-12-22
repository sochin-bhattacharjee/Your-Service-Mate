import { useState } from "react";
import { Link } from "react-router-dom";
import logo from '../assets/images/YourServiceMate_Logo.png'; 
const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [user, setUser] = useState(true);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white dark:bg-gray-900 md:px-3">
      <div className="w-full px-4 sm:px-0 sm:w-full">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="text-xl sm:text-2xl font-bold text-blue-600 flex items-center">
          <img className="w-16" src={logo} alt="" />
            Your Service Mate
          </Link>

          <nav className="hidden md:flex items-center space-x-6">
            <Link
              to="/services"
              className="text-gray-600 hover:text-blue-600 dark:text-gray-300"
            >
              Services
            </Link>
            <Link
              to="/register"
              className="text-gray-600 hover:text-blue-600 dark:text-gray-300"
            >
              Register
            </Link>
            <Link
              to="/dashboard"
              className="text-gray-600 hover:text-blue-600 dark:text-gray-300"
            >
              Dashboard
            </Link>

            {!user && (
              <Link
                to="/login"
                className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700"
              >
                Sign In
              </Link>
            )}

            {user && (
              <div className="relative">
                <button
                  className="focus:outline-none"
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                >
                  <img
                    src="https://via.placeholder.com/40"
                    alt="Profile"
                    className="w-10 h-10 rounded-full border-2 border-gray-300"
                  />
                </button>
                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-40 bg-white border rounded-md shadow-lg dark:bg-gray-800">
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                      onClick={() => setIsProfileOpen(false)}
                    >
                      My Profile
                    </Link>
                    <button
                      className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                      onClick={() => {
                        setIsProfileOpen(false);
                        setUser(null);
                      }}
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}
          </nav>

          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg
              className="h-6 w-6 text-gray-600 dark:text-gray-300"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden border-t bg-white dark:bg-gray-900">
          <nav className="flex flex-col p-4 space-y-4">
            <Link
              to="/services"
              className="text-gray-600 hover:text-blue-600 dark:text-gray-300"
              onClick={() => setIsMenuOpen(false)}
            >
              Services
            </Link>
            <Link
              to="/register"
              className="text-gray-600 hover:text-blue-600 dark:text-gray-300"
              onClick={() => setIsMenuOpen(false)}
            >
              Register
            </Link>
            <Link
              to="/dashboard"
              className="text-gray-600 hover:text-blue-600 dark:text-gray-300"
              onClick={() => setIsMenuOpen(false)}
            >
              Dashboard
            </Link>

            {!user && (
              <Link
                to="/login"
                className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700"
                onClick={() => setIsMenuOpen(false)}
              >
                Sign In
              </Link>
            )}

            {user && (
              <div className="relative">
                <button
                  className="focus:outline-none"
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                >
                  <img
                    src="https://via.placeholder.com/40"
                    alt="Profile"
                    className="w-10 h-10 rounded-full border-2 border-gray-300"
                  />
                </button>
                {isProfileOpen && (
                  <div className="absolute mt-2 w-full bg-white border rounded-md shadow-lg dark:bg-gray-800">
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                      onClick={() => {
                        setIsProfileOpen(false);
                        setIsMenuOpen(false);
                      }}
                    >
                      My Profile
                    </Link>
                    <button
                      className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                      onClick={() => {
                        setIsProfileOpen(false);
                        setIsMenuOpen(false);
                        setUser(null);
                      }}
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
