import { Day, DiaryEntry, KsamsokImage } from '@prisma/client'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Button from '../../../components/Button'
import ImageSearch from '../../../components/ImageSearch'
import { getDay, updateDay } from '../../../lib/api/days'
import { KsamsokImageWithDescription } from '../../../lib/types/ksamsokTypes'
import { DayWithContent } from '../../../lib/types/prismaTypes'
import { v4 as uuidv4 } from 'uuid' // generates uuid on the client (this is just a hack to get lists working for now)
import { SWRConfig } from 'swr'

export default function DayEditForm() {
  const router = useRouter()
  const [dayId, setDayId] = useState<string>('')
  const [place, setPlace] = useState<string>('')
  const [LatLng, setLatLng] = useState<[string, string]>(['', ''])
  const [diaryEntries, setDiaryEntries] = useState<DiaryEntry[]>([])
  const [ksamsokImages, setKsamsokImages] = useState<KsamsokImage[]>([])

  useEffect(() => {
    const fetchDays = async () => {
      if (typeof router.query.date === 'string') {
        const day: DayWithContent = await getDay(new Date(router.query.date))
        setDayId(day?.id || '')
        setPlace(day?.place || '')
        setLatLng(['' + day?.latitude || '', '' + day?.longitude || ''])
        setDiaryEntries(day?.diaryEntries || [])
        setKsamsokImages(day?.ksamsokImages || [])
      }
    }
    fetchDays()
  }, [router.query.date])

  return (
    <form>
      <h1>Redigera {router.query.date}</h1>
      {
        <Button
          onClick={(e) => {
            e.preventDefault()
            const day = {
              id: dayId,
              date:
                typeof router.query.date === 'string'
                  ? new Date(router.query.date)
                  : new Date(),
              place,
              latitude: parseFloat(LatLng[0]),
              longitude: parseFloat(LatLng[1]),
              diaryEntries,
              ksamsokImages,
            }
            if (typeof router.query.date === 'string')
              updateDay(new Date(router.query.date), day)
            if (typeof router.query.date === 'string')
              router.push(`/days/${router.query.date}`)
          }}
        >
          Spara
        </Button>
      }

      <h2>Plats</h2>
      <label htmlFor="" className="mx-3">
        plats
        <input
          type="text"
          value={place}
          className="mx-3"
          onChange={(e) => setPlace(e.target.value)}
        />
      </label>

      <h2>Koordinater</h2>
      <label htmlFor="" className="mx-3">
        latitud
        <input
          type="text"
          id="lat"
          className="mx-3"
          value={LatLng[0] || ''}
          onChange={(e) => setLatLng([e.target.value, LatLng[1]])}
        />
      </label>

      <label htmlFor="" className="mx-3">
        longitud
        <input
          type="text"
          id="long"
          className="mx-3"
          value={LatLng[1] || ''}
          onChange={(e) => setLatLng([LatLng[0], e.target.value])}
        />
      </label>

      <br />
      {diaryEntries.map((entry) => (
        <div key={entry.content} className="rounded-md bg-gray-200 m-6">
          <DiaryEntryForm
            id={entry.id}
            author={entry.author}
            content={entry.content}
            onChange={(e) =>
              setDiaryEntries(
                diaryEntries.map((each) =>
                  e.id === each.id
                    ? { ...each, author: e.author, content: e.content }
                    : each
                )
              )
            }
          />
          <Button
            className="w-auto"
            onClick={(e) => {
              e.preventDefault()
              const newEntries =
                diaryEntries.filter((e) => entry.id !== e.id) || []
              setDiaryEntries(newEntries)
            }}
          >
            Radera
          </Button>
        </div>
      ))}

      <Button
        onClick={(e) => {
          e.preventDefault()
          setDiaryEntries([
            ...diaryEntries,
            { id: uuidv4(), dayId, author: '', content: '' },
          ])
        }}
      >
        Ny anteckning
      </Button>

      <h2>Välj bilder</h2>
      <div className="h-1/2 max-w-6xl overflow-hidden ">
        <ImageSearch
          onMarked={(images) =>
            setKsamsokImages(
              images.map((e) => ({
                dayId,
                id: uuidv4(),
                url: e.src,
                description: e.description,
              }))
            )
          }
          markedImages={ksamsokImages.map((image) => ({
            src: image.url || '',
            description: image.description || '',
          }))}
        />
      </div>
    </form>
  )
}

interface DiaryEntryFormProps {
  id: string
  author: string
  content: string
  onChange: (values: any) => void
}

function DiaryEntryForm({
  id,
  author,
  content,
  onChange,
}: DiaryEntryFormProps) {
  const [authorInput, setAuthorInput] = useState(author)
  const [contentInput, setContentInput] = useState(content)

  return (
    <div
      onBlur={() =>
        onChange({ id, author: authorInput, content: contentInput })
      }
    >
      <label htmlFor="">
        författare
        <input
          type="text"
          value={authorInput}
          onChange={(e) => {
            setAuthorInput(e.target.value)
          }}
        />
      </label>
      <br />
      <label htmlFor="">
        <textarea
          cols={80}
          rows={10}
          onChange={(e) => {
            setContentInput(e.target.value)
          }}
          value={contentInput}
        />
      </label>
    </div>
  )
}
