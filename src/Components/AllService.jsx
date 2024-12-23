import { useEffect, useState } from "react";
import ServiceCard from "./serviceCard";
import axios from "axios";

const AllServices = () => {
  const [services, setServices] = useState([]);
  const [filteredServices, setFilteredServices] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  // Fetching all services
  useEffect(() => {
    axios
      .get("http://localhost:5000/allServices")
      .then((response) => {
        setServices(response.data);
        setFilteredServices(response.data);
      })
      .catch((error) => console.error(error));
  }, []);

  // Search work here
  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);

    const filtered = services.filter((service) =>
      service.name.toLowerCase().includes(query)
    );
    setFilteredServices(filtered);
  };

  return (
    <div className="container mx-auto p-6">
      <div
        className="sticky top-16 z-10 bg-blue-600 bg-opacity-70 backdrop-blur-md py-4 px-6 rounded-sm shadow-md"
      >
        <div className="flex flex-col md:flex-row justify-between items-center">
          <h2 className="text-3xl font-bold text-white mb-4 md:mb-0">
            All Services
          </h2>
          <div>
            <input
              type="text"
              placeholder="Search services by name..."
              value={searchQuery}
              onChange={handleSearch}
              className="input input-bordered w-full max-w-md"
            />
          </div>
        </div>
      </div>

      <div className="space-y-6 mt-6">
        {filteredServices.length > 0 ? (
          filteredServices.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))
        ) : (
          <p className="text-center text-gray-500">
            No services found matching "{searchQuery}"
          </p>
        )}
      </div>
    </div>
  );
};

export default AllServices;
