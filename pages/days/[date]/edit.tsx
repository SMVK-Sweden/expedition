import { useRouter } from 'next/router'

export default function DayEdit() {
  const router = useRouter()

  return (
    <>
      <h1>edit sida för</h1>
      <p>{router.query.date}</p>
    </>
  )
}
