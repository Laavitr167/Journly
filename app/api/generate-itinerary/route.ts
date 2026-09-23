import { NextResponse } from 'next/server';
import { generateItinerary } from '@/lib/gemini';
import { storeTrip } from '@/lib/tripStore';
import { enrichItinerary } from '@/lib/places';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { destination, days, budget, pace, interests } = body;

    // Validate input
    if (!destination || !days || !budget || !pace || !interests) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    if (days < 1 || days > 14) {
      return NextResponse.json(
        { error: 'Days must be between 1 and 14' },
        { status: 400 }
      );
    }

    const itinerary = await generateItinerary({
      destination,
      budget: budget as 'budget' | 'mid' | 'luxury',
      days: Number(days),
      pace: pace as 'relaxed' | 'packed',
      interests: interests as string[],
    });

    // Enrich with geographic coordinates from OpenStreetMap
    const enrichedItinerary = await enrichItinerary(itinerary);

    // Store the itinerary and get an ID
    const id = storeTrip(enrichedItinerary);

    return NextResponse.json({ id });
  } catch (error) {
    console.error('Error generating itinerary:', error);
    return NextResponse.json(
      { error: 'Failed to generate itinerary' },
      { status: 500 }
    );
  }
}