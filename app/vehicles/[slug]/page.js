import VehicleConfigurator from '@/components/VehicleConfigurator';

async function getVehicle(slug) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  const res = await fetch(`${baseUrl}/api/vehicles/${slug}`, { next: { revalidate: 3600 } });
  if (!res.ok) return null;
  return res.json();
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const vehicle = await getVehicle(slug);
  
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
      canonical: `https://laxmitoyota.com/vehicles/${slug}`,
    }
  };
}

export default async function VehicleDetailPage({ params }) {
  const { slug } = await params;
  const vehicle = await getVehicle(slug);

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
        variants={vehicle.variants || []} 
        colors={vehicle.exterior_colors || []} 
        interiorColors={vehicle.interior_colors || []} 
      />
    </div>
  );
}
