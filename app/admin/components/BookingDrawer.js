"use client";
import StatusBadge from './StatusBadge';
import { useRef } from 'react';

const BookingDrawer = ({ booking, isOpen, onClose, onUpdate }) => {
  if (!isOpen || !booking) return null;

  const executiveInputRef = useRef(null);

  const handleToggle = (field) => {
    onUpdate(booking._id, { [field]: !booking[field] });
  };

  const handleAssignClick = () => {
    if (executiveInputRef.current) {
      executiveInputRef.current.focus();
    }
  };

  return (
    <>
      <div 
        className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[100] transition-opacity duration-500" 
        onClick={onClose} 
      />
      <div className="fixed top-0 right-0 w-full lg:w-[600px] h-full bg-white z-[110] shadow-[-20px_0_60px_-15px_rgba(0,0,0,0.1)] animate-in slide-in-from-right duration-500 overflow-y-auto">
        <div className="p-10 space-y-10 pb-32">
          
          <header className="flex justify-between items-center pb-6 border-b border-gray-100">
            <div>
               <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Booking ID</p>
               <h2 className="text-xl font-black text-gray-900 uppercase italic">#{booking?._id?.slice(-8) || '--------'}</h2>
            </div>
            <button 
              onClick={onClose} 
              className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center hover:bg-gray-100 transition-all"
            >
              <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </header>

          <div className="flex justify-between items-center bg-gray-50 p-6 rounded-2xl border border-gray-100">
            <div className="space-y-1">
               <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Payment Status</p>
               <StatusBadge status={booking?.payment_status} />
            </div>
            <div className="text-right space-y-1">
               <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Deposit Amount</p>
               <p className="text-xl font-black text-[#ff2b2b] italic">₹{booking?.booking_amount?.toLocaleString() || '0'}</p>
            </div>
          </div>

          {/* SECTION 1 - CUSTOMER INFO */}
          <section className="space-y-4">
            <h3 className="text-[10px] font-bold text-gray-900 uppercase tracking-[0.2em] border-l-2 border-[#ff2b2b] pl-3">1. Customer Info</h3>
            <div className="grid grid-cols-2 gap-4 p-6 bg-white border border-gray-100 rounded-2xl shadow-sm">
              <div>
                <p className="text-[9px] text-gray-400 uppercase font-bold mb-1">Name</p>
                <p className="text-xs font-bold text-gray-900">{booking?.customer_name || 'N/A'}</p>
              </div>
              <div>
                <p className="text-[9px] text-gray-400 uppercase font-bold mb-1">Phone</p>
                <p className="text-xs font-bold text-gray-900">{booking?.phone || 'N/A'}</p>
              </div>
              <div className="col-span-2">
                <p className="text-[9px] text-gray-400 uppercase font-bold mb-1">Email</p>
                <p className="text-xs font-medium text-gray-600">{booking?.email || 'N/A'}</p>
              </div>
              <div>
                <p className="text-[9px] text-gray-400 uppercase font-bold mb-1">City</p>
                <p className="text-xs font-bold text-gray-900 uppercase">{booking?.city || 'N/A'}</p>
              </div>
              <div>
                <p className="text-[9px] text-gray-400 uppercase font-bold mb-1">Preferred Branch</p>
                <p className="text-xs font-bold text-gray-900 uppercase">{booking?.preferred_branch || 'N/A'}</p>
              </div>
              <div>
                <p className="text-[9px] text-gray-400 uppercase font-bold mb-1">Contact Time</p>
                <p className="text-xs font-bold text-gray-900 uppercase">{booking?.preferred_contact_time || 'N/A'}</p>
              </div>
              <div>
                <p className="text-[9px] text-gray-400 uppercase font-bold mb-1">Lead Source</p>
                <p className="text-xs font-bold text-blue-600 uppercase bg-blue-50 px-2 py-1 rounded inline-block">{booking?.source || 'N/A'}</p>
              </div>
            </div>
          </section>

          {/* SECTION 2 - VEHICLE INFO */}
          <section className="space-y-4">
            <h3 className="text-[10px] font-bold text-gray-900 uppercase tracking-[0.2em] border-l-2 border-gray-300 pl-3">2. Vehicle Info</h3>
            <div className="p-6 bg-black text-white rounded-2xl space-y-4 relative overflow-hidden">
               <div className="relative z-10">
                  <p className="text-[9px] text-gray-400 uppercase font-bold mb-1">Model & Variant</p>
                  <p className="text-xl font-black italic uppercase">{booking?.vehicle_name || 'N/A'}</p>
                  <p className="text-xs text-[#ff2b2b] font-bold uppercase tracking-widest">{booking?.variant_name || 'N/A'}</p>
               </div>
               <div className="grid grid-cols-2 gap-4 relative z-10 pt-2">
                  <div>
                     <p className="text-[8px] text-gray-500 uppercase font-bold">Exterior</p>
                     <p className="text-[10px] font-bold uppercase">{booking?.exterior_color_name || 'N/A'}</p>
                  </div>
                  <div>
                     <p className="text-[8px] text-gray-500 uppercase font-bold">Interior</p>
                     <p className="text-[10px] font-bold uppercase">{booking?.interior_color_name || 'N/A'}</p>
                  </div>
                  <div className="col-span-2">
                     <p className="text-[8px] text-gray-500 uppercase font-bold">Suffix Code</p>
                     <p className="text-[10px] font-mono font-bold text-[#ff2b2b]">{booking?.suffix_code || 'UNASSIGNED'}</p>
                  </div>
               </div>
               <div className="absolute -right-4 -bottom-4 text-7xl font-black italic text-white/5 pointer-events-none">TOYOTA</div>
            </div>
          </section>

          {/* SECTION 7 - ONBOARDING DETAILS */}
          <section className="space-y-4">
            <h3 className="text-[10px] font-bold text-gray-900 uppercase tracking-[0.2em] border-l-2 border-blue-600 pl-3">7. Onboarding Status</h3>
            <div className="grid grid-cols-1 gap-4">
               {/* Finance Application */}
               <div className={`p-6 border rounded-2xl space-y-4 ${booking?.finance_docs_submitted ? 'bg-blue-50/50 border-blue-100' : 'bg-white border-gray-100'}`}>
                  <div className="flex justify-between items-center">
                     <p className="text-[10px] font-black text-gray-900 uppercase italic">Finance Application</p>
                     <span className={`px-3 py-1 rounded-full text-[8px] font-bold uppercase tracking-widest ${booking?.finance_docs_submitted ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-400'}`}>
                        {booking?.finance_docs_submitted ? 'Docs Submitted' : booking?.finance_required ? 'Interested' : 'No Interest'}
                     </span>
                  </div>
                  {booking?.finance_docs_submitted && (
                     <div className="grid grid-cols-2 gap-3 pt-2 border-t border-blue-100/50">
                        <div>
                           <p className="text-[8px] text-gray-400 uppercase font-bold">Aadhaar</p>
                           <p className="text-[10px] font-bold text-gray-900">{booking?.finance_details?.aadhaar_number}</p>
                        </div>
                        <div>
                           <p className="text-[8px] text-gray-400 uppercase font-bold">PAN</p>
                           <p className="text-[10px] font-bold text-gray-900 uppercase">{booking?.finance_details?.pan_number}</p>
                        </div>
                        <div>
                           <p className="text-[8px] text-gray-400 uppercase font-bold">Income</p>
                           <p className="text-[10px] font-bold text-gray-900">₹{booking?.finance_details?.monthly_income?.toLocaleString()}/mo</p>
                        </div>
                        <div>
                           <p className="text-[8px] text-gray-400 uppercase font-bold">Employment</p>
                           <p className="text-[10px] font-bold text-gray-900">{booking?.finance_details?.employment_type}</p>
                        </div>
                     </div>
                  )}
               </div>

               {/* Exchange Evaluation */}
               <div className={`p-6 border rounded-2xl space-y-4 ${booking?.exchange_details_submitted ? 'bg-orange-50/50 border-orange-100' : 'bg-white border-gray-100'}`}>
                  <div className="flex justify-between items-center">
                     <p className="text-[10px] font-black text-gray-900 uppercase italic">Exchange Appraisal</p>
                     <span className={`px-3 py-1 rounded-full text-[8px] font-bold uppercase tracking-widest ${booking?.exchange_details_submitted ? 'bg-orange-600 text-white' : 'bg-gray-100 text-gray-400'}`}>
                        {booking?.exchange_details_submitted ? 'Details Submitted' : booking?.exchange_required ? 'Interested' : 'No Interest'}
                     </span>
                  </div>
                  {booking?.exchange_details_submitted && (
                     <div className="grid grid-cols-2 gap-3 pt-2 border-t border-orange-100/50">
                        <div className="col-span-2">
                           <p className="text-[8px] text-gray-400 uppercase font-bold">Vehicle</p>
                           <p className="text-[10px] font-bold text-gray-900 uppercase">{booking?.exchange_details?.brand} {booking?.exchange_details?.model} ({booking?.exchange_details?.reg_year})</p>
                        </div>
                        <div>
                           <p className="text-[8px] text-gray-400 uppercase font-bold">KM Driven</p>
                           <p className="text-[10px] font-bold text-gray-900">{booking?.exchange_details?.km_driven?.toLocaleString()} KM</p>
                        </div>
                        <div>
                           <p className="text-[8px] text-gray-400 uppercase font-bold">Accident History</p>
                           <p className="text-[10px] font-bold text-gray-900 uppercase">{booking?.exchange_details?.accident_history}</p>
                        </div>
                     </div>
                  )}
               </div>

               {/* Showroom Visit */}
               {booking?.showroom_visit_requested && (
                  <div className="p-6 border border-red-100 bg-red-50/30 rounded-2xl space-y-4">
                     <div className="flex justify-between items-center">
                        <p className="text-[10px] font-black text-[#E60023] uppercase italic">Showroom Visit Scheduled</p>
                        <span className="bg-[#E60023] text-white px-3 py-1 rounded-full text-[8px] font-bold uppercase tracking-widest">Scheduled</span>
                     </div>
                     <div className="grid grid-cols-2 gap-3 pt-2 border-t border-red-100">
                        <div>
                           <p className="text-[8px] text-gray-400 uppercase font-bold">Branch</p>
                           <p className="text-[10px] font-bold text-gray-900 uppercase">{booking?.showroom_branch}</p>
                        </div>
                        <div>
                           <p className="text-[8px] text-gray-400 uppercase font-bold">Date & Time</p>
                           <p className="text-[10px] font-bold text-gray-900">{booking?.showroom_date ? new Date(booking.showroom_date).toLocaleDateString() : 'N/A'} @ {booking?.showroom_time}</p>
                        </div>
                        <div className="col-span-2">
                           <p className="text-[8px] text-gray-400 uppercase font-bold">Consultation Notes</p>
                           <p className="text-[10px] font-medium text-gray-600">{booking?.showroom_visit_notes || 'No notes provided'}</p>
                        </div>
                     </div>
                  </div>
               )}
            </div>
          </section>

          {/* SECTION 6 - LEAD MANAGEMENT */}
          <section className="space-y-4">
            <h3 className="text-[10px] font-bold text-gray-900 uppercase tracking-[0.2em] border-l-2 border-[#ff2b2b] pl-3">6. Lead Management</h3>
            <div className="p-6 bg-white border border-gray-100 rounded-2xl shadow-sm">
               <label className="text-[9px] text-gray-400 uppercase font-bold mb-2 block">Lead Stage</label>
               <select 
                 value={booking?.lead_stage || 'New Lead'}
                 onChange={(e) => onUpdate(booking._id, { lead_stage: e.target.value })}
                 className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-xs font-bold uppercase tracking-widest outline-none cursor-pointer focus:ring-1 focus:ring-[#ff2b2b]"
               >
                  <option>New Lead</option>
                  <option>Contacted</option>
                  <option>Interested</option>
                  <option>Test Drive Scheduled</option>
                  <option>Negotiation</option>
                  <option>Booking Completed</option>
                  <option>Delivered</option>
               </select>
            </div>
          </section>

          {/* SECTION 3 - SALES PROCESS */}
          <section className="space-y-4">
            <h3 className="text-[10px] font-bold text-gray-900 uppercase tracking-[0.2em] border-l-2 border-gray-300 pl-3">3. Sales Process</h3>
            <div className="grid grid-cols-2 gap-3">
               {[
                 { label: 'Finance', field: 'finance_required' },
                 { label: 'Exchange', field: 'exchange_required' },
                 { label: 'Insurance', field: 'insurance_required' },
                 { label: 'RTO', field: 'rto_required' },
                 { label: 'Corporate', field: 'corporate' },
                 { label: 'Accessories', field: 'accessories' },
                 { label: 'Ext. Warranty', field: 'extended_warranty' },
                 { label: 'TGloss', field: 'tgloss' },
               ].map((item) => (
                 <button 
                   key={item.field}
                   onClick={() => handleToggle(item.field)}
                   className={`flex items-center justify-between p-4 rounded-xl border transition-all ${booking?.[item.field] ? 'border-[#ff2b2b] bg-red-50 text-[#ff2b2b]' : 'border-gray-100 bg-white text-gray-500 hover:border-gray-300'}`}
                 >
                   <span className="text-[9px] font-bold uppercase tracking-widest">{item.label}</span>
                   <div className={`w-6 h-3.5 rounded-full relative transition-colors ${booking?.[item.field] ? 'bg-[#ff2b2b]' : 'bg-gray-200'}`}>
                     <div className={`absolute top-0.5 w-2.5 h-2.5 bg-white rounded-full transition-all ${booking?.[item.field] ? 'left-3' : 'left-0.5'}`} />
                   </div>
                 </button>
               ))}
            </div>
          </section>

          {/* SECTION 4 - INTERNAL STAFF */}
          <section className="space-y-4">
            <h3 className="text-[10px] font-bold text-gray-900 uppercase tracking-[0.2em] border-l-2 border-gray-300 pl-3">4. Internal Staff</h3>
            <div className="grid grid-cols-2 gap-4 p-6 bg-white border border-gray-100 rounded-2xl shadow-sm">
               {[
                 { label: 'G.E.M Name', field: 'gem_name' },
                 { label: 'Team Lead', field: 'team_lead' },
                 { label: 'Manager Name', field: 'manager_name' },
                 { label: 'Assigned Exec.', field: 'assigned_sales_executive', ref: executiveInputRef },
               ].map((item) => (
                 <div key={item.field} className={item.field === 'assigned_sales_executive' ? 'col-span-2' : ''}>
                    <label className="text-[9px] text-gray-400 uppercase font-bold mb-1 block">{item.label}</label>
                    <input 
                      ref={item.ref}
                      type="text" 
                      placeholder={`Enter ${item.label}`}
                      defaultValue={booking?.[item.field] || ''}
                      onBlur={(e) => {
                         if (e.target.value !== booking?.[item.field]) {
                            onUpdate(booking._id, { [item.field]: e.target.value })
                         }
                      }}
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-100 rounded-lg text-[10px] font-bold uppercase tracking-widest outline-none focus:ring-1 focus:ring-blue-500"
                    />
                 </div>
               ))}
            </div>
          </section>

          {/* SECTION 5 - DELIVERY */}
          <section className="space-y-4">
            <h3 className="text-[10px] font-bold text-gray-900 uppercase tracking-[0.2em] border-l-2 border-gray-300 pl-3">5. Delivery</h3>
            <div className="space-y-4 p-6 bg-white border border-gray-100 rounded-2xl shadow-sm">
               <div className="grid grid-cols-2 gap-4">
                 <div>
                    <label className="text-[9px] text-gray-400 uppercase font-bold mb-2 block">Delivery Status</label>
                    <select 
                      value={booking?.delivery_status || 'Pending'}
                      onChange={(e) => onUpdate(booking._id, { delivery_status: e.target.value })}
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-100 rounded-lg text-[10px] font-bold uppercase tracking-widest outline-none focus:ring-1 focus:ring-[#ff2b2b]"
                    >
                       <option>Pending</option>
                       <option>Processing</option>
                       <option>Ready</option>
                       <option>Delivered</option>
                    </select>
                 </div>
                 <div>
                    <label className="text-[9px] text-gray-400 uppercase font-bold mb-2 block">Expected Delivery</label>
                    <input 
                      type="date" 
                      defaultValue={booking?.expected_delivery ? new Date(booking.expected_delivery).toISOString().split('T')[0] : ''}
                      onChange={(e) => onUpdate(booking._id, { expected_delivery: e.target.value })}
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-100 rounded-lg text-[10px] font-bold uppercase tracking-widest outline-none focus:ring-1 focus:ring-[#ff2b2b]"
                    />
                 </div>
               </div>
               <div>
                  <label className="text-[9px] text-gray-400 uppercase font-bold mb-2 block">Delivery Notes</label>
                  <textarea 
                    placeholder="Add delivery instructions or remarks..."
                    defaultValue={booking?.delivery_notes || ''}
                    onBlur={(e) => {
                       if (e.target.value !== booking?.delivery_notes) {
                          onUpdate(booking._id, { delivery_notes: e.target.value })
                       }
                    }}
                    rows={3}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-100 rounded-lg text-[10px] font-medium outline-none focus:ring-1 focus:ring-[#ff2b2b] resize-none"
                  />
               </div>
            </div>
          </section>

          {/* ADMIN ACTION BUTTONS */}
          <div className="fixed bottom-0 right-0 w-full lg:w-[600px] bg-white border-t border-gray-100 p-6 z-20 shadow-[0_-10px_30px_rgba(0,0,0,0.05)]">
             <div className="grid grid-cols-2 gap-3 mb-3">
               <a 
                 href={`tel:${booking?.phone}`}
                 className="flex items-center justify-center gap-2 py-3 bg-gray-900 text-white font-bold rounded-xl text-[10px] uppercase tracking-widest hover:bg-black transition-all"
               >
                 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                 Call
               </a>
               <a 
                 href={`https://wa.me/91${booking?.phone}`}
                 target="_blank"
                 className="flex items-center justify-center gap-2 py-3 bg-[#25D366] text-white font-bold rounded-xl text-[10px] uppercase tracking-widest hover:opacity-90 transition-all"
               >
                 <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.72.94 3.659 1.437 5.634 1.437h.005c6.558 0 11.894-5.335 11.897-11.893 0-3.18-1.238-6.171-3.486-8.422z"/></svg>
                 WhatsApp
               </a>
             </div>
             <div className="grid grid-cols-3 gap-3">
               <button 
                 onClick={() => {
                   if (booking?.phone) {
                     navigator.clipboard.writeText(booking.phone);
                     alert('Copied to clipboard');
                   }
                 }}
                 className="py-3 bg-gray-50 border border-gray-200 text-gray-700 font-bold rounded-xl text-[9px] uppercase tracking-widest hover:bg-gray-100 transition-all"
               >
                 Copy Phone
               </button>
               <button 
                 onClick={handleAssignClick}
                 className="py-3 bg-blue-50 text-blue-600 font-bold rounded-xl text-[9px] uppercase tracking-widest hover:bg-blue-100 transition-all"
               >
                 Assign Exec
               </button>
               <button 
                 onClick={() => booking?._id && onUpdate(booking._id, { follow_up_status: 'Done' })}
                 className={`py-3 font-bold rounded-xl text-[9px] uppercase tracking-widest transition-all ${booking?.follow_up_status === 'Done' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-[#ff2b2b] hover:bg-red-100'}`}
               >
                 {booking?.follow_up_status === 'Done' ? 'Follow-up ✓' : 'Mark Follow-up'}
               </button>
             </div>
          </div>

        </div>
      </div>
    </>
  );
};

export default BookingDrawer;
