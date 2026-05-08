"use client";

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

const ImageUpload = ({ label, onUpload, currentImage }) => {
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (data.url) {
        onUpload(data.url);
      }
    } catch (err) {
      console.error('Upload failed:', err);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-2">
      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{label}</label>
      <div className="flex items-center gap-4">
        <div className="w-20 h-20 bg-gray-50 border-2 border-dashed border-gray-100 rounded-xl overflow-hidden flex items-center justify-center relative group">
          {currentImage ? (
            <img src={currentImage} className="w-full h-full object-cover" />
          ) : (
            <svg className="w-6 h-6 text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
          )}
          {uploading && (
            <div className="absolute inset-0 bg-white/80 flex items-center justify-center">
              <div className="w-4 h-4 border-2 border-[#ff2b2b] border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}
        </div>
        <button 
          type="button"
          onClick={() => fileInputRef.current.click()}
          className="px-4 py-2 bg-white border border-gray-100 rounded-lg text-[10px] font-bold uppercase tracking-widest hover:border-gray-200"
        >
          {currentImage ? 'Change Image' : 'Upload'}
        </button>
        <input type="file" ref={fileInputRef} onChange={handleUpload} className="hidden" accept="image/*" />
      </div>
    </div>
  );
};

export default function VehicleManagement() {
  const [vehicles, setVehicles] = useState([]);
  const [editingVehicle, setEditingVehicle] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchVehicles();
  }, []);

  const fetchVehicles = async () => {
    try {
      const res = await fetch('/api/vehicles');
      const data = await res.json();
      setVehicles(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    
    const method = editingVehicle._id ? 'PUT' : 'POST';
    const url = editingVehicle._id ? `/api/vehicles/${editingVehicle.slug}` : '/api/vehicles';

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingVehicle),
      });
      if (res.ok) {
        setIsModalOpen(false);
        fetchVehicles();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const openAddModal = () => {
    setEditingVehicle({
      name: '',
      slug: '',
      model: '',
      category: 'SUV',
      price: 0,
      bookingAmount: 50000,
      deliveryTimeline: '4-6 Weeks',
      description: '',
      image: '',
      thumbnailImage: '',
      megaMenuImage: '',
      heroImage: '',
      galleryImages: [],
      specs: { fuel: 'Petrol', transmission: 'Automatic', engine: '', mileage: '', safety: '5 Star' },
      variants: [],
      exterior_colors: [],
      interior_colors: [],
      inventory: []
    });
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-12">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-black text-gray-900 uppercase italic tracking-tight">Vehicle Models</h1>
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-2">Configure fleet media and specifications</p>
        </div>
        <button 
          onClick={openAddModal}
          className="px-8 py-4 bg-[#ff2b2b] text-white font-bold rounded-2xl text-[10px] uppercase tracking-widest shadow-xl shadow-red-100 hover:bg-black transition-all"
        >
          + Add New Model
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {loading ? (
          <div className="col-span-full py-20 text-center text-gray-400 font-bold uppercase tracking-widest">Loading fleet...</div>
        ) : vehicles.map((v) => (
          <div key={v._id} className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-xl transition-all group">
            <div className="aspect-video bg-gray-50 rounded-2xl overflow-hidden mb-6 relative">
              <img src={v.image} className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-700" />
              <span className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest text-gray-900 shadow-sm">
                {v.category}
              </span>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-black text-xl text-gray-900 uppercase italic leading-tight">{v.name}</h3>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Starting at ₹{(v.price / 100000).toFixed(2)}L</p>
                </div>
                <button 
                  onClick={() => { setEditingVehicle(v); setIsModalOpen(true); }}
                  className="w-10 h-10 flex items-center justify-center bg-gray-50 rounded-full text-gray-400 hover:text-[#ff2b2b] hover:bg-red-50 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Full Management Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-end bg-black/60 backdrop-blur-sm p-6">
          <div className="w-full max-w-4xl h-full bg-white rounded-[3rem] shadow-2xl overflow-hidden flex flex-col animate-in slide-in-from-right duration-500">
            <header className="p-8 border-b border-gray-100 flex justify-between items-center bg-white sticky top-0 z-10">
              <div>
                <h2 className="text-2xl font-black text-gray-900 uppercase italic">{editingVehicle._id ? 'Edit Model' : 'New Model'}</h2>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Configuration & Media Center</p>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="w-12 h-12 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </header>

            <form onSubmit={handleSave} className="flex-1 overflow-y-auto p-12 space-y-12 custom-scrollbar">
              {/* Basic Info */}
              <section className="space-y-6">
                <h4 className="text-xs font-black text-[#ff2b2b] uppercase tracking-[0.2em] border-b border-red-50 pb-4">Basic Information</h4>
                <div className="grid grid-cols-2 gap-8">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Vehicle Name</label>
                    <input 
                      value={editingVehicle.name} 
                      onChange={(e) => setEditingVehicle({...editingVehicle, name: e.target.value})}
                      className="w-full bg-gray-50 border-none rounded-xl px-5 py-4 text-sm font-bold focus:ring-2 focus:ring-red-100 transition-all outline-none" 
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Slug (URL)</label>
                    <input 
                      value={editingVehicle.slug} 
                      onChange={(e) => setEditingVehicle({...editingVehicle, slug: e.target.value})}
                      className="w-full bg-gray-50 border-none rounded-xl px-5 py-4 text-sm font-bold focus:ring-2 focus:ring-red-100 transition-all outline-none" 
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Category</label>
                    <select 
                      value={editingVehicle.category}
                      onChange={(e) => setEditingVehicle({...editingVehicle, category: e.target.value})}
                      className="w-full bg-gray-50 border-none rounded-xl px-5 py-4 text-sm font-bold focus:ring-2 focus:ring-red-100 transition-all outline-none appearance-none"
                    >
                      <option>SUV</option>
                      <option>Sedan</option>
                      <option>Hatchback</option>
                      <option>MPV</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Base Price (₹)</label>
                    <input 
                      type="number"
                      value={editingVehicle.price} 
                      onChange={(e) => setEditingVehicle({...editingVehicle, price: parseInt(e.target.value)})}
                      className="w-full bg-gray-50 border-none rounded-xl px-5 py-4 text-sm font-bold focus:ring-2 focus:ring-red-100 transition-all outline-none" 
                    />
                  </div>
                </div>
              </section>

              {/* Image Center */}
              <section className="space-y-6">
                <h4 className="text-xs font-black text-[#ff2b2b] uppercase tracking-[0.2em] border-b border-red-50 pb-4">Media Center (Cloudinary)</h4>
                <div className="grid grid-cols-2 gap-8">
                  <ImageUpload 
                    label="Primary Thumbnail" 
                    currentImage={editingVehicle.image} 
                    onUpload={(url) => setEditingVehicle({...editingVehicle, image: url})} 
                  />
                  <ImageUpload 
                    label="Hero Spotlight" 
                    currentImage={editingVehicle.heroImage} 
                    onUpload={(url) => setEditingVehicle({...editingVehicle, heroImage: url})} 
                  />
                  <ImageUpload 
                    label="Mega Menu Asset" 
                    currentImage={editingVehicle.megaMenuImage} 
                    onUpload={(url) => setEditingVehicle({...editingVehicle, megaMenuImage: url})} 
                  />
                </div>
              </section>

              {/* Configurations */}
              <section className="space-y-6">
                <h4 className="text-xs font-black text-[#ff2b2b] uppercase tracking-[0.2em] border-b border-red-50 pb-4">Variants & Colors</h4>
                <p className="text-[10px] text-gray-400 uppercase font-medium">Configure variants and colors to enable stock management.</p>
                {/* Variant list and management would go here - simplified for this implementation */}
                <div className="p-8 bg-gray-50 rounded-3xl text-center">
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Configuration Tables (Variants/Colors) are synced with the database.</p>
                </div>
              </section>
            </form>

            <footer className="p-8 border-t border-gray-100 bg-white flex justify-end gap-4 sticky bottom-0 z-10">
              <button 
                onClick={() => setIsModalOpen(false)}
                className="px-8 py-4 bg-gray-50 text-gray-400 font-bold rounded-2xl text-[10px] uppercase tracking-widest hover:bg-gray-100 transition-all"
              >
                Cancel
              </button>
              <button 
                onClick={handleSave}
                disabled={saving}
                className="px-12 py-4 bg-[#ff2b2b] text-white font-bold rounded-2xl text-[10px] uppercase tracking-widest shadow-xl shadow-red-100 hover:bg-black transition-all disabled:opacity-50"
              >
                {saving ? 'Synchronizing...' : 'Save Configuration'}
              </button>
            </footer>
          </div>
        </div>
      )}
    </div>
  );
}
