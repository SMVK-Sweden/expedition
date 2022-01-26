import L, { LatLngExpression } from 'leaflet'
import 'leaflet/dist/leaflet.css'
import styles from './Map.module.css'
import {CustomMarker} from './CustomMarker'
import { MapContainer, TileLayer, Marker, useMap, Polyline } from 'react-leaflet'

interface MapProps {
  position: [number, number]
  zoom: number
  markers: ([number, number] | undefined)[]
  clickMarker: (i: number) => void
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
  const positionIndex = markers.indexOf(position)

  return (
    <MapContainer
      center={position}
      zoom={zoom}
      // scrollWheelZoom={false}
      className={styles.map}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <ChangeView center={position} zoom={zoom} />
      {markers.map((coords, i) => {
        if (coords && coords !== position)
          return (
            <CustomMarker
              position={coords}
              initialSize={2}
              key={i}
              eventHandlers={{
                click: () => {
                  clickMarker(i)
                },
              }}
              iconUrl='dot.png'
            />
          )
      })}

      <Polyline positions={markers.filter((marker, i) => marker && i <= positionIndex) as [LatLngExpression, LatLngExpression]} />

      <CustomMarker
        position={position}
        initialSize={20}
        eventHandlers={{}}
        iconUrl='ship.png'
      />
    </MapContainer>
  )
}

export default Map

