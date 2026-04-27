'use client';
import Link from 'next/link';
import { useState } from 'react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'Vehicles', path: '/vehicles' },
    { name: 'Test Drive', path: '/test-drive' },
    { name: 'Offers', path: '/offers' },
    { name: 'Service', path: '/service' },
    { name: 'Contact', path: '/contact' },
    { name: 'Blog', path: '/blog' },
  ];

  return (
    <nav className="fixed w-full z-50 bg-white border-b border-gray-200 py-5">
      <div className="main-container flex items-center justify-between">
        <Link href="/" className="text-2xl font-extrabold text-[#ff2b2b] tracking-tight">
          Laxmi Toyota
        </Link>
        
        <div className="hidden lg:flex items-center space-x-10">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.path} 
              className="text-base font-semibold text-gray-800 hover:text-[#ff2b2b] transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </div>

        <div className="flex items-center space-x-6">
          <Link href="/book-online" className="btn-premium-primary !py-2.5 !text-sm">
            Book Online
          </Link>
          <button 
            onClick={() => setIsOpen(!isOpen)} 
            className="lg:hidden text-gray-800"
          >
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 absolute top-full left-0 w-full p-6 shadow-xl animate-fade-in">
          <div className="flex flex-col space-y-6">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                href={link.path} 
                onClick={() => setIsOpen(false)}
                className="text-xl font-bold text-gray-900 hover:text-[#ff2b2b]"
              >
                {link.name}
              </Link>
            ))}
            <Link 
              href="/book-online" 
              onClick={() => setIsOpen(false)}
              className="btn-premium-primary text-center"
            >
              Book Online
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
