import { useState, useEffect } from 'react'
import { ksamsokJson } from '../shared/ksamsok'

interface KsamsokImageProps {
  // this is a quickfix
  [key: string]: any
}

export function KsamsokImage({
  lowresSource,
  itemDescription,
}: KsamsokImageProps) {
  const descriptionTags = Array.isArray(itemDescription) ? (
    itemDescription.map((desc) => {
      return <p>{desc}</p>
    })
  ) : itemDescription ? (
    <p>{itemDescription}</p>
  ) : null

  return (
    <div>
      <img src={lowresSource} alt="no image" />
      {descriptionTags}
    </div>
  )
}

export default function KsamsokImages() {
  const [records, setRecords] = useState<KsamsokImageProps[]>([])
  useEffect(() => {
    const f = async () => {
      const res = await ksamsokJson(
        'vanadis AND thumbnailExists=j',
        'lowresSource,itemDescription,itemType'
      )
      setRecords(res)
    }

    f()
  }, [])

  const ksamsokImages = records
    ? records.map((record) => {
        return (
          <KsamsokImage
            key={record.itemId}
            lowresSource={record.lowresSource}
            itemDescription={record.itemDescription}
          />
        )
      })
    : null

  return <div>{ksamsokImages}</div>
}
