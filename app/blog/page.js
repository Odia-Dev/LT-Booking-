import Link from 'next/link';
import Image from 'next/image';

const blogPosts = [
  {
    slug: 'best-suv-in-odisha',
    title: 'Best SUV in Odisha: Why Toyota Leads the Market',
    description: 'Discover why the Toyota Fortuner and Hyryder are the top-selling SUVs in Odisha, offering unmatched power and reliability.',
    date: 'May 1, 2026',
    category: 'Guide',
    image: 'https://images.unsplash.com/photo-1542362567-b052da132171?auto=format&fit=crop&q=80&w=1000'
  },
  {
    slug: 'hybrid-vs-petrol-odisha',
    title: 'Hybrid vs Petrol: Which is Right for Odisha Roads?',
    description: 'Comparing Toyota Strong Hybrid technology with traditional petrol engines. Save up to 50% on fuel in city traffic.',
    date: 'April 28, 2026',
    category: 'Technology',
    image: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&q=80&w=1000'
  },
  {
    slug: 'toyota-hybrid-mileage-guide',
    title: 'Toyota Hybrid Mileage: Real World Test Results',
    description: 'We test the Innova Hycross and Hyryder on the streets of Brahmapur. See the incredible 27.97 km/l in action.',
    date: 'April 25, 2026',
    category: 'Mileage',
    image: 'https://images.unsplash.com/photo-1590362891991-f776e747a588?auto=format&fit=crop&q=80&w=1000'
  }
];

export default function BlogPage() {
  return (
    <div className="bg-[#f8f9fa] min-h-screen pt-32 pb-20">
      <div className="main-container">
        
        {/* Header */}
        <div className="text-center mb-20 space-y-4">
          <span className="text-[#ff2b2b] text-[10px] font-black uppercase tracking-[0.4em]">The Laxmi Journal</span>
          <h1 className="text-4xl md:text-6xl font-black text-gray-900 uppercase italic">Insights & <span className="text-[#ff2b2b]">Heritage</span></h1>
          <p className="text-gray-500 max-w-2xl mx-auto font-medium">Stay updated with the latest Toyota technology, local ownership guides, and automotive news in Odisha.</p>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {blogPosts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="group bg-white rounded-[2.5rem] border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-500">
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image 
                  src={post.image} 
                  fill 
                  className="object-cover transition-transform duration-700 group-hover:scale-110" 
                  alt={post.title} 
                />
                <div className="absolute top-6 left-6">
                  <span className="bg-white/90 backdrop-blur text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-full text-gray-900 shadow-sm">
                    {post.category}
                  </span>
                </div>
              </div>
              <div className="p-10 space-y-4">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{post.date}</p>
                <h3 className="text-xl font-black uppercase tracking-tight text-gray-900 leading-tight group-hover:text-[#ff2b2b] transition-colors">
                  {post.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed line-clamp-2">
                  {post.description}
                </p>
                <div className="pt-4 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-900">
                  Read Article <span className="text-[#ff2b2b] translate-x-0 group-hover:translate-x-2 transition-transform">→</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* AI & Internal Links Section */}
        <div className="mt-24 pt-16 border-t border-gray-200 grid grid-cols-1 md:grid-cols-4 gap-8">
           <div className="space-y-4">
             <h4 className="text-xs font-black uppercase tracking-widest text-gray-900">Vehicle Guides</h4>
             <ul className="space-y-2 text-sm text-gray-500 font-medium">
               <li><Link href="/vehicles/suv" className="hover:text-[#ff2b2b]">SUV Buying Guide</Link></li>
               <li><Link href="/vehicles/hybrid" className="hover:text-[#ff2b2b]">Hybrid Mileage Tips</Link></li>
               <li><Link href="/insurance-finance" className="hover:text-[#ff2b2b]">EMI Calculation Guide</Link></li>
             </ul>
           </div>
           <div className="space-y-4">
             <h4 className="text-xs font-black uppercase tracking-widest text-gray-900">Service Advice</h4>
             <ul className="space-y-2 text-sm text-gray-500 font-medium">
               <li><Link href="/service/book-service" className="hover:text-[#ff2b2b]">Periodic Maintenance</Link></li>
               <li><Link href="/parts-accessories" className="hover:text-[#ff2b2b]">Genuine Accessories</Link></li>
               <li><Link href="/service" className="hover:text-[#ff2b2b]">AC Checkup Guide</Link></li>
             </ul>
           </div>
           <div className="md:col-span-2 bg-gray-900 rounded-3xl p-8 text-white flex items-center justify-between">
             <div className="space-y-2">
               <h3 className="text-xl font-black uppercase italic">Need Expert Advice?</h3>
               <p className="text-gray-400 text-xs">Our consultants are ready to help you choose.</p>
             </div>
             <Link href="/contact" className="px-8 py-4 bg-[#ff2b2b] text-white font-black uppercase tracking-widest rounded-xl hover:bg-white hover:text-black transition-all">
               Call Us
             </Link>
           </div>
        </div>

      </div>
    </div>
  );
}
