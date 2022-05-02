import CanvasMap from '../../../components/Map/CanvasMap'
import Button from 'react-bootstrap/Button'
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
import axios from 'axios'
import { KsamsokImageProps, processRecord } from '../../../lib/ksamsok'

interface DayProps {
  day: DayWithContent
  previousDays: Day[]
  followingDays: Day[]
  images: KsamsokImageProps[]
}

export default function DayPage({
  day,
  previousDays,
  followingDays,
  images,
}: DayProps) {
  const [oldMap, setOldMap] = useState(true)
  const router = useRouter()

  const diaryEntryTags = day.diaryEntries?.map((entry: DiaryEntry) => (
    <Note
      key={entry.id}
      id={entry.id}
      author={entry.author}
      content={entry.content}
    />
  ))

  const ksamsokImageTags = images?.map(
    (image: KsamsokImageProps) =>
      image && (
        <ImageWithDescription
          src={image.url}
          description={image.description || undefined}
          key={image.url}
        />
      )
  )

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
      <div className="flex gap-x-2 mb-14">
        <Link
          href={yesterdayDate ? `/days/${yearMonthDay(yesterdayDate)}` : ''}
          passHref
        >
          <Button
            className={`flex-auto ${
              yesterdayDate ? '' : 'bg-slate-200 bg hover:bg-slate-200 '
            }`}
          >
            igår
          </Button>
        </Link>
        <Link
          href={tomorrowDate ? `/days/${yearMonthDay(tomorrowDate)}` : ''}
          passHref
        >
          <Button
            className={`flex-auto ${
              tomorrowDate ? '' : 'bg-slate-200 bg hover:bg-slate-200 '
            }`}
          >
            imorgon
          </Button>
        </Link>
      </div>
      <h2 className="text-2xl font-semibold">
        {day.date.toLocaleDateString('sv-SE', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })}
      </h2>
      <h3 className="font-bold text-4xl">{day.place}</h3>
      {/* <DatePicker
        date={yearMonthDay(day.date)}
        startDate={yearMonthDay(startDate)}
        finnishDate={yearMonthDay(finnishDate)}
      /> */}
      {diaryEntryTags}
      {ksamsokImageTags}
      <div className="mb-6"></div>
      <Link href={`/days/${router.query.date as string}/edit`} passHref>
        <Button>Redigera</Button>
        {/* <Button
        // onClick={() => {
        //   router.push(
        //     `/days/${
        //       typeof router.query.date === 'string' ? router.query.date : ''
        //     }/edit`
        //   )
        // }}
        >
          Redigera
        </> */}
      </Link>
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
    fallback: 'blocking',
  }
}

interface staticPropsParams {
  params: {
    date: string
  }
}

async function getImages(ksamsokImages: KsamsokImage[]) {
  const promises = await Promise.all(
    ksamsokImages.map(async (image) =>
      axios.get(image.url).then((res) => processRecord(res.data))
    )
  )
  return promises
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

  const images = await getImages(day?.ksamsokImages || [])

  return {
    props: {
      day,
      previousDays,
      followingDays,
      images,
    },
    revalidate: 10,
  }
}
