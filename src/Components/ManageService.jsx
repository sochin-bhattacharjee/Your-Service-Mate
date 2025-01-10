import { useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import { AuthContext } from "../provider/AuthProvider";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { Helmet } from "react-helmet";
import { useTheme } from "../context/ThemeContext"; 

const ManageService = () => {
  const { user } = useContext(AuthContext);
  const { theme } = useTheme();
  const [services, setServices] = useState([]);
  const [editingService, setEditingService] = useState(null);
  const [formData, setFormData] = useState({});
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    if (user?.email) {
      axiosSecure
        .get(`/services/${user.email}`)
        .then((response) => {
          if (Array.isArray(response.data)) {
            setServices(response.data);
          } else {
            console.error("Expected an array but got:", response.data);
            setServices([]);
          }
        })
        .catch((error) => {
          console.error("Error fetching provider services:", error);
          setServices([]);
        });
    }
  }, [user?.email, axiosSecure]);

  const openEditModal = (service) => {
    setEditingService(service);
    setFormData(service);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    const dataToSend = { ...formData };
    delete dataToSend._id;

    axiosSecure
      .put(`/service/${editingService._id}`, dataToSend)
      .then(() => {
        setServices((prev) =>
          prev.map((srv) =>
            srv._id === editingService._id ? { ...srv, ...formData } : srv
          )
        );
        Swal.fire("Updated!", "Service updated successfully.", "success");
        closeEditModal();
      })
      .catch((error) => {
        console.error("Error updating service:", error);
        Swal.fire("Error!", "Failed to update service.", "error");
      });
  };

  const closeEditModal = () => {
    setEditingService(null);
    setFormData({});
  };

  const handleDelete = (serviceId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .delete(`/service/${serviceId}`)
          .then(() => {
            setServices((prev) =>
              prev.filter((service) => service._id !== serviceId)
            );
            Swal.fire("Deleted!", "Service has been deleted.", "success");
          })
          .catch((error) => {
            console.error("Error deleting service:", error);
            Swal.fire("Error!", "Failed to delete service.", "error");
          });
      }
    });
  };

  const fadeIn = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  const scaleUp = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
  };

  return (
    <div
      className={`container mx-auto p-4 sm:p-6 lg:p-8`}
    >
      <Helmet>
        <title>{user?.displayName} | Manage Services</title>
      </Helmet>
      <motion.h2
        className={`text-3xl font-bold text-center ${
          theme === "dark" ? "text-blue-400" : "text-blue-600"
        } mb-6`}
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        transition={{ duration: 0.5 }}
      >
        Manage Services
      </motion.h2>

      {services.length > 0 ? (
        <motion.div
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          transition={{ staggerChildren: 0.1 }}
        >
          {services.map((service) => (
            <motion.div
              key={service._id}
              className={`p-4 rounded-lg shadow-md ${
                theme === "dark" ? "bg-gray-800" : "bg-white"
              } flex flex-col justify-between`}
              variants={scaleUp}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <img
                src={service.imageUrl}
                alt={service.name}
                className="w-full h-40 sm:h-48 md:h-56 object-center object-cover rounded-md mb-4"
              />
              <div>
                <h3
                  className={`text-xl font-semibold mb-2 ${
                    theme === "dark" ? "text-gray-200" : "text-gray-800"
                  }`}
                >
                  {service.name}
                </h3>
                <p
                  className={`text-sm ${
                    theme === "dark" ? "text-gray-400" : "text-gray-600"
                  } mb-1`}
                >
                  Price: ${service.price}
                </p>
                <p
                  className={`text-sm ${
                    theme === "dark" ? "text-gray-400" : "text-gray-600"
                  } mb-1`}
                >
                  Area: {service.area}
                </p>
                <p
                  className={`text-sm ${
                    theme === "dark" ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  Provider: {service.providerName}
                </p>
              </div>
              <div className="mt-4 flex justify-between gap-2">
                <button
                  onClick={() => openEditModal(service)}
                  className="btn bg-blue-500 hover:bg-blue-600 text-white font-bold"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(service._id)}
                  className="btn btn-error hover:bg-red-600 text-white font-bold"
                >
                  Delete
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <motion.p
          className={`text-center ${
            theme === "dark" ? "text-gray-200" : "text-gray-900"
          } text-2xl font-semibold`}
          initial="hidden"
          animate="visible"
          variants={fadeIn}
        >
          No services found.
        </motion.p>
      )}

      {editingService && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-y-auto"
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={fadeIn}
        >
          <div
            className={`bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl mt-10 relative ${
              theme === "dark" ? "bg-gray-800" : "bg-white"
            }`}
          >
            <h3
              className={`text-lg font-bold mb-4 ${
                theme === "dark" ? "text-gray-200" : "text-gray-800"
              }`}
            >
              Edit Service
            </h3>
            <div className="space-y-4 max-h-[70vh] overflow-y-auto px-4">
              {Object.keys(formData)
                .filter((key) => key !== "_id")
                .map((key) => (
                  <div key={key}>
                    <label
                      className={`block font-medium capitalize ${
                        theme === "dark" ? "text-gray-300" : "text-gray-700"
                      }`}
                    >
                      {key}
                    </label>
                    <input
                      type="text"
                      name={key}
                      value={formData[key] || ""}
                      onChange={handleInputChange}
                      className={`input input-bordered w-full ${
                        theme === "dark" ? "input-dark" : "input-light"
                      }`}
                    />
                  </div>
                ))}
            </div>
            <div className="flex justify-end mt-4 gap-2">
              <button onClick={closeEditModal} className="btn btn-ghost">
                Cancel
              </button>
              <button onClick={handleSave} className="btn btn-primary">
                Save
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default ManageService;
