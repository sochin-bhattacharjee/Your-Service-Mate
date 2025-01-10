import emailjs from "@emailjs/browser";
import { useRef, useState } from "react";
import Swal from "sweetalert2";
import { useTheme } from "../context/ThemeContext";

const ContactMe = () => {
  const form = useRef();
  const [formStatus, setFormStatus] = useState(null);
  const { theme } = useTheme();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm("service_fua5mcl", "template_guqlxjz", form.current, {
        publicKey: "-16sGFbsT3EXLxerV",
      })
      .then(
        () => {
          Swal.fire({
            title: "Message Sent Successfully!",
            icon: "success",
            draggable: true,
          });
          form.current.reset();
        },
        (error) => {
          setFormStatus(`Failed to send message. Error: ${error.text}`);
        }
      );
  };

  return (
    <div
      className={`flex flex-col items-center justify-center py-10 transition-all duration-500 mt-12 md:mt-16 ease-in-out`}
    >
      <h1 className="text-3xl font-bold mb-6 text-center">
        Contact Me
      </h1>

      <div className="w-[90%] md:w-[80%] mx-auto flex flex-col md:flex-row items-center justify-center gap-8">
        {/* Message Form */}
        <div
          className="w-full md:w-1/2 shadow-lg rounded-lg p-6"
          style={{
            backgroundColor: theme === "dark" ? "#1F2937" : "#FFFFFF",
          }}
        >
          <h2 className="text-2xl font-bold mb-4">
            Send a Message
          </h2>
          <form ref={form} onSubmit={sendEmail}>
            <div className="mb-4">
              <label
                htmlFor="user_name"
                className="mb-2 block"
              >
                Name
              </label>
              <input
                type="text"
                name="user_name"
                id="user_name"
                className={`w-full px-4 py-2 rounded-md border focus:outline-none ${
                  theme === "dark"
                    ? "bg-gray-700 text-white border-gray-600 focus:ring-2 focus:ring-blue-500"
                    : "bg-gray-50 text-black border-gray-300 focus:ring-2 focus:ring-blue-500"
                }`}
                required
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="user_email"
                className="mb-2 block"
              >
                Email
              </label>
              <input
                type="email"
                name="user_email"
                id="user_email"
                className={`w-full px-4 py-2 rounded-md border focus:outline-none ${
                  theme === "dark"
                    ? "bg-gray-700 text-white border-gray-600 focus:ring-2 focus:ring-blue-500"
                    : "bg-gray-50 text-black border-gray-300 focus:ring-2 focus:ring-blue-500"
                }`}
                required
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="message"
                className="mb-2 block"
              >
                Message
              </label>
              <textarea
                name="message"
                id="message"
                rows="5"
                className={`w-full px-4 py-2 rounded-md border focus:outline-none ${
                  theme === "dark"
                    ? "bg-gray-700 text-white border-gray-600 focus:ring-2 focus:ring-blue-500"
                    : "bg-gray-50 text-black border-gray-300 focus:ring-2 focus:ring-blue-500"
                }`}
                required
              ></textarea>
            </div>

            <button
              type="submit"
              className={`w-full py-3 rounded-lg font-bold transition-all duration-300 ${
                theme === "dark"
                  ? "bg-blue-700 text-white hover:bg-blue-600"
                  : "bg-blue-500 text-white hover:bg-blue-400"
              }`}
            >
              Send Message
            </button>

            {formStatus && (
              <p
                className={`mt-4 text-center ${
                  formStatus.includes("success")
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                {formStatus}
              </p>
            )}
          </form>
        </div>

        {/* Contact Info */}
        <div
          className="w-full md:w-1/2 shadow-lg rounded-lg p-6"
          style={{
            backgroundColor: theme === "dark" ? "#1F2937" : "#FFFFFF",
          }}
        >
          <h2 className="text-2xl font-bold mb-4">
            Contact Info
          </h2>
          <ul className="space-y-4">
            <li>
              <strong>Location:</strong> Ghagra, Rangamati, Bangladesh
            </li>
            <li>
              <strong>Email:</strong> sochin.cs@gmail.com
            </li>
            <li>
              <strong>Phone:</strong> +880 1610316528
            </li>
            <li>
              <strong>WhatsApp:</strong> +880 1610316528
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ContactMe;
