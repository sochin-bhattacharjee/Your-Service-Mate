import { motion } from "framer-motion";
import service from "../assets/images/service.jpg";
import { RiSurgicalMaskLine } from "react-icons/ri";
import { TbClock24 } from "react-icons/tb";
import { MdSanitizer } from "react-icons/md";
import { GiGloves } from "react-icons/gi";
import { useTheme } from "../context/ThemeContext";

const WhyChoose = () => {
  const { theme } = useTheme();

  return (
    <div className="container p-2 md:p-8 w-[80%] mx-auto">
      <div className="text-center mb-12">
        <h2
          className={`text-3xl font-bold ${
            theme === "dark" ? "text-gray-400" : "text-black"
          }`}
        >
          Why Choose Us
        </h2>
        <p
          className={`text-lg mt-2 ${
            theme === "dark" ? "text-gray-300" : "text-gray-600"
          }`}
        >
          Because we care about your safety...
        </p>
      </div>
      <div className="flex flex-col-reverse xl:flex-row gap-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 xl:w-[40%]">
          {/* Card 1 */}
          <motion.div
            className={`card shadow-lg p-6 border rounded-lg hover:shadow-xl transition-shadow ${
              theme === "dark"
                ? "bg-gray-800 border-gray-700 text-gray-300"
                : "bg-white border-gray-200 text-gray-800"
            }`}
            whileHover={{ scale: 1.05 }}
          >
            <RiSurgicalMaskLine size={40} />
            <h3
              className={`font-semibold text-xl ${
                theme === "dark" ? "text-blue-400" : "text-blue-600"
              }`}
            >
              Ensuring Masks
            </h3>
            <p className="text-sm">
              We ensure the use of masks for everyone's safety.
            </p>
          </motion.div>

          {/* Card 2 */}
          <motion.div
            className={`card shadow-lg p-6 border rounded-lg hover:shadow-xl transition-shadow ${
              theme === "dark"
                ? "bg-gray-800 border-gray-700 text-gray-300"
                : "bg-white border-gray-200 text-gray-800"
            }`}
            whileHover={{ scale: 1.05 }}
          >
            <TbClock24 size={40} />
            <h3
              className={`font-semibold text-xl ${
                theme === "dark" ? "text-blue-400" : "text-blue-600"
              }`}
            >
              24/7 Support
            </h3>
            <p className="text-sm">
              We provide 24/7 support to help you at any time.
            </p>
          </motion.div>

          {/* Card 3 */}
          <motion.div
            className={`card shadow-lg p-6 border rounded-lg hover:shadow-xl transition-shadow ${
              theme === "dark"
                ? "bg-gray-800 border-gray-700 text-gray-300"
                : "bg-white border-gray-200 text-gray-800"
            }`}
            whileHover={{ scale: 1.05 }}
          >
            <MdSanitizer size={40} />
            <h3
              className={`font-semibold text-xl ${
                theme === "dark" ? "text-blue-400" : "text-blue-600"
              }`}
            >
              Sanitising Hands & Equipment
            </h3>
            <p className="text-sm">
              We ensure all hands and equipment are sanitised regularly.
            </p>
          </motion.div>

          {/* Card 4 */}
          <motion.div
            className={`card shadow-lg p-6 border rounded-lg hover:shadow-xl transition-shadow ${
              theme === "dark"
                ? "bg-gray-800 border-gray-700 text-gray-300"
                : "bg-white border-gray-200 text-gray-800"
            }`}
            whileHover={{ scale: 1.05 }}
          >
            <GiGloves size={40} />
            <h3
              className={`font-semibold text-xl ${
                theme === "dark" ? "text-blue-400" : "text-blue-600"
              }`}
            >
              Ensuring Gloves
            </h3>
            <p className="text-sm">
              We ensure everyone wears gloves for extra protection.
            </p>
          </motion.div>
        </div>
        <div
          className={`text-center shadow-md rounded-lg xl:w-[60%] ${
            theme === "dark" ? "bg-gray-800" : "bg-white"
          }`}
        >
          <img
            src={service}
            alt="Safety Measures"
            className="mx-auto w-full h-full object-cover rounded-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default WhyChoose;
