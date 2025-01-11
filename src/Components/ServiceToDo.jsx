import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../provider/AuthProvider";
import Swal from "sweetalert2";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";

const ServiceToDo = () => {
  const { user } = useContext(AuthContext);
  const [bookedServices, setBookedServices] = useState([]);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    if (user?.email) {
      axiosSecure
        .get(`/bookings-provider/${user.email}`)
        .then((response) => setBookedServices(response.data))
        .catch((error) => console.error("Error fetching booked services:", error));
    }
  }, [user?.email, axiosSecure]);

  const handleStatusChange = (bookingId, newStatus) => {
    axiosSecure
      .put(`/bookings/${bookingId}`, { serviceStatus: newStatus })
      .then(() => {
        setBookedServices((prev) =>
          prev.map((service) =>
            service._id === bookingId ? { ...service, serviceStatus: newStatus } : service
          )
        );
        Swal.fire("Updated!", "Service status updated successfully!", "success");
      })
      .catch((error) => {
        console.error("Error updating service status:", error);
        Swal.fire("Error!", "Failed to update service status.", "error");
      });
  };

  const getStatusStyles = (serviceStatus) => {
    switch (serviceStatus) {
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

  const fadeIn = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="container mx-auto p-4 md:p-6">
      <Helmet>
        <title>{user?.displayName} | Service To Do</title>
      </Helmet>
      <motion.h2
        className="text-2xl md:text-3xl font-bold text-start text-blue-600 mb-4 md:mb-6"
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        transition={{ duration: 0.5 }}
      >
        Service To Do
      </motion.h2>

      {bookedServices.length > 0 ? (
        <motion.div
          className="space-y-4"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          transition={{ staggerChildren: 0.1 }}
        >
          {bookedServices.map((service) => (
            <motion.div
              key={service._id}
              className={`flex flex-col sm:flex-row items-center gap-4 p-4 rounded-lg shadow-md ${getStatusStyles(
                service.serviceStatus
              )}`}
              variants={fadeIn}
              transition={{ duration: 0.3 }}
            >
              <div className="w-full h-36 sm:w-16 sm:h-16 flex-shrink-0">
                <img
                  src={service.serviceImage || "/placeholder.png"}
                  alt={service.serviceName}
                  className="w-full h-full object-cover border-2 border-blue-950 rounded-md"
                />
              </div>

              <div className="flex flex-col sm:flex-row justify-between gap-2 sm:gap-0 sm:items-center w-full">
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

                <div>
                  <select
                    value={service.serviceStatus}
                    onChange={(e) => handleStatusChange(service._id, e.target.value)}
                    className={`select select-bordered border-2 border-gray-600 ${getStatusStyles(service.serviceStatus)}`}
                  >
                    <option value="pending">Pending</option>
                    <option value="working">Working</option>
                    <option value="completed">Completed</option>
                  </select>
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
          No booked services found for you.
        </motion.p>
      )}
    </div>
  );
};

export default ServiceToDo;
