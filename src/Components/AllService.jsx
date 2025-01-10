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

  const handleSort = (type) => {
    let sortedServices;
    if (type === "highest") {
      sortedServices = [...services].sort((a, b) => b.price - a.price);
    } else if (type === "lowest") {
      sortedServices = [...services].sort((a, b) => a.price - b.price);
    } else {
      sortedServices = [...services];
    }
    setFilteredServices(sortedServices);
  };

  useEffect(() => {
    updateVisiblePages(currentPage);
  }, [totalPages, currentPage]);

  return (
    <motion.div
      className="container mx-auto"
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
        className="sticky top-16 z-30 bg-blue-600 bg-opacity-70 backdrop-blur-md py-2 sm:py-4 px-6 rounded-sm shadow-md"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <div className="flex flex-row justify-between items-center">
          <motion.h2
            className="text-lg md:text-3xl font-bold text-white"
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
              className="input input-bordered w-full max-w-[150px] md:max-w-md"
            />
          </div>
        </div>
      </motion.div>

      {/* Sort Dropdown */}
      <div className="dropdown w-[90%] md:w-[98%] xl:w-[87%] mx-auto flex justify-end mt-2 md:mt-4 z-20 md:fixed">
        <div tabIndex={0} className="btn font-bold text-white bg-blue-500 hover:bg-blue-600">
          Sort Service
        </div>
        <ul
          tabIndex={0}
          className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-12 w-52 p-2 shadow"
        >
          <li>
            <button onClick={() => handleSort("normal")}>Normal</button>
          </li>
          <li>
            <button onClick={() => handleSort("highest")}>
              Highest Price to Lowest
            </button>
          </li>
          <li>
            <button onClick={() => handleSort("lowest")}>
              Lowest Price to Highest
            </button>
          </li>
        </ul>
      </div>

      <motion.div
        className="px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-1 gap-6 mt-2 md:mt-4"
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
            <span className="loading loading-spinner loading-lg"></span>
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
