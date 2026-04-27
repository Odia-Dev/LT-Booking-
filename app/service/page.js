import Link from 'next/link';

export default function ServicePage() {
  const services = [
    { name: 'Periodic Maintenance', desc: 'Precision servicing to keep your Toyota in peak condition.', icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' },
    { name: 'Repairs & Overhauls', desc: 'Expert restoration using state-of-the-art diagnostic tools.', icon: 'M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 011-1h1a2 2 0 100-4H7a1 1 0 01-1-1V7a1 1 0 011-1h3a1 1 0 001-1V4z' },
    { name: 'Genuine Parts', desc: 'Original Toyota components for guaranteed performance.', icon: 'M13 10V3L4 14h7v7l9-11h-7z' },
    { name: 'Warranty Support', desc: 'Comprehensive coverage and priority claim processing.', icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z' },
  ];

  return (
    <div className="bg-[#f5f5f5] min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#0b0b0b] to-[#111827] section-hero relative overflow-hidden flex items-center min-h-[50vh]">
        <div className="main-container relative z-10 w-full text-center">
          <div className="max-w-3xl mx-auto space-y-6">
            <h1 className="text-white uppercase">Service <span className="text-[#ff2b2b]">Excellence</span></h1>
            <p className="text-gray-400 text-lg uppercase tracking-[0.4em]">Expert care for your Toyota</p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="section-large">
        <div className="main-container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service) => (
              <div key={service.name} className="premium-card p-10 space-y-6">
                <div className="w-16 h-16 bg-[#fff5f5] text-[#ff2b2b] rounded-xl flex items-center justify-center">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={service.icon} />
                  </svg>
                </div>
                <h3 className="text-xl font-bold uppercase tracking-tight text-gray-900">{service.name}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-large bg-white border-y border-gray-100">
        <div className="main-container text-center max-w-3xl mx-auto space-y-10">
          <h2 className="text-gray-900 uppercase">Trusted by Thousands of <span className="text-[#ff2b2b]">Owners</span></h2>
          <p className="text-gray-500 text-lg font-light leading-relaxed">
            From routine oil changes to major structural repairs, our team of certified specialists 
            ensures your Toyota remains as safe and reliable as the day it was built.
          </p>
          <div className="pt-4">
             <Link href="/contact" className="btn-premium-primary px-16">Book Service Now</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
