import type { Metadata } from "next";
import "./globals.css";
import { cormorant, openSans } from "./fonts";
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { AuthProvider } from '@/lib/auth';
import { siteUrl, siteName, siteDescription } from '@/lib/site';

export const metadata: Metadata = {
  metadataBase: siteUrl,
  title: {
    default: 'Journly - AI Trip Planner with Itinerary and Map',
    template: '%s | Journly',
  },
  description: siteDescription,
  applicationName: siteName,
  openGraph: {
    type: 'website',
    siteName: siteName,
    title: {
      default: 'Journly - AI Trip Planner with Itinerary and Map',
      template: '%s | Journly',
    },
    description: siteDescription,
    images: [
      {
        url: `${siteUrl}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: 'Journly - Pick a destination and a budget. Get a full trip plan.',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    creator: '@Lavi1212216',
    images: [
      {
        url: `${siteUrl}/twitter-image`,
        width: 1200,
        height: 630,
        alt: 'Journly - Pick a destination and a budget. Get a full trip plan.',
      },
    ],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full">
      <body className={`${cormorant.variable} ${openSans.variable} antialiased min-h-flex flex-col`}>
        <AuthProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}