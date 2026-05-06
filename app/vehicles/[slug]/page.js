import VehicleConfigurator from '@/components/VehicleConfigurator';

// Pre-defined static data (mirrors client-side mock for consistency)
const colors = [
  { name: 'Platinum White Pearl', hex: '#FDFDFD', price: 15000 },
  { name: 'Attitude Black', hex: '#0B0B0B', price: 0 },
  { name: 'Silver Metallic', hex: '#C0C0C0', price: 0 },
  { name: 'Emotional Red', hex: '#D6001C', price: 20000 },
  { name: 'Phantom Brown', hex: '#3E2723', price: 0 },
];

const variants = [
  { name: 'V MT', price: 0, tag: 'Value Choice', features: ['7-Speed Manual', 'Fabric Upholstery', '8" Display'] },
  { name: 'VX AT', price: 180000, tag: 'Most Popular', features: ['6-Speed Auto', 'Leatherette Seats', 'Sunroof'] },
  { name: 'ZX Hybrid', price: 420000, tag: 'Top Tier', features: ['Strong Hybrid', 'Ventilated Seats', 'ADAS 2.0'] },
];

const interiorColors = [
  { name: 'Oak Black', hex: '#1A1A1A' },
  { name: 'Premium Beige', hex: '#F5F5DC' },
];

async function getVehicle(slug) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  const res = await fetch(`${baseUrl}/api/vehicles/${slug}`, { next: { revalidate: 3600 } });
  if (!res.ok) return null;
  return res.json();
}

export async function generateMetadata({ params }) {
  const vehicle = await getVehicle(params.slug);
  
  if (!vehicle) {
    return {
      title: 'Vehicle Not Found | Laxmi Toyota',
    };
  }

  const mileage = vehicle.specs?.mileage || '18.2';
  const name = vehicle.name;

  return {
    title: `Toyota ${name} On Road Price in Odisha | Laxmi Toyota`,
    description: `Check the latest Toyota ${name} on road price in Odisha. Experience unmatched luxury and ${mileage} km/l efficiency. Book your ${name} online at Laxmi Toyota Brahmapur, Jeypore, or Rayagada today!`,
    openGraph: {
      title: `Toyota ${name} | Laxmi Toyota Odisha`,
      description: `Own the legendary Toyota ${name}. Starting from ₹${(vehicle.price / 100000).toFixed(2)} Lakhs.`,
      images: [vehicle.image],
    },
    alternates: {
      canonical: `https://laxmitoyota.com/vehicles/${params.slug}`,
    }
  };
}

export default async function VehicleDetailPage({ params }) {
  const vehicle = await getVehicle(params.slug);

  if (!vehicle) {
    return (
      <div className="min-h-screen bg-white text-gray-900 flex items-center justify-center font-bold">
        Vehicle not found
      </div>
    );
  }

  return (
    <div className="bg-white text-[#111] min-h-screen">
      <div className="h-20" />
      <VehicleConfigurator 
        vehicle={vehicle} 
        variants={variants} 
        colors={colors} 
        interiorColors={interiorColors} 
      />
    </div>
  );
}
