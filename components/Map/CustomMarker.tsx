import {useState} from 'react'
import { Marker, useMap, useMapEvent } from 'react-leaflet'

interface MarkerZoomChangeProps {
  onZoomChange: Function
}

function MarkerZoomChange({onZoomChange}) {
  const mapEvent = useMapEvent('zoomend', () => {
    onZoomChange()
  })
  return null
}

interface CustomMarkerProps {
  position: [number, number]
  initialSize: number
  iconUrl: string
  eventHandlers: [Function]
}

function CustomMarker({position, initialSize, eventHandlers, iconUrl}: CustomMarkerProps) {
  const leafletMap = useMap()
  const [size, setSize] = useState(initialSize * (1 + leafletMap.getZoom()))

  return (
    <Marker
      position={position}
      eventHandlers={eventHandlers}
      size={size}
      icon={L.icon({
        iconUrl: iconUrl,
        iconSize: [size, size],
      })}
    >
      <MarkerZoomChange onZoomChange={() => setSize(initialSize * (1 + leafletMap.getZoom()))} />
    </Marker>
  )
}


export {CustomMarker}
