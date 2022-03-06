import { useState } from 'react'
import LeafletMap from './LeafletMap'
import D3WorldMap from './D3WorldMap'
import ComponentToggle from '../ComponentToggle'

interface MapProps {
  boatPos: [number, number]
  path: [number, number][]
}

export default function Map({ boatPos, path }: MapProps) {
  return (
    <ComponentToggle
      component1={<D3WorldMap boatCoordinates={boatPos} path={path} />}
      title1="gammal karta"
      component2={<LeafletMap position={boatPos}}
    />
  )
}
