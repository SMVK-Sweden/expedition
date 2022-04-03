// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient, Prisma } from '@prisma/client'
import { yearMonthDay } from '../../../lib/dateConversion'
const prisma = new PrismaClient()

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const all = await prisma.day.findMany({
    select: { date: true },
    orderBy: { date: 'asc' },
  })

  res.status(200).json(all.map((row) => yearMonthDay(row.date)))
}
