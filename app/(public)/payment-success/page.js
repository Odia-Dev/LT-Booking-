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

        {/* Recommended Next Steps */}
        <section className="space-y-6 pt-8">
           <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] text-center">Recommended Next Steps</h3>
           
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* CASE 1: Finance Required */}
              {booking?.finance_required && (
                 <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-xl transition-all group flex flex-col justify-between">
                    <div className="space-y-4">
                       <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                       </div>
                       <div>
                          <h4 className="text-xl font-black text-gray-900 uppercase italic">Complete Finance Pre-Approval</h4>
                          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Upload documents later for faster loan processing.</p>
                       </div>
                    </div>
                    <Link 
                       href={`/finance-application?bookingId=${bookingId}`}
                       className="mt-8 py-4 bg-[#E60023] text-white text-center font-bold rounded-2xl text-[10px] uppercase tracking-widest hover:bg-black transition-all"
                    >
                       Continue Finance Application
                    </Link>
                 </div>
              )}

              {/* CASE 2: Exchange Required */}
              {booking?.exchange_required && (
                 <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-xl transition-all group flex flex-col justify-between">
                    <div className="space-y-4">
                       <div className="w-12 h-12 bg-orange-50 text-orange-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" /></svg>
                       </div>
                       <div>
                          <h4 className="text-xl font-black text-gray-900 uppercase italic">Get Exchange Evaluation</h4>
                          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Submit your current vehicle details for best valuation.</p>
                       </div>
                    </div>
                    <Link 
                       href={`/exchange-evaluation?bookingId=${bookingId}`}
                       className="mt-8 py-4 bg-gray-900 text-white text-center font-bold rounded-2xl text-[10px] uppercase tracking-widest hover:bg-black transition-all"
                    >
                       Submit Exchange Details
                    </Link>
                 </div>
              )}

              {/* CASE 4: None Selected - Show Default Cards */}
              {!booking?.finance_required && !booking?.exchange_required && (
                 <>
                    <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-xl transition-all group flex flex-col justify-between">
                       <div className="space-y-4">
                          <div className="w-12 h-12 bg-gray-50 text-gray-900 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                             <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
                          </div>
                          <div>
                             <h4 className="text-xl font-black text-gray-900 uppercase italic">Visit Our Showroom</h4>
                             <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Book a preferred visit slot with our executive.</p>
                          </div>
                       </div>
                       <Link 
                          href={`/showroom-visit?bookingId=${bookingId}`}
                          className="mt-8 py-4 bg-[#E60023] text-white text-center font-bold rounded-2xl text-[10px] uppercase tracking-widest hover:bg-black transition-all"
                       >
                          Schedule Showroom Visit
                       </Link>
                    </div>

                    <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-xl transition-all group flex flex-col justify-between">
                       <div className="space-y-4">
                          <div className="w-12 h-12 bg-gray-50 text-gray-900 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                             <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                          </div>
                          <div>
                             <h4 className="text-xl font-black text-gray-900 uppercase italic">Schedule Test Drive</h4>
                             <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Experience the vehicle before delivery.</p>
                          </div>
                       </div>
                       <Link 
                          href="/test-drive"
                          className="mt-8 py-4 bg-gray-900 text-white text-center font-bold rounded-2xl text-[10px] uppercase tracking-widest hover:bg-black transition-all"
                       >
                          Schedule Test Drive
                       </Link>
                    </div>
                    <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-xl transition-all group flex flex-col justify-between">
                       <div className="space-y-4">
                          <div className="w-12 h-12 bg-gray-50 text-gray-900 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                             <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                          </div>
                          <div>
                             <h4 className="text-xl font-black text-gray-900 uppercase italic">Explore More Vehicles</h4>
                             <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Discover other premium models in our fleet.</p>
                          </div>
                       </div>
                       <Link 
                          href="/vehicles"
                          className="mt-8 py-4 bg-white border border-gray-200 text-gray-900 text-center font-bold rounded-2xl text-[10px] uppercase tracking-widest hover:bg-gray-50 transition-all"
                       >
                          Explore Vehicles
                       </Link>
                    </div>
                 </>
              )}
           </div>

           {/* Always show explore vehicles at the bottom link as well for quick navigation */}
           <div className="text-center pt-8">
              <Link href="/" className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.3em] hover:text-[#E60023] transition-colors">
                 Back to Main Website &rarr;
              </Link>
           </div>
        </section>

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
