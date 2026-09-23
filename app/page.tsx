import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-indigo-50 to-blue-50 p-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-indigo-600 mb-6">
          Journly
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Your travel journal companion
        </p>
        <Link href="/plan">
          <button className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors duration-200">
            Plan a trip
          </button>
        </Link>
      </div>
    </div>
  );
}