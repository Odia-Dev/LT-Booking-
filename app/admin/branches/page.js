'use client';
import { useState, useEffect } from 'react';

export default function BranchesManagement() {
  const [branches, setBranches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock data for phase 1 demo
    setTimeout(() => {
      setBranches([
        { _id: '1', name: 'Main Showroom', city: 'Cuttack', manager_name: 'Rajesh Kumar', contact_number: '+91 9876543210', isActive: true },
        { _id: '2', name: 'Bhubaneswar West', city: 'Bhubaneswar', manager_name: 'Anita Sharma', contact_number: '+91 9876543211', isActive: true },
        { _id: '3', name: 'Puri Satellite Branch', city: 'Puri', manager_name: 'Suresh Das', contact_number: '+91 9876543212', isActive: true },
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <div className="space-y-12 animate-in fade-in duration-700">
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black text-gray-900 uppercase italic tracking-tight">Dealership Network</h1>
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-2">Manage branches and operations</p>
        </div>
        <button className="px-8 py-4 bg-[#E60023] text-white font-bold rounded-2xl text-[10px] uppercase tracking-widest shadow-xl shadow-red-100 hover:bg-black transition-all">
          + Add Branch
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {loading ? (
           <div className="col-span-3 text-center py-20 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Loading network...</div>
        ) : branches.map(branch => (
          <div key={branch._id} className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-xl transition-all relative overflow-hidden group">
            <div className={`absolute top-0 left-0 w-full h-1 ${branch.isActive ? 'bg-[#E60023]' : 'bg-gray-200'}`} />
            
            <div className="space-y-6 relative z-10">
              <div>
                 <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1">{branch.city}</p>
                 <h3 className="text-xl font-black text-gray-900 uppercase italic">{branch.name}</h3>
              </div>
              
              <div className="space-y-3 pt-4 border-t border-gray-50">
                 <div>
                    <p className="text-[8px] font-bold text-gray-400 uppercase tracking-widest">Manager</p>
                    <p className="text-xs font-bold text-gray-900">{branch.manager_name}</p>
                 </div>
                 <div>
                    <p className="text-[8px] font-bold text-gray-400 uppercase tracking-widest">Contact</p>
                    <p className="text-xs font-bold text-gray-900">{branch.contact_number}</p>
                 </div>
              </div>

              <div className="pt-4 flex justify-between items-center">
                 <span className={`px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest ${branch.isActive ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
                    {branch.isActive ? 'Active' : 'Inactive'}
                 </span>
                 <button className="text-[10px] font-bold text-[#E60023] uppercase tracking-widest hover:underline opacity-0 group-hover:opacity-100 transition-opacity">Edit</button>
              </div>
            </div>
            <div className="absolute -right-8 -bottom-8 text-8xl font-black italic text-gray-50 pointer-events-none group-hover:-translate-x-2 transition-transform duration-700">LXT</div>
          </div>
        ))}
      </div>
    </div>
  );
}
