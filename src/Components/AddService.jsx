import React, { useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";
import Swal from "sweetalert2";

const AddService = () => {
  const [service, setService] = useState({
    imageUrl: "",
    name: "",
    price: "",
    area: "",
    description: "",
  });

  const { user } = useContext(AuthContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setService((prevService) => ({
      ...prevService,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const serviceData = {
      ...service,
      providerName: user?.displayName,
      providerEmail: user?.email,
      providerImage: user?.photoURL,
    };

    try {
      const response = await fetch("http://localhost:5000/addService", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(serviceData),
      });

      if (response.ok) {
        Swal.fire("Success!", "Service has been added successfully.", "success");
        setService({
          imageUrl: "",
          name: "",
          price: "",
          area: "",
          description: "",
        });
      } else {
        Swal.fire("Error!", "Failed to add service. Try again.", "error");
      }
    } catch (error) {
      Swal.fire("Error!", "Could not connect to server.", "error");
    }
  };

  return (
    <div className="container mx-auto p-8">
      <h2 className="text-3xl font-semibold text-center text-blue-600 mb-6">Add a New Service</h2>
      <form onSubmit={handleSubmit} className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-xl border border-gray-200">
        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2" htmlFor="imageUrl">
            Image URL
          </label>
          <input
            type="text"
            id="imageUrl"
            name="imageUrl"
            value={service.imageUrl}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter image URL"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2" htmlFor="name">
            Service Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={service.name}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter service name"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2" htmlFor="price">
            Price
          </label>
          <input
            type="number"
            id="price"
            name="price"
            value={service.price}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter service price"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2" htmlFor="area">
            Service Area
          </label>
          <input
            type="text"
            id="area"
            name="area"
            value={service.area}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter service area"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2" htmlFor="description">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={service.description}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="5"
            placeholder="Enter service description"
            required
          ></textarea>
        </div>

        <div className="text-center">
          <button
            type="submit"
            className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg text-lg font-semibold hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-500"
          >
            Add Service
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddService;
