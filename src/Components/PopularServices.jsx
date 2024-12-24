import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import useAxiosSecure from "../hooks/useAxiosSecure";
import ServiceCard from "./serviceCard";


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

    return (
        <div className="container mx-auto px-4 py-8">
            <h2 className="text-2xl font-bold text-center mb-6">
                Popular Services
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {services.map((service) => (
                    <ServiceCard key={service._id} service={service} />
                ))}
            </div>
        </div>
    );
};

export default PopularServices;
