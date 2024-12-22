import React from "react";

const Register = () => {
  const handleRegister = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const name = formData.get("name");
    const email = formData.get("email");
    const password = formData.get("password");
    const photoURL = formData.get("photoURL");

    console.log({ name, email, password, photoURL });
  };

  const handleGoogleSignIn = () => {
    console.log("Google Sign-In clicked");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-blue-600">Register</h2>
        <form onSubmit={handleRegister} className="mt-6 space-y-4">

          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Enter your name"
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Enter your email"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Enter your password"
              required
            />
          </div>

          <div>
            <label htmlFor="photoURL" className="block text-sm font-medium text-gray-700">
              Photo URL
            </label>
            <input
              type="url"
              id="photoURL"
              name="photoURL"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Enter your photo URL"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Register
          </button>
        </form>

        <div className="mt-6 flex items-center">
          <div className="w-full border-t border-gray-300"></div>
          <span className="mx-4 text-gray-500">OR</span>
          <div className="w-full border-t border-gray-300"></div>
        </div>

        <button
          onClick={handleGoogleSignIn}
          className="mt-6 w-full flex items-center justify-center bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
        >
          <svg
            className="w-5 h-5 mr-2"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 48 48"
          >
            <path
              fill="#EA4335"
              d="M24 9.5c3.69 0 6.85 1.26 9.42 3.35l7-6.85C36.47 2.54 30.74 0 24 0 14.85 0 6.9 5.45 2.65 13.4l7.93 6.2C12.85 12.2 18.01 9.5 24 9.5z"
            />
            <path
              fill="#34A853"
              d="M46.34 24.56c0-1.64-.16-3.21-.45-4.73H24v9.13h12.74c-.55 2.83-2.22 5.22-4.71 6.87v5.68h7.63c4.46-4.11 6.97-10.15 6.97-17.22z"
            />
            <path
              fill="#FBBC05"
              d="M10.58 28.4c-1.35-4.03-1.35-8.37 0-12.4V10.2H2.65C-.88 16.64-.88 24.34 2.65 30.8l7.93-6.2z"
            />
            <path
              fill="#4285F4"
              d="M24 48c6.74 0 12.47-2.2 16.63-5.98l-7.63-5.68c-2.22 1.49-5.07 2.38-9 2.38-5.98 0-11.14-2.7-14.42-7.05l-7.93 6.2C6.9 42.55 14.85 48 24 48z"
            />
          </svg>
          Continue with Google
        </button>
      </div>
    </div>
  );
};

export default Register;
