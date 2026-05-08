import Link from 'next/link';
import { getBranchByName } from '@/constants/branches';

export async function generateMetadata({ params }) {
  const branchData = getBranchByName(params.branch);
  const branchName = branchData ? branchData.name : params.branch.charAt(0).toUpperCase() + params.branch.slice(1);
  
  return {
    title: `Laxmi Toyota ${branchName} | Authorized Toyota Dealer in Odisha`,
    description: `Official Laxmi Toyota showroom and service center in ${branchName}. Explore the latest Toyota models, book a test drive, and get expert vehicle maintenance.`,
  };
}

export default function BranchPage({ params }) {
  const branchData = getBranchByName(params.branch);
  const branchName = branchData ? branchData.name : params.branch.charAt(0).toUpperCase() + params.branch.slice(1);

  // LocalBusiness Schema
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "AutoDealer",
    "name": `Laxmi Toyota ${branchName}`,
    "image": "https://laxmitoyota.com/favicon.ico",
    "@id": `https://laxmitoyota.com/branches/${params.branch}`,
    "url": `https://laxmitoyota.com/branches/${params.branch}`,
    "telephone": "+9118001234567",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": `${branchName} Main Road`,
      "addressLocality": branchName,
      "addressRegion": "Odisha",
      "postalCode": "760001",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "19.3149",
      "longitude": "84.7941"
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
      ],
      "opens": "09:00",
      "closes": "19:00"
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa] pt-32 pb-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Branch Header */}
        <div className="bg-white p-12 md:p-16 rounded-[2.5rem] border border-gray-100 shadow-sm mb-8 relative overflow-hidden">
          <div className="relative z-10">
            <span className="bg-red-50 text-[#ff2b2b] text-[10px] font-black uppercase tracking-[0.3em] px-4 py-2 rounded-full mb-6 inline-block">Authorized Dealership</span>
            <h1 className="text-4xl md:text-6xl font-black text-gray-900 uppercase italic mb-4 leading-tight">
              Laxmi Toyota <span className="text-[#ff2b2b]">{branchName}</span>
            </h1>
            <p className="text-gray-500 font-medium text-lg max-w-2xl">
              Leading the way in automotive excellence in {branchName}. We provide end-to-end solutions for all your Toyota vehicle needs.
            </p>
          </div>
          <div className="absolute top-0 right-0 w-1/3 h-full opacity-5 pointer-events-none">
             <svg className="w-full h-full" viewBox="0 0 100 100" fill="currentColor"><path d="M50 0L100 50L50 100L0 50Z" /></svg>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column: Details & Map */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Sales Team Section */}
            <div className="bg-white p-10 rounded-[2rem] border border-gray-100 shadow-sm">
              <h3 className="text-xs font-black uppercase tracking-widest text-gray-400 mb-8 flex items-center gap-3">
                <div className="w-8 h-px bg-gray-200"></div> Sales Leadership
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="space-y-1">
                  <p className="text-sm font-black text-gray-900">{branchData?.salesTeam?.manager_name || "Regional Manager"}</p>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Branch Manager</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-black text-gray-900">{branchData?.salesTeam?.team_lead || "Senior Consultant"}</p>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Sales Team Lead</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-black text-gray-900">{branchData?.salesTeam?.gem_name || "G.E.M Representative"}</p>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">G.E.M Name</p>
                </div>
              </div>
            </div>

            {/* Google Map Section */}
            <div className="bg-white p-4 rounded-[2rem] border border-gray-100 shadow-sm h-[450px] relative overflow-hidden group">
              <iframe 
                src={`https://www.google.com/maps/embed/v1/place?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY || 'YOUR_KEY_HERE'}&q=Laxmi+Toyota+${branchName}+Odisha`}
                className="w-full h-full rounded-[1.5rem] border-0 grayscale opacity-90 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
                allowFullScreen="" 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
              <div className="absolute bottom-8 left-8 bg-white/90 backdrop-blur px-6 py-4 rounded-2xl shadow-xl border border-white">
                <p className="text-xs font-black uppercase tracking-widest text-gray-900 mb-1">Showroom Location</p>
                <p className="text-gray-500 text-[10px] font-bold">Open Mon-Sat: 9:00 AM - 7:00 PM</p>
              </div>
            </div>

            {/* Local SEO Content */}
            <div className="bg-white p-10 rounded-[2rem] border border-gray-100 shadow-sm prose prose-sm max-w-none">
              <h2 className="text-2xl font-black uppercase italic text-gray-900 mb-6">Experience Toyota in {branchName}</h2>
              <p className="text-gray-600 leading-relaxed text-base">
                Laxmi Toyota {branchName} is proud to be your local authorized dealer. We bring the full range of Toyota's legendary vehicles to your doorstep, including the iconic <Link href="/vehicles/toyota-fortuner" className="text-[#ff2b2b] font-bold decoration-2">Toyota Fortuner</Link>, the versatile <Link href="/vehicles/toyota-innova-hycross" className="text-[#ff2b2b] font-bold">Innova Hycross</Link>, and the efficient <Link href="/vehicles/toyota-urban-cruiser-hyryder" className="text-[#ff2b2b] font-bold">Hyryder</Link>.
              </p>
              <p className="text-gray-600 leading-relaxed text-base mt-4">
                Our state-of-the-art facility in {branchName} is equipped with the latest diagnostic tools and genuine Toyota spare parts. Whether you are looking for a new car or need world-class service for your current one, our factory-trained technicians ensure your vehicle performs at its peak.
              </p>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="space-y-8">
            <div className="bg-gray-900 p-10 rounded-[2.5rem] text-white shadow-2xl sticky top-28">
              <h3 className="text-2xl font-black uppercase italic mb-2 tracking-tight">Contact Branch</h3>
              <p className="text-gray-400 text-xs font-medium mb-8 leading-relaxed">Have a question about a vehicle or service in {branchName}? Our team will call you back within 15 minutes.</p>
              
              <form className="space-y-5">
                <div>
                  <label className="text-[9px] font-black uppercase tracking-[0.2em] text-gray-500 mb-2 block">Full Name</label>
                  <input type="text" placeholder="John Doe" className="w-full bg-white/5 border border-white/10 px-5 py-4 rounded-xl text-white outline-none focus:border-[#ff2b2b] transition-all" />
                </div>
                <div>
                  <label className="text-[9px] font-black uppercase tracking-[0.2em] text-gray-500 mb-2 block">Phone Number</label>
                  <input type="tel" placeholder="+91 00000 00000" className="w-full bg-white/5 border border-white/10 px-5 py-4 rounded-xl text-white outline-none focus:border-[#ff2b2b] transition-all" />
                </div>
                <div>
                  <label className="text-[9px] font-black uppercase tracking-[0.2em] text-gray-500 mb-2 block">Interested In</label>
                  <select className="w-full bg-white/5 border border-white/10 px-5 py-4 rounded-xl text-white outline-none focus:border-[#ff2b2b] transition-all appearance-none">
                    <option className="bg-gray-900">New Vehicle</option>
                    <option className="bg-gray-900">Service Booking</option>
                    <option className="bg-gray-900">Spare Parts</option>
                    <option className="bg-gray-900">Insurance/Finance</option>
                  </select>
                </div>
                <button type="button" className="w-full py-5 bg-[#ff2b2b] text-white font-black uppercase tracking-widest rounded-xl hover:bg-white hover:text-black transition-all shadow-xl shadow-red-900/20">
                  Send Inquiry
                </button>
              </form>

              <div className="mt-10 pt-8 border-t border-white/10 space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-full bg-[#ff2b2b]/20 flex items-center justify-center text-[#ff2b2b]">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                  </div>
                  <span className="text-xs font-bold">1800-123-4567</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center text-green-500">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12.031 6.172c-2.27 0-4.116 1.846-4.116 4.116 0 .736.195 1.455.566 2.086l-.602 2.196 2.252-.591c.597.325 1.266.496 1.946.496 2.27 0 4.116-1.846 4.116-4.116 0-2.27-1.846-4.116-4.116-4.116zm2.348 5.766c-.053.149-.307.283-.431.3-.122.016-.279.031-.837-.194-.653-.263-1.074-.93-1.107-.974-.033-.044-.271-.36-.271-.687s.171-.489.232-.556c.061-.067.133-.083.177-.083s.088 0 .127.006c.041.003.096-.016.149.112.053.127.182.443.199.476.017.033.028.072.006.116-.022.044-.033.072-.067.111-.033.039-.071.088-.102.119-.033.031-.067.065-.028.132.039.067.172.284.37.46.255.226.471.296.538.329.067.033.107.028.147-.017.04-.045.172-.201.218-.27.045-.069.091-.058.152-.036.061.022.388.183.454.216s.111.055.127.083c.017.028.017.161-.036.31zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" /></svg>
                  </div>
                  <span className="text-xs font-bold">WhatsApp Inquiry</span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Global Branch Footer Linkage */}
        <div className="mt-20 pt-16 border-t border-gray-200">
          <h4 className="text-xs font-black uppercase tracking-[0.3em] text-gray-400 mb-8 text-center">Our Odisha Network</h4>
          <div className="flex flex-wrap justify-center gap-4">
            {['Brahmapur', 'Bhawanipatna', 'Jeypore', 'Rayagada', 'Bargarh', 'Balangir', 'Paralakhemundi', 'Aska'].map(b => (
              <Link 
                key={b} 
                href={`/branches/${b.toLowerCase()}`}
                className={`px-6 py-3 rounded-xl border text-[10px] font-black uppercase tracking-widest transition-all ${branchName === b ? 'bg-[#ff2b2b] text-white border-[#ff2b2b]' : 'bg-white text-gray-500 border-gray-100 hover:border-[#ff2b2b] hover:text-[#ff2b2b]'}`}
              >
                {b}
              </Link>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
