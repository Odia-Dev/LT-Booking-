"use client";
import { useState, useEffect } from 'react';
import OverviewCards from './components/OverviewCards';
import BookingTable from './components/BookingTable';
import BookingDrawer from './components/BookingDrawer';

export default function AdminDashboard() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  
  const [filters, setFilters] = useState({
    search: '',
    status: 'All Status',
    vehicle: 'All Vehicles',
    date: 'All Time'
  });

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/admin/bookings');
      if (!res.ok) throw new Error('API_ERROR');
      const data = await res.json();
      if (Array.isArray(data)) setBookings(data);
    } catch (err) {
      console.error(err);
      setError('Unable to load bookings');
    } finally {
      setLoading(false);
    }
  };

  const updateBooking = async (id, updates) => {
    try {
      const res = await fetch(`/api/admin/bookings/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates)
      });
      if (res.ok) {
        fetchBookings();
        setIsDrawerOpen(false);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const filteredBookings = bookings.filter(b => {
    const customerName = b?.customer_name || '';
    const paymentStatus = b?.payment_status || '';
    const vehicleName = b?.vehicle_name || '';

    const matchesSearch = customerName.toLowerCase().includes(filters.search.toLowerCase());
    const matchesStatus = filters.status === 'All Status' || paymentStatus === filters.status;
    const matchesVehicle = filters.vehicle === 'All Vehicles' || vehicleName === filters.vehicle;
    
    // Date filter logic
    let matchesDate = true;
    if (filters.date !== 'All Time') {
       const bDate = new Date(b.createdAt);
       const now = new Date();
       if (filters.date === 'Today') {
          matchesDate = bDate.toDateString() === now.toDateString();
       } else if (filters.date === 'Last 7 Days') {
          const sevenDaysAgo = new Date(now.setDate(now.getDate() - 7));
          matchesDate = bDate >= sevenDaysAgo;
       }
    }

    return matchesSearch && matchesStatus && matchesVehicle && matchesDate;
  });

  const stats = {
    total: bookings?.length || 0,
    paid: bookings?.filter(b => b.payment_status === 'Paid').length || 0,
    pending: bookings?.filter(b => b.payment_status === 'Pending').length || 0,
    revenue: bookings?.filter(b => b.payment_status === 'Paid').reduce((acc, curr) => acc + (curr.booking_amount || 0), 0) || 0,
    today: bookings?.filter(b => {
       const bDate = new Date(b.createdAt);
       const now = new Date();
       return bDate.toDateString() === now.toDateString();
    }).length || 0
  };

  const vehicleOptions = [...new Set(bookings?.map(b => b?.vehicle_name).filter(Boolean) || [])];

  if (error) return (
    <div className="h-[60vh] flex flex-col items-center justify-center space-y-6">
       <div className="w-16 h-16 bg-red-50 text-[#E60023] rounded-full flex items-center justify-center">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
       </div>
       <div className="text-center">
          <h2 className="text-xl font-black text-gray-900 uppercase italic">Connection Lost</h2>
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">{error}</p>
       </div>
       <button onClick={fetchBookings} className="px-8 py-3 bg-[#E60023] text-white font-bold rounded-xl text-[10px] uppercase tracking-widest hover:bg-black transition-all">Retry Synchronization</button>
    </div>
  );

  return (
    <div className="space-y-12 animate-in fade-in duration-700">
      
      {/* Page Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black text-gray-900 uppercase italic tracking-tight">Lead Intelligence</h1>
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-2">Aggregating {bookings.length} reservations from digital channels</p>
        </div>
      </div>

      <OverviewCards stats={stats} />

      {/* Filters Section */}
      <div className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm space-y-6">
        <div className="flex flex-wrap gap-4 items-center">
           {/* Search */}
           <div className="flex-1 min-w-[300px] relative group">
              <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
              <input 
                type="text"
                placeholder="Search by customer name..."
                className="w-full pl-12 pr-6 py-4 bg-gray-50 border-none rounded-2xl text-[10px] font-bold uppercase tracking-widest outline-none focus:ring-2 focus:ring-red-50 transition-all"
                value={filters.search}
                onChange={(e) => setFilters({...filters, search: e.target.value})}
              />
           </div>

           {/* Status Filter */}
           <select 
             className="px-6 py-4 bg-gray-50 border-none rounded-2xl text-[10px] font-bold uppercase tracking-widest outline-none cursor-pointer"
             value={filters.status}
             onChange={(e) => setFilters({...filters, status: e.target.value})}
           >
             <option>All Status</option>
             <option>Paid</option>
             <option>Pending</option>
             <option>Failed</option>
           </select>

           {/* Vehicle Filter */}
           <select 
             className="px-6 py-4 bg-gray-50 border-none rounded-2xl text-[10px] font-bold uppercase tracking-widest outline-none cursor-pointer"
             value={filters.vehicle}
             onChange={(e) => setFilters({...filters, vehicle: e.target.value})}
           >
             <option>All Vehicles</option>
             {vehicleOptions.map(v => <option key={v} value={v}>{v}</option>)}
           </select>

           {/* Date Filter */}
           <select 
             className="px-6 py-4 bg-gray-50 border-none rounded-2xl text-[10px] font-bold uppercase tracking-widest outline-none cursor-pointer"
             value={filters.date}
             onChange={(e) => setFilters({...filters, date: e.target.value})}
           >
             <option>All Time</option>
             <option>Today</option>
             <option>Last 7 Days</option>
           </select>

           {/* Reset */}
           <button 
             onClick={() => setFilters({ search: '', status: 'All Status', vehicle: 'All Vehicles', date: 'All Time' })}
             className="p-4 text-gray-400 hover:text-[#E60023] transition-colors"
             title="Reset Filters"
           >
             <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
           </button>
        </div>
      </div>

      {loading ? (
        <div className="h-64 bg-white rounded-[2.5rem] border border-gray-100 flex items-center justify-center">
           <div className="flex flex-col items-center gap-4">
              <div className="w-8 h-8 border-4 border-red-50 border-t-[#E60023] rounded-full animate-spin" />
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Synchronizing leads...</p>
           </div>
        </div>
      ) : filteredBookings.length > 0 ? (
        <BookingTable 
          bookings={filteredBookings} 
          onRowClick={(b) => {
            setSelectedBooking(b);
            setIsDrawerOpen(true);
          }} 
        />
      ) : (
        <div className="h-64 bg-white rounded-[2.5rem] border border-gray-100 flex flex-col items-center justify-center text-center space-y-4">
           <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" /></svg>
           </div>
           <div>
              <h3 className="text-sm font-black text-gray-900 uppercase italic">No leads found</h3>
              <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mt-1">Try adjusting your search or filters</p>
           </div>
        </div>
      )}

      <BookingDrawer 
        booking={selectedBooking}
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        onUpdate={updateBooking}
      />

    </div>
  );
}
