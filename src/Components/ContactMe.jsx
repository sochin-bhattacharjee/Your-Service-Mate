import emailjs from "@emailjs/browser";
import { useRef, useState } from "react";
import Swal from "sweetalert2";

const ContactMe = () => {
  const form = useRef();
  const [formStatus, setFormStatus] = useState(null);

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm("service_fua5mcl", "template_guqlxjz", form.current, {
        publicKey: "-16sGFbsT3EXLxerV",
      })
      .then(
        () => {
          Swal.fire({
            title: "Send Successfully!",
            icon: "success",
            draggable: true
          });
          form.current.reset();
        },
        (error) => {
          setFormStatus(`Failed to send message. Error: ${error.text}`);
        }
      );
  };

  return (
    <div className="w-full flex flex-col items-center justify-center text-gray-100 p-6">
      <h1 className="text-3xl md:text-4xl font-bold text-[#00BFFF] mb-6 text-center">
        Contact Me
      </h1>

      <div className="w-[90%] md:w-[80%] mx-auto flex flex-col md:flex-row items-center justify-center gap-8">
        <div className="w-full md:w-1/2 bg-gray-800 shadow-lg rounded-lg p-6">
          <h2 className="text-2xl font-bold text-blue-400 mb-4">Send a Message</h2>
          <form ref={form} onSubmit={sendEmail}>
            <div className="mb-4">
              <label htmlFor="user_name" className="text-gray-300 mb-2 block">Name</label>
              <input
                type="text"
                name="user_name"
                id="user_name"
                className="w-full p-3 bg-gray-700 text-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="user_email" className="text-gray-300 mb-2 block">Email</label>
              <input
                type="email"
                name="user_email"
                id="user_email"
                className="w-full p-3 bg-gray-700 text-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="message" className="text-gray-300 mb-2 block">Message</label>
              <textarea
                name="message"
                id="message"
                className="w-full p-3 bg-gray-700 text-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows="5"
                required
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition duration-300"
            >
              Send Message
            </button>

            {formStatus && (
              <p className={`mt-4 text-center ${formStatus.includes('success') ? 'text-green-500' : 'text-red-500'}`}>
                {formStatus}
              </p>
            )}
          </form>
        </div>

        <div className="w-full md:w-1/2 bg-gray-800 shadow-lg rounded-lg p-6">
          <h2 className="text-2xl font-bold text-blue-400 mb-4">Contact Info</h2>
          <ul className="text-gray-300 space-y-4">
            <li><strong>Location:</strong> Ghagra, Rangamati, Bangladesh</li>
            <li><strong>Email:</strong> sochin.cs@gmail.com</li>
            <li><strong>Phone:</strong> +880 1610316528</li>
            <li><strong>WhatsApp:</strong> +880 1610316528</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ContactMe;
