// functions that fetches data from our api
import axios from 'axios' // has default settings in _app.tsx
import { DayWithDiaryEntries } from '../types/prismaTypes'
import { yearMonthDay } from '../dateConversion'

export async function createDay(date: Date) {
  // creates a "empty day" with only date and id
  const { data, status } = await axios.post(`/api/days/${yearMonthDay(date)}`)
  console.log('post status = ', status)
  return data
}

// if date is a string it is expected to be a yyyy-mm-dd
export async function getDay(date: Date): Promise<DayWithDiaryEntries> {
  const { data, status } = await axios.get<DayWithDiaryEntries>(
    `/api/days/${yearMonthDay(date)}`
  )
  console.log('get status = ', status)
  return data
}

export async function updateDay(date: Date, updatedDay: DayWithDiaryEntries) {
  const { data, status } = await axios.put<DayWithDiaryEntries>(
    `/api/days/${yearMonthDay(date)}`,
    updatedDay
  )
  console.log('put status = ', status)
  return data
}

//export function deleteDay(date: Date) {}

export async function getDays(): Promise<DayWithDiaryEntries[]> {
  const { data, status } = await axios.get<DayWithDiaryEntries[]>('/api/days')
  console.log('get status = ', status)
  return data
}
