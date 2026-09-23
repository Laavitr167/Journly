export interface Itinerary {
  destination: string;
  days: {
    day: number;
    theme: string;
    activities: {
      time: string;
      title: string;
      description: string;
      type: 'sightseeing' | 'food' | 'activity';
      place?: {
        lat: number;
        lng: number;
        display_name: string;
      };
    }[];
  }[];
}