const fs = require('fs');
const path = require('path');

const baseDir = path.join(__dirname, 'app');

const pagesToCreate = [
  // Categories (To override [slug])
  { path: 'vehicles/suv', title: 'SUV Collection' },
  { path: 'vehicles/sedan', title: 'Premium Sedans' },
  { path: 'vehicles/hatchback', title: 'Hatchbacks' },
  { path: 'vehicles/hybrid', title: 'Hybrid Fleet' },
  { path: 'vehicles/electric', title: 'Electric Vehicles' },
  { path: 'vehicles/luxury', title: 'Luxury Collection' },
  
  // Branches
  { path: 'branches', title: 'Our Branches' },
  { path: 'branches/[branch]', title: 'Branch Details' }, // Dynamic route handles all branches!
  
  // Service Sub-pages
  { path: 'service/book-service', title: 'Book a Service' },
  { path: 'parts-accessories', title: 'Genuine Parts & Accessories' },
  { path: 'insurance-finance', title: 'Insurance & Finance' },
  
  // Trust Pages
  { path: 'about', title: 'About Laxmi Toyota' },
  { path: 'why-choose-us', title: 'Why Choose Us' },
  { path: 'reviews', title: 'Customer Reviews' },
  { path: 'gallery', title: 'Vehicle Gallery' },
  { path: 'careers', title: 'Careers at Laxmi Toyota' },
  
  // Support
  { path: 'faqs', title: 'Frequently Asked Questions' },
  
  // Legal
  { path: 'privacy-policy', title: 'Privacy Policy' },
  { path: 'terms-and-conditions', title: 'Terms and Conditions' },
  { path: 'refund-policy', title: 'Cancellation & Refund Policy' },
  { path: 'disclaimer', title: 'Disclaimer' },
  
  // System
  { path: 'thank-you', title: 'Thank You' },
  // 404 and 500 are special in Next.js (not-found.js, error.js)
];

const generateTemplate = (title, route) => `
import Link from 'next/link';

export const metadata = {
  title: '${title}',
  description: 'Explore ${title} at Laxmi Toyota.',
};

export default function Page() {
  return (
    <div className="min-h-screen bg-[#f8f9fa] pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="bg-white p-12 md:p-20 rounded-[2.5rem] border border-gray-100 shadow-sm text-center">
          <div className="w-20 h-20 bg-red-50 text-[#ff2b2b] rounded-full flex items-center justify-center mx-auto mb-8">
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 uppercase italic mb-6">${title}</h1>
          <p className="text-gray-500 font-medium text-lg max-w-2xl mx-auto mb-10">
            This section is currently being updated with premium content. 
            Check back soon for the full experience.
          </p>
          <Link href="/" className="inline-block px-10 py-4 bg-[#ff2b2b] text-white font-bold rounded-xl uppercase tracking-widest hover:bg-black transition-all">
            Return to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
}
`;

pagesToCreate.forEach(page => {
  const fullPath = path.join(baseDir, page.path);
  if (!fs.existsSync(fullPath)) {
    fs.mkdirSync(fullPath, { recursive: true });
  }
  
  const filePath = path.join(fullPath, 'page.js');
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, generateTemplate(page.title, page.path));
    console.log(`Created: ${page.path}`);
  } else {
    console.log(`Exists: ${page.path}`);
  }
});

// Also create Next.js custom not-found.js and error.js
const notFoundTemplate = `
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center text-center p-6">
      <div className="space-y-6">
        <h1 className="text-8xl font-black text-[#ff2b2b] italic">404</h1>
        <h2 className="text-2xl font-bold uppercase tracking-widest">Route Not Found</h2>
        <p className="text-gray-400 max-w-md mx-auto">The vehicle or page you are looking for has been moved or doesn't exist.</p>
        <div className="pt-4">
          <Link href="/" className="px-8 py-4 bg-white text-black font-bold rounded-xl uppercase tracking-widest hover:bg-[#ff2b2b] hover:text-white transition-all inline-block">
            Back to Showroom
          </Link>
        </div>
      </div>
    </div>
  );
}
`;

if (!fs.existsSync(path.join(baseDir, 'not-found.js'))) {
  fs.writeFileSync(path.join(baseDir, 'not-found.js'), notFoundTemplate);
}

const errorTemplate = `
'use client';
import { useEffect } from 'react';

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center text-center p-6">
      <div className="space-y-6 max-w-md">
        <div className="w-20 h-20 bg-red-100 text-[#ff2b2b] rounded-full flex items-center justify-center mx-auto">
          <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold uppercase tracking-widest text-gray-900">System Error</h2>
        <p className="text-gray-500">Something went wrong while processing your request.</p>
        <button onClick={() => reset()} className="px-8 py-4 bg-gray-900 text-white font-bold rounded-xl uppercase tracking-widest hover:bg-[#ff2b2b] transition-all">
          Try Again
        </button>
      </div>
    </div>
  );
}
`;

if (!fs.existsSync(path.join(baseDir, 'error.js'))) {
  fs.writeFileSync(path.join(baseDir, 'error.js'), errorTemplate);
}

console.log('Scaffolding complete!');
