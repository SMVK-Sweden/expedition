import { useState } from 'react'
import { useRouter } from 'next/router'

interface TimelineProps {
  date: string
  startDate: string
  finnishDate: string
}

export default function Timeline({
  date,
  startDate,
  finnishDate,
}: TimelineProps) {
  const [currentDate, setCurrentDate] = useState(date)
  const router = useRouter()

  return (
    <div>
      <input
        type="date"
        value={currentDate}
        min={startDate}
        max={finnishDate}
        onChange={(e) => {
          const newDate = e.target.value
          setCurrentDate(newDate)
          router.push(`/days/${newDate}`)
        }}
      />
    </div>
  )
}
