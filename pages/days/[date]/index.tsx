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
import FormCheck from 'react-bootstrap/FormCheck'
import { FormLabel, InputGroup } from 'react-bootstrap'
import { DayWithContent } from '../../../lib/types/prismaTypes'
import { getDay } from '../../../lib/api/days'
import ImageWithDescription from '../../../components/ImageWithDescription'
import { useRouter } from 'next/router'

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
  const router = useRouter()
  console.log(day)

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
    <div className="w-full max-w-6xl m-auto mt-6 pb-10">
      <div style={{ height: '50vh' }}>
        <CanvasMap
          boatCoordinates={boatPos}
          path={pathTraveled}
          oldMap={oldMap}
        />
      </div>
      <div className="text-center m-3">
        <FormLabel>Karta</FormLabel>
        <InputGroup className="flex mb-3 justify-center">
          <FormCheck
            inline
            name="year"
            label="1880"
            type="radio"
            checked={oldMap}
            onChange={() => setOldMap(true)}
          />
          <FormCheck
            inline
            name="year"
            label="2022"
            type="radio"
            checked={!oldMap}
            onChange={() => setOldMap(false)}
          />
        </InputGroup>
      </div>
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
      <h2 className="text-4xl font-bold text-center">
        {day.date.toLocaleDateString('sv-SE', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })}
      </h2>
      {/* <DatePicker
        date={yearMonthDay(day.date)}
        startDate={yearMonthDay(startDate)}
        finnishDate={yearMonthDay(finnishDate)}
      /> */}
      {diaryEntryTags}
      <h2>{day.place}</h2>
      {diaryEntryTags}
      {ksamsokImageTags}
      <div className="mb-6"></div>
      <Button
        onClick={() => {
          router.push(
            `/days/${
              typeof router.query.date === 'string' ? router.query.date : ''
            }/edit`
          )
        }}
      >
        Redigera
      </Button>
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
