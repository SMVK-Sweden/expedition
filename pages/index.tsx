import { useRouter } from 'next/router'
import { useEffect } from 'react'
import todaysDate from './lib/todaysDate'

export default function Index() {
  const router = useRouter()
  useEffect(() => {
    const today = todaysDate()
    router.replace('/', `/days/${today}`)
  })

  return <></>
}
