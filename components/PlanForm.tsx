'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function PlanForm() {
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
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 bg-white/80 dark:bg-border/20 rounded-2xl p-8 backdrop-blur-sm border border-border/20">
      <div className="space-y-4">
        <label className="block text-lg font-semibold text-text">
          Destination
        </label>
        <input
          type="text"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          required
          className="mt-2 block w-full rounded-xl border border-border/30 bg-background/50 px-6 py-4 text-text placeholder-text-light/60 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary dark:focus:border-primary/40 transition-all duration-300"
          placeholder="e.g., Paris, France"
        />
      </div>

      <div className="space-y-4">
        <label className="block text-lg font-semibold text-text">
          Number of Days
        </label>
        <input
          type="number"
          value={days}
          onChange={(e) => setDays(e.target.value)}
          min="1"
          max="14"
          required
          className="mt-2 block w-full rounded-xl border border-border/30 bg-background/50 px-6 py-4 text-text placeholder-text-light/60 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary dark:focus:border-primary/40 transition-all duration-300"
        />
      </div>

      <div className="space-y-4">
        <label className="block text-lg font-semibold text-text">
          Budget Tier
        </label>
        <div className="mt-2 grid gap-3">
          {(['budget', 'mid', 'luxury'] as const).map((b) => (
            <button
              key={b}
              type="button"
              onClick={() => setBudget(b)}
              className={`flex-1 rounded-xl px-4 py-3 font-medium text-text border border-border/30 bg-background/50 hover:bg-primary/10 hover:border-primary/20 transition-all duration-300 ${
                budget === b ? 'bg-primary/20 text-primary font-semibold border-primary' : ''
              }`}
            >
              {b.charAt(0).toUpperCase() + b.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <label className="block text-lg font-semibold text-text">
          Pace
        </label>
        <div className="mt-2 grid gap-3">
          {(['relaxed', 'packed'] as const).map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => setPace(p)}
              className={`flex-1 rounded-xl px-4 py-3 font-medium text-text border border-border/30 bg-background/50 hover:bg-primary/10 hover:border-primary/20 transition-all duration-300 ${
                pace === p ? 'bg-primary/20 text-primary font-semibold border-primary' : ''
              }`}
            >
              {p.charAt(0).toUpperCase() + p.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <label className="block text-lg font-semibold text-text">
          Interests
        </label>
        <div className="mt-2 flex flex-wrap gap-3">
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
                className={`rounded-xl px-4 py-2 font-medium text-text border border-border/30 bg-background/50 hover:bg-primary/10 hover:border-primary/20 transition-all duration-300 ${
                  selected ? 'bg-primary/20 text-primary font-semibold border-primary' : ''
                }`}
              >
                {interest}
              </button>
            );
          })}
        </div>
      </div>

      {error && (
        <div className="mt-4 rounded-xl px-6 py-4 bg-accent/10 border border-accent/20 text-accent-dark">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-xl px-8 py-4 font-semibold text-white bg-primary hover:bg-primary-dark transition-all duration-300 transform hover:-translate-y-1 shadow-md border border-primary/50 backdrop-blur-sm"
      >
        {loading ? (
          <>
            <span className="mr-3">Creating your trip...</span>
            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" aria-hidden="true">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
            </svg>
          </>
        ) : (
          'Create Trip'
        )}
      </button>
    </form>
  );
}