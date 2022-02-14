import { useState, useEffect } from 'react'
import { vanadisImages } from '../shared/ksamsok'

interface KsamsokImageProps {
  source: string
  description: string
}

export function KsamsokImage({ source, description }: KsamsokImageProps) {
  return (
    <div>
      <img src={source} alt="no image" />
      <p>{description}</p>
    </div>
  )
}

export default function KsamsokImages() {
  const [records, setRecords] = useState<KsamsokImageProps[]>([])
  useEffect(() => {
    const f = async () => {
      const res = await vanadisImages()
      setRecords(res)
    }

    f()
  }, [])

  return (
    <div>
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
