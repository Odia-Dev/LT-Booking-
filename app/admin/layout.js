'use client';
import { useState } from 'react';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';

export default function AdminLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#F8F9FA]">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="lg:pl-72 transition-all duration-300">
        <Topbar onMenuClick={() => setSidebarOpen(true)} />
        <main className="pt-24 lg:pt-32 px-4 lg:px-10 pb-20 overflow-x-hidden">
          {children}
        </main>
      </div>
    </div>
  );
}
