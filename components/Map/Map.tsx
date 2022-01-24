import { useEffect } from 'react';
import L from 'leaflet';
import * as ReactLeaflet from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import styles from './Map.module.css';

const { MapContainer } = ReactLeaflet;
const {useMap} = ReactLeaflet


// import icons for markers
const boatIcon = L.icon({iconUrl: '/ship.png'})
const dotIcon = L.icon({iconUrl: '/dot.png'})

function ChangeView({center, zoom}) {
  const map = useMap()
  console.log(center, zoom)
  map.setView(center, zoom)
  map.flyTo(center)
  return null
}


const Map = ({ children, className, center, zoom, ...rest }) => {
  let mapClassName = styles.map;

  if ( className ) {
    mapClassName = `${mapClassName} ${className}`;
  }

  /*
  useEffect(() => {
    delete L.Icon.Default.prototype._getIconUrl;

    L.Icon.Default.mergeOptions({
      iconRetinaUrl: require( 'leaflet/dist/images/marker-icon-2x.png' ),
      iconUrl: require( 'leaflet/dist/images/marker-icon.png' ),
      shadowUrl: require( 'leaflet/dist/images/marker-shadow.png' ),
    });
  }, []);
  */

  return (
    <MapContainer className={mapClassName} {...rest}>
      <ChangeView center={center} zoom={zoom} />
      { children(ReactLeaflet) }
    </MapContainer>
  )
}

export default Map;
