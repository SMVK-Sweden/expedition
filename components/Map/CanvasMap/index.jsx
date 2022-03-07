import * as d3 from 'd3'
import { useRef, useEffect } from 'react'
import countries from './data/subunits_medium.json'

export default function CanvasMap() {
  const ref = useRef(null)

  useEffect(() => {
    if (ref.current) {
      let canvas = d3
        .select(ref.current)
        .append('canvas')
        .attr('width', 800)
        .attr('height', 800)

      let context = canvas.node().getContext('2d')

      let projection = d3.geoEquirectangular().scale(150)

      let geoGenerator = d3
        .geoPath()
        .projection(projection)
        .pointRadius(4)
        .context(context)

      canvas.on('click', (e) => {
        const mouse = d3.pointer(e)
        console.log(projection.invert(mouse))
      })

      let yaw = 300
      let i = 0
      const update = () => {
        // projection.rotate([yaw, -45])
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
        context.strokeStyle = '#cccccc'
        geoGenerator(graticule())
        context.stroke()

        // draw the countries
        // one by one
        i++
        if (i > countries.features.length) i = 0
        countries.features.forEach((country, index) => {
          context.lineWidth = 0.2
          context.strokeStyle = '#ffffff'
          context.fillStyle = '#E0C9A6'
          if (i == index) context.fillStyle = 'red'

          context.beginPath()
          geoGenerator(country)
          context.fill()
          context.stroke()
        })
      }
      setInterval(update, 67)
    }
  }, []) //ska man ha ref.current som dependency?

  return <div ref={ref}></div>
}

export function OldCanvasMap() {
  return (
    <div className="bg-white max-w-6xl w-full m-auto">
      <div className="py-3 w-9/12 m-auto relative">
        <div
          style={{
            filter: 'url(#wavy)',
            // boxShadow: 'inset 0px 0px 40px black',
            // position: 'relative',
            // display: 'block',
            // zIndex: '2',
          }}
        >
          <CanvasMap />
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
