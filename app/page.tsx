import Link from 'next/link';
import AuthButton from '@/components/AuthButton';
import JsonLd from '@/components/JsonLd';

export async function generateMetadata() {
  return {
    title: 'Journly - AI Trip Planner with Interactive Maps',
    description: 'Create personalized AI-powered trip itineraries with day-by-day plans, interactive maps, and save your favorite journeys. Plan your perfect adventure in minutes.',
    alternates: {
      canonical: '/',
    },
  };
}

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-primary/50">
      {/* JsonLd for homepage */}
      <JsonLd />

      {/* Hero Section */}
      <section className="flex-1 flex-col items-center justify-center px-6 py-12 text-center">
        <div className="mx-auto max-w-2xl">
          <h1 className="text-5xl font-bold tracking-tighter text-text mb-6 drop-shadow-md">
            Journly
          </h1>
          <p className="text-xl font-light text-text-light mb-8">
            Your AI-powered travel journal companion<br />
            Create unforgettable journeys with personalized itineraries
          </p>
          <Link href="/plan">
            <button className="px-8 py-3 bg-primary hover:bg-primary-dark text-white font-medium rounded-xl
                    transition-all duration-300 transform hover:-translate-y-1 shadow-md
                    border border-primary/50 backdrop-blur-sm">
              Plan your trip
            </button>
          </Link>
        </div>
      </section>

      {/* How it works section */}
      <section className="py-12 bg-background-dark/50">
        <h2 className="text-3xl font-bold tracking-tighter text-text mb-10">
          How it works
        </h2>
        <div className="grid gap-8 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Step 1 */}
            <div className="flex flex-col items-center space-y-4">
              <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center">
                <span className="text-2xl font-bold text-primary">01</span>
              </div>
              <h3 className="text-xl font-semibold text-text">Pick destination & budget</h3>
              <p className="text-center text-text-light max-w-md">
                Tell us where you want to go and your budget for the trip.
              </p>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col items-center space-y-4">
              <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center">
                <span className="text-2xl font-bold text-primary">02</span>
              </div>
              <h3 className="text-xl font-semibold text-text">AI generates itinerary</h3>
              <p className="text-center text-text-light max-w-md">
                Get a complete day-by-day plan with attractions, restaurants, and activities tailored to your preferences.
              </p>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col items-center space-y-4">
              <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center">
                <span className="text-2xl font-bold text-primary">03</span>
              </div>
              <h3 className="text-xl font-semibold text-text">Save and revisit</h3>
              <p className="text-center text-text-light max-w-md">
                Sign in with Google to save your trips and come back to them anytime.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features section */}
      <section className="py-12">
        <h2 className="text-3xl font-bold tracking-tighter text-text mb-10">
          Features
        </h2>
        <div className="grid gap-6 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Feature 1 */}
            <div className="bg-white/80 dark:bg-border/20 rounded-2xl p-6 flex flex-col items-center space-y-4 backdrop-blur-sm border border-border/20">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-2">
                <span className="text-xl font-bold text-primary">🗺️</span>
              </div>
              <h3 className="text-lg font-semibold text-text">AI-generated itineraries</h3>
              <p className="text-center text-text-light max-w-sm">
                Get personalized trip plans for any destination based on your budget and interests.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white/80 dark:bg-border/20 rounded-2xl p-6 flex flex-col items-center space-y-4 backdrop-blur-sm border border-border/20">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-2">
                <span className="text-xl font-bold text-primary">📅</span>
              </div>
              <h3 className="text-lg font-semibold text-text">Day-by-day schedule</h3>
              <p className="text-center text-text-light max-w-sm">
                Detailed daily plans with timing, locations, and activities for each day of your trip.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white/80 dark:bg-border/20 rounded-2xl p-6 flex flex-col items-center space-y-4 backdrop-blur-sm border border-border/20">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-2">
                <span className="text-xl font-bold text-primary">📍</span>
              </div>
              <h3 className="text-lg font-semibold text-text">Interactive maps</h3>
              <p className="text-center text-text-light max-w-sm">
                Visualize your entire itinerary on an interactive map powered by OpenStreetMap.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-white/80 dark:bg-border/20 rounded-2xl p-6 flex flex-col items-center space-y-4 backdrop-blur-sm border border-border/20">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-2">
                <span className="text-xl font-bold text-primary">💾</span>
              </div>
              <h3 className="text-lg font-semibold text-text">Save trips</h3>
              <p className="text-center text-text-light max-w-sm">
                Save your favorite trips to your account and access them anytime, anywhere.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to action section */}
      <section className="py-12 bg-primary/5">
        <h2 className="text-2xl font-bold tracking-tighter text-text mb-6">
          Ready to plan your next adventure?
        </h2>
        <p className="text-lg text-text-light mb-8 max-w-md">
          Join thousands of travelers who use Journly to create unforgettable trip experiences.
        </p>
        <div className="mx-auto max-w-md">
          <Link href="/plan">
            <button className="w-full px-8 py-3 bg-primary hover:bg-primary-dark text-white font-medium rounded-xl
                    transition-all duration-300 transform hover:-translate-y-1 shadow-md
                    border border-primary/50 backdrop-blur-sm">
              Start planning
            </button>
          </Link>
        </div>
      </section>

      {/* Auth buttons at the bottom */}
      <div className="mt-auto flex items-center justify-center px-4 py-8">
        <AuthButton />
      </div>
    </div>
  );
}