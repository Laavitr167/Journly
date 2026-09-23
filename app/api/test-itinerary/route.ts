import { NextResponse } from 'next/server';
import { generateItinerary } from '@/lib/gemini';

export async function GET() {
  try {
    const sampleInput = {
      destination: 'Paris, France',
      budget: 'mid' as const,
      days: 3,
      pace: 'relaxed' as const,
      interests: ['food', 'culture', 'history'],
    };

    const itinerary = await generateItinerary(sampleInput);
    return NextResponse.json(itinerary);
  } catch (error) {
    console.error('Error generating itinerary:', error);
    return NextResponse.json(
      { error: 'Failed to generate itinerary' },
      { status: 500 }
    );
  }
}