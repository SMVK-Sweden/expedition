import * as d3 from 'd3'
import { useRef, useEffect } from 'react'
import { throttle } from '../../../shared/utils'
import countries from './data/subunits_small.json'

export default function CanvasMap({ boatCoordinates, path }) {
  const ref = useRef(null)
  // change position props to [lon, lat] format
  const boatLonLat = [boatCoordinates[1], boatCoordinates[0]]
  const pathLonLat = path.map((coords) => [coords[1], coords[0]])

  let width, height
  if (ref.current) {
    width = ref.current.parentElement.clientWidth
    height = ref.current.parentElement.clientHeight
  }

  useEffect(() => {
    if (ref.current) {
      let canvas = d3
        .select(ref.current)
        .attr('width', width)
        .attr('height', height)

      canvas.node().style = 'width:100%;height:100%;'

      let context = canvas.node().getContext('2d')

      // let projectionChoice = d3.geoEquirectangular() // liknar printade kartor
      // let projectionChoice = d3.geoOrthographic() // jordglob
      // let projectionChoice = d3.geoMercator() // samma som goole maps
      let projectionChoice = d3.geoEqualEarth() // bra representation av länders storlek, men eliptisk

      let projection = projectionChoice.scale(1000).center(boatLonLat)

      let geoGenerator = d3
        .geoPath()
        .projection(projection)
        .pointRadius(20)
        .context(context)

      // zoom handler
      const zoom = d3
        .zoom()
        // .translateExtent([0, 0], [width, height])
        // .scaleExtent([100, 1000])
        .on('zoom', (e) => {
          draw(e.transform)
        })
      canvas.call(zoom)

      const draw = (t) => {
        // clear the canvas
        context.fillStyle = '#ffffff'
        context.strokeStyle = '#ffffff'
        context.setLineDash([])
        context.beginPath()
        context.clearRect(0, 0, width, height)

        // save the old context and apply a transformation
        context.save()
        context.translate(t.x, t.y)
        context.scale(t.k / 2, t.k / 2)

        // draw the earths background (the ocean will have this color)
        geoGenerator({ type: 'Sphere' })
        context.fillStyle = '#F6F1E3'
        context.fill()

        // Graticule
        let graticule = d3.geoGraticule()
        context.beginPath()
        context.lineWidth = 0.3
        geoGenerator(graticule())
        context.stroke()

        // draw the countries
        countries.features.forEach((country) => {
          context.lineWidth = 0.2
          context.strokeStyle = '#ffffff'
          context.fillStyle = '#E0C9A6'

          context.beginPath()
          geoGenerator(country)
          context.fill()
          context.stroke()
        })

        // draw path
        context.beginPath()
        geoGenerator({
          type: 'Feature',
          geometry: { type: 'LineString', coordinates: pathLonLat },
        })
        context.strokeStyle = 'rgba(0, 0, 0, 0.5)'
        context.lineWidth = 1
        context.setLineDash([5, 5])
        context.stroke()

        // mark the boat position
        context.beginPath()
        geoGenerator({
          type: 'Feature',
          geometry: { type: 'Point', coordinates: boatLonLat },
        })
        context.fillStyle = 'red'
        context.fill()

        // restore the canvas context
        context.restore()
      }

      // initialize the canvas
      draw({ k: 1, x: 0, y: 0 })
    }
  }, [boatLonLat, pathLonLat, width, height])

  return (
    <div className="w-full h-full">
      <canvas ref={ref}></canvas>
    </div>
  )
}

export function OldCanvasMap({ boatCoordinates, path }) {
  return (
    <div>
      <div className="relative">
        <div
          style={{
            filter: 'url(#wavy)',
            // boxShadow: 'inset 0px 0px 40px black',
            // position: 'relative',
            // display: 'block',
            // zIndex: '2',
          }}
        >
          <CanvasMap boatCoordinates={boatCoordinates} path={path} />
        </div>
        {/* <div
          style={{
            boxShadow: '10px 10px 40px black',
            position: 'absolute',
            top: '5%',
            left: '5%',
            height: '90%',
            width: '90%',
          }}
        ></div> */}
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
