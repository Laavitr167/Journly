import { Itinerary } from '@/types/itinerary';
import fs from 'fs';
import path from 'path';

const DB_PATH = path.join(process.cwd(), 'data', 'trips.json');

function readTrips(): Record<string, Itinerary> {
  if (!fs.existsSync(DB_PATH)) return {};
  try {
    return JSON.parse(fs.readFileSync(DB_PATH, 'utf-8'));
  } catch (e) {
    console.error('Failed to parse trips.json', e);
    return {};
  }
}

function writeTrips(trips: Record<string, Itinerary>) {
  fs.mkdirSync(path.dirname(DB_PATH), { recursive: true });
  fs.writeFileSync(DB_PATH, JSON.stringify(trips, null, 2));
}

export function storeTrip(itinerary: Itinerary): string {
  const id = Math.random().toString(36).substring(2, 9);
  const trips = readTrips();
  trips[id] = itinerary;
  writeTrips(trips);
  return id;
}

export function getTrip(id: string): Itinerary | undefined {
  return readTrips()[id];
}

export function clearTrip(id: string) {
  const trips = readTrips();
  if (trips[id]) {
    delete trips[id];
    writeTrips(trips);
  }
}