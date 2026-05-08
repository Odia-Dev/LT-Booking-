"use client";
import { useState, useEffect } from 'react';

export default function StockManagement() {
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [savingId, setSavingId] = useState(null);
  const [error, setError] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [vehicles, setVehicles] = useState([]);
  const [newStock, setNewStock] = useState({
    vehicleId: '',
    variant: '',
    color: '',
    interior: '',
    count: 0
  });

  useEffect(() => {
    fetchInventory();
    fetchVehicles();
  }, []);

  const fetchVehicles = async () => {
    const res = await fetch('/api/vehicles');
    const data = await res.json();
    setVehicles(data);
  };

  const handleAddStock = async (e) => {
    e.preventDefault();
    setSavingId('new');
    try {
      const res = await fetch('/api/admin/inventory', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newStock),
      });
      if (res.ok) {
        setIsAddModalOpen(false);
        fetchInventory();
      }
    } catch (err) {
      alert('Failed to add stock');
    } finally {
      setSavingId(null);
    }
  };

  const fetchInventory = async () => {
    try {
      const res = await fetch('/api/admin/inventory');
      if (!res.ok) throw new Error('Failed to fetch inventory');
      const data = await res.json();
      setInventory(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleStockUpdate = async (item, newStock) => {
    setSavingId(item.id);
    try {
      const res = await fetch('/api/admin/inventory', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          vehicleId: item.vehicleId, 
          itemId: item.itemId, 
          stock: parseInt(newStock) || 0 
        }),
      });
      
      if (!res.ok) throw new Error('Failed to update stock');
      setInventory(prev => prev.map(i => i.id === item.id ? { ...i, stock: parseInt(newStock) || 0 } : i));
    } catch (err) {
      alert(err.message);
    } finally {
      setSavingId(null);
    }
  };

  return (
    <div className="space-y-12 animate-in fade-in duration-700">
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black text-gray-900 uppercase italic tracking-tight">Stock Intelligence</h1>
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-2">Manage live inventory by configuration</p>
        </div>
        <div className="flex gap-4">
          <button 
            onClick={() => setIsAddModalOpen(true)}
            className="px-10 py-4 bg-black text-white font-bold rounded-2xl text-[10px] uppercase tracking-widest hover:bg-[#ff2b2b] transition-all"
          >
            + Add Stock
          </button>
        </div>
      </div>

      {isAddModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-6">
          <div className="w-full max-w-lg bg-white rounded-[2.5rem] p-10 space-y-8 animate-in zoom-in duration-300">
            <div>
              <h2 className="text-2xl font-black text-gray-900 uppercase italic">Add Inventory</h2>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Create new configuration record</p>
            </div>
            <form onSubmit={handleAddStock} className="space-y-4">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Select Vehicle</label>
                <select 
                  className="w-full bg-gray-50 border-none rounded-xl px-5 py-4 text-sm font-bold focus:ring-2 focus:ring-red-100 transition-all outline-none"
                  value={newStock.vehicleId}
                  onChange={(e) => setNewStock({...newStock, vehicleId: e.target.value})}
                  required
                >
                  <option value="">Select a model</option>
                  {vehicles.map(v => <option key={v._id} value={v._id}>{v.name}</option>)}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <input 
                  placeholder="Variant (e.g. ZX Hybrid)" 
                  className="bg-gray-50 border-none rounded-xl px-5 py-4 text-sm font-bold focus:ring-2 focus:ring-red-100 outline-none"
                  onChange={(e) => setNewStock({...newStock, variant: e.target.value})}
                  required
                />
                <input 
                  placeholder="Exterior Color" 
                  className="bg-gray-50 border-none rounded-xl px-5 py-4 text-sm font-bold focus:ring-2 focus:ring-red-100 outline-none"
                  onChange={(e) => setNewStock({...newStock, color: e.target.value})}
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <input 
                  placeholder="Interior Color" 
                  className="bg-gray-50 border-none rounded-xl px-5 py-4 text-sm font-bold focus:ring-2 focus:ring-red-100 outline-none"
                  onChange={(e) => setNewStock({...newStock, interior: e.target.value})}
                />
                <input 
                  type="number"
                  placeholder="Stock Count" 
                  className="bg-gray-50 border-none rounded-xl px-5 py-4 text-sm font-bold focus:ring-2 focus:ring-red-100 outline-none"
                  onChange={(e) => setNewStock({...newStock, count: parseInt(e.target.value)})}
                  required
                />
              </div>
              <div className="flex gap-4 pt-4">
                <button 
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="flex-1 py-4 bg-gray-50 text-gray-400 font-bold rounded-xl text-[10px] uppercase tracking-widest"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  disabled={savingId === 'new'}
                  className="flex-1 py-4 bg-[#ff2b2b] text-white font-bold rounded-xl text-[10px] uppercase tracking-widest shadow-lg shadow-red-100"
                >
                  {savingId === 'new' ? 'Adding...' : 'Confirm Stock'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

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
              ) : inventory.length === 0 ? (
                <tr>
                  <td colSpan="6" className="p-12 text-center text-gray-400 text-[10px] font-bold uppercase tracking-widest">No inventory records found. Add configurations to vehicles first.</td>
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
                    <div className="relative inline-block">
                      <input 
                        type="number" 
                        min="0"
                        value={item.stock}
                        onChange={(e) => handleStockUpdate(item, e.target.value)}
                        disabled={savingId === item.id}
                        className={`w-20 px-3 py-2 text-center border border-gray-200 rounded-xl text-xs font-bold focus:ring-2 focus:ring-[#ff2b2b] focus:border-transparent outline-none transition-all bg-white ${savingId === item.id ? 'opacity-50' : ''}`}
                      />
                      {savingId === item.id && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-4 h-4 border-2 border-[#ff2b2b] border-t-transparent rounded-full animate-spin"></div>
                        </div>
                      )}
                    </div>
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
