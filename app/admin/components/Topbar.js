"use client";

import { useState, useEffect } from 'react';

const Topbar = ({ onMenuClick }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const currentDate = mounted ? new Date().toLocaleDateString('en-IN', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  }) : '';

  return (
    <header className="fixed top-0 right-0 left-0 lg:left-72 h-24 bg-white/90 backdrop-blur-md border-b border-gray-50 z-40 px-6 lg:px-12 flex items-center justify-between">
      <div className="flex items-center gap-4">
        {/* Mobile Menu Toggle */}
        <button 
          onClick={onMenuClick}
          className="lg:hidden w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-500 hover:bg-gray-100 transition-all"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" /></svg>
        </button>

        <div className="flex flex-col">
           <h1 className="text-lg lg:text-xl font-black text-gray-900 uppercase italic tracking-tighter">Internal Fleet</h1>
           <p className="text-[9px] lg:text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">{currentDate}</p>
        </div>
      </div>

      <div className="flex items-center gap-8">
        {/* Search Bar */}
        <div className="hidden lg:flex items-center gap-3 bg-gray-50 px-6 py-3 rounded-2xl border border-gray-100 w-80 focus-within:bg-white focus-within:ring-2 focus-within:ring-red-50 transition-all">
          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input 
            placeholder="Search leads..." 
            className="bg-transparent border-none outline-none text-xs font-bold text-gray-900 placeholder:text-gray-400 w-full"
          />
        </div>

        {/* Notifications */}
        <button className="relative w-12 h-12 rounded-2xl bg-white border border-gray-100 flex items-center justify-center hover:bg-gray-50 transition-all">
           <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
           </svg>
           <div className="absolute top-3 right-3 w-2 h-2 bg-[#E60023] rounded-full ring-2 ring-white" />
        </button>

        {/* User Profile */}
        <div className="w-12 h-12 rounded-2xl bg-gray-900 flex items-center justify-center text-white font-black italic text-xs shadow-lg shadow-gray-200">
           LT
        </div>
      </div>
    </header>
  );
};

export default Topbar;
