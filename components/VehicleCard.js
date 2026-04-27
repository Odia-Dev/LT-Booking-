import Link from 'next/link';

const VehicleCard = ({ vehicle }) => {
  return (
    <div className="premium-card flex flex-col h-full overflow-hidden">
      <div className="aspect-[16/10] overflow-hidden bg-gray-100">
        <img
          src={vehicle.image}
          alt={vehicle.name}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
        />
      </div>

      <div className="p-[20px] flex flex-col flex-1">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-xl font-bold text-gray-900 leading-tight mb-1">{vehicle.name}</h3>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{vehicle.model}</p>
          </div>
          <div className="text-right">
            <p className="text-lg font-bold text-[#ff2b2b]">₹{(vehicle.price / 100000).toFixed(2)}L</p>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Ex-Showroom</p>
          </div>
        </div>

        <p className="text-sm text-gray-600 line-clamp-2 mb-6 flex-1 leading-relaxed">
          {vehicle.description || "Experience the perfect blend of performance, luxury, and advanced safety features."}
        </p>

        <div className="pt-2">
          <Link
            href={`/vehicles/${vehicle._id}`}
            className="w-full btn-premium-primary text-sm"
          >
            Explore Vehicle
          </Link>
        </div>
      </div>
    </div>
  );
};

export default VehicleCard;
