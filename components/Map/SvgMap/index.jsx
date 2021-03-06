import countryShapes from './data/subunits_small.json'
import useChartDimensions from './useChartDimensions'
import * as d3 from 'd3'
import * as d3GeoProjection from 'd3-geo-projection'
import { useState } from 'react'

const Country = (data, pathGenerator) => {
  const [hover, setHover] = useState(false)
  return (
    <path
      key={data.properties.subunit}
      d={pathGenerator(data)}
      fill="#E0C9A6"
      stroke="white"
      strokeOpacity={hover ? '0.8' : '0.1'}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <title>{data.properties.NAME_SV}</title>
    </path>
  )
}

export default function D3WorldMap({ boatCoordinates, path }) {
  // change position props to [lon, lat] format
  const boatLonLat = [boatCoordinates[1], boatCoordinates[0]]
  const pathLonLat = path.map((coords) => [coords[1], coords[0]])

  // d3 setup
  const projectionName = 'geoEquirectangular'
  // const projectionName = 'geoMercator'
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

  const boatPos = projection(boatLonLat)

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

        <path d={pathGenerator(sphere)} fill="#F6F1E3" />

        <g style={{ clipPath: 'url(#Map__sphere)' }}>
          {/* we can even have graticules! */}
          <path
            d={pathGenerator(d3.geoGraticule10())}
            fill="none"
            stroke="white"
            strokeOpacity=".3"
          />

          {countryShapes.features.map((shape) => Country(shape, pathGenerator))}
          <circle cx={`${boatPos[0]}`} cy={`${boatPos[1]}`} r="3" fill="red" />
          <path
            d={pathGenerator({
              type: 'Feature',
              geometry: { type: 'LineString', coordinates: pathLonLat },
            })}
            stroke="black"
            fill="none"
            strokeOpacity="0.5"
            strokeDasharray="2,2"
            strokeLinejoin="round"
          />
        </g>
      </svg>
    </div>
  )
}

export function OldMap({ boatCoordinates, path }) {
  console.log(boatCoordinates, path)
  return (
    <div className="bg-white max-w-6xl w-full m-auto">
      <div className="py-3 w-9/12 m-auto relative">
        <div
          style={{
            filter: 'url(#wavy)',
            boxShadow: 'inset 0px 0px 40px black',
            position: 'relative',
            display: 'block',
            zIndex: '2',
          }}
        >
          <D3WorldMap boatCoordinates={boatCoordinates} path={path} />
        </div>
        <div
          style={{
            boxShadow: '10px 10px 40px black',
            position: 'absolute',
            top: '5%',
            left: '5%',
            height: '90%',
            width: '90%',
          }}
        ></div>
      </div>
      <div style={{ display: 'none' }}>
        <svg>
          <filter id="wavy">
            <feTurbulence
              x="0"
              y="0"
              baseFrequency="0.02"
              numOctaves="3"
              seed="1"
            ></feTurbulence>
            <feDisplacementMap in="SourceGraphic" scale="10" />
          </filter>
        </svg>
      </div>
    </div>
  )
}
