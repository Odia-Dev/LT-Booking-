'use client';
import { useState } from 'react';

const BookingForm = ({ vehicleId, amount }) => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', date: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 1. Create Order
      const res = await fetch('/api/payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount, vehicleId, ...formData }),
      });
      const order = await res.json();

      // 2. Razorpay
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: "INR",
        name: "Laxmi Toyota",
        description: "Tesla-Style Premium Booking",
        order_id: order.id,
        handler: async function (response) {
          await fetch('/api/booking', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              ...formData,
              vehicleId,
              amount,
              razorpayOrderId: order.id,
              razorpayPaymentId: response.razorpay_payment_id,
              paymentStatus: 'completed'
            }),
          });
          alert('Welcome to the Family. Booking Confirmed.');
          window.location.href = '/';
        },
        theme: { color: "#E60023" },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error(err);
      alert('Error initiating booking.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#111] p-10 rounded-3xl border border-white/5 shadow-2xl">
      <h2 className="text-3xl font-bold mb-8">Personal Details</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Full Name</label>
          <input
            required
            className="w-full bg-transparent border-b border-white/20 py-3 text-white outline-none focus:border-[#E60023] transition-all"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Email Address</label>
            <input
              type="email"
              required
              className="w-full bg-transparent border-b border-white/20 py-3 text-white outline-none focus:border-[#E60023] transition-all"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Phone Number</label>
            <input
              required
              className="w-full bg-transparent border-b border-white/20 py-3 text-white outline-none focus:border-[#E60023] transition-all"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            />
          </div>
        </div>
        <div className="space-y-2">
          <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Delivery Preference</label>
          <input
            type="date"
            required
            className="w-full bg-transparent border-b border-white/20 py-3 text-white outline-none focus:border-[#E60023] transition-all"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full py-5 bg-[#E60023] text-white font-bold rounded-full uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-all disabled:opacity-50 mt-8"
        >
          {loading ? 'Processing...' : 'Pay Booking Deposit'}
        </button>
      </form>
    </div>
  );
};

export default BookingForm;
