'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

const megaMenuVehicles = {
  Hatchback: [
    { name: 'Glanza', price: 'Starts ₹6.86 Lakh', img: 'https://images.unsplash.com/photo-1542362567-b052da132171?auto=format&fit=crop&q=80&w=300', slug: 'toyota-glanza' },
    { name: 'Taisor', price: 'Starts ₹7.73 Lakh', img: 'https://images.unsplash.com/photo-1542362567-b052da132171?auto=format&fit=crop&q=80&w=300', slug: 'toyota-urban-cruiser-taisor', isNew: true },
  ],
  SUV: [
    { name: 'Hyryder', price: 'Starts ₹11.14 Lakh', img: 'https://images.unsplash.com/photo-1542362567-b052da132171?auto=format&fit=crop&q=80&w=300', slug: 'toyota-urban-cruiser-hyryder' },
    { name: 'Innova Hycross', price: 'Starts ₹19.77 Lakh', img: 'https://images.unsplash.com/photo-1542362567-b052da132171?auto=format&fit=crop&q=80&w=300', slug: 'toyota-innova-hycross' },
    { name: 'Fortuner', price: 'Starts ₹33.43 Lakh', img: 'https://images.unsplash.com/photo-1542362567-b052da132171?auto=format&fit=crop&q=80&w=300', slug: 'toyota-fortuner' },
    { name: 'Legender', price: 'Starts ₹43.66 Lakh', img: 'https://images.unsplash.com/photo-1542362567-b052da132171?auto=format&fit=crop&q=80&w=300', slug: 'toyota-fortuner-legender' },
    { name: 'Hilux', price: 'Starts ₹30.40 Lakh', img: 'https://images.unsplash.com/photo-1542362567-b052da132171?auto=format&fit=crop&q=80&w=300', slug: 'toyota-hilux' },
  ],
  MPV: [
    { name: 'Rumion', price: 'Starts ₹10.44 Lakh', img: 'https://images.unsplash.com/photo-1542362567-b052da132171?auto=format&fit=crop&q=80&w=300', slug: 'toyota-rumion' },
    { name: 'Innova Crysta', price: 'Starts ₹19.99 Lakh', img: 'https://images.unsplash.com/photo-1542362567-b052da132171?auto=format&fit=crop&q=80&w=300', slug: 'toyota-innova-crysta' },
    { name: 'Vellfire', price: 'Starts ₹1.19 Crore', img: 'https://images.unsplash.com/photo-1542362567-b052da132171?auto=format&fit=crop&q=80&w=300', slug: 'toyota-vellfire' },
  ],
  "Sedan / Luxury": [
    { name: 'Camry', price: 'Starts ₹46.17 Lakh', img: 'https://images.unsplash.com/photo-1542362567-b052da132171?auto=format&fit=crop&q=80&w=300', slug: 'toyota-camry' },
    { name: 'Land Cruiser', price: 'Starts ₹2.10 Crore', img: 'https://images.unsplash.com/photo-1542362567-b052da132171?auto=format&fit=crop&q=80&w=300', slug: 'toyota-landcruiser300' },
  ],
  Hybrid: [
    { name: 'Hyryder Hybrid', price: 'Starts ₹16.66 Lakh', img: 'https://images.unsplash.com/photo-1542362567-b052da132171?auto=format&fit=crop&q=80&w=300', slug: 'toyota-urban-cruiser-hyryder' },
    { name: 'Hycross Hybrid', price: 'Starts ₹25.97 Lakh', img: 'https://images.unsplash.com/photo-1542362567-b052da132171?auto=format&fit=crop&q=80&w=300', slug: 'toyota-innova-hycross' },
    { name: 'Camry Hybrid', price: 'Starts ₹46.17 Lakh', img: 'https://images.unsplash.com/photo-1542362567-b052da132171?auto=format&fit=crop&q=80&w=300', slug: 'toyota-camry' },
  ]
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Offers', path: '/offers' },
    { name: 'Finance', path: '/insurance-finance' },
    { name: 'Service', path: '/service' },
    { name: 'Branches', path: '/branches' },
    { name: 'Blog', path: '/blog' },
  ];

  return (
    <nav className="fixed w-full z-50 bg-white border-b border-gray-200 py-4 transition-all">
      <div className="main-container flex items-center justify-between">
        <Link href="/" className="text-2xl font-extrabold text-[#ff2b2b] tracking-tight">
          Laxmi Toyota
        </Link>
        
        <div className="hidden lg:flex items-center space-x-8">
          {/* Vehicles Trigger */}
          <div 
            className="relative py-4"
            onMouseEnter={() => setIsMegaMenuOpen(true)}
            onMouseLeave={() => setIsMegaMenuOpen(false)}
          >
            <button className="text-base font-bold text-gray-800 hover:text-[#ff2b2b] transition-colors flex items-center gap-1">
              Vehicles
              <svg className={`w-4 h-4 transition-transform ${isMegaMenuOpen ? 'rotate-180 text-[#ff2b2b]' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
            </button>

            {/* MEGA MENU DESKTOP */}
            {isMegaMenuOpen && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 w-[90vw] max-w-7xl bg-white shadow-2xl rounded-3xl border border-gray-100 p-8 grid grid-cols-5 gap-8 animate-in fade-in slide-in-from-top-4 duration-200 cursor-default">
                {Object.entries(megaMenuVehicles).map(([category, vehicles]) => (
                  <div key={category} className="space-y-4">
                    <h4 className="text-xs font-black uppercase tracking-widest text-[#ff2b2b] border-b border-gray-100 pb-2">{category}</h4>
                    <div className="space-y-4">
                      {vehicles.map((v) => (
                        <Link 
                          key={v.name} 
                          href={`/vehicles/${v.slug}`}
                          className="group flex flex-col gap-2 rounded-xl hover:bg-gray-50 p-2 -mx-2 transition-colors"
                        >
                          <div className="relative w-full aspect-video bg-[#f8f9fa] rounded-lg overflow-hidden">
                            <Image src={v.img} fill className="object-cover group-hover:scale-105 transition-transform duration-500" alt={v.name} />
                            {v.isNew && (
                              <span className="absolute top-1 left-1 bg-black text-white text-[8px] font-black uppercase px-2 py-0.5 rounded-sm">New</span>
                            )}
                          </div>
                          <div>
                            <p className="text-sm font-bold text-gray-900 group-hover:text-[#ff2b2b] transition-colors">{v.name}</p>
                            <p className="text-[10px] font-medium text-gray-500 uppercase tracking-wider">{v.price}</p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.path} 
              className="text-sm font-bold text-gray-800 hover:text-[#ff2b2b] transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </div>

        <div className="flex items-center space-x-4">

          <Link href="/book-online" className="btn-premium-primary !py-2.5 !text-sm !rounded-full">
            Book Online
          </Link>
          <button 
            onClick={() => setIsOpen(!isOpen)} 
            className="lg:hidden w-12 h-12 flex items-center justify-center text-gray-800 -mr-2"
            aria-label="Toggle Menu"
          >
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 absolute top-full left-0 w-full h-[calc(100vh-80px)] overflow-y-auto p-6 shadow-xl animate-in fade-in duration-200">
          <div className="flex flex-col space-y-6">
            
            {/* Mobile Vehicles Mega List */}
            <div className="space-y-4">
              <h3 className="text-sm font-black uppercase tracking-widest text-[#ff2b2b] border-b border-gray-100 pb-2">Vehicles</h3>
              <div className="grid grid-cols-2 gap-4">
                {Object.values(megaMenuVehicles).flat().slice(0, 8).map((v, i) => (
                  <Link 
                    key={i} 
                    href={`/vehicles/${v.slug}`}
                    onClick={() => setIsOpen(false)}
                    className="flex flex-col gap-2 p-2 bg-gray-50 rounded-xl"
                  >
                    <div className="relative w-full aspect-video rounded-md overflow-hidden bg-white">
                      <Image src={v.img} fill className="object-cover" alt={v.name} />
                    </div>
                    <p className="text-[11px] font-bold text-gray-900 leading-tight">{v.name}</p>
                  </Link>
                ))}
              </div>
              <Link href="/vehicles" onClick={() => setIsOpen(false)} className="text-xs font-bold text-[#ff2b2b] underline block text-center pt-2">View All Vehicles</Link>
            </div>

            <div className="h-px bg-gray-100 w-full my-2"></div>

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
              className="btn-premium-primary text-center !rounded-full mt-4"
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
