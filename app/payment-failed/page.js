'use client';
import Link from 'next/link';

export default function PaymentFailedPage() {
  return (
    <div className="min-h-screen bg-[#F8F9FA] flex items-center justify-center px-6">
      <div className="max-w-xl w-full text-center space-y-8 animate-in zoom-in duration-700">
        
        {/* Error Icon */}
        <div className="w-24 h-24 bg-red-50 text-[#ff2b2b] rounded-full flex items-center justify-center mx-auto shadow-inner">
          <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        
        <div className="space-y-4">
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 uppercase italic tracking-tight leading-tight">Payment <span className="text-[#ff2b2b]">Unsuccessful</span></h1>
          <p className="text-gray-500 font-medium leading-relaxed max-w-md mx-auto">
            Your transaction was declined. Don't worry, your car configuration has been saved. Please choose an option below to proceed.
          </p>
        </div>

        {/* Action Stack */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-8">
          <Link 
            href="/book-online"
            className="flex items-center justify-center gap-3 py-5 bg-[#ff2b2b] text-white font-black rounded-2xl uppercase tracking-widest text-[11px] hover:bg-black transition-all shadow-xl shadow-red-100 group"
          >
            <svg className="w-4 h-4 group-hover:rotate-12 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
            Retry Payment
          </Link>
          
          <a 
            href="https://wa.me/9118001234567"
            className="flex items-center justify-center gap-3 py-5 bg-green-600 text-white font-black rounded-2xl uppercase tracking-widest text-[11px] hover:bg-green-700 transition-all shadow-xl shadow-green-100"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12.031 6.172c-2.27 0-4.116 1.846-4.116 4.116 0 .736.195 1.455.566 2.086l-.602 2.196 2.252-.591c.597.325 1.266.496 1.946.496 2.27 0 4.116-1.846 4.116-4.116 0-2.27-1.846-4.116-4.116-4.116zm2.348 5.766c-.053.149-.307.283-.431.3-.122.016-.279.031-.837-.194-.653-.263-1.074-.93-1.107-.974-.033-.044-.271-.36-.271-.687s.171-.489.232-.556c.061-.067.133-.083.177-.083s.088 0 .127.006c.041.003.096-.016.149.112.053.127.182.443.199.476.017.033.028.072.006.116-.022.044-.033.072-.067.111-.033.039-.071.088-.102.119-.033.031-.067.065-.028.132.039.067.172.284.37.46.255.226.471.296.538.329.067.033.107.028.147-.017.04-.045.172-.201.218-.27.045-.069.091-.058.152-.036.061.022.388.183.454.216s.111.055.127.083c.017.028.017.161-.036.31z" /></svg>
            WhatsApp Support
          </a>
        </div>

        <a 
          href="tel:+9118001234567"
          className="inline-block w-full py-5 bg-white border border-gray-200 text-gray-900 font-black rounded-2xl uppercase tracking-widest text-[11px] hover:bg-gray-50 transition-all"
        >
          Call Helpdesk: 1800-123-4567
        </a>

        <div className="pt-8">
           <Link href="/" className="text-[10px] font-bold text-gray-400 uppercase tracking-widest hover:text-black transition-all underline underline-offset-8 decoration-gray-200">Return to Homepage</Link>
        </div>
      </div>
    </div>
  );
}
