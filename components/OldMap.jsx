import * as d3 from 'd3'
import { useRef, useEffect } from 'react'

export default function OldMap() {
  const ref = useRef()

  return <canvas ref={ref} />
}
