import { useEffect, useState } from "react";
import ServiceCard from "./serviceCard";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { Helmet } from "react-helmet";
import { GrChapterNext, GrChapterPrevious } from "react-icons/gr";
import { motion } from "framer-motion";

const AllServices = () => {
  const [services, setServices] = useState([]);
  const [filteredServices, setFilteredServices] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(2);
  const [totalPages, setTotalPages] = useState(1);
  const [visiblePages, setVisiblePages] = useState([1, 2, 3]);

  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axiosSecure.get(
          `/allServices?page=${currentPage}`
        );
        setServices(response.data.services);
        setFilteredServices(response.data.services);
        setTotalPages(response.data.totalPages);
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };

    fetchServices();
  }, [currentPage, itemsPerPage, axiosSecure]);

  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);

    const filtered = services.filter((service) =>
      service.name.toLowerCase().includes(query)
    );
    setFilteredServices(filtered);
  };

  const updateVisiblePages = (current) => {
    const updatedPages = [];
    const start = Math.max(1, current - 1);
    const end = Math.min(totalPages, current + 1);

    for (let i = start; i <= end; i++) {
      updatedPages.push(i);
    }
    setVisiblePages(updatedPages);
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      const nextPage = currentPage + 1;
      setCurrentPage(nextPage);
      updateVisiblePages(nextPage);
    }
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      const prevPage = currentPage - 1;
      setCurrentPage(prevPage);
      updateVisiblePages(prevPage);
    }
  };

  const handlePageClick = (page) => {
    setCurrentPage(page);
    updateVisiblePages(page);
  };

  useEffect(() => {
    updateVisiblePages(currentPage);
  }, [totalPages, currentPage]);

  return (
    <motion.div
      className="container mx-auto p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Helmet>
        <title>Dashboard | All Services</title>
      </Helmet>
      {/* Search Box */}
      <motion.div
        className="sticky top-16 z-10 bg-blue-600 bg-opacity-70 backdrop-blur-md py-4 px-6 rounded-sm shadow-md"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <div className="flex flex-col md:flex-row justify-between items-center">
          <motion.h2
            className="text-3xl font-bold text-white mb-4 md:mb-0"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            All Services
          </motion.h2>
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
      </motion.div>

      <motion.div
        className="space-y-6 mt-6"
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        {filteredServices.length > 0 ? (
          filteredServices.map((service) => (
            <ServiceCard key={service._id} service={service} />
          ))
        ) : (
          <motion.p
            className="text-center text-gray-500"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            No services found matching "{searchQuery}"
          </motion.p>
        )}
      </motion.div>

      <motion.div
        className="flex justify-center items-center mt-6 space-x-2"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      >
        <button
          className={`btn ${
            currentPage === 1 ? "btn-disabled" : "btn-primary"
          }`}
          onClick={handlePrev}
        >
          <GrChapterPrevious />
        </button>
        {visiblePages.map((page) => (
          <motion.button
            key={page}
            className={`btn ${
              currentPage === page ? "btn-primary" : "btn-ghost"
            }`}
            onClick={() => handlePageClick(page)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {page}
          </motion.button>
        ))}
        <button
          className={`btn ${
            currentPage === totalPages ? "btn-disabled" : "btn-primary"
          }`}
          onClick={handleNext}
        >
          <GrChapterNext />
        </button>
      </motion.div>
    </motion.div>
  );
};

export default AllServices;