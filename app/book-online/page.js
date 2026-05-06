'use client';
import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import BookingForm from '@/components/BookingForm';

function BookOnlineContent() {
  const searchParams = useSearchParams();
  const [vehicles, setVehicles] = useState([]);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Configuration from URL
  const urlVehicleId = searchParams.get('vehicleId');
  const urlVariant = searchParams.get('variant');
  const urlColor = searchParams.get('color');
  const urlAmount = searchParams.get('amount');
  const urlInterior = searchParams.get('interior');

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const res = await fetch('/api/vehicles');
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Failed to load vehicles');
        
        setVehicles(data);

        // Auto-select if ID is in URL
        if (urlVehicleId) {
          const vehicle = data.find(v => v._id === urlVehicleId);
          if (vehicle) setSelectedVehicle(vehicle);
        }
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchVehicles();
  }, [urlVehicleId]);

  return (
    <div className="min-h-screen bg-[#F8F9FA] pt-24 pb-32">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        
        {loading ? (
           <div className="flex justify-center py-40"><div className="w-12 h-12 border-2 border-gray-200 border-t-[#E60023] rounded-full animate-spin"></div></div>
        ) : error ? (
           <div className="text-center py-20 bg-white rounded-3xl border border-red-100 shadow-sm max-w-2xl mx-auto">
             <h2 className="text-2xl font-bold text-[#E60023] mb-2">Connection Failed</h2>
             <p className="text-gray-500">{error}</p>
             <button onClick={() => window.location.reload()} className="mt-6 text-sm font-bold uppercase tracking-widest text-gray-900 border-b-2 border-gray-900">Try Again</button>
           </div>
        ) : !selectedVehicle ? (
          <div className="space-y-12 animate-in fade-in duration-700">
             <header className="text-center space-y-4">
              <h1 className="text-4xl lg:text-5xl font-black text-gray-900 uppercase tracking-tight italic">Select Your Vehicle</h1>
              <p className="text-gray-500 uppercase tracking-[0.2em] text-[10px] font-bold">Choose a model to begin your reservation</p>
            </header>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {vehicles.map(v => (
                <button 
                  key={v._id}
                  onClick={() => setSelectedVehicle(v)}
                  className="group bg-white p-8 rounded-[2rem] border border-gray-100 hover:border-[#E60023] transition-all text-left shadow-sm hover:shadow-xl"
                >
                  <div className="aspect-video rounded-2xl overflow-hidden mb-6 bg-gray-50">
                    <img src={v.image} className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <h3 className="font-bold text-2xl text-gray-900 uppercase italic">{v.name}</h3>
                  <p className="text-[10px] font-bold text-gray-400 uppercase mt-1 tracking-widest">Starting at ₹{(v.price / 100000).toFixed(2)}L</p>
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-12 items-start">
            
            {/* MOBILE SUMMARY (First on Mobile) */}
            <div className="lg:hidden w-full space-y-6">
               <SummaryCard 
                  vehicle={selectedVehicle} 
                  variant={urlVariant} 
                  color={urlColor} 
                  interior={urlInterior} 
                  amount={urlAmount} 
               />
            </div>

            {/* LEFT: Customer Form */}
            <div className="w-full lg:w-[60%] space-y-12">
               <div className="space-y-2">
                 <h1 className="text-4xl font-black text-gray-900 uppercase italic">Confirm Reservation</h1>
                 <p className="text-gray-500 font-medium">Please provide your details to secure your Toyota.</p>
               </div>
               
               <BookingForm 
                  vehicleId={selectedVehicle._id} 
                  vehicleName={selectedVehicle.name} 
                  variant={urlVariant || 'Standard'}
                  color={urlColor || 'Default'}
                  interior={urlInterior || 'Standard'}
                  amount={parseInt(urlAmount) || 50000}
                  vehicleImage={selectedVehicle.image}
               />

               {/* Trust Section */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 pt-12 border-t border-gray-200">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center text-green-600">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-gray-900">Secure Payment</p>
                      <p className="text-[9px] text-gray-500">SSL Encrypted</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center text-[#E60023]">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-gray-900">Authorized Dealer</p>
                      <p className="text-[9px] text-gray-500">Laxmi Toyota Official</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 15v-1a4 4 0 00-4-4H8m0 0l3 3m-3-3l3-3" /></svg>
                    </div>
                    <a href="#" className="hover:underline">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-gray-900">Refund Policy</p>
                      <p className="text-[9px] text-gray-500">View Terms</p>
                    </a>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center text-orange-600">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-gray-900">24/7 Support</p>
                      <p className="text-[9px] text-gray-500">+91 98765 43210</p>
                    </div>
                  </div>
               </div>
            </div>

            {/* RIGHT: Booking Summary (Sticky on Desktop) */}
            <div className="hidden lg:block w-[40%] sticky top-32">
               <SummaryCard 
                  vehicle={selectedVehicle} 
                  variant={urlVariant} 
                  color={urlColor} 
                  interior={urlInterior} 
                  amount={urlAmount} 
               />
            </div>

          </div>
        )}
      </div>
    </div>
  );
}

function SummaryCard({ vehicle, variant, color, interior, amount }) {
  return (
    <div className="bg-white rounded-[2rem] border border-gray-100 shadow-xl overflow-hidden p-8 space-y-8 animate-in slide-in-from-right-8 duration-700">
       <div className="flex justify-between items-center">
         <h3 className="text-xl font-bold text-gray-900 uppercase italic">Booking Summary</h3>
         <button onClick={() => window.location.href='/vehicles'} className="text-[10px] font-bold text-[#E60023] uppercase tracking-widest hover:underline">Edit Vehicle</button>
       </div>

       <div className="aspect-video bg-gray-50 rounded-2xl overflow-hidden">
         <img src={vehicle.image} className="w-full h-full object-contain p-4" alt={vehicle.name} />
       </div>

       <div className="space-y-6">
         <div className="flex justify-between items-end border-b border-gray-50 pb-4">
            <div>
               <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Vehicle</p>
               <p className="font-bold text-lg text-gray-900 uppercase">{vehicle.name}</p>
            </div>
            <div className="text-right">
               <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Variant</p>
               <p className="font-bold text-sm text-gray-900">{variant || 'V MT'}</p>
            </div>
         </div>

         <div className="grid grid-cols-2 gap-8 border-b border-gray-50 pb-4">
            <div>
               <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Exterior</p>
               <p className="font-bold text-[11px] text-gray-900">{color || 'Platinum White'}</p>
            </div>
            <div>
               <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Interior</p>
               <p className="font-bold text-[11px] text-gray-900">{interior || 'Premium Black'}</p>
            </div>
         </div>

         <div className="space-y-3">
            <div className="flex justify-between items-center text-xs">
              <span className="text-gray-500">Offer Applied</span>
              <span className="font-bold text-green-600">Online Bonus applied</span>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="text-gray-500">Est. Delivery</span>
              <span className="font-bold text-gray-900">4-6 Weeks</span>
            </div>
         </div>

         <div className="pt-6 border-t-2 border-dashed border-gray-100 flex justify-between items-center">
            <p className="text-xs font-black text-gray-900 uppercase tracking-widest">Booking Amount</p>
            <p className="text-3xl font-black text-[#E60023]">₹{(parseInt(amount) || 50000).toLocaleString()}</p>
         </div>
       </div>
    </div>
  );
}

export default function BookOnlinePage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white flex items-center justify-center text-gray-900">Loading reservation...</div>}>
      <BookOnlineContent />
    </Suspense>
  );
}
