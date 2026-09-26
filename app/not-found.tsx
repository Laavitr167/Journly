import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumbs';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Page not found - Journly',
  robots: {
    index: false,
    follow: false,
  },
};

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-indigo-50 to-blue-50 p-8">
      {/* Breadcrumbs */}
      <Breadcrumbs />

      <section className="text-center">
        <h1 className="text-5xl font-bold text-indigo-600 mb-4">
          Page not found
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <div className="max-w-md">
          <Link href="/" className="inline-block">
            <button className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors duration-200">
              Return to homepage
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
}