// functions that fetches data from our api
import axios from 'axios' // has default settings in _app.tsx
import { DiaryEntry } from '@prisma/client'
import { yearMonthDay } from '../dateConversion'

export async function createDiaryEntry(author: string, content: string) {
  const { data, status } = await axios.post(`/api/diaryEntries/`)
  console.log('createDiaryEntry status = ', status)
  return data
}

export async function getDiaryEntry(id: string): Promise<DiaryEntry> {
  const { data, status } = await axios.get<DiaryEntry>(
    `/api/diaryEntries/${id}`
  )
  console.log('getDiaryEntry status = ', status)
  return data
}

// updatedDiaryEntry must contain {id, author, content}
export async function updateDiaryEntry(
  updatedDiaryEntry: DiaryEntry
): Promise<DiaryEntry> {
  const { id } = updatedDiaryEntry
  const { data, status } = await axios.put<DiaryEntry>(
    `/api/diaryEntries/${id}`,
    updatedDiaryEntry
  )
  console.log('updateDiaryEntry status = ', status)
  return data
}

export async function deleteDiaryEntry(id: string) {
  const { data, status } = await axios.delete(`/api/diaryEntries/${id}`)
  console.log('deleteDiaryEntry status = ', status)
}

export async function getDiaryEntries(): Promise<DiaryEntry[]> {
  const { data, status } = await axios.get<DiaryEntry[]>('/api/diaryEntries')
  console.log('getDays status = ', status)
  return data
}
