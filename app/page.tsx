import JsonLd from '@/components/JsonLd';
import ClientHero from '@/components/ClientHero';
import ClientHowItWorks from '@/components/ClientHowItWorks';
import ClientFeatures from '@/components/ClientFeatures';
import ClientCTA from '@/components/ClientCTA';

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

      <ClientHero />
      <ClientHowItWorks />
      <ClientFeatures />
      <ClientCTA />

      {/* Auth buttons at the bottom - removed duplicate */}
    </div>
  );
}