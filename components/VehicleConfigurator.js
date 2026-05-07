'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { trackEvent } from '@/utils/analytics';

export default function VehicleConfigurator({ vehicle, variants, colors, interiorColors }) {
  const router = useRouter();
  
  // Configurator State - Phase 4 Dynamic Initialization
  const [selectedColor, setSelectedColor] = useState(colors?.[0] || null);
  const [selectedVariant, setSelectedVariant] = useState(variants?.[0] || null);
  const [selectedInterior, setSelectedInterior] = useState(interiorColors?.[0] || null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [stockCount, setStockCount] = useState(5);

  useEffect(() => {
    if (selectedVariant && selectedColor) {
      // Phase 11: Real-time Stock Synchronization
      // In production, this would be a dynamic check against vehicle.inventory
      const config = vehicle.inventory?.find(i => 
        i.variant_name === selectedVariant.name && 
        i.exterior_color === selectedColor.name
      );
      
      if (config) {
        setStockCount(config.stock_count);
      } else {
        // Fallback for demo if no specific inventory record exists
        const hash = selectedVariant.name.length + selectedColor.name.length;
        setStockCount(hash % 4 === 0 ? 0 : (hash % 3 === 0 ? 2 : 12));
      }
    }
  }, [selectedVariant, selectedColor, vehicle.inventory]);

  // Phase 7, 8, 9: Advanced Image Mapping
  const gallery = (() => {
    if (selectedColor?.images?.length > 0) return selectedColor.images;
    if (selectedVariant?.images?.length > 0) return selectedVariant.images;
    if (vehicle.galleryImages?.length > 0) return vehicle.galleryImages;
    return [vehicle.heroImage || vehicle.image];
  })();

  const bookingAmount = 50000;
  const exShowroom = vehicle.price + (selectedVariant?.price || 0) + (selectedColor?.price || 0);
  const estimatedOnRoad = exShowroom * 1.15; // 15% tax/reg estimation

  const handleBookNow = () => {
    trackEvent('ClickedBookNow', { vehicle_name: vehicle.name, variant: selectedVariant.name });
    const params = new URLSearchParams({
      vehicleId: vehicle.slug || vehicle._id,
      vehicleName: vehicle.name,
      variant: selectedVariant?.name || '',
      color: selectedColor?.name || '',
      interior: selectedInterior?.name || '',
      amount: bookingAmount
    });
    router.push(`/book-online?${params.toString()}`);
  };

  return (
    <main className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 pb-32">
      
      {/* LEFT: Visual Showcase (Fixed on Desktop) */}
      <div className="lg:col-span-8 space-y-8">
        <div className="lg:sticky lg:top-28">
          {/* Main Image */}
          <div className="relative aspect-[4/3] sm:aspect-[16/9] bg-[#F8F8F8] rounded-2xl sm:rounded-3xl overflow-hidden group">
            <Image 
              src={gallery[activeImageIndex] || '/placeholder.png'} 
              fill
              className="object-contain p-4 transition-all duration-700 ease-out transform scale-100 group-hover:scale-105" 
              alt={vehicle.name}
              priority 
            />
            <div className="absolute top-4 left-4 sm:top-8 sm:left-8 flex flex-col gap-2">
              <span className="bg-white/90 backdrop-blur px-3 py-1 sm:px-4 sm:py-1.5 rounded-full text-[8px] sm:text-[10px] font-bold uppercase tracking-widest border border-gray-100 shadow-sm w-fit">
                {stockCount > 0 ? 'Ready for delivery' : 'Waitlist Open'}
              </span>
              {stockCount > 0 && stockCount <= 3 && (
                <span className="bg-[#ff2b2b] text-white px-3 py-1 sm:px-4 sm:py-1.5 rounded-full text-[8px] sm:text-[10px] font-black uppercase tracking-widest shadow-lg shadow-red-100 animate-pulse w-fit">
                  Limited Stock
                </span>
              )}
            </div>
          </div>

          {/* Thumbnail Gallery */}
          <div className="flex gap-3 sm:gap-4 mt-4 sm:mt-6 overflow-x-auto pb-2 custom-scrollbar">
            {gallery.map((img, idx) => (
              <button 
                key={idx}
                onClick={() => setActiveImageIndex(idx)}
                className={`relative w-20 sm:w-24 aspect-video rounded-lg sm:rounded-xl overflow-hidden border-2 transition-all shrink-0 ${activeImageIndex === idx ? 'border-[#ff2b2b] scale-105 shadow-lg' : 'border-transparent opacity-60 hover:opacity-100'}`}
              >
                <Image src={img || '/placeholder.png'} fill className="object-cover" alt="Thumbnail" />
              </button>
            ))}
          </div>

          {/* Premium Specs Grid */}
          <div className="grid grid-cols-3 gap-4 sm:gap-8 pt-10 sm:pt-16 pb-6 sm:pb-8 border-b border-gray-100">
            <div className="space-y-1">
              <p className="text-xl sm:text-3xl font-bold tracking-tight">{vehicle.specs?.mileage || '18.2'}<span className="text-[10px] sm:text-sm font-normal ml-0.5 sm:ml-1">km/l</span></p>
              <p className="text-[8px] sm:text-[10px] font-bold text-gray-400 uppercase tracking-widest">Efficiency</p>
            </div>
            <div className="space-y-1">
              <p className="text-xl sm:text-3xl font-bold tracking-tight">{vehicle.specs?.engine || '2.0L'}</p>
              <p className="text-[8px] sm:text-[10px] font-bold text-gray-400 uppercase tracking-widest">Powertrain</p>
            </div>
            <div className="space-y-1">
              <p className="text-xl sm:text-3xl font-bold tracking-tight">5★</p>
              <p className="text-[8px] sm:text-[10px] font-bold text-gray-400 uppercase tracking-widest">Safety</p>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT: Configurator Panel */}
      <div className="lg:col-span-4 space-y-12 animate-in fade-in slide-in-from-right-4 duration-1000">
        <header className="space-y-2">
          <h1 className="text-3xl sm:text-4xl lg:text-6xl font-extrabold tracking-tight uppercase italic leading-tight">{vehicle.name}</h1>
          <p className="text-sm sm:text-base text-gray-500 font-medium">Configure your premium driving experience.</p>
        </header>

        {/* Variant Selector */}
        <section className="space-y-4">
          <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-gray-400">Step 1: Choose Variant</h3>
          <div className="grid grid-cols-1 gap-3">
            {variants.map((v) => (
              <button
                key={v.name}
                onClick={() => setSelectedVariant(v)}
                className={`relative w-full text-left px-6 py-5 rounded-2xl border-2 transition-all duration-300 ${selectedVariant?.name === v.name ? 'border-[#ff2b2b] bg-[#FEF2F2] shadow-sm' : 'border-gray-100 hover:border-gray-200 bg-white hover:bg-gray-50'}`}
              >
                <div className="flex justify-between items-center">
                  <span className="font-bold text-lg">{v.name}</span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${selectedVariant?.name === v.name ? 'bg-[#ff2b2b] text-white' : 'bg-gray-100 text-gray-500'}`}>
                    {v.tag}
                  </span>
                </div>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-sm font-semibold">+ ₹{(v.price).toLocaleString()}</span>
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* Exterior Color */}
        <section className="space-y-4">
          <div className="flex justify-between items-end">
            <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-gray-400">Step 2: Exterior Color</h3>
            <span className="text-[10px] font-bold text-gray-900">{selectedColor?.name}</span>
          </div>
          <div className="flex flex-wrap gap-4">
            {colors.map((c) => (
              <button
                key={c.name}
                onClick={() => {
                  setSelectedColor(c);
                  setActiveImageIndex(0); // Show main color view
                }}
                className={`group relative p-1 rounded-full border-2 transition-all ${selectedColor?.name === c.name ? 'border-[#ff2b2b] scale-110' : 'border-transparent hover:scale-105'}`}
              >
                <div 
                  className="w-10 h-10 rounded-full border border-gray-100 shadow-inner" 
                  style={{ backgroundColor: c.hex }} 
                />
                {c.price > 0 && (
                  <span className="absolute -top-1 -right-1 bg-black text-[7px] text-white px-1 rounded-full">
                    Paid
                  </span>
                )}
              </button>
            ))}
          </div>
        </section>

        {/* Interior Color */}
        <section className="space-y-4">
           <div className="flex justify-between items-end">
            <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-gray-400">Step 3: Interior Mood</h3>
            <span className="text-[10px] font-bold text-gray-900">{selectedInterior?.name}</span>
          </div>
          <div className="flex gap-4">
            {interiorColors.map((i) => (
              <button
                key={i.name}
                onClick={() => setSelectedInterior(i)}
                className={`flex items-center gap-3 px-4 py-2 rounded-full border transition-all ${selectedInterior?.name === i.name ? 'bg-black text-white border-black' : 'bg-white text-gray-600 border-gray-200'}`}
              >
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: i.hex }} />
                <span className="text-[10px] font-bold uppercase tracking-widest">{i.name}</span>
              </button>
            ))}
          </div>
        </section>

        {/* Offers & Benefits */}
        <section className="p-6 bg-gray-50 rounded-3xl space-y-4">
           <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-gray-400">Exclusive Offers</h3>
           <ul className="space-y-3">
             <li className="flex justify-between items-center text-xs">
               <span className="text-gray-600">Exchange Bonus</span>
               <span className="font-bold text-green-600">Up to ₹50,000</span>
             </li>
             <li className="flex justify-between items-center text-xs">
               <span className="text-gray-600">Corporate Benefit</span>
               <span className="font-bold text-gray-900">₹8,000</span>
             </li>
           </ul>
           <Link href="/offers" className="text-[10px] font-bold text-[#ff2b2b] uppercase tracking-widest mt-2 block hover:underline">
             View All Offers →
           </Link>
        </section>

        {/* Pricing Breakdown */}
        <section className="space-y-4">
          <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-gray-400">Price Summary</h3>
          <div className="space-y-2 pb-6 border-b border-gray-100">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Ex-Showroom Price</span>
              <span className="font-semibold">₹{(exShowroom).toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Estimated On-Road</span>
              <span className="font-semibold">₹{(estimatedOnRoad).toLocaleString()}*</span>
            </div>
          </div>
          <div className="flex justify-between items-baseline">
            <span className="text-xs font-bold text-gray-900 uppercase">Booking Amount</span>
            <span className="text-3xl font-black text-[#ff2b2b]">₹{(bookingAmount).toLocaleString()}</span>
          </div>
          <Link href="/insurance-finance" className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mt-2 block hover:text-[#ff2b2b] transition-colors">
             Calculate Custom EMI →
          </Link>
        </section>

        {/* Internal Linking Action Grid */}
        <section className="grid grid-cols-2 gap-4">
          <Link href="/test-drive" className="p-4 border border-gray-100 rounded-2xl hover:border-[#ff2b2b] hover:shadow-lg hover:shadow-red-50 transition-all text-center group">
            <div className="w-10 h-10 bg-gray-50 text-gray-900 group-hover:bg-[#ff2b2b] group-hover:text-white rounded-full flex items-center justify-center mx-auto mb-3 transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
            </div>
            <p className="text-xs font-bold uppercase tracking-widest text-gray-900">Test Drive</p>
          </Link>
          <Link href="/vehicles" className="p-4 border border-gray-100 rounded-2xl hover:border-gray-900 hover:shadow-lg transition-all text-center group">
            <div className="w-10 h-10 bg-gray-50 text-gray-900 group-hover:bg-gray-900 group-hover:text-white rounded-full flex items-center justify-center mx-auto mb-3 transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>
            </div>
            <p className="text-xs font-bold uppercase tracking-widest text-gray-900">Compare</p>
          </Link>
        </section>

        {/* Trust Indicators */}
        <div className="grid grid-cols-2 gap-4 py-8">
          <div className="flex items-center gap-3 p-3 border border-gray-100 rounded-xl">
            <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
            </div>
            <p className="text-[9px] font-bold uppercase leading-tight">Secure<br/>Payment</p>
          </div>
          <div className="flex items-center gap-3 p-3 border border-gray-100 rounded-xl">
            <div className="w-8 h-8 rounded-full bg-red-50 flex items-center justify-center text-[#ff2b2b]">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            </div>
            <p className="text-[9px] font-bold uppercase leading-tight">Fast<br/>Delivery</p>
          </div>
        </div>

        {/* CTA - Desktop */}
        <button 
          onClick={stockCount > 0 ? handleBookNow : null}
          disabled={stockCount === 0}
          className={`hidden lg:block w-full py-5 text-white font-bold rounded-2xl uppercase tracking-[0.2em] shadow-xl transition-all active:scale-95 ${
            stockCount > 0 ? 'bg-[#ff2b2b] hover:bg-black shadow-red-100' : 'bg-gray-300 cursor-not-allowed shadow-none'
          }`}
        >
          {stockCount > 0 ? 'Confirm & Book Now' : 'Currently Unavailable'}
        </button>

      </div>

      {/* STICKY FOOTER - Mobile & Desktop Floating */}
      <div className="fixed bottom-0 left-0 w-full bg-white/95 backdrop-blur-xl border-t border-gray-100 p-4 sm:p-6 z-50">
        <div className="max-w-[1440px] mx-auto flex items-center justify-between">
          <div className="hidden md:block">
            <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Configuration Summary</p>
            <p className="font-bold text-sm">{vehicle.name} {selectedVariant?.name} / {selectedColor?.name}</p>
          </div>
          <div className="flex items-center gap-6 sm:gap-8 w-full md:w-auto">
             <div className="flex flex-col">
               <span className="text-[8px] sm:text-[9px] font-bold text-gray-400 uppercase tracking-widest">Total Estimated</span>
               <span className="text-lg sm:text-xl font-black italic">₹{(exShowroom / 100000).toFixed(2)}L</span>
             </div>
             <button 
               onClick={stockCount > 0 ? handleBookNow : null}
               disabled={stockCount === 0}
               className={`flex-1 md:flex-none px-8 sm:px-12 py-3.5 sm:py-4 text-white font-bold rounded-xl uppercase tracking-widest text-[10px] sm:text-xs transition-all ${
                 stockCount > 0 ? 'bg-[#ff2b2b] hover:bg-black' : 'bg-gray-300 cursor-not-allowed'
               }`}
             >
               {stockCount > 0 ? 'Book Now' : 'Unavailable'}
             </button>
          </div>
        </div>
      </div>
    </main>
  );
}
