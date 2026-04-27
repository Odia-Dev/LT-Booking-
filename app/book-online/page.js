'use client';
import { useState, useEffect } from 'react';
import BookingForm from '@/components/BookingForm';

export default function BookOnlinePage() {
  const [vehicles, setVehicles] = useState([]);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/vehicles')
      .then(res => res.json())
      .then(data => {
        setVehicles(data);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-black pt-32 pb-24 px-6">
      <div className="max-w-4xl mx-auto space-y-12">
        <header className="text-center space-y-4">
          <h1 className="text-5xl font-bold text-white uppercase tracking-tighter">Secure Your Order</h1>
          <p className="text-gray-500 uppercase tracking-widest text-xs">Confirm your reservation details below</p>
        </header>

        {loading ? (
           <div className="flex justify-center py-20"><div className="w-8 h-8 border-2 border-white/20 border-t-[#E60023] rounded-full animate-spin"></div></div>
        ) : !selectedVehicle ? (
          <div className="space-y-8 animate-fade-in">
            <h2 className="text-xl font-bold text-white text-center">Select your vehicle to proceed</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {vehicles.map(v => (
                <button 
                  key={v._id}
                  onClick={() => setSelectedVehicle(v)}
                  className="group bg-[#111] p-6 rounded-2xl border border-white/5 hover:border-[#E60023] transition-all text-left"
                >
                  <div className="aspect-video rounded-xl overflow-hidden mb-4">
                    <img src={v.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                  </div>
                  <h3 className="font-bold text-white">{v.name}</h3>
                  <p className="text-xs text-gray-500 uppercase mt-1">₹{(v.price / 100000).toFixed(2)}L Starting</p>
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-12 animate-slide-up">
            <div className="flex items-center justify-between p-6 bg-[#111] rounded-2xl border border-white/5">
              <div className="flex items-center gap-6">
                <img src={selectedVehicle.image} className="w-24 h-16 object-cover rounded-lg" />
                <div>
                  <h3 className="font-bold text-white">{selectedVehicle.name}</h3>
                  <p className="text-xs text-gray-500 uppercase tracking-widest">Selected Model</p>
                </div>
              </div>
              <button 
                onClick={() => setSelectedVehicle(null)}
                className="text-[10px] font-bold text-[#E60023] uppercase tracking-widest hover:underline"
              >
                Change
              </button>
            </div>

            <BookingForm vehicleId={selectedVehicle._id} amount={5000000} />
          </div>
        )}
      </div>
    </div>
  );
}
