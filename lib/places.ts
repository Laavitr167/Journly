import { Itinerary } from '../types/itinerary';

// Helper to delay execution
const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Enrich an itinerary with geographic coordinates using Nominatim (OpenStreetMap)
 * Processes activities sequentially to respect rate limit of 1 request/second
 */
export async function enrichItinerary(itinerary: Itinerary): Promise<Itinerary> {
  // Create a deep copy to avoid mutating the original
  const enriched = JSON.parse(JSON.stringify(itinerary)) as Itinerary;

  // Set a descriptive User-Agent as required by Nominatim
  const userAgent = 'Journly/1.0 (https://journly.app; contact@example.com)';

  // Iterate through each day and each activity
  for (const day of enriched.days) {
    for (const activity of day.activities) {
      // Only attempt to geocode activities with a title (place name)
      if (!activity.title?.trim()) {
        continue;
      }

      try {
        // Construct query: place name + destination for better accuracy
        const query = `${activity.title.trim()}, ${itinerary.destination}`;
        const url = new URL('https://nominatim.openstreetmap.org/search');
        url.searchParams.set('q', query);
        url.searchParams.set('format', 'json');
        url.searchParams.set('limit', '1'); // We only need the best result

        const response = await fetch(url.toString(), {
          headers: {
            'User-Agent': userAgent,
            'Accept-Language': 'en',
          },
        });

        if (!response.ok) {
          throw new Error(`Nominatim request failed: ${response.status}`);
        }

        const data = await response.json();

        if (Array.isArray(data) && data.length > 0) {
          const place = data[0];
          // Validate that we have lat/lon
          if (place.lat && place.lon) {
            activity.place = {
              lat: parseFloat(place.lat),
              lng: parseFloat(place.lon),
              display_name: place.display_name,
            };
          }
        }
        // If no results, place remains undefined
      } catch (error) {
        console.warn(`Failed to geocode "${activity.title}":`, error);
        // Continue without setting place
      }

      // Respect rate limit: wait 1.5 seconds between requests to be safe
      // Skip delay after the last activity
      const isLastActivity =
        day.activities.indexOf(activity) === day.activities.length - 1 &&
        enriched.days.indexOf(day) === enriched.days.length - 1;
      if (!isLastActivity) {
        await sleep(1500);
      }
    }
  }

  return enriched;
}