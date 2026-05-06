'use client';
import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

function SuccessContent() {
  const searchParams = useSearchParams();
  const bookingId = searchParams.get('id');
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (bookingId) {
      fetch(`/api/bookings/${bookingId}`)
        .then(res => res.json())
        .then(data => setBooking(data))
        .catch(err => console.error(err))
        .finally(() => setLoading(false));
    }
  }, [bookingId]);

  if (loading) return <div className="min-h-screen bg-white flex items-center justify-center font-bold text-gray-400 animate-pulse uppercase tracking-widest">Verifying Reservation...</div>;

  return (
    <div className="min-h-screen bg-[#F8F9FA] pt-24 pb-32 px-6">
      <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-1000">
        
        {/* Hero Success */}
        <div className="bg-white rounded-[3rem] p-12 text-center border border-gray-100 shadow-xl space-y-6">
          <div className="w-20 h-20 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
          </div>
          <h1 className="text-4xl lg:text-5xl font-black text-gray-900 uppercase italic tracking-tight">Booking Confirmed</h1>
          <p className="text-gray-500 font-bold text-sm uppercase tracking-widest">Our executive will contact you within 10 minutes</p>
          <div className="pt-4">
             <span className="bg-gray-100 px-6 py-2 rounded-full text-[10px] font-bold text-gray-400 uppercase tracking-widest">Booking ID: {bookingId}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
           {/* Customer Summary */}
           <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm space-y-6">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest border-b border-gray-50 pb-4">Customer Summary</p>
              <div className="space-y-4">
                 <div>
                    <p className="text-[9px] text-gray-400 uppercase font-bold">Name</p>
                    <p className="font-bold text-gray-900">{booking?.customer_name}</p>
                 </div>
                 <div>
                    <p className="text-[9px] text-gray-400 uppercase font-bold">Phone</p>
                    <p className="font-bold text-gray-900">{booking?.phone}</p>
                 </div>
                 <div>
                    <p className="text-[9px] text-gray-400 uppercase font-bold">Location</p>
                    <p className="font-bold text-gray-900 uppercase text-xs">{booking?.city}</p>
                 </div>
              </div>
           </div>

           {/* Vehicle Summary */}
           <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm space-y-6">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest border-b border-gray-50 pb-4">Vehicle Booked</p>
              <div className="space-y-4">
                 <div>
                    <p className="text-[9px] text-gray-400 uppercase font-bold">Model</p>
                    <p className="font-black text-gray-900 uppercase italic text-xl">{booking?.vehicle_name}</p>
                 </div>
                 <div>
                    <p className="text-[9px] text-gray-400 uppercase font-bold">Configuration</p>
                    <p className="font-bold text-[#E60023] uppercase text-xs">{booking?.variant_name} / {booking?.exterior_color_name}</p>
                 </div>
                 <div className="flex justify-between items-center bg-gray-50 p-4 rounded-xl">
                    <p className="text-[9px] text-gray-400 uppercase font-bold">Amount Paid</p>
                    <p className="font-black text-gray-900">₹{booking?.booking_amount?.toLocaleString()}</p>
                 </div>
              </div>
           </div>
        </div>

        {/* Action CTAs */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
           <a href="https://wa.me/910000000000" className="flex items-center justify-center gap-3 py-5 bg-[#25D366] text-white font-bold rounded-2xl text-[10px] uppercase tracking-widest hover:opacity-90 transition-all shadow-lg shadow-green-100">
              WhatsApp Chat
           </a>
           <Link href="/test-drive" className="flex items-center justify-center gap-3 py-5 bg-black text-white font-bold rounded-2xl text-[10px] uppercase tracking-widest hover:bg-[#E60023] transition-all">
              Schedule Test Drive
           </Link>
           <Link href="/vehicles" className="flex items-center justify-center gap-3 py-5 bg-white border border-gray-200 text-gray-900 font-bold rounded-2xl text-[10px] uppercase tracking-widest hover:bg-gray-50 transition-all">
              Explore More
           </Link>
        </div>

      </div>
    </div>
  );
}

export default function PaymentSuccessPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white flex items-center justify-center">Loading...</div>}>
      <SuccessContent />
    </Suspense>
  );
}
