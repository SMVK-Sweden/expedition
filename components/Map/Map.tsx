import { useEffect, useState, useMemo } from 'react'
import L from 'leaflet'
import * as ReactLeaflet from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import styles from './Map.module.css'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'

interface MapProps {
  position: [number, number]
  markers: ([number, number] | undefined)[]
  clickMarker: (i: number) => void
}

interface ChangeViewProps {
  center: [number, number]
  zoom: number
}

function ChangeView({ center, zoom }: ChangeViewProps) {
  const map = useMap()
  map.setView(center)
  map.flyTo(center)
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
                },
              }}
              icon={L.icon({
                iconUrl: 'dot.png',
                iconSize: [20, 20],
              })}
            />
          )
      })}
      <Marker
        position={position}
        icon={L.icon({ iconUrl: 'ship.png', iconSize: [100, 100] })}
      />
    </MapContainer>
  )
}

export default Map

// const { MapContainer } = ReactLeaflet
// const { useMap } = ReactLeaflet

// // import icons for markers
// const boatIcon = L.icon({ iconUrl: '/ship.png' })
// const dotIcon = L.icon({ iconUrl: '/dot.png' })

// function ChangeView({ center, zoom }) {
//   const map = useMap()
//   map.setView(center, zoom)
//   map.flyTo(center)
//   return null
// }

// const Map = ({ children, className, center, zoom, ...rest }) => {
//   let mapClassName = styles.map

//   if (className) {
//     mapClassName = `${mapClassName} ${className}`
//   }

//   /*
//   useEffect(() => {
//     delete L.Icon.Default.prototype._getIconUrl;

//     L.Icon.Default.mergeOptions({
//       iconRetinaUrl: require( 'leaflet/dist/images/marker-icon-2x.png' ),
//       iconUrl: require( 'leaflet/dist/images/marker-icon.png' ),
//       shadowUrl: require( 'leaflet/dist/images/marker-shadow.png' ),
//     });
//   }, []);
//   */

//   return (
//     <MapContainer className={mapClassName} {...rest}>
//       <ChangeView center={center} zoom={zoom} />
//       {children(ReactLeaflet)}
//     </MapContainer>
//   )
// }

// export default Map
