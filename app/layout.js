import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Script from 'next/script';

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
const PIXEL_ID = process.env.NEXT_PUBLIC_PIXEL_ID;

import { Inter } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
});

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'https://laxmitoyota.com'),
  alternates: {
    canonical: '/',
  },
  title: {
    default: 'Laxmi Toyota | Premium Dealership Bhubaneswar & Puri',
    template: '%s | Laxmi Toyota'
  },
  description: 'Experience excellence with Laxmi Toyota. Authorized dealer for Toyota vehicles in Bhubaneswar and Puri. Book online, schedule service, and explore the latest models.',
  keywords: ['Toyota Dealer Odisha', 'Laxmi Toyota', 'Bhubaneswar Toyota', 'Toyota Booking Online', 'Fortuner Bhubaneswar', 'Camry Hybrid Odisha'],
  authors: [{ name: 'Laxmi Toyota' }],
  openGraph: {
    title: 'Laxmi Toyota | Premium Automotive Experience',
    description: 'Bhubaneswar\'s leading Toyota dealership. Authorized sales, service, and genuine spares.',
    url: 'https://laxmitoyota.com',
    siteName: 'Laxmi Toyota',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1542362567-b052da132171?auto=format&fit=crop&q=80&w=1200',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Laxmi Toyota | Authorized Dealership',
    description: 'Discover the latest Toyota models and premium service at Laxmi Toyota.',
    images: ['https://images.unsplash.com/photo-1542362567-b052da132171?auto=format&fit=crop&q=80&w=1200'],
  },
  robots: {
    index: true,
    follow: true,
  }
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.className}>
      <body suppressHydrationWarning={true}>
        {/* Google Analytics 4 */}
        {GA_ID && (
          <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_ID}');
              `}
            </Script>
          </>
        )}

        {/* Meta Pixel */}
        {PIXEL_ID && (
          <Script id="meta-pixel" strategy="afterInteractive">
            {`
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '${PIXEL_ID}');
              fbq('track', 'PageView');
            `}
          </Script>
        )}

        {children}
        <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="beforeInteractive" />
      </body>
    </html>
  );
}
