const OverviewCards = ({ stats, loading }) => {
  const cards = [
    { label: 'Total Bookings', value: stats?.total || 0, sub: 'All reservations', icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z', color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Paid Bookings', value: stats?.paid || 0, sub: 'Confirmed deposits', icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z', color: 'text-green-600', bg: 'bg-green-50' },
    { label: 'Pending Bookings', value: stats?.pending || 0, sub: 'Awaiting payment', icon: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z', color: 'text-orange-600', bg: 'bg-orange-50' },
    { label: 'Revenue', value: stats?.revenue ? `₹${(stats.revenue / 100000).toFixed(2)}L` : '₹0.00L', sub: 'Gross collections', icon: 'M12 8c-1.657 0-3 1.343-3 3s1.343 3 3 3 3 1.343 3 3-1.343 3-3 3m0-12c-1.657 0-3 1.343-3 3s1.343 3 3 3 3 1.343 3 3-1.343 3-3 3m0-12V6a2 2 0 114 0v2m-4 0V6a2 2 0 10-4 0v2m4 6v4a2 2 0 11-4 0v-4m4 0v4a2 2 0 104 0v-4', color: 'text-[#E60023]', bg: 'bg-red-50' },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
      {cards.map((card, idx) => (
        <div key={idx} className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group">
          <div className="flex justify-between items-start mb-6">
             <div className={`w-12 h-12 rounded-2xl ${card.bg} ${card.color} flex items-center justify-center transition-all group-hover:scale-110`}>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={card.icon} />
                </svg>
             </div>
          </div>
          <div>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">{card.label}</p>
            {loading ? (
              <Skeleton className="h-10 w-24 mb-2" />
            ) : (
              <p className="text-4xl font-black text-gray-900 mb-1 leading-none italic">{card.value}</p>
            )}
            <p className="text-[9px] font-bold text-gray-400 uppercase tracking-tighter">{card.sub}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OverviewCards;
