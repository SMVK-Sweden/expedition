import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import styles from './Map.module.css'
import { MapContainer, TileLayer, Marker, useMap, Polyline } from 'react-leaflet'

interface MapProps {
  position: [number, number]
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

function Map({ position, markers, clickMarker }: MapProps) {
  return (
    <MapContainer
      center={position}
      zoom={7}
      // scrollWheelZoom={false}
      className={styles.map}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <ChangeView center={position} zoom={3} />
      {markers.map((coords, i) => {
        if (coords && coords !== position)
          return (
            <Marker
              position={coords}
              key={i}
              eventHandlers={{
                click: () => {
                  clickMarker(i)
                  console.log(i)
                },
              }}
              icon={L.icon({
                iconUrl: 'dot.png',
                iconSize: [20, 20],
              })}
            />
          )
      })}

      <Polyline positions={markers.filter(marker => marker)} />

      <Marker
        position={position}
        icon={L.icon({ iconUrl: 'ship.png', iconSize: [100, 100] })}
      />
    </MapContainer>
  )
}

export default Map

