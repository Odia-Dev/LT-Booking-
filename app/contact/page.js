export default function ContactPage() {
  return (
    <div className="bg-[#f5f5f5] min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#0b0b0b] to-[#111827] section-hero relative overflow-hidden flex items-center min-h-[40vh]">
        <div className="main-container relative z-10 w-full text-center">
          <div className="max-w-3xl mx-auto space-y-4">
            <h1 className="text-white uppercase">Connect <span className="text-[#ff2b2b]">With Us</span></h1>
            <p className="text-gray-400 text-sm uppercase tracking-[0.4em]">Our relationship managers are here to assist you</p>
          </div>
        </div>
      </section>

      <section className="section-large">
        <div className="main-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Contact Details */}
            <div className="space-y-12">
              <div className="space-y-8">
                <h2 className="text-gray-900 uppercase">Mumbai Central</h2>
                <div className="space-y-6 text-gray-600 text-base font-medium">
                  <div className="flex items-start gap-4">
                    <svg className="w-6 h-6 text-[#ff2b2b] mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                    <p>123 Dealership Road, Worli, Mumbai - 400018</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <svg className="w-6 h-6 text-[#ff2b2b]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                    <p>Sales: +91 98765 43210</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <svg className="w-6 h-6 text-[#ff2b2b]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                    <p>Email: contact@laxmitoyota.com</p>
                  </div>
                </div>
              </div>

              <div className="aspect-video bg-white border border-gray-200 rounded-xl overflow-hidden shadow-lg grayscale contrast-125">
                <img src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&q=80&w=2000" className="w-full h-full object-cover opacity-80" alt="Showroom" />
              </div>
            </div>

            {/* Inquiry Form */}
            <div className="bg-white p-12 rounded-2xl shadow-xl border border-gray-100">
              <h3 className="text-2xl font-black uppercase text-gray-900 mb-8">Send an Inquiry</h3>
              <form className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-2">Full Name</label>
                  <input type="text" className="w-full text-base font-semibold" placeholder="John Doe" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-2">Email Address</label>
                  <input type="email" className="w-full text-base font-semibold" placeholder="john@example.com" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-2">Subject</label>
                  <select className="w-full text-base font-semibold">
                    <option>Sales Inquiry</option>
                    <option>Service Appointment</option>
                    <option>Feedback</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-2">Message</label>
                  <textarea className="w-full text-base font-semibold h-40 resize-none" placeholder="How can we help you?"></textarea>
                </div>
                <button type="submit" className="w-full btn-premium-primary !py-5 text-lg font-black uppercase tracking-widest shadow-lg shadow-red-500/20 mt-4">
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
