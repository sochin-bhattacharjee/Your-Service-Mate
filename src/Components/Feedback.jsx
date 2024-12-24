import { useRef, useState } from "react";
import { useTheme } from "../context/ThemeContext";

const Feedback = () => {
  const { theme } = useTheme();
  const nameRef = useRef();
  const emailRef = useRef();
  const messageRef = useRef();
  const [rating, setRating] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();

    const feedback = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      message: messageRef.current.value,
      rating,
    };

    if (!feedback.name || !feedback.email || !feedback.message) {
      alert("Please fill out all fields!");
      return;
    }

    console.log("Feedback submitted:", feedback);
    alert("Thank you for your feedback!");
    e.target.reset();
    setRating(0);
  };

  return (
    <div
      className={`flex flex-col items-center justify-center py-10 transition-all duration-500 mt-12 md:mt-16 ease-in-out`}
    >
      <h2 className="text-3xl font-bold mb-6 text-center">We Value Your Feedback</h2>
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg xl:max-w-4xl bg-opacity-90 rounded-lg shadow-lg p-6 lg:p-8"
        style={{
          backgroundColor: theme === "dark" ? "#1F2937" : "#FFFFFF",
        }}
      >
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-sm font-medium mb-2"
          >
            Your Name
          </label>
          <input
            type="text"
            id="name"
            ref={nameRef}
            placeholder="Enter your name"
            required
            className={`w-full px-4 py-2 rounded-md border focus:outline-none ${
              theme === "dark"
                ? "bg-gray-700 text-white border-gray-600 focus:ring-2 focus:ring-blue-500"
                : "bg-gray-50 text-black border-gray-300 focus:ring-2 focus:ring-blue-500"
            }`}
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium mb-2"
          >
            Email Address
          </label>
          <input
            type="email"
            id="email"
            ref={emailRef}
            placeholder="Enter your email"
            required
            className={`w-full px-4 py-2 rounded-md border focus:outline-none ${
              theme === "dark"
                ? "bg-gray-700 text-white border-gray-600 focus:ring-2 focus:ring-blue-500"
                : "bg-gray-50 text-black border-gray-300 focus:ring-2 focus:ring-blue-500"
            }`}
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="message"
            className="block text-sm font-medium mb-2"
          >
            Your Feedback
          </label>
          <textarea
            id="message"
            ref={messageRef}
            placeholder="Write your feedback here"
            rows="5"
            required
            className={`w-full px-4 py-2 rounded-md border focus:outline-none ${
              theme === "dark"
                ? "bg-gray-700 text-white border-gray-600 focus:ring-2 focus:ring-blue-500"
                : "bg-gray-50 text-black border-gray-300 focus:ring-2 focus:ring-blue-500"
            }`}
          ></textarea>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">Rating</label>
          <div className="flex items-center space-x-2">
            {[...Array(5)].map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => setRating(index + 1)}
                className={`text-2xl ${rating >= index + 1 ? "text-yellow-500" : "text-gray-400"}`}
              >
                ★
              </button>
            ))}
          </div>
        </div>

        <button
          type="submit"
          className={`w-full py-2 text-white font-semibold rounded-md transition-all duration-300 ease-in-out ${
            theme === "dark"
              ? "bg-blue-700 hover:bg-blue-600"
              : "bg-blue-500 hover:bg-blue-400"
          }`}
        >
          Submit Feedback
        </button>
      </form>
    </div>
  );
};

export default Feedback;
