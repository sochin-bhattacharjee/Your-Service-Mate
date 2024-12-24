import { useEffect, useState } from "react";
import ServiceCard from "./serviceCard";
import axios from "axios";
import useAxiosSecure from "../hooks/useAxiosSecure";

const AllServices = () => {
  const [services, setServices] = useState([]);
  const [filteredServices, setFilteredServices] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(1);

  const {baseUrl} = useAxiosSecure();

  // Fetching all services with pagination
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get(
          `${baseUrl}/allServices?page=${currentPage}&itemsPerPage=${itemsPerPage}`
        );
        setServices(response.data.services);
        setFilteredServices(response.data.services);
        setTotalPages(response.data.totalPages);
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };

    fetchServices();
  }, [currentPage, itemsPerPage]);

  // Handle Search
  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);

    const filtered = services.filter((service) =>
      service.name.toLowerCase().includes(query)
    );
    setFilteredServices(filtered);
  };

  // Handle Next Page
  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  // Handle Previous Page
  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  return (
    <div className="container mx-auto p-6">
      {/* Search Box */}
      <div className="sticky top-16 z-10 bg-blue-600 bg-opacity-70 backdrop-blur-md py-4 px-6 rounded-sm shadow-md">
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

      {/* Service Cards */}
      <div className="space-y-6 mt-6">
        {filteredServices.length > 0 ? (
          filteredServices.map((service) => (
            <ServiceCard key={service._id} service={service} />
          ))
        ) : (
          <p className="text-center text-gray-500">
            No services found matching "{searchQuery}"
          </p>
        )}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-between items-center mt-6">
        <button
          className={`btn ${currentPage === 1 ? "btn-disabled" : "btn-primary"}`}
          onClick={handlePrev}
        >
          Previous
        </button>
        <span className="text-lg font-semibold">
          Page {currentPage} of {totalPages}
        </span>
        <button
          className={`btn ${
            currentPage === totalPages ? "btn-disabled" : "btn-primary"
          }`}
          onClick={handleNext}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AllServices;
