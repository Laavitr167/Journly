'use client';

import { useEffect } from 'react';

export default function PlanError({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => {
    console.error('Plan error:', error);
  }, [error, reset]);

  return (
    <div className="flex min-h-[80vh] items-center justify-center">
      <div className="text-center space-y-6">
        <h2 className="text-xl font-bold text-red-600">Something went wrong</h2>
        <p className="text-gray-600">
          {error.message || 'Failed to generate your trip itinerary. Please try again.'}
        </p>
        <button
          onClick={reset}
          className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
        >
          Try again
        </button>
      </div>
    </div>
  );
}