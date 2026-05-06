import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center text-center p-6 relative overflow-hidden">
      
      {/* Background Decorative Element */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#ff2b2b]/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="relative z-10 space-y-10 max-w-2xl mx-auto">
        
        <div className="space-y-2">
          <h1 className="text-[120px] md:text-[180px] font-black text-[#ff2b2b] italic leading-none tracking-tighter">404</h1>
          <h2 className="text-2xl md:text-3xl font-black uppercase tracking-[0.3em] italic">Lost in Transit</h2>
        </div>

        <p className="text-gray-400 font-medium text-lg leading-relaxed max-w-md mx-auto">
          The road you're looking for doesn't exist or has been relocated. Let's get you back to the main track.
        </p>

        {/* Search Bar Placeholder (AI Discoverability friendly) */}
        <div className="relative max-w-md mx-auto">
          <input 
            type="text" 
            placeholder="Search for a vehicle (e.g. Fortuner)..." 
            className="w-full bg-white/5 border border-white/10 px-8 py-5 rounded-2xl outline-none focus:border-[#ff2b2b] transition-all text-sm italic"
          />
          <button className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          </button>
        </div>

        {/* Action Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6">
          <Link href="/vehicles" className="px-10 py-5 bg-white text-black font-black uppercase tracking-widest text-xs rounded-2xl hover:bg-[#ff2b2b] hover:text-white transition-all shadow-xl shadow-white/5">
            Browse Inventory
          </Link>
          <Link href="/" className="px-10 py-5 bg-white/5 border border-white/10 text-white font-black uppercase tracking-widest text-xs rounded-2xl hover:bg-white hover:text-black transition-all">
            Back to Home
          </Link>
        </div>

        {/* Quick Links */}
        <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 pt-10 border-t border-white/10">
          <Link href="/service" className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em] hover:text-[#ff2b2b]">Service</Link>
          <Link href="/offers" className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em] hover:text-[#ff2b2b]">Offers</Link>
          <Link href="/contact" className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em] hover:text-[#ff2b2b]">Contact</Link>
        </div>

      </div>
    </div>
  );
}
