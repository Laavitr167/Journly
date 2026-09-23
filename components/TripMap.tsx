'use client';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

// Fix Leaflet's icon loading issue
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png').default,
  iconUrl: require('leaflet/dist/images/marker-icon.png').default,
  shadowUrl: require('leaflet/dist/images/marker-shadow.png').default,
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