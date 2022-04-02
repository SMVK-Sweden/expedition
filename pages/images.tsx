import { useState, useEffect } from 'react'
import { imageWithDescriptionMany } from '../lib/ksamsok'

interface KsamsokImageProps {
  source: string
  description: string
}

function KsamsokImage({ source, description }: KsamsokImageProps) {
  return (
    <div>
      <img src={source} alt="bild saknas" />
      <p>{description}</p>
    </div>
  )
}

export default function KsamsokImages() {
  const [query, setQuery] = useState('text="vanadis" AND thumbnailExists=j')
  const [records, setRecords] = useState<KsamsokImageProps[]>([])
  useEffect(() => {
    const f = async () => {
      const res = await imageWithDescriptionMany(query)
      setRecords(res)
    }

    f()
  }, [])

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          imageWithDescriptionMany(query).then((res) => setRecords(res))
        }}
      >
        <textarea
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="border-black"
        />
        <input type="submit" value="sök" className="ml-10 bg-blue-300" />
      </form>

      {records.map((r) => (
        <KsamsokImage
          key={r.source}
          source={r.source}
          description={r.description}
        />
      ))}
    </div>
  )
}
