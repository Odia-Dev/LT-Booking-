"use client";
import { useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

function ShowroomVisitForm() {
  const searchParams = useSearchParams();
  const bookingId = searchParams.get('bookingId');
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const branches = [
    'Brahmapur', 'Bhawanipatna', 'Jeypore', 'Rayagada', 
    'Bargarh', 'Balangir', 'Paralakhemundi', 'Aska'
  ];

  const timeSlots = [
    '10:00 AM', '12:00 PM', '2:00 PM', '4:00 PM', '6:00 PM'
  ];

  const [formData, setFormData] = useState({
    branch: branches[0],
    date: '',
    timeSlot: timeSlots[0],
    notes: ''
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
          showroom_visit_requested: true,
          showroom_branch: formData.branch,
          showroom_date: formData.date,
          showroom_time: formData.timeSlot,
          showroom_visit_notes: formData.notes
        }),
      });

      if (res.ok) {
        setSubmitted(true);
      } else {
        alert('Failed to schedule visit. Please try again.');
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
          <div className="w-20 h-20 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto">
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
          </div>
          <h2 className="text-3xl font-black text-gray-900 uppercase italic">Visit Scheduled</h2>
          <p className="text-sm text-gray-500 font-medium">Your showroom visit for {formData.branch} on {formData.date} at {formData.timeSlot} has been confirmed. Our team will keep the vehicle ready for you.</p>
          <button onClick={() => router.push('/')} className="w-full py-4 bg-black text-white font-bold rounded-2xl text-[10px] uppercase tracking-widest">Back to Home</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F9FA] pt-24 pb-32 px-6">
      <div className="max-w-xl mx-auto space-y-12">
        <header className="text-center space-y-4">
          <h1 className="text-4xl font-black text-gray-900 uppercase italic tracking-tight">Showroom Visit</h1>
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Preferred Consultation Slot</p>
        </header>

        <form onSubmit={handleSubmit} className="bg-white p-10 rounded-[3rem] border border-gray-100 shadow-xl space-y-8">
          <div className="space-y-6">
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Select Branch</label>
              <select 
                className="w-full bg-gray-50 border-none rounded-xl px-5 py-4 text-sm font-bold focus:ring-2 focus:ring-red-100 outline-none transition-all appearance-none"
                value={formData.branch}
                onChange={(e) => setFormData({...formData, branch: e.target.value})}
              >
                {branches.map(b => <option key={b}>{b}</option>)}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
               <div className="space-y-1">
                 <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Preferred Date</label>
                 <input 
                   required
                   type="date"
                   className="w-full bg-gray-50 border-none rounded-xl px-5 py-4 text-sm font-bold focus:ring-2 focus:ring-red-100 outline-none transition-all"
                   value={formData.date}
                   onChange={(e) => setFormData({...formData, date: e.target.value})}
                 />
               </div>
               <div className="space-y-1">
                 <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Time Slot</label>
                 <select 
                   className="w-full bg-gray-50 border-none rounded-xl px-5 py-4 text-sm font-bold focus:ring-2 focus:ring-red-100 outline-none transition-all appearance-none"
                   value={formData.timeSlot}
                   onChange={(e) => setFormData({...formData, timeSlot: e.target.value})}
                 >
                   {timeSlots.map(t => <option key={t}>{t}</option>)}
                 </select>
               </div>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Notes (Optional)</label>
              <textarea 
                placeholder="Any specific variant or color you'd like to see?"
                className="w-full bg-gray-50 border-none rounded-xl px-5 py-4 text-sm font-bold focus:ring-2 focus:ring-red-100 outline-none transition-all h-32 resize-none"
                value={formData.notes}
                onChange={(e) => setFormData({...formData, notes: e.target.value})}
              />
            </div>
          </div>

          <button 
            type="submit"
            disabled={loading}
            className="w-full py-5 bg-[#E60023] text-white font-black rounded-2xl text-[10px] uppercase tracking-widest shadow-xl shadow-red-100 hover:bg-black transition-all disabled:opacity-50"
          >
            {loading ? 'Confirming Visit...' : 'Confirm Showroom Visit'}
          </button>
        </form>

        <p className="text-center text-[9px] text-gray-400 font-bold uppercase tracking-widest">
           Laxmi Toyota Official Showroom Network • Bhubaneswar & Puri
        </p>
      </div>
    </div>
  );
}

export default function ShowroomVisitPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white flex items-center justify-center">Loading...</div>}>
      <ShowroomVisitForm />
    </Suspense>
  );
}
