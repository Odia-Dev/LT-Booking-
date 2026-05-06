'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Sidebar = ({ isOpen, onClose }) => {
  const pathname = usePathname();

  const menuItems = [
    { name: 'Dashboard', icon: 'M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z', path: '/admin' },
    { name: 'Bookings', icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01', path: '/admin/bookings' },
    { name: 'Stock & Inventory', icon: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4', path: '/admin/stock' },
    { name: 'Test Drives', icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z', path: '/admin/test-drives' },
    { name: 'Branches', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6', path: '/admin/branches' },
    { name: 'Payments', icon: 'M12 8c-1.657 0-3 1.343-3 3s1.343 3 3 3 3 1.343 3 3-1.4 3-3 3m0-12c1.657 0 3 1.343 3 3s-1.343 3-3 3-3 1.343-3 3 1.4 3 3 3m0-12V6a2 2 0 114 0v2m-4 0V6a2 2 0 10-4 0v2m4 6v4a2 2 0 11-4 0v-4m4 0v4a2 2 0 104 0v-4', path: '/admin/payments' },
    { name: 'Customers', icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z', path: '/admin/customers' },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[55] lg:hidden"
          onClick={onClose}
        />
      )}

      <aside className={`fixed left-0 top-0 h-full w-72 bg-white border-r border-gray-100 z-[60] flex flex-col py-10 px-6 transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        <div className="flex justify-between items-center mb-12 px-4">
          <h2 className="text-2xl font-black italic text-[#E60023] tracking-tighter">TOYOTA <span className="text-gray-900">CONSOLE</span></h2>
          <button onClick={onClose} className="lg:hidden w-8 h-8 flex items-center justify-center text-gray-400">
             <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>
        
        <nav className="flex-1 space-y-2">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              href={item.path}
              onClick={() => { if(window.innerWidth < 1024) onClose(); }}
              className={`flex items-center gap-4 px-4 py-4 rounded-2xl text-[10px] font-bold uppercase tracking-widest transition-all ${
                pathname === item.path 
                  ? 'bg-[#E60023] text-white shadow-xl shadow-red-100' 
                  : 'text-gray-400 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={item.icon} />
              </svg>
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="pt-8 border-t border-gray-50">
          <button className="w-full flex items-center gap-4 px-4 py-4 rounded-2xl text-[10px] font-bold uppercase tracking-widest text-gray-400 hover:bg-red-50 hover:text-[#E60023] transition-all group">
            <svg className="w-5 h-5 group-hover:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Logout
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
