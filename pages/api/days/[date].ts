// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient, Prisma } from '@prisma/client'
import { yearMonthDay } from '../../../lib/dateConversion'
const prisma = new PrismaClient()

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { date } = req.query
  const day = await prisma.day.findUnique({
    where: {
      date: typeof date === 'string' ? new Date(date) : new Date(date[0]),
    },
    include: { diaryEntries: true },
  })

  res.status(200).json(day)
}
