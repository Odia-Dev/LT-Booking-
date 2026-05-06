export default function ComingSoonPage({ title, description }) {
  return (
    <div className="h-[60vh] flex flex-col items-center justify-center space-y-6 text-center px-6">
      <div className="w-20 h-20 bg-gray-50 rounded-[2rem] flex items-center justify-center text-gray-200">
         <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
      </div>
      <div>
         <h1 className="text-3xl font-black text-gray-900 uppercase italic tracking-tight">{title}</h1>
         <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-2">{description}</p>
      </div>
      <div className="bg-white px-8 py-4 rounded-2xl border border-gray-100 shadow-sm inline-block">
         <p className="text-[9px] font-black text-[#E60023] uppercase tracking-[0.3em] animate-pulse">Advanced Module Under Construction</p>
      </div>
    </div>
  );
}
