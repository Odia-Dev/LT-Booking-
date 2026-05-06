'use client';
import { useState, useEffect } from 'react';

export default function StockManagement() {
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    // Mock fetch inventory configuration
    setTimeout(() => {
      setInventory([
        { id: '1', vehicle: 'Hyryder', variant: 'ZX Hybrid', color: 'Platinum White', interior: 'Premium Beige', stock: 3 },
        { id: '2', vehicle: 'Hyryder', variant: 'VX AT', color: 'Attitude Black', interior: 'Oak Black', stock: 0 },
        { id: '3', vehicle: 'Innova Hycross', variant: 'ZX Hybrid', color: 'Blackish Ageha', interior: 'Dark Chestnut', stock: 12 },
        { id: '4', vehicle: 'Glanza', variant: 'V MT', color: 'Insta Blue', interior: 'Dual Tone', stock: 2 },
      ]);
      setLoading(false);
    }, 800);
  }, []);

  const handleStockChange = (id, newStock) => {
    setInventory(inventory.map(item => item.id === id ? { ...item, stock: parseInt(newStock) || 0 } : item));
  };

  const saveInventory = async () => {
    setSaving(true);
    // In production, this would send a PUT request to /api/admin/inventory
    setTimeout(() => {
      setSaving(false);
      alert('Inventory successfully updated in CRM.');
    }, 600);
  };

  return (
    <div className="space-y-12 animate-in fade-in duration-700">
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black text-gray-900 uppercase italic tracking-tight">Stock Intelligence</h1>
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-2">Manage live inventory by configuration</p>
        </div>
        <button 
          onClick={saveInventory}
          disabled={saving}
          className="px-10 py-4 bg-[#ff2b2b] text-white font-bold rounded-2xl text-[10px] uppercase tracking-widest shadow-xl shadow-red-100 hover:bg-black transition-all disabled:opacity-50"
        >
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>

      <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="p-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Model</th>
                <th className="p-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Variant</th>
                <th className="p-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Exterior Color</th>
                <th className="p-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Interior Color</th>
                <th className="p-6 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Stock Count</th>
                <th className="p-6 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {loading ? (
                <tr>
                  <td colSpan="6" className="p-12 text-center text-gray-400 text-[10px] font-bold uppercase tracking-widest">Loading inventory...</td>
                </tr>
              ) : inventory.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50/50 transition-colors group">
                  <td className="p-6">
                    <p className="font-black text-gray-900 uppercase italic text-sm">{item.vehicle}</p>
                  </td>
                  <td className="p-6">
                    <p className="text-xs font-bold text-gray-900 uppercase">{item.variant}</p>
                  </td>
                  <td className="p-6">
                    <p className="text-[11px] font-bold text-gray-600">{item.color}</p>
                  </td>
                  <td className="p-6">
                    <p className="text-[11px] font-bold text-gray-600">{item.interior}</p>
                  </td>
                  <td className="p-6 text-center">
                    <input 
                      type="number" 
                      min="0"
                      value={item.stock}
                      onChange={(e) => handleStockChange(item.id, e.target.value)}
                      className="w-20 px-3 py-2 text-center border border-gray-200 rounded-xl text-xs font-bold focus:ring-2 focus:ring-[#ff2b2b] focus:border-transparent outline-none transition-all bg-white"
                    />
                  </td>
                  <td className="p-6 text-right">
                    {item.stock > 3 ? (
                      <span className="px-3 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest bg-green-50 text-green-600">
                        In Stock
                      </span>
                    ) : item.stock > 0 ? (
                      <span className="px-3 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest bg-orange-50 text-orange-600">
                        Limited Stock
                      </span>
                    ) : (
                      <span className="px-3 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest bg-red-50 text-[#ff2b2b]">
                        Out of Stock
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
