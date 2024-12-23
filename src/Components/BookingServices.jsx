import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../provider/AuthProvider";

const BookingServices = () => {
  const { user } = useContext(AuthContext);
  const [bookedServices, setBookedServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {

    if (user) {
      const fetchBookedServices = async () => {
        try {
          const response = await fetch(`http://localhost:5000/bookings/${user?.email}`);
          if (response.ok) {
            const data = await response.json();
            setBookedServices(data);
          } else {
            setError("No booked services found.");
          }
        } catch (error) {
          setError("Error fetching booked services.");
        } finally {
          setLoading(false);
        }
      };

      fetchBookedServices();
    }
  }, [user]);

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
