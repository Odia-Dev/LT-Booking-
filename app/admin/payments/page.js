'use client';
import { useState, useEffect } from 'react';
import BookingTable from '../components/BookingTable';
import BookingDrawer from '../components/BookingDrawer';

export default function PaymentsPage() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    try {
      const res = await fetch('/api/admin/bookings');
      const data = await res.json();
      if (Array.isArray(data)) {
        // Only show Paid or Failed transactions in the Payment ledger
        const paymentRecords = data.filter(b => b.payment_status === 'Paid' || b.payment_status === 'Failed');
        setPayments(paymentRecords);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-black text-gray-900 uppercase italic tracking-tight">Financial Ledger</h1>
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-2">Reconciliation of all digital transactions</p>
        </div>
        <div className="flex gap-4">
           <div className="bg-white px-6 py-3 rounded-2xl border border-gray-100 shadow-sm">
              <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Total Settled</p>
              <p className="text-xl font-black text-green-600">₹{payments.filter(p => p.payment_status === 'Paid').reduce((acc, curr) => acc + (curr.booking_amount || 0), 0).toLocaleString()}</p>
           </div>
        </div>
      </div>

      <BookingTable 
        bookings={payments} 
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
        onUpdate={fetchPayments}
      />
    </div>
  );
}
