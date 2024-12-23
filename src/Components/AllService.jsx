import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const fetchServices = async () => {
  const response = await fetch('http://localhost:5000/allServices');
  if (!response.ok) {
    throw new Error('Failed to fetch services');
  }
  return response.json();
};

const AllService = () => {
  const { data: services, isError, isLoading, error } = useQuery({
    queryKey: ['services'],
    queryFn: fetchServices,
  });

  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen text-lg font-semibold text-gray-500">Loading...</div>;
  }

  if (isError) {
    Swal.fire('Error!', error.message, 'error');
    return <div className="flex justify-center items-center h-screen text-lg font-semibold text-red-500">Error: {error.message}</div>;
  }

  const filteredServices = services.filter((service) =>
    service.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto p-8 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-8 bg-gradient-to-r from-blue-600 to-blue-800 text-white p-4 rounded-lg shadow-md sticky top-16">
        <h2 className="text-3xl font-bold">All Services</h2>
        <input
          type="text"
          placeholder="Search services..."
          className="input input-bordered w-full max-w-md rounded-lg px-4 py-2 text-gray-700 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 gap-8">
        {filteredServices.length > 0 ? (
          filteredServices.map((service) => (
            <div
              key={service._id}
              className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 hover:shadow-xl transition-shadow"
            >
              <img
                src={service.imageUrl}
                alt={service.name}
                className="w-full h-48 object-cover rounded-md mb-4"
              />
              <h3 className="text-2xl font-semibold mb-3 text-gray-800">{service.name}</h3>
              <p className="text-gray-600 text-sm mb-4">
                {service.description.length > 100
                  ? `${service.description.slice(0, 100)}...`
                  : service.description}
              </p>
              <div className="text-center mb-6">
                <button
                  className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-sm hover:bg-blue-700 hover:shadow-md transition"
                  onClick={() => navigate(`/details/${service._id}`)}
                >
                  View Detail
                </button>
              </div>
              <div className="flex items-center mb-4">
                <img
                  src={service.providerImage}
                  alt="Provider"
                  className="w-12 h-12 rounded-full border-2 border-blue-500 mr-4"
                />
                <div>
                  <p className="text-sm font-medium text-gray-800">{service.providerName}</p>
                  <p className="text-xs text-gray-500">{service.providerEmail}</p>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-sm text-gray-600 italic">{service.area}</p>
                <p className="text-xl font-bold text-blue-700">{`$${service.price}`}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 text-lg font-semibold">No services found.</p>
        )}
      </div>
    </div>
  );
};

export default AllService;
