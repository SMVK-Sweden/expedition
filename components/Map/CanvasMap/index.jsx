import * as d3 from 'd3'
import { useEffect, useState, useCallback } from 'react'
import modernCountries from './data/subunits_small.json'
import oldCountries from './data/world_1880.json'
import { throttle } from 'throttle-debounce'

export default function CanvasMap({ boatCoordinates, path, oldMap }) {
  // chose which map to show
  const countries = oldMap ? oldCountries : modernCountries
  // get d3 working
  const [dimensions, setDimenstions] = useState([0, 0])
  const [width, height] = dimensions

  // set the size of the canvas to fill the outer div when the ref mounts
  const [canvasRef, setCanvasRef] = useState(null)
  const ref = useCallback((node) => {
    if (node !== null) {
      setCanvasRef(node)
      const w = node.parentElement.clientWidth
      const h = node.parentElement.clientHeight
      setDimenstions([w, h])
    }
  }, [])

  if (canvasRef && width == 0) {
    const w = canvasRef.parentElement.clientWidth
    const h = canvasRef.parentElement.clientHeight
    setDimenstions([w, h])
  }

  const refreshCanvas = () => {
    if (canvasRef) {
      // change position props to [lon, lat] format
      const boatLonLat = [boatCoordinates[1], boatCoordinates[0]]
      const pathLonLat = path.map((coords) => [coords[1], coords[0]])

      let canvas = d3
        .select(canvasRef)
        .attr('width', width)
        .attr('height', height)

      //canvas.node().style = 'width:100%;height:100%;'

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

      // zoom events
      // zoom events can fire to often
      // so the number of redraws of the
      // canvas needs to be limited
      const zoomHandler = throttle(60, false, (e) => {
        // clear the whole canvas
        context.fillStyle = '#ffffff'
        context.beginPath()
        context.clearRect(0, 0, width, height)
        // save the old context and apply a transformation
        context.save()
        const t = e.transform
        context.translate(t.x, t.y)
        context.scale(t.k / 2, t.k / 2)
        // draw the map with the transformations applied
        draw()
        // restore the canvas context
        context.restore()
      })
      const zoom = d3
        .zoom()
        // .translateExtent([0, 0], [width, height])
        // .scaleExtent([100, 1000])
        .on('zoom', zoomHandler)
      canvas.call(zoom)

      const draw = () => {
        // clear the canvas
        context.fillStyle = '#ffffff'
        context.strokeStyle = '#ffffff'
        context.setLineDash([])

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

        // country name
        countries.features.forEach((country) => {
          let pos = projection(d3.geoCentroid(country))
          context.fillStyle = 'rgba(0, 0, 0, .5)'
          context.font = '20px sans-serif'
          context.fillText(
            country.properties.NAME_SV || country.properties.NAME || '',
            pos[0],
            pos[1]
          )
        })

        // draw path
        context.beginPath()
        geoGenerator({
          type: 'Feature',
          geometry: { type: 'LineString', coordinates: pathLonLat },
        })
        context.strokeStyle = 'rgba(0, 0, 0, 0.8)'
        context.lineWidth = 1
        context.setLineDash([5, 5])
        context.stroke()

        // mark the boat position
        const image = new Image(100, 100)
        image.src = '/batsketchutan_smet.png'
        const [boatX, boatY] = projection(boatLonLat)
        context.beginPath()
        context.drawImage(image, boatX - 50, boatY - 50, 100, 100)
      }

      // initialize the canvas
      draw()
    }
  }

  useEffect(refreshCanvas, [
    boatCoordinates,
    canvasRef,
    countries.features,
    height,
    path,
    width,
  ])

  return (
    <div className="w-full h-full">
      <canvas ref={ref}></canvas>
    </div>
  )
}
