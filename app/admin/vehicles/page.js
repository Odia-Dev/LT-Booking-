'use client';
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
        body: formData
      });
      const data = await res.json();
      if (data.url) {
        onUpload(data.url);
      }
    } catch (err) {
      alert('Upload failed');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-2">
      <label className="text-[10px] font-bold uppercase text-gray-400 pl-1">{label}</label>
      <div 
        onClick={() => fileInputRef.current.click()}
        className="relative aspect-video bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200 hover:border-[#ff2b2b] hover:bg-red-50 transition-all cursor-pointer overflow-hidden flex flex-col items-center justify-center gap-2 group"
      >
        {currentImage ? (
          <>
            <img src={currentImage} className="w-full h-full object-cover" alt="Preview" />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-[10px] font-bold uppercase tracking-widest">Change Image</div>
          </>
        ) : (
          <>
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm text-gray-400 group-hover:text-[#ff2b2b]">
              {uploading ? (
                <div className="w-5 h-5 border-2 border-gray-200 border-t-[#ff2b2b] rounded-full animate-spin" />
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>
              )}
            </div>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{uploading ? 'Uploading...' : 'Click to Upload'}</p>
          </>
        )}
        <input ref={fileInputRef} type="file" className="hidden" onChange={handleUpload} accept="image/*" />
      </div>
    </div>
  );
};

export default function VehicleManagement() {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [currentVehicle, setCurrentVehicle] = useState(null);
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

  const emptyVehicle = {
    name: '',
    slug: '',
    model: '',
    price: 0,
    category: 'SUV',
    image: '',
    thumbnailImage: '',
    megaMenuImage: '',
    heroImage: '',
    galleryImages: [],
    description: '',
    specs: { engine: '', mileage: '', fuel: 'Petrol', transmission: '', safety: '' },
    isNew: false,
    available: true,
    variants: [],
    exterior_colors: [],
    interior_colors: []
  };

  const handleEdit = (vehicle) => {
    setCurrentVehicle({ ...vehicle });
    setIsEditing(true);
  };

  const handleCreate = () => {
    setCurrentVehicle({ ...emptyVehicle });
    setIsEditing(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    const method = currentVehicle._id ? 'PUT' : 'POST';
    const url = currentVehicle._id ? `/api/vehicles/${currentVehicle.slug}` : '/api/vehicles';

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(currentVehicle),
      });
      if (res.ok) {
        setIsEditing(false);
        fetchVehicles();
      } else {
        const data = await res.json();
        alert(`Error: ${data.error}`);
      }
    } catch (err) {
      alert('Failed to save vehicle');
    } finally {
      setSaving(false);
    }
  };

  if (isEditing) {
    return (
      <div className="space-y-8 animate-in fade-in duration-500 pb-20">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-black uppercase italic tracking-tight">
            {currentVehicle._id ? 'Edit Vehicle' : 'Add New Vehicle'}
          </h1>
          <button onClick={() => setIsEditing(false)} className="text-[10px] font-bold uppercase tracking-widest text-gray-500 hover:text-black">Cancel</button>
        </div>

        <form onSubmit={handleSave} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Basic Info */}
          <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6">
            <h3 className="text-xs font-bold uppercase tracking-widest text-[#ff2b2b]">Basic Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase text-gray-400 pl-1">Vehicle Name</label>
                <input required className="w-full bg-gray-50 border-none p-4 rounded-xl text-sm font-bold" value={currentVehicle.name} onChange={(e) => setCurrentVehicle({...currentVehicle, name: e.target.value})} />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase text-gray-400 pl-1">Slug</label>
                <input required className="w-full bg-gray-50 border-none p-4 rounded-xl text-sm font-bold" value={currentVehicle.slug} onChange={(e) => setCurrentVehicle({...currentVehicle, slug: e.target.value})} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase text-gray-400 pl-1">Category</label>
                <select className="w-full bg-gray-50 border-none p-4 rounded-xl text-sm font-bold" value={currentVehicle.category} onChange={(e) => setCurrentVehicle({...currentVehicle, category: e.target.value})}>
                  <option>Hatchback</option>
                  <option>SUV</option>
                  <option>MPV</option>
                  <option>Sedan</option>
                  <option>Luxury</option>
                  <option>Hybrid</option>
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase text-gray-400 pl-1">Base Price (₹)</label>
                <input type="number" required className="w-full bg-gray-50 border-none p-4 rounded-xl text-sm font-bold" value={currentVehicle.price} onChange={(e) => setCurrentVehicle({...currentVehicle, price: parseInt(e.target.value)})} />
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase text-gray-400 pl-1">Description</label>
              <textarea className="w-full bg-gray-50 border-none p-4 rounded-xl text-sm font-medium h-32" value={currentVehicle.description} onChange={(e) => setCurrentVehicle({...currentVehicle, description: e.target.value})} />
            </div>
          </div>

          {/* Media Management - Phase 3 & 10 */}
          <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-8">
            <h3 className="text-xs font-bold uppercase tracking-widest text-[#ff2b2b]">Premium Media Assets</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <ImageUpload 
                label="Thumbnail (Card View)" 
                currentImage={currentVehicle.thumbnailImage} 
                onUpload={(url) => setCurrentVehicle({...currentVehicle, thumbnailImage: url})} 
              />
              <ImageUpload 
                label="Mega Menu Visual" 
                currentImage={currentVehicle.megaMenuImage} 
                onUpload={(url) => setCurrentVehicle({...currentVehicle, megaMenuImage: url})} 
              />
              <ImageUpload 
                label="Hero Banner (Main)" 
                currentImage={currentVehicle.heroImage} 
                onUpload={(url) => setCurrentVehicle({...currentVehicle, heroImage: url})} 
              />
              <ImageUpload 
                label="Primary Fallback" 
                currentImage={currentVehicle.image} 
                onUpload={(url) => setCurrentVehicle({...currentVehicle, image: url})} 
              />
            </div>

            {/* Gallery Manager */}
            <div className="space-y-4">
              <div className="flex justify-between items-end">
                <h3 className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Showcase Gallery</h3>
                <p className="text-[9px] text-gray-400">Reorderable re-upload coming soon</p>
              </div>
              <div className="flex flex-wrap gap-4">
                {currentVehicle.galleryImages?.map((img, idx) => (
                  <div key={idx} className="relative w-24 aspect-video rounded-xl overflow-hidden border border-gray-100 group">
                    <img src={img} className="w-full h-full object-cover" />
                    <button 
                      type="button"
                      onClick={() => {
                        const newGallery = currentVehicle.galleryImages.filter((_, i) => i !== idx);
                        setCurrentVehicle({...currentVehicle, galleryImages: newGallery});
                      }}
                      className="absolute top-1 right-1 w-5 h-5 bg-black/60 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      ×
                    </button>
                  </div>
                ))}
                <button 
                  type="button"
                  onClick={() => {
                    const url = prompt('Enter image URL for gallery:');
                    if (url) setCurrentVehicle({...currentVehicle, galleryImages: [...(currentVehicle.galleryImages || []), url]});
                  }}
                  className="w-24 aspect-video rounded-xl border-2 border-dashed border-gray-100 flex items-center justify-center text-gray-300 hover:border-gray-200 hover:text-gray-400"
                >
                  +
                </button>
              </div>
            </div>

            {/* Variant Media Mapping - Phase 7 */}
            <div className="space-y-6 pt-6 border-t border-gray-100">
               <h3 className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Variant Specific Media</h3>
               <div className="space-y-4">
                  {currentVehicle.variants?.map((v, vIdx) => (
                    <div key={vIdx} className="flex items-center gap-6 p-4 bg-gray-50 rounded-2xl">
                      <div className="flex-1">
                        <p className="text-xs font-black uppercase italic">{v.name}</p>
                        <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest">Base +₹{v.price.toLocaleString()}</p>
                      </div>
                      <div className="w-32">
                        <ImageUpload 
                          label="Primary Asset" 
                          currentImage={v.images?.[0]} 
                          onUpload={(url) => {
                            const newVariants = [...currentVehicle.variants];
                            newVariants[vIdx].images = [url];
                            setCurrentVehicle({...currentVehicle, variants: newVariants});
                          }} 
                        />
                      </div>
                    </div>
                  ))}
                  {(!currentVehicle.variants || currentVehicle.variants.length === 0) && (
                    <p className="text-[9px] text-gray-400 italic">No variants configured yet.</p>
                  )}
               </div>
            </div>

            {/* Color Media Mapping - Phase 8 */}
            <div className="space-y-6 pt-6 border-t border-gray-100">
               <h3 className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Exterior Color Media</h3>
               <div className="space-y-4">
                  {currentVehicle.exterior_colors?.map((c, cIdx) => (
                    <div key={cIdx} className="flex items-center gap-6 p-4 bg-gray-50 rounded-2xl">
                      <div className="flex items-center gap-4 flex-1">
                        <div className="w-6 h-6 rounded-full border border-gray-200" style={{ backgroundColor: c.hex }} />
                        <div>
                          <p className="text-xs font-black uppercase italic">{c.name}</p>
                          <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest">{c.hex}</p>
                        </div>
                      </div>
                      <div className="w-32">
                        <ImageUpload 
                          label="Color View" 
                          currentImage={c.images?.[0]} 
                          onUpload={(url) => {
                            const newColors = [...currentVehicle.exterior_colors];
                            newColors[cIdx].images = [url];
                            setCurrentVehicle({...currentVehicle, exterior_colors: newColors});
                          }} 
                        />
                      </div>
                    </div>
                  ))}
                  {(!currentVehicle.exterior_colors || currentVehicle.exterior_colors.length === 0) && (
                    <p className="text-[9px] text-gray-400 italic">No colors configured yet.</p>
                  )}
               </div>
            </div>

            {/* Inventory & Stock Control - Phase 11 */}
            <div className="space-y-6 pt-6 border-t border-gray-100">
               <h3 className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Live Inventory Management</h3>
               <div className="bg-gray-50 rounded-2xl p-6 space-y-6">
                  {currentVehicle.variants?.map((v) => (
                    <div key={v.name} className="space-y-3">
                      <p className="text-[10px] font-black uppercase text-gray-900 border-b border-gray-200 pb-1">{v.name}</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {currentVehicle.exterior_colors?.map((c) => {
                          const invItem = currentVehicle.inventory?.find(i => i.variant_name === v.name && i.exterior_color === c.name);
                          return (
                            <div key={c.name} className="flex items-center justify-between bg-white p-3 rounded-xl border border-gray-100">
                              <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: c.hex }} />
                                <span className="text-[9px] font-bold text-gray-600 uppercase">{c.name}</span>
                              </div>
                              <input 
                                type="number" 
                                min="0"
                                className="w-16 bg-gray-50 border-none p-1.5 rounded-lg text-center text-[10px] font-bold"
                                value={invItem?.stock_count || 0}
                                onChange={(e) => {
                                  const count = parseInt(e.target.value) || 0;
                                  const newInventory = [...(currentVehicle.inventory || [])];
                                  const index = newInventory.findIndex(i => i.variant_name === v.name && i.exterior_color === c.name);
                                  if (index > -1) {
                                    newInventory[index].stock_count = count;
                                  } else {
                                    newInventory.push({ variant_name: v.name, exterior_color: c.name, stock_count: count });
                                  }
                                  setCurrentVehicle({...currentVehicle, inventory: newInventory});
                                }}
                              />
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                  {(!currentVehicle.variants || currentVehicle.variants.length === 0) && (
                    <p className="text-[9px] text-gray-400 italic">Add variants to manage inventory.</p>
                  )}
               </div>
            </div>
          </div>

          <div className="lg:col-span-2 flex justify-end gap-4">
             <button type="submit" disabled={saving} className="px-12 py-5 bg-[#ff2b2b] text-white font-black rounded-2xl uppercase tracking-[0.2em] shadow-xl shadow-red-100 hover:bg-black transition-all">
               {saving ? 'Saving...' : 'Save Vehicle Config'}
             </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="space-y-12 animate-in fade-in duration-700">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-black text-gray-900 uppercase italic tracking-tight">Vehicle Management</h1>
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-2">Dynamic Media & Configuration Hub</p>
        </div>
        <button onClick={handleCreate} className="px-8 py-4 bg-gray-900 text-white font-bold rounded-2xl text-[10px] uppercase tracking-widest shadow-xl hover:bg-[#ff2b2b] transition-all">
          Add New Model
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {loading ? (
          <div className="col-span-full py-20 text-center text-gray-400 font-bold uppercase tracking-widest text-[10px]">Loading Fleet...</div>
        ) : vehicles.map((v) => (
          <div key={v._id} className="bg-white rounded-[2rem] border border-gray-100 overflow-hidden shadow-sm hover:shadow-xl transition-all group">
            <div className="aspect-video bg-gray-50 relative">
               <img src={v.thumbnailImage || v.image} className="w-full h-full object-contain p-6" alt={v.name} />
               <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-lg text-[8px] font-black uppercase tracking-widest border border-gray-100">
                 {v.category}
               </div>
            </div>
            <div className="p-8 space-y-4">
               <div>
                 <h3 className="text-xl font-black text-gray-900 uppercase italic">{v.name}</h3>
                 <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">₹{(v.price / 100000).toFixed(2)} Lakhs Base</p>
               </div>
               <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-50">
                  <button onClick={() => handleEdit(v)} className="w-full py-3 bg-gray-50 text-gray-900 font-bold rounded-xl text-[10px] uppercase tracking-widest hover:bg-gray-100">Edit</button>
                  <Link href={`/vehicles/${v.slug}`} target="_blank" className="w-full py-3 bg-white border border-gray-100 text-gray-900 font-bold rounded-xl text-[10px] uppercase tracking-widest text-center hover:border-gray-900">View Page</Link>
               </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
