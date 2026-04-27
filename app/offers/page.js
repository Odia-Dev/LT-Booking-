export default function OffersPage() {
  const offers = [
    { title: 'Festival Bonanza', desc: 'Exchange bonus up to ₹50,000 on selected models including Glanza and Rumion.', savings: '₹50,000', tag: 'Limited Time' },
    { title: 'Corporate Special', desc: 'Exclusive benefits for corporate professionals and SME business owners.', savings: '₹25,000', tag: 'Exclusive' },
    { title: 'Low EMI Plan', desc: 'Drive home a Toyota today with EMIs starting as low as ₹19,999 per month.', savings: 'Easy Finance', tag: 'Popular' },
  ];

  return (
    <div className="bg-[#f5f5f5] min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#0b0b0b] to-[#111827] section-hero relative overflow-hidden flex items-center min-h-[40vh]">
        <div className="main-container relative z-10 w-full text-center">
          <div className="max-w-3xl mx-auto space-y-4">
            <h1 className="text-white uppercase">Exclusive <span className="text-[#ff2b2b]">Offers</span></h1>
            <p className="text-gray-400 text-sm uppercase tracking-[0.4em]">Limited time benefits for you</p>
          </div>
        </div>
      </section>

      {/* Offers Grid */}
      <section className="section-large">
        <div className="main-container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {offers.map((offer) => (
              <div key={offer.title} className="premium-card p-12 flex flex-col justify-between h-[450px]">
                <div className="space-y-6">
                  <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#ff2b2b] bg-[#fff5f5] px-4 py-1.5 rounded-full">
                    {offer.tag}
                  </span>
                  <h3 className="text-2xl font-black uppercase tracking-tight text-gray-900">{offer.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{offer.desc}</p>
                </div>
                <div className="pt-10 border-t border-gray-100 mt-auto">
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Total Savings</p>
                  <p className="text-4xl font-black text-[#ff2b2b] mb-8">{offer.savings}</p>
                  <button className="w-full btn-premium-primary text-sm uppercase font-black">
                    Claim Offer
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
