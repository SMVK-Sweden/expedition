import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
import dateTime from 'date-and-time'

export async function readDayFromDate(date: string | Date) {
  const day = await prisma.day.findFirst({
    where: {
      date: new Date(date),
    },
    include: { diaryEntries: true },
  })

  return day
}

export async function readAllDayCoordinatesBefore(date: string | Date) {
  const days = await prisma.day.findMany({
    select: { date: true, latitude: true, longitude: true },
    where: {
      date: {
        lte: new Date(date),
      },
    },
    orderBy: { date: 'asc' },
  })

  return days
}

export async function readAllDayDates() {
  const days = await prisma.day.findMany({ select: { date: true } })
  const dates = days.map((day) => dateTime.format(day.date, 'YYYY-MM-DD'))

  return dates
}

export async function readSorroundingDates(date: Date) {
  const current = new Date(date)
  const previous = await readDayFromDate(
    yearMonthDay(new Date(current.getTime() - 86400000))
  ) // 86400000 = one day in ms
  const following = await readDayFromDate(
    yearMonthDay(new Date(current.getTime() + 86400000))
  )

  return [previous, following]
}

// helpers
export function yearMonthDay(date: Date): string {
  return dateTime.format(date, 'YYYY-MM-DD')
}
