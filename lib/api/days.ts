// functions that fetches data from our api
import axios from 'axios' // has default settings in _app.tsx
import { DayWithContent } from '../types/prismaTypes'
import { yearMonthDay } from '../dateConversion'

export async function createDay(date: Date) {
  // creates a "empty day" with only date and id
  const { data, status } = await axios.post(`/api/days/${yearMonthDay(date)}`)

  return data
}

// if date is a string it is expected to be a yyyy-mm-dd
export async function getDay(date: Date): Promise<DayWithContent> {
  const { data, status } = await axios.get<DayWithContent>(
    `/api/days/${yearMonthDay(date)}`
  )

  return data
}

export async function updateDay(date: Date, updatedDay: DayWithContent) {
  const { data, status } = await axios.put<DayWithContent>(
    `/api/days/${yearMonthDay(date)}`,
    updatedDay
  )

  return data
}

export async function deleteDay(date: Date) {
  const { data, status } = await axios.delete(`/api/days/${yearMonthDay(date)}`)
}

export async function getDays(): Promise<DayWithContent[]> {
  const { data, status } = await axios.get<DayWithContent[]>('/api/days')

  return data
}
