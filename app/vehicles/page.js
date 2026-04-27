'use client';
import { useState, useEffect } from 'react';
import VehicleCard from '@/components/VehicleCard';

export default function VehiclesPage() {
  const [vehicles, setVehicles] = useState([]);
  const [filteredVehicles, setFilteredVehicles] = useState([]);
  const [filters, setFilters] = useState({ category: 'All', fuel: 'All' });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchVehicles();
  }, []);

  useEffect(() => {
    let result = vehicles;
    if (filters.category !== 'All') {
      result = result.filter(v => v.model.includes(filters.category) || v.name.includes(filters.category));
    }
    if (filters.fuel !== 'All') {
      result = result.filter(v => v.specs?.fuel === filters.fuel);
    }
    setFilteredVehicles(result);
  }, [filters, vehicles]);

  const fetchVehicles = async () => {
    try {
      const res = await fetch('/api/vehicles');
      const data = await res.json();
      setVehicles(data);
      setFilteredVehicles(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#f5f5f5] min-h-screen pb-24">
      {/* Hero / Header Section */}
      <section className="bg-gradient-to-br from-[#0b0b0b] to-[#111827] section-hero relative overflow-hidden flex items-center min-h-[40vh]">
        <div className="main-container relative z-10 w-full">
           <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 text-center md:text-left">
              <div className="space-y-4">
                <h1 className="text-white uppercase">Our <span className="text-[#ff2b2b]">Inventory</span></h1>
                <p className="text-gray-400 text-sm uppercase tracking-[0.4em]">Premium Selection Ready for Delivery</p>
              </div>
              
              <div className="flex gap-4 justify-center">
                <div className="bg-white/5 backdrop-blur-md p-1 px-4 rounded-lg border border-white/10">
                  <select 
                    className="bg-transparent py-3 text-xs font-black uppercase tracking-widest outline-none text-white transition-all cursor-pointer"
                    onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                  >
                    <option value="All" className="text-black">All Categories</option>
                    <option value="SUV" className="text-black">SUV</option>
                    <option value="Sedan" className="text-black">Sedan</option>
                  </select>
                </div>
                <div className="bg-white/5 backdrop-blur-md p-1 px-4 rounded-lg border border-white/10">
                  <select 
                    className="bg-transparent py-3 text-xs font-black uppercase tracking-widest outline-none text-white transition-all cursor-pointer"
                    onChange={(e) => setFilters({ ...filters, fuel: e.target.value })}
                  >
                    <option value="All" className="text-black">All Fuel Types</option>
                    <option value="Petrol" className="text-black">Petrol</option>
                    <option value="Diesel" className="text-black">Diesel</option>
                    <option value="Hybrid" className="text-black">Hybrid</option>
                  </select>
                </div>
              </div>
           </div>
        </div>
      </section>

      <section className="section-large">
        <div className="main-container">
          {loading ? (
            <div className="flex flex-col justify-center items-center h-64 space-y-6">
              <div className="w-12 h-12 border-4 border-[#ff2b2b]/20 border-t-[#ff2b2b] rounded-full animate-spin"></div>
              <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Loading Fleet...</p>
            </div>
          ) : filteredVehicles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {filteredVehicles.map((vehicle) => (
                <VehicleCard key={vehicle._id} vehicle={vehicle} />
              ))}
            </div>
          ) : (
            <div className="text-center py-32 bg-white rounded-2xl border border-gray-100 shadow-sm">
              <div className="w-20 h-20 bg-[#fff5f5] text-[#ff2b2b] rounded-full flex items-center justify-center mx-auto mb-8">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
              </div>
              <h3 className="text-2xl font-black uppercase text-gray-900 mb-2">No Match Found</h3>
              <p className="text-gray-500 font-medium">Try adjusting your filters to see more results.</p>
              <button 
                onClick={() => setFilters({ category: 'All', fuel: 'All' })}
                className="mt-8 text-[#ff2b2b] font-bold border-b-2 border-[#ff2b2b] pb-1"
              >
                Reset All Filters
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
