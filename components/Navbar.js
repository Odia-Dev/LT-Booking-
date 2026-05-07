'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';

const VehicleImage = ({ src, alt, isNew, sizes = "100vw", className = "" }) => {
  const [error, setError] = useState(false);
  const placeholder = '/images/placeholder-vehicle.png';

  // Phase 6: Premium Fallback System
  const finalSrc = !src || error ? placeholder : src;

  return (
    <div className={`relative w-full aspect-[16/9] bg-[#f0f1f2] rounded-xl overflow-hidden shadow-inner ${className}`}>
      <Image 
        src={finalSrc} 
        fill 
        sizes={sizes}
        className={`transition-all duration-1000 ease-in-out ${finalSrc === placeholder ? 'object-contain scale-75 opacity-40' : 'object-cover group-hover:scale-105'}`} 
        alt={alt || "Toyota Vehicle"}
        onError={() => setError(true)}
        loading="lazy"
      />
      {isNew && (
        <span className="absolute top-3 left-3 bg-[#ff2b2b] text-white text-[10px] font-black uppercase px-2.5 py-1 rounded-sm shadow-md z-10 tracking-widest">New</span>
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </div>
  );
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [activeMobileCategory, setActiveMobileCategory] = useState(null);
  const [megaMenuVehicles, setMegaMenuVehicles] = useState({});

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const res = await fetch('/api/vehicles');
        if (!res.ok) throw new Error('Failed to fetch');
        const data = await res.json();
        
        // Group by category dynamically (Phase 4 Goal)
        const grouped = data.reduce((acc, v) => {
          const cat = v.category || 'Other';
          if (!acc[cat]) acc[cat] = [];
          acc[cat].push({
            name: v.name,
            price: `Starts ₹${(v.price / 100000).toFixed(2)} Lakh`,
            img: v.megaMenuImage || v.image, // Phase 4: Use megaMenuImage
            slug: v.slug,
            isNew: v.isNew
          });
          return acc;
        }, {});
        
        setMegaMenuVehicles(grouped);
        // Default first category for mobile
        if (Object.keys(grouped).length > 0 && !activeMobileCategory) {
          setActiveMobileCategory(Object.keys(grouped)[0]);
        }
      } catch (err) {
        console.error("Mega Menu Fetch Error:", err);
      }
    };
    fetchVehicles();
  }, []);

  const navLinks = [
    { name: 'Offers', path: '/offers' },
    { name: 'Finance', path: '/insurance-finance' },
    { name: 'Service', path: '/service' },
    { name: 'Branches', path: '/branches' },
    { name: 'Blog', path: '/blog' },
  ];

  return (
    <nav className="fixed w-full z-50 bg-white border-b border-gray-200 py-3 sm:py-4 transition-all">
      <div className="main-container flex items-center justify-between">
        <Link href="/" className="text-lg sm:text-2xl font-extrabold text-[#ff2b2b] tracking-tighter shrink-0 whitespace-nowrap">
          Laxmi Toyota
        </Link>
        
        <div className="hidden lg:flex items-center space-x-8">
          {/* Vehicles Trigger */}
          <div 
            className="h-full flex items-center"
            onMouseEnter={() => setIsMegaMenuOpen(true)}
            onMouseLeave={() => setIsMegaMenuOpen(false)}
          >
            <button className="text-base font-bold text-gray-800 hover:text-[#ff2b2b] transition-colors flex items-center gap-1 py-4">
              Vehicles
              <svg className={`w-4 h-4 transition-transform ${isMegaMenuOpen ? 'rotate-180 text-[#ff2b2b]' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
            </button>
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

        <div className="flex items-center space-x-2 sm:space-x-4">
          <Link href="/book-online" className="btn-premium-primary !py-1.5 !px-3 sm:!py-2.5 sm:!px-8 !text-[9px] sm:!text-sm !rounded-full shrink-0 whitespace-nowrap">
            Book Online
          </Link>
          <button 
            onClick={() => setIsOpen(!isOpen)} 
            className="lg:hidden w-10 h-10 flex items-center justify-center text-gray-800 -mr-1"
            aria-label="Toggle Menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </button>
        </div>
      </div>

      {/* MEGA MENU DESKTOP - Phase 4 & 5 (UI & Scroll Safety) */}
      <div 
        className={`absolute top-full left-1/2 -translate-x-1/2 w-[90vw] max-w-7xl bg-white shadow-[0_40px_80px_-15px_rgba(0,0,0,0.15)] rounded-[2.5rem] border border-gray-100 p-10 max-h-[82vh] overflow-y-auto custom-scrollbar animate-in fade-in slide-in-from-top-4 duration-300 cursor-default transition-all ${isMegaMenuOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-4 pointer-events-none'}`}
        onMouseEnter={() => setIsMegaMenuOpen(true)}
        onMouseLeave={() => setIsMegaMenuOpen(false)}
      >
        <div className="grid grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-x-10 gap-y-12">
          {Object.entries(megaMenuVehicles).map(([category, vehicles]) => (
            <div key={category} className="space-y-6">
              <h4 className="text-[10px] font-black uppercase tracking-[0.25em] text-[#ff2b2b] border-b border-gray-100 pb-4 inline-block w-full">{category}</h4>
              <div className="grid grid-cols-1 gap-6">
                {vehicles.map((v) => (
                  <Link 
                    key={v.name} 
                    href={`/vehicles/${v.slug}`}
                    className="group flex flex-col gap-3 rounded-2xl hover:bg-gray-50/80 p-3 -mx-3 transition-all duration-500 ease-out border border-transparent hover:border-gray-100"
                  >
                    <VehicleImage 
                      src={v.img} 
                      alt={v.name} 
                      isNew={v.isNew} 
                      sizes="(max-width: 1280px) 33vw, 25vw"
                    />
                    <div className="px-1">
                      <div className="flex justify-between items-baseline mb-0.5">
                        <p className="text-[15px] font-extrabold text-gray-900 group-hover:text-[#ff2b2b] transition-colors">{v.name}</p>
                      </div>
                      <p className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">{v.price}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 absolute top-full left-0 w-full h-[calc(100vh-80px)] overflow-y-auto p-6 shadow-xl animate-in fade-in duration-200">
          <div className="flex flex-col space-y-6">
            
            {/* Mobile Vehicles Accordion - Phase 6 Optimized */}
            <div className="space-y-2">
              <h3 className="text-[10px] font-black uppercase tracking-[0.25em] text-[#ff2b2b] mb-6 pl-1">Experience Toyota</h3>
              <div className="space-y-3">
                {Object.entries(megaMenuVehicles).map(([category, vehicles]) => (
                  <div key={category} className="bg-gray-50/50 rounded-2xl overflow-hidden border border-gray-100/50">
                    <button 
                      onClick={() => setActiveMobileCategory(activeMobileCategory === category ? null : category)}
                      className="w-full flex items-center justify-between px-5 py-5 text-left active:bg-gray-100 transition-colors"
                    >
                      <span className={`text-sm font-black tracking-tight ${activeMobileCategory === category ? 'text-[#ff2b2b]' : 'text-gray-900'}`}>{category}</span>
                      <svg className={`w-4 h-4 transition-transform duration-300 ${activeMobileCategory === category ? 'rotate-180 text-[#ff2b2b]' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                    </button>
                    
                    <div className={`grid transition-all duration-500 ease-in-out ${activeMobileCategory === category ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0 pointer-events-none'}`}>
                      <div className="overflow-hidden">
                        <div className="grid grid-cols-2 gap-4 p-4 pt-0">
                          {vehicles.map((v, i) => (
                            <Link 
                              key={i} 
                              href={`/vehicles/${v.slug}`}
                              onClick={() => setIsOpen(false)}
                              className="flex flex-col gap-2 p-2.5 bg-white rounded-xl shadow-sm border border-gray-100"
                            >
                              <VehicleImage 
                                src={v.img} 
                                alt={v.name} 
                                isNew={v.isNew} 
                                sizes="160px"
                              />
                              <div className="px-0.5">
                                <p className="text-[11px] font-black text-gray-900 leading-tight line-clamp-1">{v.name}</p>
                                <p className="text-[9px] font-bold text-gray-500 uppercase">{v.price.replace('Starts ', '')}</p>
                              </div>
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <Link href="/vehicles" onClick={() => setIsOpen(false)} className="w-full btn-premium-secondary !text-xs !py-3 !rounded-xl mt-6">
                Browse Full Catalog
              </Link>
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
