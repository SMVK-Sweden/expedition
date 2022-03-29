import { DiaryEntry, PrismaClient, Prisma } from '@prisma/client'
const prisma = new PrismaClient()
import dateTime from 'date-and-time'

export interface DayModel {
  id: string
  date: string
  latitude: number
  longitude: number
  diaryEntries: DiaryEntry[]
}

// test
export async function readDayFromDate(date: Date | string) {
  const theDate = new Date(date)
  const day = await prisma.day.findFirst({
    where: {
      date: theDate.toISOString(),
    },
    include: { diaryEntries: true },
  })

  if (day)
    return {
      id: day?.id,
      date: yearMonthDay(day.date),
      latitude: day?.latitude,
      longitude: day?.longitude,
      diaryEntries: day?.diaryEntries,
    } as DayModel

  return null
}

export async function readTraveledPath(date: string | Date) {
  const days = await prisma.day.findMany({
    select: { latitude: true, longitude: true },
    where: {
      date: {
        lte: new Date(date),
      },
    },
    orderBy: { date: 'asc' },
  })
  const path = days
    .filter((day) => day.longitude && day.latitude)
    .map((day) => [day.latitude, day.longitude])

  return path as [number, number][]
}

export async function readAllDayDates() {
  const days = await prisma.day.findMany({ select: { date: true } })
  const dates = days.map((day) => dateTime.format(day.date, 'YYYY-MM-DD'))

  return dates
}

export async function readSorroundingDateStrings(date: Date | string) {
  const current = new Date(date)
  const previous = await readDayFromDate(new Date(current.getTime() - 86400000)) // 86400000 = one day in ms
  const following = await readDayFromDate(
    new Date(current.getTime() + 86400000)
  )

  return [previous?.date || null, following?.date || null] as [
    string | null,
    string | null
  ]
}

// helpers
export function yearMonthDay(date: Date): string {
  return dateTime.format(new Date(date), 'YYYY-MM-DD')
}
