import Link from 'next/link';
import VehicleCard from '@/components/VehicleCard';

async function getFeaturedVehicles() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  const res = await fetch(`${baseUrl}/api/vehicles`, { cache: 'no-store' });
  if (!res.ok) return [];
  return res.json();
}

export default async function Home() {
  const vehicles = await getFeaturedVehicles();

  return (
    <div className="flex flex-col">
      {/* 1. HERO SECTION */}
      <section className="bg-gradient-to-br from-[#0b0b0b] to-[#111827] section-hero relative overflow-hidden flex items-center min-h-[70vh]">
        <div className="absolute inset-0 opacity-20 z-0">
          <img 
            src="https://images.unsplash.com/photo-1542362567-b052da132171?auto=format&fit=crop&q=80&w=2400" 
            className="w-full h-full object-cover" 
            alt="Hero Background"
          />
        </div>
        <div className="main-container relative z-10 w-full text-center">
          <div className="max-w-3xl mx-auto space-y-10">
            <h1 className="text-white">
              Discover Excellence <br />
              <span className="text-[#ff2b2b]">With Laxmi Toyota</span>
            </h1>
            <p className="text-gray-300 text-lg font-medium leading-relaxed">
              Experience the pinnacle of automotive engineering and premium service. 
              Find your perfect companion for every journey today.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center pt-6">
              <Link href="/vehicles" className="btn-premium-primary">View Inventory</Link>
              <Link href="/book-online" className="btn-premium-secondary !bg-transparent !text-white !border-white hover:!bg-white hover:!text-black">Book Online</Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2. SEARCH SECTION */}
      <section className="section-small bg-white border-b border-gray-100">
        <div className="main-container">
          <div className="bg-[#f9fafb] p-8 rounded-xl border border-gray-100 grid grid-cols-1 md:grid-cols-4 gap-8 items-end">
            <div className="space-y-3">
              <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Select Model</label>
              <select className="w-full">
                <option>All Models</option>
                <option>Toyota Camry</option>
                <option>Toyota Fortuner</option>
              </select>
            </div>
            <div className="space-y-3">
              <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Fuel Type</label>
              <select className="w-full">
                <option>All Types</option>
                <option>Petrol</option>
                <option>Hybrid</option>
              </select>
            </div>
            <div className="space-y-3">
              <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Budget</label>
              <select className="w-full">
                <option>Any Budget</option>
                <option>Under 20L</option>
                <option>20L - 50L</option>
              </select>
            </div>
            <button className="btn-premium-primary w-full">Search</button>
          </div>
        </div>
      </section>

      {/* 3. FEATURED VEHICLES */}
      <section className="section-large">
        <div className="main-container">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div className="space-y-3">
              <h2 className="text-gray-900 uppercase">Featured <span className="text-[#ff2b2b]">Collection</span></h2>
              <p className="text-gray-500 font-medium">Browse our most popular models available for immediate delivery.</p>
            </div>
            <Link href="/vehicles" className="text-[#ff2b2b] font-bold border-b-2 border-[#ff2b2b] pb-1 hover:text-black hover:border-black transition-all">
              View All Vehicles
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {vehicles.map((vehicle) => (
              <VehicleCard key={vehicle._id} vehicle={vehicle} />
            ))}
          </div>
        </div>
      </section>

      {/* 4. WHY CHOOSE US */}
      <section className="section-large bg-white border-y border-gray-100">
        <div className="main-container">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <h2 className="text-gray-900 uppercase">Why <span className="text-[#ff2b2b]">Laxmi Toyota</span></h2>
            <p className="text-gray-500">We set the benchmark for quality and customer satisfaction in every interaction.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: 'Quality Assurance', desc: 'Every vehicle undergoes a 160-point inspection by certified experts.', icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944' },
              { title: 'Expert Service', desc: 'Our technicians are factory-trained with decades of combined experience.', icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' },
              { title: 'Transparent Pricing', desc: 'No hidden costs. Clear, competitive, and honest pricing at every step.', icon: 'M13 10V3L4 14h7v7l9-11h-7z' },
            ].map((item) => (
              <div key={item.title} className="p-10 premium-card text-center space-y-6">
                <div className="w-16 h-16 bg-[#fff5f5] text-[#ff2b2b] rounded-full flex items-center justify-center mx-auto">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={item.icon} />
                  </svg>
                </div>
                <h3 className="text-xl font-bold">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. CTA SECTION */}
      <section className="section-small bg-[#ff2b2b]">
        <div className="main-container flex flex-col md:flex-row justify-between items-center gap-8 text-center md:text-left">
          <div className="space-y-3">
            <h2 className="text-white uppercase mb-0 leading-tight">Ready to start your journey?</h2>
            <p className="text-white/80 font-medium">Book a test drive today and feel the Toyota difference.</p>
          </div>
          <Link href="/book-online" className="btn-premium-secondary !px-12 !py-5 !text-lg !rounded-full">
            Book Now
          </Link>
        </div>
      </section>
    </div>
  );
}
