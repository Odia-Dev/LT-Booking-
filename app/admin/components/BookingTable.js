"use client";

import { useState, useEffect } from 'react';
import StatusBadge from './StatusBadge';
import Skeleton from './Skeleton';

const BookingTable = ({ bookings, onRowClick, loading }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const formatDate = (dateString) => {
    if (!mounted || !dateString) return '---';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
  };

  return (
    <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden flex flex-col max-h-[800px]">
      <div className="overflow-x-auto overflow-y-auto custom-scrollbar">
        <table className="w-full text-left border-collapse min-w-[1200px]">
          <thead className="sticky top-0 z-20 bg-white">
            <tr className="bg-gray-50/80 border-b border-gray-100 backdrop-blur-md">
              <th className="p-6 text-[10px] font-bold uppercase tracking-widest text-gray-500 whitespace-nowrap">Name</th>
              <th className="p-6 text-[10px] font-bold uppercase tracking-widest text-gray-500 whitespace-nowrap">Phone & Email</th>
              <th className="p-6 text-[10px] font-bold uppercase tracking-widest text-gray-500 whitespace-nowrap">City & Branch</th>
              <th className="p-6 text-[10px] font-bold uppercase tracking-widest text-gray-500 whitespace-nowrap">Vehicle Details</th>
              <th className="p-6 text-[10px] font-bold uppercase tracking-widest text-gray-500 whitespace-nowrap">Amount</th>
              <th className="p-6 text-[10px] font-bold uppercase tracking-widest text-gray-500 whitespace-nowrap">Status</th>
              <th className="p-6 text-[10px] font-bold uppercase tracking-widest text-gray-500 whitespace-nowrap">Lead Stage</th>
              <th className="p-6 text-[10px] font-bold uppercase tracking-widest text-gray-500 whitespace-nowrap">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {loading ? (
              [...Array(5)].map((_, i) => (
                <tr key={i}>
                  {[...Array(8)].map((_, j) => (
                    <td key={j} className="p-6"><Skeleton className="h-4 w-full" /></td>
                  ))}
                </tr>
              ))
            ) : bookings?.length > 0 ? (
              bookings.map((b) => (
                <tr 
                  key={b?._id} 
                  className="hover:bg-gray-50/80 transition-colors group cursor-pointer" 
                  onClick={() => onRowClick(b)}
                >
                  <td className="p-6">
                    <div className="font-bold text-gray-900 text-sm leading-tight">{b?.customer_name || 'N/A'}</div>
                  </td>
                  <td className="p-6">
                    <div className="font-bold text-gray-900 text-[11px] leading-tight">{b?.phone || 'N/A'}</div>
                    <div className="text-[9px] text-gray-500 font-medium tracking-tight mt-0.5">{b?.email || 'N/A'}</div>
                  </td>
                  <td className="p-6">
                    <div className="font-bold text-gray-900 text-[11px] uppercase">{b?.city || 'N/A'}</div>
                    <div className="text-[9px] text-[#ff2b2b] font-bold uppercase tracking-tight mt-0.5">{b?.preferred_branch || 'N/A'}</div>
                  </td>
                  <td className="p-6">
                    <div className="text-[11px] font-black text-gray-900 uppercase italic whitespace-nowrap">{b?.vehicle_name || 'N/A'}</div>
                    <div className="text-[9px] text-gray-500 font-bold uppercase mt-0.5">{b?.variant_name || 'N/A'}</div>
                  </td>
                  <td className="p-6">
                    <div className="font-black text-gray-900 italic">₹{b?.booking_amount?.toLocaleString() || '0'}</div>
                  </td>
                  <td className="p-6">
                    <StatusBadge status={b?.payment_status} />
                  </td>
                  <td className="p-6">
                    <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-[9px] font-bold uppercase tracking-widest">{b?.lead_stage || 'New Lead'}</span>
                  </td>
                  <td className="p-6">
                    <div className="text-[10px] font-black text-gray-900 uppercase whitespace-nowrap">
                      {formatDate(b?.createdAt)}
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="p-20 text-center text-gray-400">
                  <div className="flex flex-col items-center gap-4">
                     <svg className="w-12 h-12 text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" /></svg>
                     <p className="text-[10px] font-bold uppercase tracking-[0.3em]">No active reservations found</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BookingTable;
