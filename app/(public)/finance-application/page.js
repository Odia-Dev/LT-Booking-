"use client";
import { useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

function FinanceForm() {
  const searchParams = useSearchParams();
  const bookingId = searchParams.get('bookingId');
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    aadhaarNumber: '',
    panNumber: '',
    employmentType: 'Salaried',
    monthlyIncome: '',
    companyName: '',
    bankName: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!bookingId) return;
    setLoading(true);
    
    try {
      const res = await fetch(`/api/bookings/${bookingId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          finance_docs_submitted: true,
          finance_details: {
            aadhaar_number: formData.aadhaarNumber,
            pan_number: formData.panNumber,
            employment_type: formData.employmentType,
            monthly_income: parseInt(formData.monthlyIncome),
            company_name: formData.companyName,
            bank_name: formData.bankName
          }
        }),
      });

      if (res.ok) {
        setSubmitted(true);
      } else {
        alert('Failed to submit application. Please try again.');
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
          <div className="w-20 h-20 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto">
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
          </div>
          <h2 className="text-3xl font-black text-gray-900 uppercase italic">Application Received</h2>
          <p className="text-sm text-gray-500 font-medium">Your finance documents have been queued for verification. Our loan officer will contact you shortly.</p>
          <button onClick={() => router.push('/')} className="w-full py-4 bg-black text-white font-bold rounded-2xl text-[10px] uppercase tracking-widest">Back to Home</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F9FA] pt-24 pb-32 px-6">
      <div className="max-w-2xl mx-auto space-y-12">
        <header className="text-center space-y-4">
          <h1 className="text-4xl font-black text-gray-900 uppercase italic tracking-tight">Finance Pre-Approval</h1>
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Step 5: Document Submission (Optional)</p>
        </header>

        <form onSubmit={handleSubmit} className="bg-white p-10 rounded-[3rem] border border-gray-100 shadow-xl space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Aadhaar Number</label>
              <input 
                required
                placeholder="0000 0000 0000"
                className="w-full bg-gray-50 border-none rounded-xl px-5 py-4 text-sm font-bold focus:ring-2 focus:ring-red-100 outline-none transition-all"
                value={formData.aadhaarNumber}
                onChange={(e) => setFormData({...formData, aadhaarNumber: e.target.value})}
              />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">PAN Number</label>
              <input 
                required
                placeholder="ABCDE1234F"
                className="w-full bg-gray-50 border-none rounded-xl px-5 py-4 text-sm font-bold focus:ring-2 focus:ring-red-100 outline-none transition-all"
                value={formData.panNumber}
                onChange={(e) => setFormData({...formData, panNumber: e.target.value})}
              />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Employment Type</label>
              <select 
                className="w-full bg-gray-50 border-none rounded-xl px-5 py-4 text-sm font-bold focus:ring-2 focus:ring-red-100 outline-none transition-all appearance-none"
                value={formData.employmentType}
                onChange={(e) => setFormData({...formData, employmentType: e.target.value})}
              >
                <option>Salaried</option>
                <option>Self-Employed</option>
                <option>Business Owner</option>
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Monthly Income (₹)</label>
              <input 
                required
                type="number"
                placeholder="50000"
                className="w-full bg-gray-50 border-none rounded-xl px-5 py-4 text-sm font-bold focus:ring-2 focus:ring-red-100 outline-none transition-all"
                value={formData.monthlyIncome}
                onChange={(e) => setFormData({...formData, monthlyIncome: e.target.value})}
              />
            </div>
            <div className="col-span-full space-y-1">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Company / Business Name</label>
              <input 
                required
                placeholder="Enter your organization name"
                className="w-full bg-gray-50 border-none rounded-xl px-5 py-4 text-sm font-bold focus:ring-2 focus:ring-red-100 outline-none transition-all"
                value={formData.companyName}
                onChange={(e) => setFormData({...formData, companyName: e.target.value})}
              />
            </div>
            <div className="col-span-full space-y-1">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Primary Bank Name</label>
              <input 
                required
                placeholder="e.g. HDFC Bank"
                className="w-full bg-gray-50 border-none rounded-xl px-5 py-4 text-sm font-bold focus:ring-2 focus:ring-red-100 outline-none transition-all"
                value={formData.bankName}
                onChange={(e) => setFormData({...formData, bankName: e.target.value})}
              />
            </div>
          </div>

          <div className="space-y-4 pt-4">
             <div className="p-6 bg-gray-50 rounded-2xl border border-dashed border-gray-200 text-center">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Upload Documents (Coming Soon)</p>
                <p className="text-[8px] text-gray-400 mt-1 italic">Aadhaar, PAN & 3 Months Payslip</p>
             </div>
          </div>

          <button 
            type="submit"
            disabled={loading}
            className="w-full py-5 bg-[#E60023] text-white font-black rounded-2xl text-[10px] uppercase tracking-widest shadow-xl shadow-red-100 hover:bg-black transition-all disabled:opacity-50"
          >
            {loading ? 'Processing Application...' : 'Submit Finance Application'}
          </button>
        </form>

        <p className="text-center text-[9px] text-gray-400 font-bold uppercase tracking-widest">
           Secure SSL Encrypted Submission • Laxmi Toyota Compliance
        </p>
      </div>
    </div>
  );
}

export default function FinanceApplicationPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white flex items-center justify-center">Loading...</div>}>
      <FinanceForm />
    </Suspense>
  );
}
