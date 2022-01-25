import { LeafletEventHandlerFnMap, icon } from 'leaflet'
import {useState} from 'react'
import { Marker, useMap, useMapEvent } from 'react-leaflet'

interface MarkerZoomChangeProps {
  onZoomChange: () => void
}

function MarkerZoomChange({onZoomChange}: MarkerZoomChangeProps) {
  const mapEvent = useMapEvent('zoomend', () => {
    onZoomChange()
  })
  return null
}

interface CustomMarkerProps {
  position: [number, number]
  initialSize: number
  iconUrl: string
  eventHandlers: LeafletEventHandlerFnMap
}

function CustomMarker({position, initialSize, eventHandlers, iconUrl}: CustomMarkerProps) {
  const leafletMap = useMap()
  const [markerSize, setMarkerSize] = useState(initialSize * (1 + leafletMap.getZoom()))

  return (
    <Marker
      position={position}
      eventHandlers={eventHandlers}
      //size={[markerSize, markerSize]}
      icon={icon({
        iconUrl: iconUrl,
        iconSize: [markerSize, markerSize],
      })}
    >
      <MarkerZoomChange onZoomChange={() => setMarkerSize(initialSize * (1 + leafletMap.getZoom()))} />
    </Marker>
  )
}


export {CustomMarker}
