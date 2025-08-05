import { MapContainer, TileLayer, GeoJSON, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L, { LatLngExpression } from "leaflet";

import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

// Fix the default icon issue
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x.src ?? markerIcon2x,
  iconUrl: markerIcon.src ?? markerIcon,
  shadowUrl: markerShadow.src ?? markerShadow,
});


export interface MapViewProps {
  center?: LatLngExpression;
  geojson?: any; // You can type this better if needed
  mapClassName?: any;
}

export const MapView: React.FC<MapViewProps> = ({
  center = [9.082, 8.6753],
  geojson,
  mapClassName,
}) => {
  return (
    <MapContainer
      center={center} // Example: center on Nigeria
      zoom={6}
      style={{ height: "500px", width: "100%" }}
      className={mapClassName}
    >
      <TileLayer
        attribution="&copy; OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {geojson && (
        <GeoJSON
          data={geojson}
          style={(feature) => {
            const status = feature?.properties?.status;
            return {
              color: status === "bad" ? "red" : "green",
              fillColor: status === "bad" ? "red" : "green",
              fillOpacity: 0.4,
              weight: 1,
            };
          }}
        />
      )}
      <Marker position={center}>
        <Popup>Selected Location</Popup>
      </Marker>
    </MapContainer>
  );
};
