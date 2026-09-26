'use client';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix Leaflet's icon loading issue
import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png';
import iconUrl from 'leaflet/dist/images/marker-icon.png';
import shadowUrl from 'leaflet/dist/images/marker-shadow.png';

L.Icon.Default.mergeOptions({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
});

type Place = {
  lat: number;
  lng: number;
  display_name: string;
};

type TripMapProps = {
  places: Array<{ place: Place; title: string; time: string }>;
};

export default function TripMap({ places }: TripMapProps) {
  if (places.length === 0) {
    return <p className="text-center text-gray-500">No locations to display</p>;
  }

  // Calculate center as average of all coordinates
  const centerLat =
    places.reduce((sum, p) => sum + p.place.lat, 0) / places.length;
  const centerLng =
    places.reduce((sum, p) => sum + p.place.lng, 0) / places.length;

  return (
    <MapContainer
      center={[centerLat, centerLng]}
      zoom={13}
      scrollWheelZoom={false}
      className="h-96 w-full rounded-lg"
      style={{ height: '400px' }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {places.map((p, index) => (
        <Marker key={index} position={[p.place.lat, p.place.lng]}>
          <Popup>
            <strong>{p.title}</strong><br />
            <small>{p.time}</small><br />
            <small className="text-sm text-gray-500">
              {p.place.display_name}
            </small>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}