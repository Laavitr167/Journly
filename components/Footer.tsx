import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6 flex flex-col sm:flex-row sm:justify-between sm:items-center">
          <div className="text-center sm:text-left">
            <span className="text-sm text-gray-500 dark:text-gray-400">
              &copy; {new Date().getFullYear()} Journly. All rights reserved.
            </span>
          </div>
          <nav className="mt-4 sm:mt-0 space-x-4">
            <Link href="/" className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400">
              Home
            </Link>
            <Link href="/plan" className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400">
              Plan Trip
            </Link>
          </nav>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-700 mt-8 pt-6">
          <p className="text-center text-sm text-gray-500 dark:text-gray-400">
            AI-powered travel journal companion that creates personalized trip itineraries with interactive maps.
          </p>
        </div>
      </div>
    </footer>
  );
}