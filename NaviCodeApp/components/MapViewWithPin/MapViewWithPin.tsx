import React from 'react';
import { Marker } from 'react-native-maps';
import { StyledMapView } from './MapViewWithPin.styles';

const DEFAULT_LAT = 37.5665;
const DEFAULT_LNG = 126.978;

interface MapViewWithPinProps {
  markerCoords?: { latitude: number; longitude: number };
  onMarkerDragEnd?: (coords: { latitude: number; longitude: number }) => void;
  showUserLocation?: boolean;
}

export function MapViewWithPin({
  markerCoords,
  onMarkerDragEnd,
  showUserLocation = false,
}: MapViewWithPinProps) {
  return (
    <StyledMapView
      initialRegion={{
        latitude: markerCoords?.latitude ?? DEFAULT_LAT,
        longitude: markerCoords?.longitude ?? DEFAULT_LNG,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      }}
      showsUserLocation={showUserLocation}
    >
      {markerCoords && (
        <Marker
          coordinate={markerCoords}
          draggable={Boolean(onMarkerDragEnd)}
          onDragEnd={(e) => onMarkerDragEnd?.(e.nativeEvent.coordinate)}
        />
      )}
    </StyledMapView>
  );
}