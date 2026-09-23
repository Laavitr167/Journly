'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function PlanPage() {
  const [destination, setDestination] = useState('');
  const [days, setDays] = useState('');
  const [budget, setBudget] = useState<'budget' | 'mid' | 'luxury'>('mid');
  const [pace, setPace] = useState<'relaxed' | 'packed'>('relaxed');
  const [interests, setInterests] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const allInterests = ['food', 'culture', 'nature', 'nightlife', 'shopping', 'adventure'];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch('/api/generate-itinerary', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          destination,
          days: Number(days),
          budget,
          pace,
          interests,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Failed to generate itinerary');
      }

      const data = await res.json();
      const { id } = data;

      // Redirect to trip page
      router.push(`/trip/${id}`);
    } catch (err: any) {
      setError(err.message || 'An unknown error occurred');
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-6">
        <div className="max-w-xl mx-auto">
          <h1 className="text-2xl font-bold mb-6">Creating your trip...</h1>
          <div className="space-y-4">
            <p className="text-gray-600 dark:text-gray-400">Finding the best spots...</p>
            <p className="text-gray-600 dark:text-gray-400">Checking local food spots...</p>
            <p className="text-gray-600 dark:text-gray-400">Mapping out adventure routes...</p>
            <p className="text-gray-600 dark:text-gray-400">Finalizing your perfect itinerary...</p>
          </div>
          <div className="mt-8 flex justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-6">
      <div className="max-w-xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Plan Your Trip</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">Destination</label>
            <input
              type="text"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-gray-100"
              placeholder="e.g., Paris, France"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Number of Days</label>
            <input
              type="number"
              value={days}
              onChange={(e) => setDays(e.target.value)}
              min="1"
              max="14"
              required
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-gray-100"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Budget Tier</label>
            <div className="flex space-x-3">
              {['budget', 'mid', 'luxury'].map((b) => (
                <button
                  key={b}
                  type="button"
                  onClick={() => setBudget(b as any)}
                  className={`px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm ${budget === b ? 'bg-blue-600 text-white' : 'bg-white dark:bg-gray-800 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
                >
                  {b.charAt(0).toUpperCase() + b.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Pace</label>
            <div className="flex space-x-3">
              {['relaxed', 'packed'].map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setPace(p as any)}
                  className={`px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm ${pace === p ? 'bg-blue-600 text-white' : 'bg-white dark:bg-gray-800 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
                >
                  {p.charAt(0).toUpperCase() + p.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Interests</label>
            <div className="flex flex-wrap gap-2">
              {allInterests.map((interest) => {
                const selected = interests.includes(interest);
                return (
                  <button
                    key={interest}
                    type="button"
                    onClick={() => {
                      setInterests(
                        selected
                          ? interests.filter((i) => i !== interest)
                          : [...interests, interest]
                      );
                    }}
                    className={`px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-full text-xs ${selected ? 'bg-blue-600 text-white' : 'bg-white dark:bg-gray-800 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
                  >
                    {interest}
                  </button>
                );
              })}
            </div>
          </div>

          {error && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 px-4 py-2 rounded-md">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {loading ? (
              <>
                <span className="mr-2">Generating...</span>
                <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
                </svg>
              </>
            ) : (
              'Create Trip'
            )}
          </button>
        </form>
      </div>
    </div>
  );
}