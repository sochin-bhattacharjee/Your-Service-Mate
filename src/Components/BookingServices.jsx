import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../provider/AuthProvider";
import Swal from "sweetalert2";
import useAxiosSecure from "../hooks/useAxiosSecure";

const BookingServices = () => {
  const { user } = useContext(AuthContext);
  const [bookedServices, setBookedServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    if (user?.email) {
      axiosSecure
        .get(`/bookings/${user.email}`)
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
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-semibold text-blue-700">Booked Services</h1>
      {bookedServices.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {bookedServices.map((booking) => (
            <div key={booking._id} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl">
              <img
                src={booking.serviceImage}
                alt={booking.serviceName}
                className="w-full h-[250px] object-cover object-center rounded-lg"
              />
              <h2 className="text-xl font-semibold text-blue-700 mt-4">{booking.serviceName}</h2>
              <p className="mt-2 text-gray-700">{booking.specialInstruction}</p>
              <p className="mt-4 text-lg font-medium text-green-600">Booking Date: {booking.serviceTakingDate}</p>
              <p className="mt-2 text-lg font-medium text-orange-500">Price: ${booking.price}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-lg font-semibold text-gray-500 mt-6">You haven't booked any services yet.</p>
      )}
    </div>
  );
};

export default BookingServices;
