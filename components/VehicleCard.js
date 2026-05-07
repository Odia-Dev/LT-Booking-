import Link from 'next/link';

const VehicleCard = ({ vehicle }) => {
  return (
    <div className="premium-card flex flex-col h-full overflow-hidden">
      <div className="aspect-[16/10] overflow-hidden bg-gray-100 relative">
        <img
          src={vehicle.thumbnailImage || vehicle.image}
          alt={vehicle.name}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
        />
      </div>

      <div className="p-5 sm:p-6 flex flex-col flex-1">
        <div className="flex justify-between items-start mb-4">
          <div className="min-w-0 pr-2">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 leading-tight mb-0.5 truncate">{vehicle.name}</h3>
            <p className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider">{vehicle.category || vehicle.model}</p>
          </div>
          <div className="text-right shrink-0">
            <p className="text-base sm:text-lg font-bold text-[#ff2b2b]">₹{(vehicle.price / 100000).toFixed(2)}L</p>
            <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest">Base</p>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-gray-600 line-clamp-2 mb-6 flex-1 leading-relaxed">
          {vehicle.description || "Experience the perfect blend of performance, luxury, and advanced safety features."}
        </p>

        <div className="pt-2">
          <Link
            href={`/vehicles/${vehicle.slug || vehicle._id}`}
            className="w-full btn-premium-primary !py-2.5 !text-[11px] sm:!text-sm !rounded-xl"
          >
            Explore Vehicle
          </Link>
        </div>
      </div>
    </div>
  );
};

export default VehicleCard;
