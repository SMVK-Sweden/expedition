// functions that fetches data from our api
import axios from 'axios'
import { DayWithDiaryEntries } from '../types/prismaTypes'
import { yearMonthDay } from '../dateConversion'

// fetch one day
//export function createDay(day: DayWithDiaryEntries) {}

// if date is a string it is expected to be a yyyy-mm-dd
export async function getDay(date: Date): Promise<DayWithDiaryEntries> {
  if (typeof date === 'string') console.log(date)
  const { data, status } = await axios.get<DayWithDiaryEntries>(
    typeof date === 'string'
      ? `/api/days/${date}`
      : `/api/days/${yearMonthDay(date)}`
  )
  return data
}

//export function updateDay(date: Date, updatedDay: DayWithDiaryEntries) {}

//export function deleteDay(date: Date) {}

// fetch all days
export async function getDays(): Promise<DayWithDiaryEntries[]> {
  const { data, status } = await axios.get<DayWithDiaryEntries[]>('/api/days', {
    headers: { Accept: 'application/json' },
  })
  return data
}
