import { useContext, useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { AuthContext } from "../provider/AuthProvider";
import useAxiosSecure from "../hooks/useAxiosSecure";

const ManageService = () => {
  const { user } = useContext(AuthContext);
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
    console.log(editingService._id);
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

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">
        Manage Services
      </h2>

      {services.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <div
              key={service._id}
              className="p-4 rounded-lg shadow-md bg-white flex flex-col justify-between"
            >
              <img
                src={service.imageUrl}
                alt={service.name}
                className="w-full h-40 md:h-56 object-center object-cover rounded-md mb-4"
              />
              <div>
                <h3 className="text-xl font-semibold">{service.name}</h3>
                <p className="text-sm text-gray-500">Price: ${service.price}</p>
                <p className="text-sm text-gray-500">Area: {service.area}</p>
                <p className="text-sm text-gray-500">
                  Provider: {service.providerName}
                </p>
              </div>
              <div className="mt-4 flex justify-between gap-2">
                <button
                  onClick={() => openEditModal(service)}
                  className="btn btn-info btn-sm"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(service._id)}
                  className="btn btn-error btn-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No services found.</p>
      )}

      {editingService && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-y-auto">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl mt-10 relative">
            <h3 className="text-lg font-bold mb-4">Edit Service</h3>
            <div className="space-y-4 max-h-[70vh] overflow-y-auto px-4">
              {Object.keys(formData)
                .filter((key) => key !== "_id")
                .map((key) => (
                  <div key={key}>
                    <label className="block font-medium capitalize">
                      {key}
                    </label>
                    <input
                      type="text"
                      name={key}
                      value={formData[key] || ""}
                      onChange={handleInputChange}
                      className="input input-bordered w-full"
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
        </div>
      )}
    </div>
  );
};

export default ManageService;
