import { useRouter } from 'next/router'
import { useEffect } from 'react'
import ImageSearch from '../../../components/ImageSearch'
import { getDay } from '../../../lib/api/days'
import { KsamsokImageWithDescription } from '../../../lib/types/ksamsokTypes'
import { DayWithContent } from '../../../lib/types/prismaTypes'

export default function DayEdit() {
  const router = useRouter()
  useEffect(() => {
    const fetchDays = async () => {
      if (typeof router.query.date === 'string') {
        const day: DayWithContent = await getDay(new Date(router.query.date))
      }
    }
    fetchDays()
  }, [router.query.date])

  return (
    <>
      <h1>Redigera {router.query.date}</h1>

      <h2>Välj bilder</h2>
      <div className="h-1/2 max-w-6xl">
        <ImageSearch onMarked={(e) => console.log(e)} />
      </div>
    </>
  )
}
