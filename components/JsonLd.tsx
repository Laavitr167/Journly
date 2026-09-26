'use client';

import { usePathname } from 'next/navigation';
import { useMemo } from 'react';
import { siteName, siteUrl } from '@/lib/site';

export default function JsonLd() {
  const pathname = usePathname();

  // Only render on homepage
  const jsonLd = useMemo(() => {
    if (pathname !== '/') {
      return null;
    }

    return [
      {
        // WebSite schema
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: siteName,
        url: siteUrl,
        potentialAction: {
          '@type': 'SearchAction',
          target: `${siteUrl}/plan?search={search_term_string}`,
          'query-input': 'required name=search_term_string',
        },
      },
      {
        // WebApplication schema
        '@context': 'https://schema.org',
        '@type': 'WebApplication',
        name: siteName,
        url: siteUrl,
        applicationCategory: 'TravelApplication',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
          eligibility: {
            '@type': 'EligibilityRequirement',
            eligibilityCriteria: 'Anyone can use the application for free',
          },
        },
        description: 'AI-powered travel journal companion that creates personalized trip itineraries with interactive maps.',
      },
    ];
  }, [pathname]);

  if (!jsonLd) {
    return null;
  }

  return (
    <>
      {jsonLd.map((ld, index) => (
        <script key={index} type="application/ld+json">
          {JSON.stringify(ld)}
        </script>
      ))}
    </>
  );
}