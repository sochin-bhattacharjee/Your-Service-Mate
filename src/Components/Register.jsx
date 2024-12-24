import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { AuthContext } from "../provider/AuthProvider";
import { FaArrowRight } from "react-icons/fa";
import { Label } from "@radix-ui/react-label";
import { GrGoogle } from "react-icons/gr";
import Swal from "sweetalert2";
import { updateProfile } from "firebase/auth";


const Register = () => {
  const { theme } = useTheme();
  const { createUser, signInWithGoogle } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();

  const handleGoogleSignIn = () => {
    signInWithGoogle()
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Registration Successful",
          text: "Welcome to our platform!",
          showConfirmButton: false,
          timer: 2000,
        });
        setTimeout(() => {
          navigate("/");
        }, 2000);
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Google Sign-in Failed",
          text: error.message,
        });
      });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const photoURL = e.target.photoURL.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
  
    const hasLowerCase = /[a-z]/.test(password);
    const hasUpperCase = /[A-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasValidLength = password.length >= 6;
  
    if (!hasLowerCase) {
      setPasswordError("Password must contain at least one lowercase letter (a-z).");
      return;
    }
    if (!hasUpperCase) {
      setPasswordError("Password must contain at least one uppercase letter (A-Z).");
      return;
    }
    if (!hasNumber) {
      setPasswordError("Password must contain at least one number (0-9).");
      return;
    }
    if (!hasValidLength) {
      setPasswordError("Password must be at least 6 characters long.");
      return;
    }
  
    setPasswordError("");
  
    createUser(email, password)
      .then((result) => {
        const createdUser = result.user;
        return updateProfile(createdUser, {
          displayName: name,
          photoURL: photoURL,
        });
      })
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Registration Successful",
          text: "Welcome to our platform!",
          showConfirmButton: false,
          timer: 2000,
        });
        setTimeout(() => {
          navigate("/");
        }, 2000);
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Registration Failed",
          text: error.message,
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
      <h2 className="font-bold text-3xl text-center mb-4">Register</h2>
      <p className="text-sm text-center mt-2 mb-6">Create an account to continue.</p>

      <form className="mt-6" onSubmit={handleRegister}>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="name" className="font-semibold">Full Name</Label>
          <input
            id="name"
            name="name"
            type="text"
            required
            placeholder="Enter your full name"
            className={`w-full px-4 py-2 rounded-md border-2 focus:outline-none transition-all duration-300 ease-in-out ${
              theme === "dark"
                ? "bg-gray-800 text-white border-gray-700 focus:ring-2 focus:ring-blue-500"
                : "bg-gray-50 text-black border-gray-300 focus:ring-2 focus:ring-blue-500"
            }`}
          />
        </LabelInputContainer>

        <LabelInputContainer className="mb-4">
          <Label htmlFor="photoURL" className="font-semibold">Photo URL</Label>
          <input
            id="photoURL"
            name="photoURL"
            type="text"
            required
            placeholder="Enter your photo URL"
            className={`w-full px-4 py-2 rounded-md border-2 focus:outline-none transition-all duration-300 ease-in-out ${
              theme === "dark"
                ? "bg-gray-800 text-white border-gray-700 focus:ring-2 focus:ring-blue-500"
                : "bg-gray-50 text-black border-gray-300 focus:ring-2 focus:ring-blue-500"
            }`}
          />
        </LabelInputContainer>

        <LabelInputContainer className="mb-4">
          <Label htmlFor="email" className="font-semibold">Email Address</Label>
          <input
            id="email"
            name="email"
            type="email"
            required
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
              required
              placeholder="Enter your password"
              className={`w-full px-4 py-2 rounded-md border-2 focus:outline-none transition-all duration-300 ease-in-out ${
                theme === "dark"
                  ? "bg-gray-800 text-white border-gray-700 focus:ring-2 focus:ring-blue-500"
                  : "bg-gray-50 text-black border-gray-300 focus:ring-2 focus:ring-blue-500"
              }`}
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

        {passwordError && (
          <p className="text-red-500 text-sm mt-2">{passwordError}</p>
        )}

        <button
          type="submit"
          className={`w-full flex items-center justify-center gap-2 py-2 rounded-md text-white font-semibold focus:outline-none transition-all duration-300 ease-in-out ${
            theme === "dark"
              ? "bg-blue-700 hover:bg-blue-600"
              : "bg-blue-500 hover:bg-blue-400"
          }`}
        >
          Register <FaArrowRight />
        </button>

        <button
          type="button"
          onClick={handleGoogleSignIn}
          className="flex items-center justify-center gap-3 mt-4 border-2 border-gray-300 rounded-md p-2 w-full hover:border-blue-500 transition-all duration-300 ease-in-out"
        >
          <span className="text-xl"><GrGoogle /></span> Register with Google
        </button>

        <p className="mt-6 text-center">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-blue-500 hover:text-blue-600 hover:underline"
          >
            Login
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

export default Register;
