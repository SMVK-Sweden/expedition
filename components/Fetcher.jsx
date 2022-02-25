import useSWR from 'swr'
//import Info from '../public/about_page.json'

const fetcher = (...args) => fetch(...args).then((res) => res.json())

export default function Fetcher() {
  const { data, error } = useSWR('about_page.json', fetcher)

  {
    if (error) return <div>Failed to load</div>

    if (!data) return <div>Loading...</div>

    return (
      <div className="text-[22px]">
        <div className="text-center">
          <h1>{data.rubrik}</h1>
        </div>

        <div className="text-left">
          <h1>{data.inledning}</h1>
        </div>

        <div className="text-left">
          <h1>{data.brodtext}</h1>
        </div>
      </div>
    )
  }
}
