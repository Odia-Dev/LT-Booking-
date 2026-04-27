'use client';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import BookingForm from '@/components/BookingForm';

export default function VehicleDetailPage() {
  const { id } = useParams();
  const [vehicle, setVehicle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedColor, setSelectedColor] = useState({ name: 'Pearl White', hex: '#FFFFFF' });
  const [selectedVariant, setSelectedVariant] = useState(null);

  const colors = [
    { name: 'Pearl White', hex: '#FFFFFF' },
    { name: 'Midnight Black', hex: '#000000' },
    { name: 'Emotional Red', hex: '#ff2b2b' },
    { name: 'Silver Metallic', hex: '#C0C0C0' },
  ];

  const variants = [
    { name: 'Standard Range', price: 0, desc: 'Optimized for efficiency and daily commute.' },
    { name: 'Long Range AWD', price: 450000, desc: 'Maximum range and all-weather performance.' },
    { name: 'Performance Edition', price: 850000, desc: 'Quickest acceleration and premium styling.' },
  ];

  useEffect(() => {
    const fetchVehicle = async () => {
      try {
        const res = await fetch(`/api/vehicles/${id}`);
        const data = await res.json();
        setVehicle(data);
        setSelectedVariant(variants[0]);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchVehicle();
  }, [id]);

  if (loading) return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="w-12 h-12 border-4 border-gray-100 border-t-[#ff2b2b] rounded-full animate-spin"></div>
    </div>
  );

  if (!vehicle) return (
    <div className="min-h-screen bg-white text-gray-900 flex items-center justify-center font-bold">
      Vehicle not found
    </div>
  );

  const currentPrice = vehicle.price + (selectedVariant?.price || 0);

  return (
    <div className="bg-white text-[#111111] min-h-screen pb-32">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        <div className="flex flex-col lg:flex-row gap-20 py-24">
          
          {/* LEFT: Image Showcase */}
          <div className="lg:w-3/5 lg:sticky lg:top-32 h-fit space-y-12">
            <div className="aspect-[16/10] bg-[#f5f5f5] rounded-xl overflow-hidden relative group">
              <img 
                src={vehicle.image} 
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" 
                alt={vehicle.name} 
              />
              <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3">
                {[1, 2, 3].map(i => (
                  <div key={i} className={`h-1 w-12 rounded-full transition-all ${i === 1 ? 'bg-[#ff2b2b]' : 'bg-gray-300'}`} />
                ))}
              </div>
            </div>

            {/* Specs Bar */}
            <div className="grid grid-cols-4 gap-8 border-y border-gray-100 py-10">
              <div className="text-center">
                <p className="text-2xl font-black">{vehicle.specs?.mileage || '18.2'}</p>
                <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mt-1">KM/L</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-black">5.8s</p>
                <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mt-1">0-100</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-black">210</p>
                <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mt-1">Top Speed</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-black">AWD</p>
                <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mt-1">Drive</p>
              </div>
            </div>
          </div>

          {/* RIGHT: Configurator */}
          <div className="lg:w-2/5 space-y-16">
            <header className="space-y-4">
              <h1 className="text-5xl lg:text-7xl font-black tracking-tighter uppercase">{vehicle.name}</h1>
              <p className="text-gray-500 font-medium leading-relaxed max-w-md">
                Experience the perfect blend of efficiency, performance, and legendary Toyota reliability.
              </p>
            </header>

            {/* Variant Selector */}
            <section className="space-y-6">
              <h3 className="text-xs font-black uppercase tracking-widest text-gray-400">Select Variant</h3>
              <div className="space-y-4">
                {variants.map((v) => (
                  <button
                    key={v.name}
                    onClick={() => setSelectedVariant(v)}
                    className={`w-full text-left p-6 rounded-xl border-2 transition-all duration-300 ${selectedVariant?.name === v.name ? 'border-[#ff2b2b] bg-[#fff5f5]' : 'border-gray-100 hover:border-gray-200'}`}
                  >
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-bold text-lg">{v.name}</span>
                      <span className="text-sm font-black">+ ₹{(v.price / 1000).toLocaleString()}k</span>
                    </div>
                    <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">{v.desc}</p>
                  </button>
                ))}
              </div>
            </section>

            {/* Color Selector */}
            <section className="space-y-6">
              <div className="flex justify-between items-end">
                <h3 className="text-xs font-black uppercase tracking-widest text-gray-400">Exterior Color</h3>
                <span className="text-[10px] font-black uppercase tracking-widest text-gray-900">{selectedColor.name}</span>
              </div>
              <div className="flex gap-5">
                {colors.map((c) => (
                  <button
                    key={c.name}
                    onClick={() => setSelectedColor(c)}
                    className={`w-12 h-12 rounded-full border-2 p-1 transition-all ${selectedColor.name === c.name ? 'border-[#ff2b2b]' : 'border-transparent hover:scale-110'}`}
                  >
                    <div 
                      className={`w-full h-full rounded-full border border-gray-100 shadow-inner`} 
                      style={{ backgroundColor: c.hex }} 
                    />
                  </button>
                ))}
              </div>
            </section>

            {/* Summary & Price */}
            <div className="pt-12 border-t border-gray-100 space-y-8">
              <div className="flex justify-between items-end">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">Estimated Price</p>
                  <p className="text-5xl font-black text-[#ff2b2b]">₹{(currentPrice / 100000).toFixed(2)}L</p>
                </div>
                <button 
                  onClick={() => document.getElementById('order-form').scrollIntoView({ behavior: 'smooth' })}
                  className="btn-premium-primary !px-12 !py-5"
                >
                  Continue to Order
                </button>
              </div>
            </div>

            {/* Order Section */}
            <div id="order-form" className="pt-24 border-t border-gray-100">
               <h3 className="text-3xl font-black uppercase tracking-tighter mb-12">Finalize Your <span className="text-[#ff2b2b]">Order</span></h3>
               <BookingForm vehicleId={id} amount={currentPrice} />
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Mobile CTA */}
      <div className="lg:hidden fixed bottom-0 left-0 w-full bg-white/80 backdrop-blur-xl border-t border-gray-100 p-6 z-40 flex items-center justify-between">
        <div>
          <p className="text-[8px] font-black uppercase tracking-widest text-gray-400">Monthly Est.</p>
          <p className="text-xl font-black">₹45,999/mo</p>
        </div>
        <button className="btn-premium-primary !px-10 !py-3 !text-sm">
          Book Online
        </button>
      </div>
    </div>
  );
}
