import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-black text-white pt-24 pb-12 border-t-4 border-[#ff2b2b]">
      <div className="main-container">
        
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12 mb-20">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-8">
            <Link href="/" className="text-3xl font-extrabold text-white tracking-tight inline-block">
              Laxmi <span className="text-[#ff2b2b]">Toyota</span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
              Odisha's premier automotive destination. Experience excellence, legendary reliability, and premium service across our expansive network of dealerships.
            </p>
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#ff2b2b] cursor-pointer transition-colors">
                <span className="font-bold text-sm">f</span>
              </div>
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#ff2b2b] cursor-pointer transition-colors">
                <span className="font-bold text-sm">X</span>
              </div>
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#ff2b2b] cursor-pointer transition-colors">
                <span className="font-bold text-sm">ig</span>
              </div>
            </div>
          </div>

          {/* 1. VEHICLES */}
          <div>
            <h4 className="text-xs font-black text-white mb-6 uppercase tracking-widest border-l-2 border-[#ff2b2b] pl-3">Vehicles</h4>
            <ul className="space-y-4 text-sm font-medium text-gray-400">
              <li><Link href="/vehicles/suv" className="hover:text-white hover:translate-x-1 inline-block transition-transform">SUVs</Link></li>
              <li><Link href="/vehicles/sedan" className="hover:text-white hover:translate-x-1 inline-block transition-transform">Sedans</Link></li>
              <li><Link href="/vehicles/hybrid" className="hover:text-white hover:translate-x-1 inline-block transition-transform">Hybrids</Link></li>
              <li><Link href="/vehicles/toyota-fortuner" className="hover:text-[#ff2b2b] hover:translate-x-1 inline-block transition-transform">Fortuner</Link></li>
              <li><Link href="/vehicles/toyota-innova-hycross" className="hover:text-[#ff2b2b] hover:translate-x-1 inline-block transition-transform">Innova Hycross</Link></li>
            </ul>
          </div>

          {/* 2. SERVICES & 3. COMPANY */}
          <div>
            <h4 className="text-xs font-black text-white mb-6 uppercase tracking-widest border-l-2 border-[#ff2b2b] pl-3">Services</h4>
            <ul className="space-y-4 text-sm font-medium text-gray-400 mb-10">
              <li><Link href="/service/book-service" className="hover:text-white hover:translate-x-1 inline-block transition-transform">Book Service</Link></li>
              <li><Link href="/insurance-finance" className="hover:text-white hover:translate-x-1 inline-block transition-transform">Insurance</Link></li>
              <li><Link href="/insurance-finance" className="hover:text-white hover:translate-x-1 inline-block transition-transform">Finance</Link></li>
              <li><Link href="/parts-accessories" className="hover:text-white hover:translate-x-1 inline-block transition-transform">Accessories</Link></li>
            </ul>

            <h4 className="text-xs font-black text-white mb-6 uppercase tracking-widest border-l-2 border-[#ff2b2b] pl-3">Company</h4>
            <ul className="space-y-4 text-sm font-medium text-gray-400">
              <li><Link href="/about" className="hover:text-white hover:translate-x-1 inline-block transition-transform">About Us</Link></li>
              <li><Link href="/careers" className="hover:text-white hover:translate-x-1 inline-block transition-transform">Careers</Link></li>
              <li><Link href="/reviews" className="hover:text-white hover:translate-x-1 inline-block transition-transform">Reviews</Link></li>
              <li><Link href="/gallery" className="hover:text-white hover:translate-x-1 inline-block transition-transform">Gallery</Link></li>
              <li><Link href="/blog" className="hover:text-white hover:translate-x-1 inline-block transition-transform">Blogs</Link></li>
            </ul>
          </div>

          {/* 4. LEGAL */}
          <div>
            <h4 className="text-xs font-black text-white mb-6 uppercase tracking-widest border-l-2 border-[#ff2b2b] pl-3">Legal</h4>
            <ul className="space-y-4 text-sm font-medium text-gray-400">
              <li><Link href="/privacy-policy" className="hover:text-white hover:translate-x-1 inline-block transition-transform">Privacy Policy</Link></li>
              <li><Link href="/refund-policy" className="hover:text-white hover:translate-x-1 inline-block transition-transform">Refund Policy</Link></li>
              <li><Link href="/terms-and-conditions" className="hover:text-white hover:translate-x-1 inline-block transition-transform">Terms & Conditions</Link></li>
              <li><Link href="/disclaimer" className="hover:text-white hover:translate-x-1 inline-block transition-transform">Disclaimer</Link></li>
            </ul>
          </div>

          {/* 5. BRANCHES */}
          <div>
            <h4 className="text-xs font-black text-white mb-6 uppercase tracking-widest border-l-2 border-[#ff2b2b] pl-3">Our Network</h4>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-4 text-sm font-medium text-gray-400">
              <li><Link href="/branches/brahmapur" className="hover:text-white hover:translate-x-1 inline-block transition-transform">Brahmapur</Link></li>
              <li><Link href="/branches/bhawanipatna" className="hover:text-white hover:translate-x-1 inline-block transition-transform">Bhawanipatna</Link></li>
              <li><Link href="/branches/jeypore" className="hover:text-white hover:translate-x-1 inline-block transition-transform">Jeypore</Link></li>
              <li><Link href="/branches/rayagada" className="hover:text-white hover:translate-x-1 inline-block transition-transform">Rayagada</Link></li>
              <li><Link href="/branches/bargarh" className="hover:text-white hover:translate-x-1 inline-block transition-transform">Bargarh</Link></li>
              <li><Link href="/branches/balangir" className="hover:text-white hover:translate-x-1 inline-block transition-transform">Balangir</Link></li>
              <li><Link href="/branches/paralakhemundi" className="hover:text-white hover:translate-x-1 inline-block transition-transform">Paralakhemundi</Link></li>
              <li><Link href="/branches/aska" className="hover:text-white hover:translate-x-1 inline-block transition-transform">Aska</Link></li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">
            © {new Date().getFullYear()} Laxmi Toyota. All Rights Reserved.
          </p>
          <div className="flex items-center gap-4 text-[10px] font-bold text-gray-500 uppercase tracking-widest">
            <span>Powered by</span>
            <div className="w-20 h-6 bg-white/10 rounded overflow-hidden relative">
              {/* Optional provider logo */}
              <div className="absolute inset-0 flex items-center justify-center text-white">TECH</div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
