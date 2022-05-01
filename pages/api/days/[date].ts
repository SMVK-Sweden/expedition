// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient, Prisma, DiaryEntry } from '@prisma/client'
import { yearMonthDay } from '../../../lib/dateConversion'
import { DayWithContent } from '../../../lib/types/prismaTypes'
const prisma = new PrismaClient()

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { date } = req.query
  const datestr = typeof date === 'string' ? date : date[0]

  if (req.method === 'GET') {
    // give a day and all its diaryEntries
    const day = await prisma.day.findUnique({
      where: {
        date: new Date(datestr),
      },
      include: { diaryEntries: true, ksamsokImages: true },
    })

    if (day !== null) return res.status(200).json(day)
    else return res.status(400).json({ error: 'day not found' })
  }

  if (req.method === 'POST') {
    // create a day (empty with no data)
    const day = await prisma.day.create({
      data: {
        date: new Date(datestr),
      },
    })
    if (day !== null) return res.status(200).json(day)
    else return res.status(500).json({ error: 'could not create day' })
  }

  if (req.method === 'PUT') {
    // update a day
    const updatedDay: DayWithContent = req.body
    // drop previous relations
    await prisma.diaryEntry.deleteMany({ where: { dayId: updatedDay.id } })
    await prisma.ksamsokImage.deleteMany({ where: { dayId: updatedDay.id } })
    await prisma.day.update({
      where: { date: new Date(datestr) },
      data: {
        diaryEntries: { set: [] },
        ksamsokImages: { set: [] },
      },
    })

    // update
    const updatedEntries = updatedDay.diaryEntries.map((e) => ({
      author: e.author,
      content: e.content,
    }))
    const updatedKsamsokImages = updatedDay.ksamsokImages.map((im) => ({
      url: im.url,
      description: im.description || '',
    }))
    console.log(updatedDay)
    const day = await prisma.day.update({
      where: { date: new Date(datestr) },
      data: {
        place: updatedDay.place,
        latitude: updatedDay.latitude,
        longitude: updatedDay.longitude,
        diaryEntries: { create: updatedEntries },
        ksamsokImages: { create: updatedKsamsokImages },
      },
    })
    return res.status(200).json(day)
  }

  if (req.method === 'DELETE') {
    // delete a day
    await prisma.day.delete({
      where: { date: new Date(datestr) },
    })
    return res.status(200).json({ message: 'deleted day' })
  }

  return res.status(500).json({ error: 'did not match anything' })
}
