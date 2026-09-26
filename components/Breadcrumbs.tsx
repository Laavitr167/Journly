'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useMemo } from 'react';

export default function Breadcrumbs() {
  const pathname = usePathname();

  // Define breadcrumb items based on pathname
  const breadcrumbItems = useMemo(() => {
    const items: { label: string; href: string }[] = [
      { label: 'Home', href: '/' },
    ];

    if (pathname === '/') {
      return []; // No breadcrumbs for homepage
    }

    if (pathname.startsWith('/plan')) {
      items.push({ label: 'Plan Trip', href: '/plan' });

      if (pathname !== '/plan') {
        // This is a trip page
        items.push({ label: 'Trip Details', href: pathname });
      }
    } else if (pathname.startsWith('/trip/')) {
      items.push({ label: 'Plan Trip', href: '/plan' });
      items.push({ label: 'Trip Details', href: pathname });
    }
    // Add more pathname-based breadcrumbs as needed

    return items;
  }, [pathname]);

  // Generate JSON-LD for BreadcrumbList
  const breadcrumbJsonLd = useMemo(() => {
    if (breadcrumbItems.length <= 1) return null; // Only home or empty

    const items = breadcrumbItems.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.label,
      item: item.href,
    }));

    return {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: items,
    };
  }, [breadcrumbItems]);

  return (
    <>
      {/* Visible breadcrumbs */}
      <nav aria-label="Breadcrumb" className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400 px-4 py-2">
        {breadcrumbItems.map((item, index) => (
          <>
            {index > 0 && (
              <span className="mx-2">/</span>
            )}
            <Link href={item.href} className="hover:text-indigo-600 dark:hover:text-indigo-400">
              {item.label}
            </Link>
          </>
        ))}
      </nav>

      {/* JSON-LD script */}
      {breadcrumbJsonLd && (
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbJsonLd)}
        </script>
      )}
    </>
  );
}