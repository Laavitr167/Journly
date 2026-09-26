import { notFound } from 'next/navigation';
import { getTrip } from '@/lib/tripStore';
import { Itinerary } from '@/types/itinerary';
import TripPageContent from '@/components/TripPageContent';
import Breadcrumbs from '@/components/Breadcrumbs';

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const itinerary = getTrip(id) as Itinerary | undefined;

  if (!itinerary) {
    // If not found, we still return some metadata to avoid errors, but notFound will be thrown in the page
    return {
      title: 'Trip not found',
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  return {
    title: `${itinerary.destination} Trip Itinerary`,
    description: `View your AI-generated itinerary for ${itinerary.destination}. Explore day-by-day plans, interactive maps, and activity recommendations.`,
    robots: {
      index: false,
      follow: false,
    },
  };
}

export default async function TripPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const itinerary = getTrip(id) as Itinerary | undefined;

  if (!itinerary) {
    notFound();
  }

  return (
    <div>
      {/* Breadcrumbs */}
      <Breadcrumbs />

      {/* Trip content */}
      <TripPageContent itinerary={itinerary} />
    </div>
  );
}