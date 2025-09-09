'use client';

import dynamic from 'next/dynamic';
// import { MapViewProps } from './MapView';
import { MappViewProps } from './Mapp';

const MapView = dynamic(() =>
  import('./Mapp').then((mod) => mod.MappView),
  { ssr: false }
) as React.ComponentType<MappViewProps>;

export default MapView;
