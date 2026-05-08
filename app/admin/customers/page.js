"use client";
import { useState, useEffect } from 'react';
import CustomerTable from '../components/CustomerTable';

export default function CustomersPage() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const res = await fetch('/api/admin/bookings');
      const data = await res.json();
      
      if (Array.isArray(data)) {
        // Aggregate bookings by phone number to identify unique customers
        const customerMap = data.reduce((acc, b) => {
          const key = b.phone;
          if (!acc[key]) {
            acc[key] = {
              name: b.customer_name,
              phone: b.phone,
              email: b.email,
              city: b.city,
              bookingCount: 0,
              totalSpent: 0,
              lastActive: b.createdAt
            };
          }
          
          acc[key].bookingCount += 1;
          if (b.payment_status === 'Paid') {
            acc[key].totalSpent += (b.booking_amount || 0);
          }
          
          if (new Date(b.createdAt) > new Date(acc[key].lastActive)) {
            acc[key].lastActive = b.createdAt;
          }
          
          return acc;
        }, {});
        
        setCustomers(Object.values(customerMap).sort((a, b) => b.totalSpent - a.totalSpent));
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
          <h1 className="text-3xl font-black text-gray-900 uppercase italic tracking-tight">Customer Intelligence</h1>
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-2">Unified database of all prospects and owners</p>
        </div>
        <div className="flex gap-4">
           <div className="bg-white px-6 py-3 rounded-2xl border border-gray-100 shadow-sm text-center">
              <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Total Profiles</p>
              <p className="text-xl font-black text-gray-900">{customers.length}</p>
           </div>
        </div>
      </div>

      <CustomerTable customers={customers} loading={loading} />
    </div>
  );
}
