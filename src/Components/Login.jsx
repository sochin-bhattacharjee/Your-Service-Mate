import { useContext, useRef, useState } from "react";
import { Label } from "@radix-ui/react-label";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { AuthContext } from "../provider/AuthProvider";
import { GrGoogle } from "react-icons/gr";
import { FaArrowRight } from "react-icons/fa";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet";

const Login = () => {
  const { signInUser, signInWithGoogle } = useContext(AuthContext);
  const { theme } = useTheme();
  const [showPassword, setShowPassword] = useState(false);
  const emailRef = useRef();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    signInUser(email, password)
      .then((result) => {
        e.target.reset();
        Swal.fire({
          icon: "success",
          title: "Login Successful",
          text: "Welcome back to our platform!",
          showConfirmButton: false,
          timer: 2000,
        });
        setTimeout(() => {
          navigate(location?.state ? location.state : "/");
        }, 2000);
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Login Failed",
          text: "Invalid email or password. Please try again.",
          showConfirmButton: true,
        });
        e.target.reset();
      });
  };

  const handleGoogleSignIn = () => {
    signInWithGoogle()
      .then((result) => {
        Swal.fire({
          icon: "success",
          title: "Google Login Successful",
          text: "Welcome back to our platform!",
          showConfirmButton: false,
          timer: 2000,
        });
        setTimeout(() => {
          navigate(location?.state ? location.state : "/");
        }, 2000);
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Google Login Failed",
          text: error.message,
          showConfirmButton: true,
        });
      });
  };

  return (
    <div
      className={`w-11/12 md:w-8/12 lg:w-6/12 mx-auto rounded-xl p-6 shadow-lg mt-20 transition-transform duration-300 ease-in-out ${
        theme === "dark"
          ? "bg-gradient-to-r from-gray-800 to-gray-900 text-white"
          : "bg-gradient-to-r from-gray-200 to-gray-300 text-black"
      }`}
    >
      <Helmet>
        <title>Your Service Mate | Login Login</title>
      </Helmet>
      <h2 className="font-bold text-3xl text-center mb-4">Login</h2>
      <p className="text-sm text-center mt-2 mb-6">
        Welcome back! Please login to continue.
      </p>
      <form className="mt-6" onSubmit={handleLogin}>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="email" className="font-semibold">Email Address</Label>
          <input
            id="email"
            ref={emailRef}
            required
            name="email"
            type="email"
            placeholder="Enter your email"
            className={`w-full px-4 py-2 rounded-md border-2 focus:outline-none transition-all duration-300 ease-in-out ${
              theme === "dark"
                ? "bg-gray-800 text-white border-gray-700 focus:ring-2 focus:ring-blue-500"
                : "bg-gray-50 text-black border-gray-300 focus:ring-2 focus:ring-blue-500"
            }`}
          />
        </LabelInputContainer>

        <LabelInputContainer className="mb-4">
          <Label htmlFor="password" className="font-semibold">Password</Label>
          <div className="relative">
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              className={`w-full px-4 py-2 rounded-md border-2 focus:outline-none transition-all duration-300 ease-in-out ${
                theme === "dark"
                  ? "bg-gray-800 text-white border-gray-700 focus:ring-2 focus:ring-blue-500"
                  : "bg-gray-50 text-black border-gray-300 focus:ring-2 focus:ring-blue-500"
              }`}
              required
            />
            <button
              type="button"
              className="absolute right-2 top-2 text-gray-500 hover:text-gray-700"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
        </LabelInputContainer>

        <Link
          to="/forgot-password"
          className="text-blue-500 hover:text-blue-600 hover:underline block mb-4"
        >
          Forgot Password?
        </Link>

        <button
          type="submit"
          className={`w-full flex items-center justify-center gap- py-2 rounded-md text-white font-semibold focus:outline-none transition-all duration-300 ease-in-out ${
            theme === "dark"
              ? "bg-blue-700 hover:bg-blue-600"
              : "bg-blue-500 hover:bg-blue-400"
          }`}
        >
          Login <FaArrowRight />
        </button>

        <button
          type="button"
          onClick={handleGoogleSignIn}
          className="flex items-center justify-center gap-3 mt-4 border-2 border-gray-300 rounded-md p-2 w-full hover:border-blue-500 transition-all duration-300 ease-in-out"
        >
          <span className="text-xl"><GrGoogle /></span> Login with Google
        </button>

        <p className="mt-6 text-center">
          New to this platform?{" "}
          <Link
            to="/register"
            className="text-blue-500 hover:text-blue-600 hover:underline"
          >
            Register
          </Link>
        </p>
      </form>
    </div>
  );
};

const LabelInputContainer = ({ children, className }) => {
  return (
    <div className={`flex flex-col space-y-2 ${className}`}>{children}</div>
  );
};

export default Login;
