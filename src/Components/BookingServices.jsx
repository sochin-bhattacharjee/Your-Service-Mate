import { useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { AuthContext } from "../provider/AuthProvider";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { Helmet } from "react-helmet";
import { useTheme } from "../context/ThemeContext";

const BookingServices = () => {
  const { user } = useContext(AuthContext);
  const [bookedServices, setBookedServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const axiosSecure = useAxiosSecure();
  const { theme } = useTheme();

  useEffect(() => {
    if (user?.email) {
      axiosSecure
        .get(`/bookings-user/${user.email}`)
        .then((response) => {
          setBookedServices(response.data);
        })
        .catch((error) => {
          if (error.response && error.response.status === 404) {
            setBookedServices([]);
          } else {
            setError("Error fetching booked services.");
            console.error("Error fetching booked services:", error);
          }
        })
        .finally(() => setLoading(false));
    }
  }, [user?.email, axiosSecure]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (error) {
    return <div>{error}</div>;
  }

  const fadeIn = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  const scaleUp = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Helmet>
        <title>{user?.displayName} | Booked Services</title>
      </Helmet>
      <motion.h1
        className={`text-3xl font-semibold mb-3 ${
          theme === "dark" ? "text-blue-400" : "text-blue-700"
        }`}
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        transition={{ duration: 0.5 }}
      >
        Booked Services
      </motion.h1>
      {bookedServices.length > 0 ? (
        <motion.div
          className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6`}
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          transition={{ staggerChildren: 0.1 }}
        >
          {bookedServices.map((booking) => (
            <motion.div
              key={booking._id}
              className={`p-6 rounded-lg shadow-lg ${
                theme === "dark" ? "bg-gray-800" : "bg-white"
              }`}
              variants={scaleUp}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <img
                src={booking.serviceImage}
                alt={booking.serviceName}
                className="w-full h-[250px] object-cover object-center rounded-lg"
              />
              <h2
                className={`text-lg md:text-xl xl:text-2xl font-semibold mt-4 ${
                  theme === "dark" ? "text-blue-400" : "text-blue-700"
                }`}
              >
                {booking.serviceName}
              </h2>
              <p
                className={`mt-2 text-sm md:text-base ${
                  theme === "dark" ? "text-gray-400" : "text-gray-700"
                }`}
              >
                {booking.specialInstruction}
              </p>
              <p
                className={`mt-4 text-sm md:text-base xl:text-lg font-medium ${
                  theme === "dark" ? "text-green-400" : "text-green-600"
                }`}
              >
                Booking Date: {booking.serviceTakingDate}
              </p>
              <div className="mt-4 flex justify-between">
                <p
                  className={`mt-2 text-sm md:text-base xl:text-lg font-medium ${
                    theme === "dark" ? "text-orange-300" : "text-orange-500"
                  }`}
                >
                  Price: ${booking.price}
                </p>
                <div>
                  <p
                    className={`mt-2 text-sm md:text-base xl:text-lg font-medium md:font-semibold text-black`}
                  >
                    <span
                      className={`bg-gray-200 px-1 md:px-2 xl:px-3 py-2 xl:py-3 rounded-l-full border-r-2 border-black`}
                    >
                      Status:
                    </span>
                    <span
                      className={`${
                        booking.serviceStatus === "pending"
                          ? "bg-yellow-600"
                          : booking.serviceStatus === "working"
                          ? "bg-blue-600"
                          : "bg-green-600"
                      } px-1 md:px-2 xl:px-3 py-2 xl:py-3 rounded-r-full`}
                    >
                      {booking.serviceStatus.toUpperCase()}
                    </span>
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <motion.p
          className="text-center flex justify-center items-center text-gray-900 text-2xl font-semibold"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
        >
          You haven't booked any services yet.
        </motion.p>
      )}
    </div>
  );
};

export default BookingServices;
