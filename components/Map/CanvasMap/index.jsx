import * as d3 from 'd3'
import { useRef, useEffect } from 'react'
import countries from './data/subunits_small.json'

// https://programmingwithmosh.com/javascript/javascript-throttle-and-debounce-patterns/
function throttle(callback, interval) {
  let enableCall = true

  return function (...args) {
    if (!enableCall) return

    enableCall = false
    callback.apply(this, args)
    setTimeout(() => (enableCall = true), interval)
  }
}

export default function CanvasMap({ boatCoordinates, path }) {
  const ref = useRef(null)
  // change position props to [lon, lat] format
  const boatLonLat = [boatCoordinates[1], boatCoordinates[0]]
  const pathLonLat = path.map((coords) => [coords[1], coords[0]])

  useEffect(() => {
    if (ref.current) {
      let canvas = d3
        .select(ref.current)
        .append('canvas')
        .attr('width', 800)
        .attr('height', 800)

      let context = canvas.node().getContext('2d')

      let projection = d3.geoEquirectangular()

      let geoGenerator = d3
        .geoPath()
        .projection(projection)
        .pointRadius(4)
        .context(context)

      // does not update everytime
      let mouse_pos = []
      canvas.on(
        'mousemove',
        throttle((e) => {
          const mouse = d3.pointer(e)
          mouse_pos = projection.invert(mouse)
          update()
        }, 30)
      )

      const update = () => {
        // clear the canvas
        context.fillStyle = '#ffffff'
        context.clearRect(0, 0, 800, 800)

        // draw the earths background (the ocean will have this color)
        geoGenerator({ type: 'Sphere' })
        context.fillStyle = '#F6F1E3'
        context.fill()

        // Graticule
        let graticule = d3.geoGraticule()
        context.beginPath()
        context.lineWidth = 0.3
        context.strokeStyle = '#fff'
        geoGenerator(graticule())
        context.stroke()

        // draw the countries
        countries.features.forEach((country) => {
          context.lineWidth = 0.2
          context.strokeStyle = '#ffffff'
          context.fillStyle = '#E0C9A6'

          // event handling on the canvas
          if (d3.geoContains(country, mouse_pos)) {
            context.lineWidth = 2
            console.log(country)
          }

          context.beginPath()
          geoGenerator(country)
          context.fill()
          context.stroke()
        })

        // draw path
        geoGenerator({
          type: 'Feature',
          geometry: { type: 'LineString', coordinates: pathLonLat },
        })
        context.strokeStyle = 'black'
        context.setLineDash([5, 5])
        context.stroke()

        // mark the boat position
        context.beginPath()
        context.arc(boatLonLat[0], boatLonLat[1], 5, 0, Math.PI * 2)
        context.fillStyle = 'red'
        context.fill()
      }

      // initialize the canvas
      update()
    }
  }, []) //ska man ha ref.current som dependency?

  return <div ref={ref} className="w-full h-full"></div>
}

export function OldCanvasMap({ boatCoordinates, path }) {
  return (
    <div>
      <div className="py-3 w-9/12 m-auto relative border-blue-500">
        <div
          style={
            {
              // filter: 'url(#wavy)',
              // boxShadow: 'inset 0px 0px 40px black',
              // position: 'relative',
              // display: 'block',
              // zIndex: '2',
            }
          }
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
