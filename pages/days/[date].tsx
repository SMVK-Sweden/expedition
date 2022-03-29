import dateTime from 'date-and-time'
import CanvasMap from '../../components/Map/CanvasMap'
import Button from '../../components/Button'
import Link from 'next/link'
import {
  readAllDayCoordinatesBefore,
  readDayFromDate,
  readAllDayDates,
  readSorroundingDates,
  yearMonthDay,
} from '../../prisma/models/day'
import { useState } from 'react'
import RadioButton from '../../components/RadioButton'

interface DayProps {
  date: string
  latitude?: number
  longitude?: number
  diaryEntries?: any
  previousDays?: any
  yesterdayDate?: string
  tomorrowDate?: string
}

export default function Day({
  date,
  latitude,
  longitude,
  diaryEntries,
  previousDays,
  yesterdayDate,
  tomorrowDate,
}: DayProps) {
  const [oldMap, setOldMap] = useState(true)

  const diaryEntryTags = diaryEntries
    ? diaryEntries.map((entry: any) => (
        <div className="border-2 rounded-lg" key={date}>
          <p className="font-bold">{entry.author}</p>
          <p>{entry.content}</p>
        </div>
      ))
    : []

  // a list of coordinates that has been visited
  // (some days have no coordinates)
  const traveledPath = previousDays
    .filter((d: any) => d.coordinates[0])
    .map((d: any) => d.coordinates)

  return (
    <div className="w-full max-w-6xl m-auto mt-6">
      <p>
        {new Date(date).toLocaleDateString('sv-SE', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })}
      </p>
      <div style={{ height: '50vh' }}>
        <CanvasMap
          boatCoordinates={[latitude, longitude]}
          path={traveledPath}
          oldMap={oldMap}
        />
      </div>
      <RadioButton
        options={['1880', '2022']}
        value="1880"
        onChange={(e) => {
          console.log(e.target.value)
          const value = e.target.value
          if (value == '1880') setOldMap(true)
          else setOldMap(false)
        }}
      />
      <div className="flex gap-x-2">
        <Link href={yesterdayDate ? `/days/${yesterdayDate}` : ''}>
          <Button
            className={`flex-auto ${
              yesterdayDate ? '' : 'bg-slate-200 bg hover:bg-slate-200 '
            }`}
          >
            igår
          </Button>
        </Link>
        <Link href={tomorrowDate ? `/days/${tomorrowDate}` : ''}>
          <Button
            className={`flex-auto ${
              tomorrowDate ? '' : 'bg-slate-200 bg hover:bg-slate-200 '
            }`}
          >
            imorgon
          </Button>
        </Link>
      </div>
      {diaryEntryTags}
    </div>
  )
}

export async function getStaticPaths() {
  const dates = await readAllDayDates()
  const paths = dates.map((date) => ({ params: { date: date } }))

  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps({ params }: any) {
  const day = (await readDayFromDate(params.date)) as Day

  const others = await readAllDayCoordinatesBefore(params.date)
  const [yesterday, tomorrow] = await readSorroundingDates(params.date)

  if (day) {
    return {
      props: {
        date: day ? yearMonthDay(day.date) : null,
        latitude: day ? day.latitude : null,
        longitude: day ? day.longitude : null,
        diaryEntries: day ? day.diaryEntries : null,
        previousDays: others.map((other) => ({
          date: yearMonthDay(other.date),
          coordinates: [other.latitude, other.longitude],
        })),
        yesterdayDate: yesterday ? yearMonthDay(yesterday.date) : null,
        tomorrowDate: tomorrow ? yearMonthDay(tomorrow.date) : null,
      },
    }
  }
}
