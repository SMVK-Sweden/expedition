import dateTime from 'date-and-time'
import CanvasMap from '../../components/Map/CanvasMap'
import Button from '../../components/Button'
import Link from 'next/link'
import {
  readTraveledPath,
  readDayFromDate,
  readAllDayDates,
  readSorroundingDateStrings,
  yearMonthDay,
  DayModel,
} from '../../prisma/models/day'
import { useState } from 'react'
import RadioButton from '../../components/RadioButton'
import Note from '../../components/Note'
import { DiaryEntry } from '@prisma/client'

interface DayProps {
  day: DayModel
  path: [number, number][]
  yesterdayDate?: string
  tomorrowDate?: string
}

export default function Day({
  day,
  path,
  yesterdayDate,
  tomorrowDate,
}: DayProps) {
  const [oldMap, setOldMap] = useState(true)

  const diaryEntryTags = day.diaryEntries?.map((entry: DiaryEntry) => (
    <Note
      key={entry.id}
      id={entry.id}
      author={entry.author}
      content={entry.content}
    />
  ))

  return (
    <div className="w-full max-w-6xl m-auto mt-6">
      <p>
        {new Date(day.date).toLocaleDateString('sv-SE', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })}
      </p>
      <div style={{ height: '50vh' }}>
        <CanvasMap
          boatCoordinates={[day.latitude, day.longitude]}
          path={path}
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
      <div className="mb-6"></div>
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

interface staticPropsParams {
  params: {
    date: string
  }
}

export async function getStaticProps({ params }: staticPropsParams) {
  const day = await readDayFromDate(params.date)

  const path = await readTraveledPath(params.date)
  const [yesterday, tomorrow] = await readSorroundingDateStrings(params.date)

  if (day) {
    return {
      props: {
        day: day,
        path: path,
        yesterdayDate: yesterday,
        tomorrowDate: tomorrow,
      },
    }
  }
}
