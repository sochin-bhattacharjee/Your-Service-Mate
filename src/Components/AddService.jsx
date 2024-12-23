import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../provider/AuthProvider";
import Swal from "sweetalert2";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddService = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  // Refresh data after service addition
  const { refetch } = useQuery({
    queryKey: ["addService"],
    queryFn: async () => {
      const response = await axios.get("http://localhost:5000/services"); // Replace with correct endpoint
      return response.data;
    },
    enabled: false, // Manual trigger
  });

  const onSubmit = async (data) => {
    const serviceData = {
      ...data,
      providerName: user?.displayName || "Anonymous",
      providerEmail: user?.email || "Unknown",
      providerImage: user?.photoURL || "",
    };

    try {
      const response = await axios.post(
        "http://localhost:5000/addService",
        serviceData
      );

      if (response.status === 200 || response.status === 201) {
        // Successful addition
        Swal.fire({
          title: "Success!",
          text: "Service has been added successfully.",
          icon: "success",
        }).then(() => {
          reset(); // Reset form
          refetch(); // Refresh data
          navigate("/allServices"); // Navigate to All Services
        });
      } else {
        // Handle unexpected status codes
        console.error("Unexpected response:", response);
        Swal.fire({
          title: "Error!",
          text: `Unexpected status: ${response.status}`,
          icon: "error",
        });
      }
    } catch (error) {
      if (error.response) {
        // Backend error
        console.error("Error from backend:", error.response);
        Swal.fire({
          title: "Error!",
          text: error.response.data?.message || "Failed to add service. Try again.",
          icon: "error",
        });
      } else {
        // Network or other errors
        console.error("Error during request:", error);
        Swal.fire({
          title: "Error!",
          text: "An unexpected error occurred. Try again.",
          icon: "error",
        });
      }
    }
  };

  return (
    <div className="container mx-auto p-8">
      <h2 className="text-3xl font-semibold text-center text-blue-600 mb-6">
        Add a New Service
      </h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-xl border border-gray-200"
      >
        {/* Image URL */}
        <div className="mb-6">
          <label
            className="block text-gray-700 font-medium mb-2"
            htmlFor="imageUrl"
          >
            Image URL
          </label>
          <input
            {...register("imageUrl", { required: "Image URL is required" })}
            type="text"
            id="imageUrl"
            className="input input-bordered w-full"
            placeholder="Enter image URL"
          />
          {errors.imageUrl && (
            <p className="text-red-600 text-sm">{errors.imageUrl.message}</p>
          )}
        </div>

        {/* Service Name */}
        <div className="mb-6">
          <label
            className="block text-gray-700 font-medium mb-2"
            htmlFor="name"
          >
            Service Name
          </label>
          <input
            {...register("name", { required: "Service Name is required" })}
            type="text"
            id="name"
            className="input input-bordered w-full"
            placeholder="Enter service name"
          />
          {errors.name && (
            <p className="text-red-600 text-sm">{errors.name.message}</p>
          )}
        </div>

        {/* Price */}
        <div className="mb-6">
          <label
            className="block text-gray-700 font-medium mb-2"
            htmlFor="price"
          >
            Price
          </label>
          <input
            {...register("price", {
              required: "Price is required",
              valueAsNumber: true,
            })}
            type="number"
            id="price"
            className="input input-bordered w-full"
            placeholder="Enter service price"
          />
          {errors.price && (
            <p className="text-red-600 text-sm">{errors.price.message}</p>
          )}
        </div>

        {/* Service Area */}
        <div className="mb-6">
          <label
            className="block text-gray-700 font-medium mb-2"
            htmlFor="area"
          >
            Service Area
          </label>
          <input
            {...register("area", { required: "Service Area is required" })}
            type="text"
            id="area"
            className="input input-bordered w-full"
            placeholder="Enter service area"
          />
          {errors.area && (
            <p className="text-red-600 text-sm">{errors.area.message}</p>
          )}
        </div>

        {/* Description */}
        <div className="mb-6">
          <label
            className="block text-gray-700 font-medium mb-2"
            htmlFor="description"
          >
            Description
          </label>
          <textarea
            {...register("description", { required: "Description is required" })}
            id="description"
            className="textarea textarea-bordered w-full"
            rows="5"
            placeholder="Enter service description"
          ></textarea>
          {errors.description && (
            <p className="text-red-600 text-sm">{errors.description.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button type="submit" className="btn btn-primary w-full">
            Add Service
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddService;