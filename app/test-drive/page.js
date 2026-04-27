'use client';
import { useState } from 'react';

export default function TestDrivePage() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', vehicle: '', date: '' });

  return (
    <div className="bg-[#f5f5f5] min-h-screen">
      <section className="bg-gradient-to-br from-[#0b0b0b] to-[#111827] section-hero flex items-center justify-center text-center px-6">
        <div className="max-w-3xl mx-auto space-y-6">
          <h1 className="text-white uppercase">Experience <span className="text-[#ff2b2b]">The Drive</span></h1>
          <p className="text-gray-400 text-sm uppercase tracking-[0.4em]">Book your session with our experts</p>
        </div>
      </section>

      <section className="section-large">
        <div className="main-container">
          <div className="max-w-2xl mx-auto bg-white p-12 rounded-2xl shadow-xl border border-gray-100">
            <form className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-2">Full Name</label>
                  <input 
                    type="text" 
                    className="w-full text-base font-semibold"
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-2">Phone Number</label>
                  <input 
                    type="tel" 
                    className="w-full text-base font-semibold"
                    placeholder="+91 00000 00000"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  />
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-2">Preferred Vehicle</label>
                <select 
                  className="w-full text-base font-semibold"
                  value={formData.vehicle}
                  onChange={(e) => setFormData({...formData, vehicle: e.target.value})}
                >
                  <option value="">Select a model</option>
                  <option value="Camry">Toyota Camry</option>
                  <option value="Fortuner">Toyota Fortuner</option>
                  <option value="Innova">Toyota Innova Hycross</option>
                </select>
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-2">Preferred Date</label>
                <input 
                  type="date" 
                  className="w-full text-base font-semibold"
                  value={formData.date}
                  onChange={(e) => setFormData({...formData, date: e.target.value})}
                />
              </div>

              <div className="pt-6">
                <button type="submit" className="w-full btn-premium-primary !py-5 text-lg font-black uppercase tracking-widest shadow-lg shadow-red-500/20">
                  Confirm Request
                </button>
              </div>
            </form>
          </div>
          
          <div className="mt-16 text-center max-w-xl mx-auto space-y-4">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest leading-loose">
              By submitting this form, you agree to be contacted by our relationship managers. 
              Please bring your valid driving license for the test drive.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
