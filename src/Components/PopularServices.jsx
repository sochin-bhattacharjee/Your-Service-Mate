import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import useAxiosSecure from "../hooks/useAxiosSecure";
import ServiceCard from "./serviceCard";
import { motion } from "framer-motion";

const PopularServices = () => {
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();
    const [services, setServices] = useState([]);

    useEffect(() => {
        const fetchPopularServices = async () => {
            try {
                const response = await axiosSecure.get("/allServices", {
                    params: {
                        page: 1,
                        itemsPerPage: 6,
                    },
                });
                setServices(response.data.services);
            } catch (error) {
                console.error("Error fetching services:", error);
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
            <h2 className="text-2xl font-bold text-center mb-6">
                Popular Services
            </h2>
            <motion.div
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
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
                {services.map((service) => (
                    <motion.div
                        key={service._id}
                        variants={cardAnimation}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <ServiceCard service={service} />
                    </motion.div>
                ))}
            </motion.div>
        </div>
    );
};

export default PopularServices;
