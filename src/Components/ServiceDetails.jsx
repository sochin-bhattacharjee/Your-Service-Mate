import { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import { AuthContext } from "../provider/AuthProvider";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { Helmet } from "react-helmet";

const ServiceDetails = () => {
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();

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
      console.log(response.data)

      if (response.data) {
        Swal.fire("Success!", "Your booking is confirmed!", "success");
        setShowModal(false);
      } 
      else {
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
    <div className="container mx-auto p-6">
      <Helmet>
        <title>{service.name} Details</title>
      </Helmet>
      <div className="bg-white shadow-lg rounded-lg p-6 transform transition-all hover:shadow-xl">
        <img
          src={service.imageUrl}
          alt={service.name}
          className="w-full h-[400px] md:h-[600px] object-cover rounded-lg"
        />
        <h2 className="text-3xl font-semibold mt-4 text-blue-700">{service.name}</h2>
        <p className="mt-2 text-gray-700">{service.description}</p>
        <div className="flex items-center mt-4">
          <img
            src={service.providerImage}
            alt={service.providerName}
            className="w-12 h-12 rounded-full object-cover object-center border-2 border-blue-950 mr-3"
          />
          <div>
            <p className="text-xl font-semibold text-gray-900">{service.providerName}</p>
            <p className="text-sm text-gray-500">{service.providerEmail}</p>
          </div>
        </div>
        <p className="mt-4 text-lg font-medium text-green-600">Location: {service.area}</p>
        <div className="flex justify-between items-center mt-6">
          <p className="text-lg md:text-2xl font-bold text-orange-500">Price: ${service.price}</p>
          <button
            onClick={handleBookNow}
            className="px-3 sm:px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all"
          >
            Book Now
          </button>
        </div>
      </div>

      {showModal && (
        <div className="fixed mt-10 inset-0 bg-black bg-opacity-50 flex items-center justify-center overflow-y-auto">
          <div className="bg-white p-8 rounded-md shadow-xl sm:w-[600px] max-h-[80vh] overflow-y-auto relative transform transition-all hover:scale-105">
            <h3 className="text-2xl font-bold text-blue-700 mb-6">Book Service</h3>
            <form
              onSubmit={handleSubmit((data) => {
                if (validateDate(data.serviceTakingDate)) {
                  handlePurchase(data);
                }
              })}
            >
              <div className="mt-4">
                <label className="block text-sm font-semibold text-gray-800">Service ID</label>
                <input
                  type="text"
                  value={service._id}
                  readOnly
                  className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="mt-4">
                <label className="block text-sm font-semibold text-gray-800">Service Name</label>
                <input
                  type="text"
                  value={service.name}
                  readOnly
                  className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="mt-4">
                <label className="block text-sm font-semibold text-gray-800">Your Email</label>
                <input
                  type="text"
                  value={user?.email || "guest@example.com"}
                  readOnly
                  className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="mt-4">
                <label className="block text-sm font-semibold text-gray-800">Service Taking Date</label>
                <input
                  type="date"
                  {...register("serviceTakingDate", { required: "Date is required" })}
                  className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.serviceTakingDate && (
                  <p className="text-red-500 text-sm">{errors.serviceTakingDate.message}</p>
                )}
              </div>
              <div className="mt-4">
                <label className="block text-sm font-semibold text-gray-800">Special Instructions</label>
                <textarea
                  {...register("specialInstruction")}
                  rows="4"
                  className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="mt-6 flex justify-between gap-2 items-center">
                <button
                  type="submit"
                  className="px-3 md:px-6 py-3 bg-blue-600 text-sm md:text-base text-white rounded-lg hover:bg-blue-700 transition-all"
                >
                  Confirm Booking
                </button>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-6 py-3 bg-red-600 text-sm md:text-base text-white rounded-lg hover:bg-red-700 transition-all"
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
