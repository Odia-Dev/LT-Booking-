import Image from 'next/image';
import Link from 'next/link';

const getBlogPost = (slug) => {
  const posts = {
    'best-suv-in-odisha': {
      title: 'Best SUV in Odisha: Why Toyota Leads the Market',
      description: 'Discover why the Toyota Fortuner and Hyryder are the top-selling SUVs in Odisha, offering unmatched power and reliability.',
      content: `Toyota has long been synonymous with reliability in Odisha. Whether it's the rugged terrains of Rayagada or the coastal roads of Brahmapur, Toyota SUVs are built to last. The Fortuner continues to dominate the premium SUV segment with its 4x4 capabilities and commanding presence. Meanwhile, the Urban Cruiser Hyryder has revolutionized the mid-size segment with its Strong Hybrid technology, providing luxury and efficiency in one package.`,
      image: 'https://images.unsplash.com/photo-1542362567-b052da132171?auto=format&fit=crop&q=80&w=1440',
      category: 'Guide',
      date: 'May 1, 2026',
      faqs: [
        { q: "Which is the most popular Toyota SUV in Odisha?", a: "The Toyota Fortuner remains the undisputed leader in the premium SUV segment in Odisha due to its high resale value and off-road prowess." },
        { q: "Are Toyota SUVs good for hilly areas like Rayagada?", a: "Yes, models like the Fortuner and Hilux are specifically engineered for challenging terrains, offering high ground clearance and powerful torque." }
      ],
      relatedVehicles: ['toyota-fortuner', 'toyota-urban-cruiser-hyryder']
    },
    'hybrid-vs-petrol-odisha': {
       title: 'Hybrid vs Petrol: Which is Right for Odisha Roads?',
       description: 'Comparing Toyota Strong Hybrid technology with traditional petrol engines for Odisha customers.',
       content: `The automotive landscape is changing, and Odisha is at the forefront. Toyota's Strong Hybrid technology offers the best of both worlds: the power of a petrol engine and the efficiency of an electric motor. For city driving in busy areas like Bargarh or Balangir, the hybrid system operates predominantly in EV mode, slashing fuel bills significantly.`,
       image: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&q=80&w=1440',
       category: 'Technology',
       date: 'April 28, 2026',
       faqs: [
         { q: "Does a Toyota Hybrid need external charging?", a: "No, Toyota Strong Hybrids are self-charging. They charge while you drive through regenerative braking and engine output." },
         { q: "What is the battery warranty for Toyota Hybrids?", a: "Toyota offers an industry-leading 8-year/1,60,000 km warranty on its hybrid batteries." }
       ],
       relatedVehicles: ['toyota-innova-hycross', 'toyota-urban-cruiser-hyryder', 'toyota-camry']
    }
  };
  return posts[slug] || null;
};

export async function generateMetadata({ params }) {
  const post = getBlogPost(params.slug);
  if (!post) return { title: 'Blog Not Found' };
  
  return {
    title: `${post.title} | Laxmi Toyota Blog`,
    description: post.description,
  };
}

export default function BlogPost({ params }) {
  const post = getBlogPost(params.slug);

  if (!post) return <div className="pt-40 text-center">Article not found</div>;

  // FAQ Schema for AI Optimization (Phase 9)
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": post.faqs.map(faq => ({
      "@type": "Question",
      "name": faq.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.a
      }
    }))
  };

  return (
    <article className="bg-white min-h-screen pt-32 pb-32">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      
      <div className="max-w-4xl mx-auto px-6">
        
        {/* Meta & Title */}
        <header className="mb-12 space-y-6">
          <div className="flex items-center gap-4">
             <span className="bg-[#ff2b2b] text-white text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-full">{post.category}</span>
             <span className="text-gray-400 text-[10px] font-bold uppercase tracking-widest">{post.date}</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-gray-900 uppercase italic leading-tight">
            {post.title}
          </h1>
          <p className="text-gray-500 text-xl font-medium leading-relaxed">
            {post.description}
          </p>
        </header>

        {/* Featured Image */}
        <div className="relative aspect-[21/9] rounded-[2.5rem] overflow-hidden mb-16 shadow-2xl">
          <Image src={post.image} fill className="object-cover" alt={post.title} />
        </div>

        {/* Content Section */}
        <div className="prose prose-lg max-w-none text-gray-700 leading-loose mb-20">
          {post.content.split('\n').map((p, i) => (
            <p key={i} className="mb-6">{p}</p>
          ))}
        </div>

        {/* FAQ Section (Phase 8 & 9) */}
        <section className="bg-gray-50 p-12 rounded-[2.5rem] mb-20">
          <h2 className="text-2xl font-black uppercase italic mb-8 flex items-center gap-4">
            <span className="w-12 h-1 bg-[#ff2b2b]"></span> Frequently Asked Questions
          </h2>
          <div className="space-y-8">
            {post.faqs.map((faq, i) => (
              <div key={i} className="space-y-2">
                <h4 className="text-lg font-black text-gray-900">Q: {faq.q}</h4>
                <p className="text-gray-600 font-medium">A: {faq.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Related Vehicles (Phase 8) */}
        <section className="border-t border-gray-100 pt-16">
          <h3 className="text-xs font-black uppercase tracking-[0.3em] text-gray-400 mb-10 text-center">Featured Vehicles in this Article</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {post.relatedVehicles.map(v => (
              <Link key={v} href={`/vehicles/${v}`} className="p-6 bg-white border border-gray-100 rounded-3xl text-center group hover:border-[#ff2b2b] hover:shadow-xl transition-all">
                 <p className="text-xs font-black uppercase tracking-widest text-gray-900 group-hover:text-[#ff2b2b]">{v.split('-').slice(1).join(' ')}</p>
                 <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-2 block group-hover:underline">Explore Details →</span>
              </Link>
            ))}
          </div>
        </section>

      </div>
    </article>
  );
}
