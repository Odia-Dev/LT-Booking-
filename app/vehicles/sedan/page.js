
import Link from 'next/link';

export const metadata = {
  title: 'Premium Sedans',
  description: 'Explore Premium Sedans at Laxmi Toyota.',
};

export default function Page() {
  return (
    <div className="min-h-screen bg-[#f8f9fa] pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="bg-white p-12 md:p-20 rounded-[2.5rem] border border-gray-100 shadow-sm text-center">
          <div className="w-20 h-20 bg-red-50 text-[#ff2b2b] rounded-full flex items-center justify-center mx-auto mb-8">
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 uppercase italic mb-6">Premium Sedans</h1>
          <p className="text-gray-500 font-medium text-lg max-w-2xl mx-auto mb-10">
            This section is currently being updated with premium content. 
            Check back soon for the full experience.
          </p>
          <Link href="/" className="inline-block px-10 py-4 bg-[#ff2b2b] text-white font-bold rounded-xl uppercase tracking-widest hover:bg-black transition-all">
            Return to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
}
