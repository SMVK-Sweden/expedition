import countryShapes from './data/countries_geojson.json'
import useChartDimensions from './useChartDimensions'
import * as d3 from 'd3'
import * as d3GeoProjection from 'd3-geo-projection'

const D3WorldMap = ({ boatCoordinates, path }) => {
  const projectionName = 'geoEquirectangular'
  // grab our custom React hook we defined above
  const [ref, dms] = useChartDimensions({})

  // this is the definition for the whole Earth
  const sphere = { type: 'Sphere' }

  const projectionFunction =
    d3[projectionName] || d3GeoProjection[projectionName]
  const projection = projectionFunction().fitWidth(dms.width, sphere)
  const pathGenerator = d3.geoPath(projection)

  // size the svg to fit the height of the map
  const [[x0, y0], [x1, y1]] = pathGenerator.bounds(sphere)
  const height = y1

  // project the boat onto the map
  const boatLonLat = [boatCoordinates[1], boatCoordinates[0]]
  const boatPos = projection(boatLonLat)

  // project the path onto the map
  const pathLonLat = path.map((coords) => [coords[1], coords[0]])

  return (
    <div
      ref={ref}
      style={{
        width: '100%',
      }}
    >
      <svg width={dms.width} height={height}>
        <defs>
          {/* some projections bleed outside the edges of the Earth's sphere */}
          {/* let's create a clip path to keep things in bounds */}
          <clipPath id="Map__sphere">
            <path d={pathGenerator(sphere)} />
          </clipPath>
        </defs>

        <path d={pathGenerator(sphere)} fill="#f1ddbd" />

        <g style={{ clipPath: 'url(#Map__sphere)' }}>
          {/* we can even have graticules! */}
          <path
            d={pathGenerator(d3.geoGraticule10())}
            fill="none"
            stroke="white"
            style={{ strokeOpacity: '.3' }}
          />

          {countryShapes.features.map((shape) => {
            return (
              <path
                key={shape.properties.subunit}
                d={pathGenerator(shape)}
                fill="#cc9f56"
                stroke="white"
                style={{ strokeOpacity: '0.3' }}
              >
                <title>{shape.properties.name}</title>
              </path>
            )
          })}
          <circle cx={`${boatPos[0]}`} cy={`${boatPos[1]}`} r="5" fill="red" />
          <path
            d={pathGenerator({
              type: 'Feature',
              geometry: { type: 'LineString', coordinates: pathLonLat },
            })}
            stroke="black"
            fill="none"
            style={{ strokeOpacity: '0.5' }}
            strokeDasharray="2,2"
          />
        </g>
      </svg>
    </div>
  )
}

export default D3WorldMap
