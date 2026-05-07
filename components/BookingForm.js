'use client';
import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { trackEvent } from '@/utils/analytics';
import { BRANCHES } from '@/constants/branches';

const CONTACT_TIMES = ["Morning", "Afternoon", "Evening"];

const BookingForm = ({ vehicleId, vehicleName, variant, color, interior, amount, vehicleImage }) => {
  const router = useRouter();
  const [formData, setFormData] = useState({ 
    name: '', email: '', phone: '', city: '',
    branch: '', contactTime: '',
    exchange: false, finance: false, whatsapp: false,
    consent: false
  });
  
  const [loading, setLoading] = useState(false);
  const [phoneError, setPhoneError] = useState('');
  
  // OTP State
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [otpCode, setOtpCode] = useState('');
  const [otpLoading, setOtpLoading] = useState(false);

  const handlePhoneChange = (e) => {
    const val = e.target.value.replace(/\D/g, '');
    if (val.length <= 10) {
      setFormData({ ...formData, phone: val });
    }
    setOtpSent(false);
    setOtpVerified(false);
    if (val.length > 0 && val.length < 10) {
      setPhoneError('Please enter a valid 10-digit number');
    } else if (val.length === 10 && !/^[6-9]\d{9}$/.test(val)) {
      setPhoneError('Please enter a valid Indian mobile number');
    } else {
      setPhoneError('');
    }
  };

  const handleSendOTP = () => {
    if (formData.phone.length !== 10 || phoneError) {
      alert("Please enter a valid phone number first.");
      return;
    }
    setOtpLoading(true);
    // Simulate Firebase OTP network request
    setTimeout(() => {
      setOtpSent(true);
      setOtpLoading(false);
      alert(`OTP sent to ${formData.phone} via Firebase (Mock). Enter 123456 to verify.`);
    }, 1000);
  };

  const handleVerifyOTP = () => {
    if (otpCode !== '123456') { // Mock validation
      alert("Invalid OTP code.");
      return;
    }
    setOtpLoading(true);
    setTimeout(() => {
      setOtpVerified(true);
      setOtpLoading(false);
      trackEvent('OTPVerified', { phone: formData.phone });
    }, 800);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.phone || !formData.city || !formData.email) {
      alert("Please complete all required fields.");
      return;
    }

    if (!formData.consent) {
      alert("You must agree to the Terms & Conditions and Privacy Policy.");
      return;
    }

    if (!otpVerified) {
      alert("Please verify your phone number before proceeding to payment.");
      return;
    }

    if (!vehicleId) {
      alert("Vehicle selection lost. Please refresh the page.");
      return;
    }

    setLoading(true);

    try {
      // 1. Create Booking in DB
      const bookingRes = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer_name: formData.name,
          phone: formData.phone,
          email: formData.email,
          city: formData.city,
          vehicle_slug: vehicleId,
          vehicle_name: vehicleName,
          variant_name: variant,
          exterior_color_name: color,
          interior_color_name: interior || 'Standard', 
          booking_amount: amount,
          finance_required: formData.finance,
          exchange_required: formData.exchange,
          preferred_branch: formData.branch,
          preferred_contact_time: formData.contactTime,
          whatsapp_updates_enabled: formData.whatsapp,
          privacy_policy_accepted: formData.consent,
          terms_accepted: formData.consent,
          phone_verified: otpVerified,
          source: 'Direct'
        }),
      });

      if (bookingRes.status === 429) {
        throw new Error("Too many requests from this phone number. Please try again later.");
      }

      if (!bookingRes.ok) {
        throw new Error("Failed to secure booking record. Please try again.");
      }

      const { bookingId } = await bookingRes.json();
      
      trackEvent('GenerateLead', { vehicle_name: vehicleName, value: amount, currency: 'INR' });

      // 2. Create Razorpay Order
      const orderRes = await fetch("/api/payment/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bookingId }),
      });
      
      const { order, error: orderError } = await orderRes.json();
      
      if (!order || !order.amount || !order.id) {
        console.error("Order Validation Failed:", orderError || "Invalid order object");
        alert("Payment initialization failed. Please try again or contact support.");
        setLoading(false);
        return;
      }

      if (!process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID) {
        console.error("Razorpay Key ID is missing");
        alert("Configuration error.");
        setLoading(false);
        return;
      }

      if (typeof window.Razorpay === 'undefined') {
        alert("Payment gateway loading...");
        setLoading(false);
        return;
      }

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: "INR",
        name: "Laxmi Toyota",
        description: `Booking for ${vehicleName}`,
        image: "https://laxmitoyota.com/favicon.ico",
        order_id: order.id,
        handler: async function (response) {
          try {
            const verifyRes = await fetch("/api/payment/verify", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(response),
            });
            
            if (verifyRes.ok) {
              trackEvent('Purchase', {
                transaction_id: response.razorpay_payment_id,
                value: amount, currency: 'INR',
                items: [{ item_name: vehicleName, item_variant: variant }]
              });
              router.push(`/payment-success?id=${bookingId}`);
            } else {
              router.push('/payment-failed');
            }
          } catch (err) {
            router.push('/payment-failed');
          }
        },
        modal: { ondismiss: function() { setLoading(false); } },
        prefill: { name: formData.name, email: formData.email, contact: formData.phone },
        theme: { color: "#ff2b2b" },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error("Payment Flow Error:", err);
      alert(err.message || "An unexpected error occurred.");
      setLoading(false);
    }
  };

  const inputClass = "w-full bg-white border border-gray-200 px-6 py-4 rounded-2xl text-gray-900 outline-none focus:border-[#ff2b2b] focus:ring-1 focus:ring-[#ff2b2b] transition-all placeholder:text-gray-300 font-medium shadow-sm";
  const labelClass = "text-[10px] font-bold uppercase tracking-widest text-gray-500 ml-4 mb-1 block";

  return (
    <form onSubmit={handleSubmit} className="space-y-10 animate-in fade-in duration-1000">
      
      {/* SECTION 2: Customer Details */}
      <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 space-y-6">
        <h3 className="text-sm font-bold text-gray-900 uppercase tracking-widest border-l-4 border-[#ff2b2b] pl-4">Customer Details</h3>
        
        <div className="space-y-5">
          <div>
            <label className={labelClass}>Full Name <span className="text-[#ff2b2b]">*</span></label>
            <input required placeholder="Enter your full name" className={inputClass} value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className={labelClass}>Email Address <span className="text-[#ff2b2b]">*</span></label>
              <input required type="email" autoComplete="email" placeholder="name@example.com" className={inputClass} value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
            </div>
            <div>
              <label className={labelClass}>City <span className="text-[#ff2b2b]">*</span></label>
              <input required placeholder="Enter your city" className={inputClass} value={formData.city} onChange={(e) => setFormData({ ...formData, city: e.target.value })} />
            </div>
          </div>

          {/* OTP Flow for Phone Number - Fixed Overlap & Premium Structure */}
          <div className="p-6 border border-gray-100 bg-gray-50/50 rounded-3xl space-y-4">
             <label className={labelClass}>Phone Number <span className="text-[#ff2b2b]">*</span></label>
             <div className="flex flex-col sm:flex-row gap-3">
               <div className={`flex flex-1 items-stretch bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm transition-all focus-within:border-[#ff2b2b] focus-within:ring-1 focus-within:ring-[#ff2b2b] ${otpVerified ? 'bg-green-50 border-green-200 ring-0' : ''}`}>
                 <div className="flex items-center justify-center bg-gray-50 border-r border-gray-100 px-5 select-none">
                   <span className="text-sm font-bold text-gray-500">+91</span>
                 </div>
                 <input
                   required
                   type="tel"
                   inputMode="numeric"
                   autoComplete="tel"
                   placeholder="Enter mobile number"
                   className="w-full py-4 px-5 bg-transparent text-gray-900 outline-none placeholder:text-gray-300 font-medium disabled:text-green-800 disabled:opacity-80"
                   value={formData.phone}
                   onChange={handlePhoneChange}
                   disabled={otpVerified}
                 />
               </div>
               
               {!otpVerified && !otpSent && (
                 <button 
                   type="button" 
                   onClick={handleSendOTP} 
                   disabled={formData.phone.length !== 10 || phoneError || otpLoading}
                   className="px-8 py-4 bg-gray-900 text-white font-bold rounded-2xl text-xs uppercase tracking-widest disabled:opacity-50 min-w-[140px] hover:bg-black transition-colors"
                 >
                   {otpLoading ? 'Sending...' : 'Send OTP'}
                 </button>
               )}
               
               {otpVerified && (
                  <div className="px-8 py-4 bg-green-100 text-green-700 font-bold rounded-2xl flex items-center justify-center gap-2 min-w-[140px] animate-in zoom-in-95 duration-300">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
                    <span className="text-xs uppercase tracking-widest">Verified</span>
                  </div>
               )}
             </div>
             {phoneError && <p className="text-[#ff2b2b] text-xs font-bold pl-4">{phoneError}</p>}

             {otpSent && !otpVerified && (
               <div className="flex flex-col sm:flex-row gap-3 pt-2 animate-in fade-in">
                 <input
                   type="text"
                   maxLength={6}
                   placeholder="Enter 6-digit OTP (123456)"
                   className={inputClass}
                   value={otpCode}
                   onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, ''))}
                 />
                 <button 
                   type="button" 
                   onClick={handleVerifyOTP} 
                   disabled={otpCode.length !== 6 || otpLoading}
                   className="px-8 py-4 bg-[#ff2b2b] text-white font-bold rounded-2xl text-xs uppercase tracking-widest disabled:opacity-50 min-w-[140px]"
                 >
                   {otpLoading ? 'Verifying...' : 'Verify'}
                 </button>
               </div>
             )}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-4">
            <div>
              <label className={labelClass}>Preferred Branch (Optional)</label>
              <select className={inputClass} value={formData.branch} onChange={(e) => setFormData({ ...formData, branch: e.target.value })}>
                <option value="" disabled>Select Preferred Branch</option>
                {BRANCHES.map(b => <option key={b.id} value={b.name}>{b.name}</option>)}
              </select>
            </div>
            <div>
              <label className={labelClass}>Preferred Contact Time (Optional)</label>
              <select className={inputClass} value={formData.contactTime} onChange={(e) => setFormData({ ...formData, contactTime: e.target.value })}>
                <option value="" disabled>Select Time</option>
                {CONTACT_TIMES.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 3: Sales Intent */}
      <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 space-y-6">
        <h3 className="text-sm font-bold text-gray-900 uppercase tracking-widest border-l-4 border-gray-300 pl-4">Booking Preferences</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <button type="button" onClick={() => setFormData({...formData, finance: !formData.finance})} className={`flex items-center justify-between p-5 rounded-2xl border transition-all ${formData.finance ? 'border-[#ff2b2b] bg-red-50 text-[#ff2b2b]' : 'border-gray-100 bg-white text-gray-500'}`}>
            <span className="text-[11px] font-bold uppercase tracking-widest">Finance Required?</span>
            <div className={`w-10 h-5 rounded-full relative transition-colors ${formData.finance ? 'bg-[#ff2b2b]' : 'bg-gray-200'}`}><div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all ${formData.finance ? 'left-6' : 'left-1'}`} /></div>
          </button>
          <button type="button" onClick={() => setFormData({...formData, exchange: !formData.exchange})} className={`flex items-center justify-between p-5 rounded-2xl border transition-all ${formData.exchange ? 'border-[#ff2b2b] bg-red-50 text-[#ff2b2b]' : 'border-gray-100 bg-white text-gray-500'}`}>
            <span className="text-[11px] font-bold uppercase tracking-widest">Exchange Vehicle?</span>
            <div className={`w-10 h-5 rounded-full relative transition-colors ${formData.exchange ? 'bg-[#ff2b2b]' : 'bg-gray-200'}`}><div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all ${formData.exchange ? 'left-6' : 'left-1'}`} /></div>
          </button>
          <button type="button" onClick={() => setFormData({...formData, whatsapp: !formData.whatsapp})} className={`flex items-center justify-between p-5 rounded-2xl border transition-all ${formData.whatsapp ? 'border-green-500 bg-green-50 text-green-700' : 'border-gray-100 bg-white text-gray-500'}`}>
             <span className="text-[11px] font-bold uppercase tracking-widest">WhatsApp Updates?</span>
             <div className={`w-10 h-5 rounded-full relative transition-colors ${formData.whatsapp ? 'bg-green-500' : 'bg-gray-200'}`}><div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all ${formData.whatsapp ? 'left-6' : 'left-1'}`} /></div>
          </button>
        </div>
      </div>

      {/* SECTION 4 & 5: Legal & Fake Lead Prevention */}
      <div className="space-y-4">
        <label className="flex items-start gap-4 p-4 bg-gray-50 rounded-2xl cursor-pointer hover:bg-gray-100 transition-colors">
          <input 
            type="checkbox" 
            className="mt-1 w-5 h-5 accent-[#ff2b2b]" 
            required 
            checked={formData.consent} 
            onChange={(e) => setFormData({...formData, consent: e.target.checked})} 
          />
          <span className="text-sm text-gray-600 font-medium">
            I agree to the <a href="#" className="text-gray-900 font-bold underline">Privacy Policy</a> and <a href="#" className="text-gray-900 font-bold underline">Terms & Conditions</a>. I authorize Laxmi Toyota to contact me regarding my vehicle reservation.
          </span>
        </label>
        
        {/* reCAPTCHA badge simulation */}
        <div className="flex justify-end pr-2 text-[10px] text-gray-400 font-medium items-center gap-2">
           <svg className="w-4 h-4 text-blue-500" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15l-4-4 1.41-1.41L11 14.17l6.59-6.59L19 9l-8 8z"/></svg>
           Protected by reCAPTCHA
        </div>
      </div>

      {/* SECTION 6: Payment Flow */}
      <button
        type="submit"
        disabled={loading || !otpVerified || !formData.consent}
        className="hidden lg:flex w-full py-6 bg-[#ff2b2b] text-white font-black rounded-2xl uppercase tracking-[0.2em] shadow-xl shadow-red-100 hover:bg-black transition-all items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? (
           <><div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></div> Initializing Secure Checkout...</>
        ) : `Pay Booking Amount • ₹${amount.toLocaleString()}`}
      </button>

      {/* Sticky Mobile CTA */}
      <div className="lg:hidden fixed bottom-0 left-0 w-full bg-white/90 backdrop-blur-xl border-t border-gray-100 p-6 z-[60] flex items-center justify-between">
         <div className="flex flex-col">
           <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Payable Amount</span>
           <span className="text-xl font-black italic">₹{amount.toLocaleString()}</span>
         </div>
         <button
           type="submit"
           disabled={loading || !otpVerified || !formData.consent}
           className="px-8 py-4 bg-[#ff2b2b] text-white font-bold rounded-xl uppercase tracking-widest text-xs hover:bg-black transition-all disabled:opacity-50 min-w-[160px] flex justify-center items-center"
         >
           {loading ? <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></div> : 'Pay Amount'}
         </button>
      </div>

    </form>
  );
};

export default BookingForm;
