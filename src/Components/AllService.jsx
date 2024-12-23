import React from 'react';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';

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
    queryFn: fetchServices
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    Swal.fire("Error!", error.message, "error");
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="container mx-auto p-8">
      <h2 className="text-2xl font-bold text-center mb-6">All Services</h2>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => (
          <div key={service._id} className="bg-white p-6 rounded-lg shadow-md">
            <img src={service.imageUrl} alt={service.name} className="w-full h-48 object-cover rounded-md mb-4" />
            <h3 className="text-xl font-semibold mb-2">{service.name}</h3>
            <p className="text-gray-600 text-sm mb-2">
              {service.description.length > 100 ? `${service.description.slice(0, 100)}...` : service.description}
            </p>
            <div className="text-center mb-4">
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg">
                View Detail
              </button>
            </div>
            <div className="flex items-center mb-4">
              <img
                src={service.providerImage}
                alt="Provider"
                className="w-10 h-10 rounded-full mr-2"
              />
              <div>
                <p className="text-sm font-semibold">{service.providerName}</p>
                <p className="text-xs text-gray-500">{service.providerEmail}</p>
              </div>
            </div>
            <div className="flex justify-between">
              <p className="text-sm text-gray-600">{service.area}</p>
              <p className="text-lg font-semibold text-blue-600">{`$${service.price}`}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllService;
