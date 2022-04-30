// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient, Prisma, DiaryEntry } from '@prisma/client'
import { yearMonthDay } from '../../../lib/dateConversion'
const prisma = new PrismaClient()

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query
  const idStr = typeof id === 'string' ? id : id[0]

  if (req.method === 'GET') {
    const entry = await prisma.diaryEntry.findUnique({
      where: {
        id: idStr,
      },
    })
    if (entry !== null) return res.status(200).json(entry)
    else return res.status(404).json({ error: 'diaryEntry not found' })
  }

  if (req.method === 'PUT') {
    const updatedEntry: DiaryEntry = req.body
    const entry = await prisma.diaryEntry.update({
      where: { id: idStr },
      data: {
        author: updatedEntry.author,
        content: updatedEntry.content,
      },
    })
    if (entry !== null) return res.status(200).json(entry)
    else return res.status(500).json({ error: 'could not update diaryEntry' })
  }

  if (req.method === 'DELETE') {
    await prisma.diaryEntry.delete({
      where: { id: idStr },
    })
    return res.status(200).json({ message: 'deleted diaryEntry' })
  }

  res.status(500).json({ error: 'did not match anything' })
}
