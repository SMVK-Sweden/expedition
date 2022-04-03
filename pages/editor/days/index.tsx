import useSWR, { Fetcher } from 'swr'
import Link from 'next/link'

const fetcher: Fetcher = (url: string) => fetch(url).then((res) => res.json())

export default function EditorDaysIndex() {
  const { data, error } = useSWR('/api/days', fetcher)

  let content: JSX.Element
  if (error) {
    content = <p>kunde inte hämta data</p>
  } else if (!data) {
    content = <p>laddar...</p>
  } else {
    content = data.map((date: string) => (
      <div key={date}>
        <Link href={`/editor/days/${date}`}>{date}</Link>
      </div>
    ))
  }

  return (
    <div className="mt-6 w-full max-w-6xl">
      <h3 className="text-center">Ändra info om resans dagar</h3>
      {content}
    </div>
  )
}
