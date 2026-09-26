import PlanForm from '@/components/PlanForm';
import Breadcrumbs from '@/components/Breadcrumbs';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Plan Your Trip - AI Itinerary Generator',
  description: 'Create personalized AI-powered trip itineraries in minutes. Choose your destination, budget, pace, and interests to generate a custom day-by-day plan with interactive maps and activity recommendations.',
  alternates: {
    canonical: 'http://localhost:3000/plan',
  },
};

export default function PlanPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-primary/50">
      {/* Breadcrumbs */}
      <Breadcrumbs />

      <div className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold tracking-tighter text-text mb-8">
          Plan Your Trip
        </h1>
        <PlanForm />
      </div>
    </div>
  );
}