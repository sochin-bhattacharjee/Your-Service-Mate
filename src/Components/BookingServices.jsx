import { useContext, useEffect, useState } from "react";
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
    return <div className="flex justify-center items-center h-screen"><span className="loading loading-spinner loading-lg"></span></div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Helmet>
        <title>{user?.displayName} | Booked Services</title>
      </Helmet>
      <h1 className={`text-3xl font-semibold ${theme === "dark" ? "text-blue-400" : "text-blue-700"}`}>Booked Services</h1>
      {bookedServices.length > 0 ? (
        <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6${theme === "dark" ? "bg-gray-800 text-gray-300" : "bg-gray-100 text-gray-900"}`}>
          {bookedServices.map((booking) => (
            <div
              key={booking._id}
              className={`bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl ${theme === "dark" ? "bg-gray-800" : "bg-white"}`}
            >
              <img
                src={booking.serviceImage}
                alt={booking.serviceName}
                className="w-full h-[250px] object-cover object-center rounded-lg"
              />
              <h2 className={`text-lg md:text-xl xl:text-2xl font-semibold ${theme === "dark" ? "text-blue-400" : "text-blue-700"} mt-4`}>
                {booking.serviceName}
              </h2>
              <p className={`mt-2 text-sm md:text-base ${theme === "dark" ? "text-gray-400" : "text-gray-700"}`}>{booking.specialInstruction}</p>
              <p className={`mt-4 text-sm md:text-base xl:text-lg font-medium ${theme === "dark" ? "text-green-400" : "text-green-600"}`}>
                Booking Date: {booking.serviceTakingDate}
              </p>
              <div className="mt-4 flex justify-between">
                <p className={`mt-2 text-sm md:text-base xl:text-lg font-medium ${theme === "dark" ? "text-orange-300" : "text-orange-500"}`}>
                  Price: ${booking.price}
                </p>
                <div>
                  <p className={`mt-2 text-sm md:text-base xl:text-lg font-medium md:font-semibold text-black`}>
                    <span className={`bg-gray-200 px-1 md:px-2 xl:px-3 py-2 xl:py-3 rounded-l-full border-r-2 border-black`}>
                      Status: 
                    </span>
                    <span className={`${
                      booking.serviceStatus === "pending"
                        ? "bg-yellow-600"
                        : booking.serviceStatus === "working"
                        ? "bg-blue-600"
                        : "bg-green-600"
                    } px-1 md:px-2 xl:px-3 py-2 xl:py-3 rounded-r-full`}>
                      {booking.serviceStatus.toUpperCase()}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center flex justify-center items-center text-gray-900 text-2xl font-semibold">
          You haven't booked any services yet.
        </p>
      )}
    </div>
  );
};

export default BookingServices;
