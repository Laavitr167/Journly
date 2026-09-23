import { notFound } from 'next/navigation';
import { getTrip } from '@/lib/tripStore';
import { Itinerary } from '@/types/itinerary';
import TripPageContent from '@/components/TripPageContent';

export default async function TripPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const itinerary = getTrip(id) as Itinerary | undefined;

  if (!itinerary) {
    notFound();
  }

  return <TripPageContent itinerary={itinerary} />;
}