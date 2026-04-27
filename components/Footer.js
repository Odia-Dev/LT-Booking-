import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-100 pt-20 pb-12">
      <div className="main-container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="space-y-6">
            <h2 className="text-2xl font-extrabold text-[#ff2b2b] tracking-tight">Laxmi Toyota</h2>
            <p className="text-gray-500 text-sm leading-relaxed">
              Leading the way in automotive excellence. Experience premium service and legendary Toyota reliability with Maharashtra's most trusted dealership.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-bold text-gray-900 mb-6 uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-4 text-sm font-medium text-gray-500">
              <li><Link href="/vehicles" className="hover:text-[#ff2b2b] transition-colors">Vehicles</Link></li>
              <li><Link href="/test-drive" className="hover:text-[#ff2b2b] transition-colors">Test Drive</Link></li>
              <li><Link href="/service" className="hover:text-[#ff2b2b] transition-colors">Service</Link></li>
              <li><Link href="/offers" className="hover:text-[#ff2b2b] transition-colors">Offers</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-bold text-gray-900 mb-6 uppercase tracking-wider">Models</h4>
            <ul className="space-y-4 text-sm font-medium text-gray-500">
              <li className="hover:text-[#ff2b2b] cursor-pointer transition-colors">Toyota Camry</li>
              <li className="hover:text-[#ff2b2b] cursor-pointer transition-colors">Toyota Fortuner</li>
              <li className="hover:text-[#ff2b2b] cursor-pointer transition-colors">Toyota Glanza</li>
              <li className="hover:text-[#ff2b2b] cursor-pointer transition-colors">Toyota Innova</li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-bold text-gray-900 mb-6 uppercase tracking-wider">Contact</h4>
            <ul className="space-y-4 text-sm font-medium text-gray-500">
              <li>123 Dealership Road, Mumbai</li>
              <li>+91 98765 43210</li>
              <li>contact@laxmitoyota.com</li>
            </ul>
          </div>
        </div>
        <div className="pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">
            © 2026 Laxmi Toyota. All Rights Reserved.
          </p>
          <div className="flex gap-8">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest hover:text-[#ff2b2b] cursor-pointer transition-colors">Privacy Policy</span>
            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest hover:text-[#ff2b2b] cursor-pointer transition-colors">Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
