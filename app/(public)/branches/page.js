
import Link from 'next/link';

export const metadata = {
  title: 'Our Branches',
  description: 'Explore Our Branches at Laxmi Toyota.',
};

export default function Page() {
  return (
    <div className="min-h-screen bg-[#f8f9fa] pt-24 sm:pt-32 pb-16 sm:pb-20">
      <div className="main-container">
        <div className="bg-white p-8 sm:p-12 md:p-20 rounded-3xl sm:rounded-[2.5rem] border border-gray-100 shadow-sm text-center">
          <div className="w-16 h-16 sm:w-20 h-20 bg-red-50 text-[#ff2b2b] rounded-full flex items-center justify-center mx-auto mb-6 sm:mb-8">
            <svg className="w-8 h-8 sm:w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 uppercase italic mb-6 leading-tight">Our Branches</h1>
          <p className="text-gray-500 font-medium text-base sm:text-lg max-w-2xl mx-auto mb-10 px-4 sm:px-0">
            This section is currently being updated with premium content. 
            Check back soon for the full experience.
          </p>
          <Link href="/" className="inline-block px-8 sm:px-10 py-3.5 sm:py-4 bg-[#ff2b2b] text-white font-bold rounded-xl text-xs sm:text-sm uppercase tracking-widest hover:bg-black transition-all">
            Return to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
}
