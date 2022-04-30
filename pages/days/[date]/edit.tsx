import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { getDay } from '../../../lib/api/days'
import { DayWithDiaryEntries } from '../../../lib/types/prismaTypes'

export default function DayEdit() {
  const router = useRouter()
  useEffect(() => {
    const fetchDays = async () => {
      if (typeof router.query.date === 'string') {
        const day: DayWithDiaryEntries = await getDay(
          new Date(router.query.date)
        )
        console.log(day)
      }
    }
    fetchDays()
  }, [router.query.date])

  return (
    <>
      <h1>edit sida för</h1>
      <p>{router.query.date}</p>
    </>
  )
}
