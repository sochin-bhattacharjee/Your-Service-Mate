import { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import { AuthContext } from "../provider/AuthProvider";

const fetchServiceDetails = async (id) => {
  const response = await fetch(`http://localhost:5000/service/${id}`);
  if (!response.ok) {
    throw new Error("Failed to fetch service details");
  }
  return response.json();
};

const ServiceDetails = () => {
    const { user } = useContext(AuthContext);
  const { id } = useParams();
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

    const response = await fetch("http://localhost:5000/bookings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bookingData),
    });

    if (response.ok) {
      Swal.fire("Success!", "Your booking is confirmed!", "success");
      setShowModal(false);
    } else {
      Swal.fire("Error!", "Booking failed. Please try again.", "error");
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
                <label className="block text-sm font-semibold text-gray-800">Service Image</label>
                <input
                  type="text"
                  value={service.imageUrl}
                  readOnly
                  className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="mt-4">
                <label className="block text-sm font-semibold text-gray-800">Provider Email</label>
                <input
                  type="text"
                  value={service.providerEmail}
                  readOnly
                  className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="mt-4">
                <label className="block text-sm font-semibold text-gray-800">Provider Name</label>
                <input
                  type="text"
                  value={service.providerName}
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
                <label className="block text-sm font-semibold text-gray-800">Your Name</label>
                <input
                  type="text"
                  value={user?.displayName || "Guest User"}
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
                ></textarea>
              </div>
              <div className="mt-6 flex justify-between items-center">
                <p className="font-bold text-base md:text-lg">Price: ${service.price}</p>
                <button
                  type="submit"
                  className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-all"
                >
                  Purchase
                </button>
              </div>
            </form>
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-[calc(20px+1rem)] right-4 text-gray-500 text-3xl"
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ServiceDetails;
