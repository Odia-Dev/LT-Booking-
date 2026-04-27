'use client';
import { useState, useEffect } from 'react';

export default function AdminDashboard() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await fetch('/api/booking');
        const data = await res.json();
        setBookings(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, []);

  return (
    <div className="min-h-screen bg-black pt-32 pb-24 px-6">
      <div className="max-w-7xl mx-auto">
        <header className="mb-12">
          <h1 className="text-5xl font-bold text-white mb-2">Internal Fleet</h1>
          <p className="text-gray-500 uppercase tracking-widest text-xs">Customer Reservations & Analytics</p>
        </header>

        <div className="bg-[#111] rounded-3xl border border-white/5 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-white/5">
                  <th className="p-8 text-[10px] font-bold uppercase tracking-widest text-gray-500">Customer</th>
                  <th className="p-8 text-[10px] font-bold uppercase tracking-widest text-gray-500">Vehicle Config</th>
                  <th className="p-8 text-[10px] font-bold uppercase tracking-widest text-gray-500">Status</th>
                  <th className="p-8 text-[10px] font-bold uppercase tracking-widest text-gray-500">Amount</th>
                  <th className="p-8 text-[10px] font-bold uppercase tracking-widest text-gray-500">Date</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr><td colSpan="5" className="p-8 text-center text-gray-500">Loading fleet data...</td></tr>
                ) : bookings.length > 0 ? (
                  bookings.map((booking) => (
                    <tr key={booking._id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                      <td className="p-8">
                        <div className="font-bold text-white">{booking.userName}</div>
                        <div className="text-[10px] text-gray-500 mt-1">{booking.userEmail}</div>
                      </td>
                      <td className="p-8">
                        <div className="text-sm text-gray-300">{booking.vehicleId?.name || 'Tesla Model S'}</div>
                        <div className="text-[10px] text-[#E60023] font-bold mt-1 uppercase tracking-widest">Premium Config</div>
                      </td>
                      <td className="p-8">
                        <span className={`px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${booking.paymentStatus === 'completed' ? 'bg-white text-black' : 'bg-white/10 text-white'}`}>
                          {booking.paymentStatus}
                        </span>
                      </td>
                      <td className="p-8">
                        <div className="font-bold text-white">₹{(booking.amount / 100).toLocaleString()}</div>
                      </td>
                      <td className="p-8">
                        <div className="text-sm text-gray-300">{new Date(booking.createdAt).toLocaleDateString()}</div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr><td colSpan="5" className="p-8 text-center text-gray-500 uppercase text-[10px] tracking-widest">No active reservations</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
