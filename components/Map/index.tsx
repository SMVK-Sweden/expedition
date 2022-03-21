import { useState } from 'react'
import LeafletMap from './LeafletMap'
import SvgMap from './SvgMap'
import ComponentToggle from '../ComponentToggle'

interface Marker {
  index: number
  coords: [number, number]
  hasInformation: boolean
}

interface MapProps {
  boatPos: [number, number]
  path: [number, number][]
  markers: Marker[]
  zoom: number
  clickMarker: (i: number) => void
}

export default function Map({
  boatPos,
  path,
  markers,
  zoom,
  clickMarker,
}: MapProps) {
  return (
    <ComponentToggle
      component1={<SvgMap boatCoordinates={boatPos} path={path} />}
      title1="gammal karta"
      component2={
        <LeafletMap
          position={boatPos}
          markers={markers}
          zoom={zoom}
          clickMarker={clickMarker}
        />
      }
      title2="modern karta"
    />
  )
}
