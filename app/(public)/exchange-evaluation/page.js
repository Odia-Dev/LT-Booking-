"use client";
import { useState, Suspense, useRef } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

function ExchangeForm() {
  const searchParams = useSearchParams();
  const bookingId = searchParams.get('bookingId');
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [previews, setPreviews] = useState([]);
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    brand: '',
    model: '',
    regYear: '',
    kmDriven: '',
    fuelType: 'Petrol',
    accidentHistory: 'No',
  });

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const newPreviews = files.map(file => URL.createObjectURL(file));
    setPreviews(prev => [...prev, ...newPreviews].slice(0, 6));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!bookingId) return;
    setLoading(true);

    try {
      const res = await fetch(`/api/bookings/${bookingId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          exchange_details_submitted: true,
          exchange_details: {
            brand: formData.brand,
            model: formData.model,
            reg_year: parseInt(formData.regYear),
            km_driven: parseInt(formData.kmDriven),
            fuel_type: formData.fuelType,
            accident_history: formData.accidentHistory
          }
        }),
      });

      if (res.ok) {
        setSubmitted(true);
      } else {
        alert('Failed to submit details. Please try again.');
      }
    } catch (err) {
      console.error(err);
      alert('A connection error occurred.');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-6">
        <div className="max-w-md w-full text-center space-y-6">
          <div className="w-20 h-20 bg-orange-50 text-orange-600 rounded-full flex items-center justify-center mx-auto">
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
          </div>
          <h2 className="text-3xl font-black text-gray-900 uppercase italic">Evaluation Initiated</h2>
          <p className="text-sm text-gray-500 font-medium">Our evaluation experts will review your vehicle details and provide a tentative valuation within 2 hours.</p>
          <button onClick={() => router.push('/')} className="w-full py-4 bg-black text-white font-bold rounded-2xl text-[10px] uppercase tracking-widest">Back to Home</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F9FA] pt-24 pb-32 px-6">
      <div className="max-w-2xl mx-auto space-y-12">
        <header className="text-center space-y-4">
          <h1 className="text-4xl font-black text-gray-900 uppercase italic tracking-tight">Exchange Evaluation</h1>
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Step 6: Vehicle Appraisal (Optional)</p>
        </header>

        <form onSubmit={handleSubmit} className="bg-white p-10 rounded-[3rem] border border-gray-100 shadow-xl space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Vehicle Brand</label>
              <input 
                required
                placeholder="e.g. Maruti Suzuki"
                className="w-full bg-gray-50 border-none rounded-xl px-5 py-4 text-sm font-bold focus:ring-2 focus:ring-red-100 outline-none transition-all"
                value={formData.brand}
                onChange={(e) => setFormData({...formData, brand: e.target.value})}
              />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Vehicle Model</label>
              <input 
                required
                placeholder="e.g. Swift"
                className="w-full bg-gray-50 border-none rounded-xl px-5 py-4 text-sm font-bold focus:ring-2 focus:ring-red-100 outline-none transition-all"
                value={formData.model}
                onChange={(e) => setFormData({...formData, model: e.target.value})}
              />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Registration Year</label>
              <input 
                required
                type="number"
                placeholder="2018"
                className="w-full bg-gray-50 border-none rounded-xl px-5 py-4 text-sm font-bold focus:ring-2 focus:ring-red-100 outline-none transition-all"
                value={formData.regYear}
                onChange={(e) => setFormData({...formData, regYear: e.target.value})}
              />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">KM Driven</label>
              <input 
                required
                type="number"
                placeholder="45000"
                className="w-full bg-gray-50 border-none rounded-xl px-5 py-4 text-sm font-bold focus:ring-2 focus:ring-red-100 outline-none transition-all"
                value={formData.kmDriven}
                onChange={(e) => setFormData({...formData, kmDriven: e.target.value})}
              />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Fuel Type</label>
              <select 
                className="w-full bg-gray-50 border-none rounded-xl px-5 py-4 text-sm font-bold focus:ring-2 focus:ring-red-100 outline-none transition-all appearance-none"
                value={formData.fuelType}
                onChange={(e) => setFormData({...formData, fuelType: e.target.value})}
              >
                <option>Petrol</option>
                <option>Diesel</option>
                <option>Electric</option>
                <option>CNG</option>
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Accident History</label>
              <select 
                className="w-full bg-gray-50 border-none rounded-xl px-5 py-4 text-sm font-bold focus:ring-2 focus:ring-red-100 outline-none transition-all appearance-none"
                value={formData.accidentHistory}
                onChange={(e) => setFormData({...formData, accidentHistory: e.target.value})}
              >
                <option>No</option>
                <option>Minor</option>
                <option>Major</option>
              </select>
            </div>
          </div>

          <div className="space-y-4 pt-4">
             <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1 block">Vehicle Images (Exterior & Interior)</label>
             <div className="grid grid-cols-3 sm:grid-cols-4 gap-4">
                {previews.map((src, i) => (
                  <div key={i} className="aspect-square bg-gray-100 rounded-xl overflow-hidden border border-gray-200">
                    <img src={src} className="w-full h-full object-cover" />
                  </div>
                ))}
                {previews.length < 6 && (
                  <button 
                    type="button"
                    onClick={() => fileInputRef.current.click()}
                    className="aspect-square bg-gray-50 border-2 border-dashed border-gray-200 rounded-xl flex items-center justify-center text-gray-400 hover:bg-white hover:border-red-200 transition-all"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
                  </button>
                )}
             </div>
             <input type="file" ref={fileInputRef} className="hidden" multiple accept="image/*" onChange={handleImageChange} />
          </div>

          <button 
            type="submit"
            disabled={loading}
            className="w-full py-5 bg-gray-900 text-white font-black rounded-2xl text-[10px] uppercase tracking-widest shadow-xl shadow-gray-200 hover:bg-[#E60023] transition-all disabled:opacity-50"
          >
            {loading ? 'Evaluating...' : 'Request Valuation'}
          </button>
        </form>

        <p className="text-center text-[9px] text-gray-400 font-bold uppercase tracking-widest">
           Tentative pricing based on online appraisal • Subject to physical verification
        </p>
      </div>
    </div>
  );
}

export default function ExchangeEvaluationPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white flex items-center justify-center">Loading...</div>}>
      <ExchangeForm />
    </Suspense>
  );
}
