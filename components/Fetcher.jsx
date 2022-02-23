import useSWR from 'swr'
import info from '../pages/api/about_page.json'

const fetcher = (...args) => fetch(...args).then((res) => res.json())

export default function Fetcher() {
  const { data, error } = useSWR('../pages/api/about_page.json', fetcher)

  if (error) return <div>Failed to load</div>
  if (!data) return <div>Loading...</div>

  return (
    <div>
      <h1>{data.firstName}</h1>
      <p>{data.lastName}</p>
    </div>
  )
}
