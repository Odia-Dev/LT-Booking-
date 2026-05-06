import connectDB from '@/lib/db';
import Vehicle from '@/models/Vehicle';
import { BRANCHES } from '@/constants/branches';

const blogSlugs = [
  'best-suv-in-odisha',
  'hybrid-vs-petrol-odisha',
  'toyota-hybrid-mileage-guide'
];

export default async function sitemap() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://laxmitoyota.com';

  // Core Pages
  const corePages = [
    '',
    '/vehicles',
    '/offers',
    '/insurance-finance',
    '/service',
    '/branches',
    '/blog',
    '/about',
    '/contact',
    '/book-online',
    '/parts-accessories',
    '/why-choose-us',
    '/reviews',
    '/gallery',
    '/careers',
    '/faqs',
    '/privacy-policy',
    '/terms-and-conditions',
    '/refund-policy',
    '/disclaimer'
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 1,
  }));

  // Vehicle Pages
  let vehiclePages = [];
  try {
    await connectDB();
    const vehicles = await Vehicle.find({ available: true }).lean();
    vehiclePages = vehicles.map((v) => ({
      url: `${baseUrl}/vehicles/${v.slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    }));
  } catch (e) {
    console.error("Sitemap: Failed to fetch vehicles", e);
  }

  // Branch Pages
  const branchPages = BRANCHES.map((b) => ({
    url: `${baseUrl}/branches/${b.name.toLowerCase()}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  // Blog Pages
  const blogPages = blogSlugs.map((slug) => ({
    url: `${baseUrl}/blog/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  // Vehicle Category Pages
  const categories = ['suv', 'sedan', 'hatchback', 'hybrid', 'electric', 'luxury'];
  const categoryPages = categories.map((cat) => ({
    url: `${baseUrl}/vehicles/${cat}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  return [...corePages, ...vehiclePages, ...branchPages, ...blogPages, ...categoryPages];
}
