import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import useAxiosSecure from "../hooks/useAxiosSecure";
import ServiceCard from "./serviceCard";
import { motion } from "framer-motion";

const PopularServices = () => {
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const [services, setServices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPopularServices = async () => {
      setIsLoading(true);
      try {
        const response = await axiosSecure.get("/allServices", {
          params: {
            page: 1,
            itemsPerPage: 6,
          },
        });
        console.log("Fetched Services:", response.data.services);
        setServices(response.data.services);
        setError(null);
      } catch (error) {
        console.error("Error fetching services:", error);
        setError("Failed to fetch popular services.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchPopularServices();
  }, []);

  const cardAnimation = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold text-center mb-6">Popular Services</h2>
      {isLoading && <p className="text-center text-gray-500">Loading...</p>}

      {error && <p className="text-center text-red-500">{error}</p>}

      {!isLoading && !error && (
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-2 gap-6"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.2,
              },
            },
          }}
        >
          {services.length > 0 ? (
            services.map((service) => (
              <motion.div
                key={service._id}
                variants={cardAnimation}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.95 }}
              >
                <ServiceCard service={service} />
              </motion.div>
            ))
          ) : (
            <p className="text-center text-gray-500">No popular services found.</p>
          )}
        </motion.div>
      )}
    </div>
  );
};

export default PopularServices;