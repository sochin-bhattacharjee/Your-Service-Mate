import { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import { AuthContext } from "../provider/AuthProvider";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { Helmet } from "react-helmet";
import { useTheme } from "../context/ThemeContext";

const ServiceDetails = () => {
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const { theme } = useTheme(); // Access theme context

  const fetchServiceDetails = async (id) => {
    try {
      const response = await axiosSecure.get(`/service/${id}`);
      return response.data;
    } catch (error) {
      throw new Error("Failed to fetch service details" + error.message);
    }
  };

  const { data: service, isLoading, isError, error } = useQuery({
    queryKey: ["serviceDetails", id],
    queryFn: () => fetchServiceDetails(id),
  });

  const [showModal, setShowModal] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();

  const handleBookNow = () => {
    setShowModal(true);
  };

  const validateDate = (date) => {
    const currentDate = new Date();
    const selectedDate = new Date(date);
    if (selectedDate < currentDate) {
      setError("serviceTakingDate", {
        type: "manual",
        message: "Booking date cannot be in the past",
      });
      return false;
    }
    return true;
  };

  const handlePurchase = async (data) => {
    const bookingData = {
      serviceId: service._id,
      serviceName: service.name,
      serviceImage: service.imageUrl,
      providerEmail: service.providerEmail,
      providerName: service.providerName,
      userEmail: user?.email || "guest@example.com",
      userName: user?.displayName || "Guest User",
      serviceTakingDate: data.serviceTakingDate,
      specialInstruction: data.specialInstruction,
      price: service.price,
      serviceStatus: "pending",
    };

    try {
      const response = await axiosSecure.post(`/bookings`, bookingData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.data) {
        Swal.fire("Success!", "Your booking is confirmed!", "success");
        setShowModal(false);
      } else {
        Swal.fire("Error!", "Booking failed. Please try again.", "error");
      }
    } catch (error) {
      console.error("Error during booking:", error);
      Swal.fire(
        "Error!",
        error.response?.data?.message || "Booking failed. Please try again.",
        "error"
      );
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div
      className={`container mx-auto p-6`}
    >
      <Helmet>
        <title>{service.name} Details</title>
      </Helmet>
      <div
        className={`shadow-lg rounded-lg p-6 transform transition-all hover:shadow-xl ${
          theme === "dark" ? "bg-gray-800" : "bg-white"
        }`}
      >
        <img
          src={service.imageUrl}
          alt={service.name}
          className="w-full h-[400px] md:h-[600px] object-cover rounded-lg"
        />
        <h2
          className={`text-3xl font-semibold mt-4 ${
            theme === "dark" ? "text-blue-300" : "text-blue-700"
          }`}
        >
          {service.name}
        </h2>
        <p className="mt-2">{service.description}</p>
        <div className="flex items-center mt-4">
          <img
            src={service.providerImage}
            alt={service.providerName}
            className="w-12 h-12 rounded-full object-cover object-center border-2 mr-3"
            style={{ borderColor: theme === "dark" ? "#1E40AF" : "#1F2937" }}
          />
          <div>
            <p className="text-xl font-semibold">{service.providerName}</p>
            <p className="text-sm">{service.providerEmail}</p>
          </div>
        </div>
        <p className="mt-4 text-lg font-medium text-green-600">
          Location: {service.area}
        </p>
        <div className="flex justify-between items-center mt-6">
          <p className="text-lg md:text-2xl font-bold text-orange-500">
            Price: ${service.price}
          </p>
          <button
            onClick={handleBookNow}
            className={`px-3 sm:px-6 py-3 rounded-lg transition-all ${
              theme === "dark"
                ? "bg-blue-600 hover:bg-blue-700 text-white"
                : "bg-blue-500 hover:bg-blue-600 text-white"
            }`}
          >
            Book Now
          </button>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center overflow-y-auto">
          <div
            className={`p-8 rounded-md shadow-xl sm:w-[600px] max-h-[80vh] overflow-y-auto relative transform transition-all ${
              theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-black"
            }`}
          >
            <h3
              className={`text-2xl font-bold mb-6 ${
                theme === "dark" ? "text-blue-300" : "text-blue-700"
              }`}
            >
              Book Service
            </h3>
            <form
              onSubmit={handleSubmit((data) => {
                if (validateDate(data.serviceTakingDate)) {
                  handlePurchase(data);
                }
              })}
            >
              <div className="mt-4">
                <label className="block text-sm font-semibold">Service ID</label>
                <input
                  type="text"
                  value={service._id}
                  readOnly
                  className="w-full border p-3 rounded-lg focus:outline-none"
                />
              </div>
              <div className="mt-4">
                <label className="block text-sm font-semibold">Service Name</label>
                <input
                  type="text"
                  value={service.name}
                  readOnly
                  className="w-full border p-3 rounded-lg focus:outline-none"
                />
              </div>
              <div className="mt-4">
                <label className="block text-sm font-semibold">Your Email</label>
                <input
                  type="text"
                  value={user?.email || "guest@example.com"}
                  readOnly
                  className="w-full border p-3 rounded-lg focus:outline-none"
                />
              </div>
              <div className="mt-4">
                <label className="block text-sm font-semibold">
                  Service Taking Date
                </label>
                <input
                  type="date"
                  {...register("serviceTakingDate", { required: "Date is required" })}
                  className="w-full border p-3 rounded-lg focus:outline-none"
                />
                {errors.serviceTakingDate && (
                  <p className="text-red-500 text-sm">{errors.serviceTakingDate.message}</p>
                )}
              </div>
              <div className="mt-4">
                <label className="block text-sm font-semibold">
                  Special Instructions
                </label>
                <textarea
                  {...register("specialInstruction")}
                  rows="4"
                  className="w-full border p-3 rounded-lg focus:outline-none"
                />
              </div>
              <div className="mt-6 flex justify-between gap-2 items-center">
                <button
                  type="submit"
                  className={`px-3 md:px-6 py-3 rounded-lg transition-all ${
                    theme === "dark"
                      ? "bg-blue-600 hover:bg-blue-700 text-white"
                      : "bg-blue-500 hover:bg-blue-600 text-white"
                  }`}
                >
                  Confirm Booking
                </button>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className={`px-6 py-3 rounded-lg transition-all ${
                    theme === "dark"
                      ? "bg-red-600 hover:bg-red-700 text-white"
                      : "bg-red-500 hover:bg-red-600 text-white"
                  }`}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ServiceDetails;
