import CanvasMap from '../../../components/Map/CanvasMap'
import Button from '../../../components/Button'
import Link from 'next/link'
import { yearMonthDay } from '../../../lib/dateConversion'
import { useState } from 'react'
import RadioButton from '../../../components/RadioButton'
import Note from '../../../components/Note'
import DatePicker from '../../../components/DatePicker'
import { PrismaClient, Day, DiaryEntry, KsamsokImage } from '@prisma/client'
const prisma = new PrismaClient()
import { LatLng, LatLngList } from '../../../lib/types/LatLng'
import { DayWithContent } from '../../../lib/types/prismaTypes'
import { getDay } from '../../../lib/api/days'
import ImageWithDescription from '../../../components/ImageWithDescription'

interface DayProps {
  day: DayWithContent
  previousDays: Day[]
  followingDays: Day[]
}

export default function DayPage({
  day,
  previousDays,
  followingDays,
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

  const ksamsokImageTags = day.ksamsokImages?.map((image: KsamsokImage) => (
    <ImageWithDescription
      src={image.url}
      description={image.description || undefined}
      key={image.url}
    />
  ))

  const boatPos: LatLng = [day.latitude!, day.longitude!]
  const pathTraveled: LatLngList = previousDays
    ?.filter((day: Day) => day.latitude)
    .map((day: Day) => [day.latitude!, day.longitude!])
  pathTraveled.push(boatPos)

  const yesterdayDate =
    previousDays.length > 0 ? previousDays[previousDays.length - 1].date : null
  const tomorrowDate = followingDays.length > 0 ? followingDays[0].date : null
  const startDate = previousDays.length > 0 ? previousDays[0].date : day.date
  const finnishDate =
    followingDays.length > 0
      ? followingDays[followingDays.length - 1].date
      : day.date

  return (
    <div className="w-full max-w-6xl m-auto mt-6">
      <p className="text-lg font-bold text-center">
        {new Date(day.date).toLocaleDateString('sv-SE', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })}
      </p>
      <div style={{ height: '50vh' }}>
        <CanvasMap
          boatCoordinates={boatPos}
          path={pathTraveled}
          oldMap={oldMap}
        />
      </div>
      <RadioButton
        options={['1880', '2022']}
        value="1880"
        onChange={(e) => {
          const value = e.target.value
          if (value == '1880') setOldMap(true)
          else setOldMap(false)
        }}
      />
      <div className="flex gap-x-2">
        <Link
          href={yesterdayDate ? `/days/${yearMonthDay(yesterdayDate)}` : ''}
        >
          <Button
            className={`flex-auto ${
              yesterdayDate ? '' : 'bg-slate-200 bg hover:bg-slate-200 '
            }`}
          >
            igår
          </Button>
        </Link>
        <Link href={tomorrowDate ? `/days/${yearMonthDay(tomorrowDate)}` : ''}>
          <Button
            className={`flex-auto ${
              tomorrowDate ? '' : 'bg-slate-200 bg hover:bg-slate-200 '
            }`}
          >
            imorgon
          </Button>
        </Link>
      </div>
      <DatePicker
        date={yearMonthDay(day.date)}
        startDate={yearMonthDay(startDate)}
        finnishDate={yearMonthDay(finnishDate)}
      />
      {diaryEntryTags}
      {ksamsokImageTags}
      <div className="mb-6"></div>
    </div>
  )
}

export async function getStaticPaths() {
  const dates = await prisma.day.findMany({
    select: {
      date: true,
    },
  })
  const paths = dates.map((res) => ({
    params: { date: yearMonthDay(res.date) },
  }))

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
  const day = await prisma.day.findUnique({
    where: {
      date: new Date(params.date),
    },
    include: { diaryEntries: true, ksamsokImages: true },
  })

  const previousDays = await prisma.day.findMany({
    where: { date: { lt: day!.date } },
    orderBy: { date: 'asc' },
  })
  const followingDays = await prisma.day.findMany({
    where: { date: { gt: day!.date } },
    orderBy: { date: 'asc' },
  })

  return {
    props: {
      day,
      previousDays,
      followingDays,
    },
  }
}
