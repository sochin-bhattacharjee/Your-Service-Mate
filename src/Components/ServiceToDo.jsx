import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../provider/AuthProvider";
import Swal from "sweetalert2";
import useAxiosSecure from "../hooks/useAxiosSecure";

const ServiceToDo = () => {
  const { user } = useContext(AuthContext);
  const [bookedServices, setBookedServices] = useState([]);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    if (user?.email) {
      axiosSecure
        .get(`/bookings/${user.email}`)
        .then((response) => setBookedServices(response.data))
        .catch((error) => console.error("Error fetching booked services:", error));
    }
  }, [user?.email, axiosSecure]);

  const handleStatusChange = (bookingId, newStatus) => {
    axiosSecure
      .put(`/bookings/${bookingId}`, { status: newStatus })
      .then(() => {
        setBookedServices((prev) =>
          prev.map((service) =>
            service._id === bookingId ? { ...service, status: newStatus } : service
          )
        );
        Swal.fire("Updated!", "Service status updated successfully!", "success");
      })
      .catch((error) => {
        console.error("Error updating service status:", error);
        Swal.fire("Error!", "Failed to update service status.", "error");
      });
  };

  const getStatusStyles = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-200 text-yellow-800";
      case "working":
        return "bg-blue-200 text-blue-800";
      case "completed":
        return "bg-green-200 text-green-800";
      default:
        return "bg-yellow-200 text-yellow-800";
    }
  };

  return (
    <div className="container mx-auto p-4 md:p-6">
      <h2 className="text-2xl md:text-3xl font-bold text-center text-blue-600 mb-4 md:mb-6">
        Service To Do
      </h2>

      {bookedServices.length > 0 ? (
        <div className="space-y-4">
          {bookedServices.map((service) => (
            <div
              key={service._id}
              className={`flex flex-col md:flex-row items-start md:items-center gap-4 p-4 rounded-lg shadow-md ${getStatusStyles(
                service.status
              )}`}
            >

              <div className="w-16 h-16 flex-shrink-0">
                <img
                  src={service.serviceImage || "/placeholder.png"}
                  alt={service.serviceName}
                  className="w-full h-full object-cover border-2 border-blue-950 rounded-md"
                />
              </div>

              <div className="flex-grow">
                <h3 className="text-lg font-semibold">{service.serviceName}</h3>
                <p className="text-sm">
                  <span className="font-medium">Client:</span> {service.userEmail}
                </p>
                <p className="text-sm">
                  <span className="font-medium">Booking Date:</span>{" "}
                  {new Date(service.serviceTakingDate).toLocaleDateString()}
                </p>
              </div>

              <div className="flex justify-center items-center md:self-start">
                <select
                  value={service.status}
                  onChange={(e) => handleStatusChange(service._id, e.target.value)}
                  className={`select select-bordered border-2 border-gray-600 ${getStatusStyles(service.status)}`}
                >
                  <option value="pending">Pending</option>
                  <option value="working">Working</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">
          No booked services found for you.
        </p>
      )}
    </div>
  );
};

export default ServiceToDo;
