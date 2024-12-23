import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';

const fetchServiceDetails = async (id) => {
  const response = await fetch(`http://localhost:5000/service/${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch service details');
  }
  return response.json();
};

const ServiceDetails = () => {
  const { id } = useParams();
  const { data: service, isError, isLoading, error } = useQuery({
    queryKey: ['serviceDetails', id],
    queryFn: () => fetchServiceDetails(id),
  });

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen text-lg font-semibold text-gray-500">Loading...</div>;
  }

  if (isError) {
    Swal.fire('Error!', error.message, 'error');
    return <div className="flex justify-center items-center h-screen text-lg font-semibold text-red-500">Error: {error.message}</div>;
  }

  return (
    <div className="container mx-auto p-8 bg-gray-50 min-h-screen">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <img src={service.imageUrl} alt={service.name} className="w-full h-64 object-cover rounded-md mb-4" />
        <h2 className="text-3xl font-bold text-gray-800 mb-4">{service.name}</h2>
        <p className="text-gray-700 mb-4">{service.description}</p>
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
    </div>
  );
};

export default ServiceDetails;
