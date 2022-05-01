import { useState, useEffect } from 'react'
import { getImagesWithDescription } from '../lib/ksamsok'
import ImageWithDescription from './ImageWithDescription'
import {
  compareKsamsokImageWithDescription,
  KsamsokImageWithDescription,
} from '../lib/types/ksamsokTypes'
import Button from './Button'

interface ImageSearchProps {
  onMarked: (images: KsamsokImageWithDescription[]) => void
  markedImages: KsamsokImageWithDescription[]
}

export default function ImageSearch({
  onMarked,
  markedImages,
}: ImageSearchProps) {
  const [query, setQuery] = useState('')
  const [records, setRecords] = useState<KsamsokImageWithDescription[]>([])
  const [marked, setMarked] =
    useState<KsamsokImageWithDescription[]>(markedImages)
  useEffect(() => {
    const f = async () => {
      const res = await getImagesWithDescription(query)
      setRecords(res)
    }

    f()
  }, [])

  return (
    <div className="rounded-md bg-gray-100 overflow-scroll h-full">
      <form
        onSubmit={(e) => {
          e.preventDefault()
          getImagesWithDescription(query).then((res) => setRecords(res))
        }}
      >
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="border-black rounded-md"
        />
        <Button className="mx-3 w-auto">
          <input type="submit" value="sök" />
        </Button>
      </form>
      <div className="rounded-md bg-gray-200">
        {records.map((r) => (
          <div
            key={r.src}
            className={`${
              markedInList(r, marked)
                ? 'border-black border-4 bg-gray-300'
                : 'hover:border-gray-300 hover:border-2'
            }`}
            onClick={() => {
              const m = Array.from(marked)
              if (markedInList(r, marked)) {
                const newMarked = m.filter(
                  (e) => !compareKsamsokImageWithDescription(e, r)
                )
                setMarked(newMarked)
                onMarked(newMarked)
              } else {
                const newMarked = [...m, r]
                setMarked(newMarked)
                onMarked(newMarked)
              }
            }}
          >
            <ImageWithDescription src={r.src} description={r.description} />
          </div>
        ))}
      </div>
    </div>
  )
}

function markedInList(
  elem: KsamsokImageWithDescription,
  list: KsamsokImageWithDescription[]
): boolean {
  for (let i = 0; i < list.length; i++) {
    if (compareKsamsokImageWithDescription(elem, list[i])) return true
  }
  return false
}
