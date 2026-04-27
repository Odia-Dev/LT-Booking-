export default function BlogPage() {
  const articles = [
    { title: 'The Future of Hybrid Technology', date: 'April 20, 2026', category: 'Technology', image: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&q=80&w=1000' },
    { title: 'Choosing the Right SUV for Your Lifestyle', date: 'April 15, 2026', category: 'Guide', image: 'https://images.unsplash.com/photo-1542362567-b052da132171?auto=format&fit=crop&q=80&w=1000' },
    { title: 'Toyota Heritage: A Century of Innovation', date: 'April 10, 2026', category: 'History', image: 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&q=80&w=1000' },
  ];

  return (
    <div className="bg-[#f5f5f5] min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#0b0b0b] to-[#111827] section-hero relative overflow-hidden flex items-center min-h-[40vh]">
        <div className="main-container relative z-10 w-full text-center">
          <div className="max-w-3xl mx-auto space-y-4">
            <h1 className="text-white uppercase">Insights & <span className="text-[#ff2b2b]">Heritage</span></h1>
            <p className="text-gray-400 text-sm uppercase tracking-[0.4em]">Stay updated with the world of Toyota</p>
          </div>
        </div>
      </section>

      <section className="section-large">
        <div className="main-container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {articles.map((article) => (
              <div key={article.title} className="premium-card group cursor-pointer flex flex-col h-full">
                <div className="aspect-[4/3] overflow-hidden bg-gray-100">
                  <img src={article.image} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" alt={article.title} />
                </div>
                <div className="p-10 flex flex-col flex-1">
                  <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-gray-400 mb-4">
                    <span className="text-[#ff2b2b] bg-[#fff5f5] px-3 py-1 rounded-full">{article.category}</span>
                    <span>{article.date}</span>
                  </div>
                  <h3 className="text-xl font-black uppercase tracking-tight text-gray-900 group-hover:text-[#ff2b2b] transition-colors mb-4 leading-tight">
                    {article.title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed line-clamp-3 mb-8 flex-1">
                    Delve into the engineering marvels and historical milestones that define the legendary Toyota legacy across the globe.
                  </p>
                  <div className="text-xs font-bold uppercase tracking-[0.3em] text-gray-900 border-b-2 border-transparent group-hover:border-[#ff2b2b] pb-1 inline-block transition-all">
                    Read Article
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
