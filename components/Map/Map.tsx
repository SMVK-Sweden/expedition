import L, { LatLngExpression } from 'leaflet'
import 'leaflet/dist/leaflet.css'
import styles from './Map.module.css'
import { CustomMarker } from './CustomMarker'
import {
  MapContainer,
  TileLayer,
  Marker,
  useMap,
  Polyline,
} from 'react-leaflet'

interface MapProps {
  position: [number, number]
  zoom: number
  markers: Marker[]
  clickMarker: (i: number) => void
}

export interface Marker {
  index: number
  coords: [number, number]
  hasInformation: boolean
}

interface ChangeViewProps {
  center: [number, number]
  zoom: number
}

function ChangeView({ center }: ChangeViewProps) {
  const map = useMap()
  map.setView(center)
  return null
}

function Map({ position, zoom, markers, clickMarker }: MapProps) {
  const positionIndex = markers.findIndex(({ coords }) => position === coords)

  return (
    <MapContainer
      center={position}
      zoom={zoom}
      // scrollWheelZoom={false}
      className="w-full"
      style={{
        height: '50vh',
      }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <ChangeView center={position} zoom={zoom} />
      {markers.map(({ coords, index, hasInformation }) => {
        if (coords && coords !== position)
          return (
            <CustomMarker
              position={coords}
              initialSize={2}
              key={index}
              eventHandlers={{
                click: () => {
                  clickMarker(index)
                },
              }}
              iconUrl={hasInformation ? 'dot.png' : 'gray_dot.png'}
            />
          )
      })}

      <Polyline
        positions={
          markers
            .map(({ coords }) => coords)
            .filter((marker, i) => marker && i <= positionIndex) as [
            LatLngExpression,
            LatLngExpression
          ]
        }
      />

      <CustomMarker
        position={position}
        initialSize={20}
        eventHandlers={{}}
        iconUrl="ship.png"
      />
    </MapContainer>
  )
}

export default Map
