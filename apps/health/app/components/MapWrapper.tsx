'use client';

import dynamic from 'next/dynamic';
import { MapViewProps } from './MapView';

const MapView = dynamic(() =>
  import('./MapView').then((mod) => mod.MapView),
  { ssr: false }
) as React.ComponentType<MapViewProps>;

export default MapView;
