// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient, Prisma, DiaryEntry } from '@prisma/client'
const prisma = new PrismaClient()

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    const all = await prisma.diaryEntry.findMany({})
    return res.status(200).json(all)
  }

  if (req.method === 'POST') {
    const newEntry: DiaryEntry = req.body
    const entry = await prisma.diaryEntry.create({
      data: {
        author: newEntry.author,
        content: newEntry.content,
      },
    })
    if (entry !== null) return res.status(200).json(entry)
    else return res.status(500).json({ error: 'could not create diaryEntry' })
  }
}
