import { Link } from "react-router-dom";

const ServiceCard = ({ service }) => {
  const { imageUrl, name, price, description, area } = service;

  return (
    <div className="card card-side max-h-80 bg-base-100 shadow-lg border border-gray-200 rounded-lg overflow-hidden">
      {/* Left: Service Image */}
      <div className="w-1/2">
        <img
          src={imageUrl}
          alt={name}
          className="h-full w-full object-cover"
        />
      </div>

      {/* Right: Service Details */}
      <div className="w-1/2 p-6 flex flex-col justify-between">
        {/* Title and Price */}
        <div>
          <h2 className="card-title text-xl font-bold text-blue-600">{name}</h2>
          <p className="text-gray-500 text-base mt-1">Area: <span className="text-rose-400">{area}</span></p>
          <p className="text-lg font-semibold text-green-600 mt-2">
            Price: ${price}
          </p>
           {/* Description */}
        <p className="text-gray-700 text-sm my-4 line-clamp-3">
          {description}
        </p>
        </div>

        {/* View Details Button */}
        <div className="card-actions justify-end">
          <Link onClick={() => window.scrollTo(0, 0)} to={`/details/${service._id}`} className="btn btn-primary w-full">
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
