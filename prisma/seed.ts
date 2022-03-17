import { PrismaClient, Prisma } from '@prisma/client'
const prisma = new PrismaClient()
import CalendarData from './seeds/calendar_data.json'

async function main() {
  // convert CalendarData to a format that works better with prisma
  const daySeeds: Prisma.DayCreateInput[] = []
  for (const day of CalendarData) {
    const daySeed: Prisma.DayCreateInput = {
      date: new Date(), // this will be replaced because all data has 'Datum'
    }

    interface diaryEntry {
      author: string
      content: string
    }
    const diaryEntries: diaryEntry[] = []

    for (const [field, value] of Object.entries(day)) {
      // scalar fields on Day
      switch (field) {
        case 'Datum':
          daySeed.date = new Date(value)
          break
        case 'Koordinater':
          daySeed.latitude = value[0]
          daySeed.longitude = value[1]
          break
        case 'Plats':
          daySeed.place = value
          break
      }
      // DiaryEntry relations
      switch (field) {
        case 'Humblas dagbok händelser':
        case 'Erikson/Stolpe':
        case 'Mårtensson, Händelse':
        case 'Sjöofficer Svante Natt och Dag händelser':
          diaryEntries.push({ author: field, content: value })
          break
      }
    }
    // add the calls to create diary entries for the day!
    daySeed.diaryEntries = { create: diaryEntries }
    daySeeds.push(daySeed)
  }
  daySeeds.forEach(
    async (d: Prisma.DayCreateInput) => await prisma.day.create({ data: d })
  )
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
