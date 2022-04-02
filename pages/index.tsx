import { useRouter } from 'next/router'
import { useEffect } from 'react'
import todaysDate from '../lib/todaysDate'

export default function Index() {
  const router = useRouter()
  useEffect(() => {
    router.push(`/days/${todaysDate()}`)
  }, [])
  return <></>
}
