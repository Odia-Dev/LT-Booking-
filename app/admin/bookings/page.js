'use client';
import { useState, useEffect } from 'react';
import BookingTable from '../components/BookingTable';
import BookingDrawer from '../components/BookingDrawer';

export default function BookingsPage() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const res = await fetch('/api/admin/bookings');
      const data = await res.json();
      if (Array.isArray(data)) setBookings(data);
    } catch (err) {
      console.error(err);
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

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-black text-gray-900 uppercase italic tracking-tight">Reservations Ledger</h1>
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-2">Comprehensive list of all vehicle bookings</p>
        </div>
      </div>

      <BookingTable 
        bookings={bookings} 
        loading={loading}
        onRowClick={(b) => {
          setSelectedBooking(b);
          setIsDrawerOpen(true);
        }} 
      />

      <BookingDrawer 
        booking={selectedBooking}
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        onUpdate={updateBooking}
      />
    </div>
  );
}
