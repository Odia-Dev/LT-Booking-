'use client';
import Skeleton from './Skeleton';

const CustomerTable = ({ customers, loading }) => {
  return (
    <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden flex flex-col max-h-[800px]">
      <div className="overflow-x-auto overflow-y-auto custom-scrollbar">
        <table className="w-full text-left border-collapse min-w-[1000px]">
          <thead className="sticky top-0 z-20 bg-white">
            <tr className="bg-gray-50/80 border-b border-gray-100 backdrop-blur-md">
              <th className="p-6 text-[10px] font-bold uppercase tracking-widest text-gray-500 whitespace-nowrap">Customer Name</th>
              <th className="p-6 text-[10px] font-bold uppercase tracking-widest text-gray-500 whitespace-nowrap">Contact Info</th>
              <th className="p-6 text-[10px] font-bold uppercase tracking-widest text-gray-500 whitespace-nowrap">Total Orders</th>
              <th className="p-6 text-[10px] font-bold uppercase tracking-widest text-gray-500 whitespace-nowrap">Total Revenue</th>
              <th className="p-6 text-[10px] font-bold uppercase tracking-widest text-gray-500 whitespace-nowrap">Last Activity</th>
              <th className="p-6 text-[10px] font-bold uppercase tracking-widest text-gray-500 whitespace-nowrap">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {loading ? (
              [...Array(5)].map((_, i) => (
                <tr key={i}>
                  {[...Array(6)].map((_, j) => (
                    <td key={j} className="p-6"><Skeleton className="h-4 w-full" /></td>
                  ))}
                </tr>
              ))
            ) : customers?.length > 0 ? (
              customers.map((c, idx) => (
                <tr key={idx} className="hover:bg-gray-50/80 transition-colors group">
                  <td className="p-6">
                    <div className="font-bold text-gray-900 text-sm">{c.name}</div>
                    <div className="text-[9px] text-gray-400 font-bold uppercase tracking-tight mt-0.5">{c.city || 'Location N/A'}</div>
                  </td>
                  <td className="p-6">
                    <div className="text-sm font-semibold text-gray-900">{c.phone}</div>
                    <div className="text-[9px] text-[#E60023] font-bold lowercase mt-0.5">{c.email || 'no-email@laxmitoyota.com'}</div>
                  </td>
                  <td className="p-6 text-center">
                    <span className="px-3 py-1 bg-gray-100 rounded-full text-xs font-black text-gray-600">{c.bookingCount}</span>
                  </td>
                  <td className="p-6">
                    <div className="font-black text-gray-900 italic">₹{c.totalSpent.toLocaleString()}</div>
                  </td>
                  <td className="p-6 text-sm text-gray-500">
                    {new Date(c.lastActive).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                  </td>
                  <td className="p-6">
                    <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase italic ${c.totalSpent > 0 ? 'bg-green-100 text-green-600' : 'bg-orange-100 text-orange-600'}`}>
                      {c.totalSpent > 0 ? 'Converted' : 'Prospect'}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="p-20 text-center text-gray-400">No customers found in database.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CustomerTable;
