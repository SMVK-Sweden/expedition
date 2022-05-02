import { queryHelpers } from '@storybook/testing-library'
import axios from 'axios'
import { useRouter } from 'next/router'
import { useEffect, useMemo, useState } from 'react'
import {
  Button,
  Form,
  FormControl,
  FormLabel,
  InputGroup,
} from 'react-bootstrap'
import useSWR from 'swr'
import { getDay, updateDay } from '../../../lib/api/days'
import { DayWithContent } from '../../../lib/types/prismaTypes'
import { useForm } from 'react-hook-form'
import { KsamsokImageProps } from '../../../lib/ksamsok'
import { DiaryEntry } from '@prisma/client'

export default function DayEditForm() {
  const router = useRouter()

  const { data, error } = useSWR<DayWithContent>(
    new Date(router.query.date as string),
    getDay
  )
  const isLoading = !error && !data

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    defaultValues: useMemo(() => {
      return {
        place: data?.place,
        latitude: data?.latitude,
        longitude: data?.longitude,
      }
    }, [data]),
  })

  useEffect(() => {
    reset(data)
    const images = data?.ksamsokImages.map(({ url, description }) => ({
      url,
      description,
    }))
    setImages(images || [])
    setDiaries(
      data?.diaryEntries.map(({ author, content }) => ({ author, content })) ||
        []
    )
  }, [data, reset])

  const onSubmit = (data: any) =>
    updateDay(new Date(router.query.date as string), {
      ...data,
      latitude: parseFloat(data.latitude),
      longitude: parseFloat(data.longitude),
      ksamsokImages: newImages,
      diaryEntries: diaries,
    })

  const [newImages, setImages] = useState<KsamsokImageProps[]>([])
  const [diaries, setDiaries] = useState<
    Pick<DiaryEntry, 'content' | 'author'>[]
  >([])

  const handleAddImage = () => {
    const url = prompt('Vilken URL?')
    if (url === undefined) return
    const parts = url?.split('/')
    if (parts === undefined) return
    parts[0] = 'https:'
    parts[parts.length - 2] = 'jsonld'
    const newUrl = parts.join('/')
    axios.get(newUrl).then(() => {
      setImages([...newImages, { url: newUrl, description: '' }])
    })
  }

  const changeDiaries = (
    index: number,
    value: string,
    field: 'author' | 'content'
  ) => {
    const copy = diaries
    copy[index][field] = value
    setDiaries([...copy])
  }

  return (
    <div className="w-full max-w-4xl m-auto prose py-10 px-5 bg-brown-100 h-full shadow">
      <h1 className="">Redigera dagsinformation</h1>
      <h2 className="mt-0">{router.query.date}</h2>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Label>Destinationsresa</Form.Label>
          <InputGroup className="mb-3">
            <FormControl aria-describedby="place" {...register('place')} />
          </InputGroup>
          <Form.Label>Koordinater</Form.Label>
          <InputGroup className="mb-3">
            <InputGroup.Text>Latitude</InputGroup.Text>
            <FormControl
              aria-describedby="latitude"
              type="number"
              step="0.000000000000001"
              {...register('latitude')}
            />
          </InputGroup>
          <InputGroup className="mb-3">
            <InputGroup.Text>Longitude</InputGroup.Text>
            <FormControl
              aria-describedby="longitude"
              type="number"
              step="0.000000000000001"
              {...register('longitude')}
            />
          </InputGroup>
          <div className="my-4">
            <FormLabel>Dagböcker</FormLabel>
            {diaries.map((diary, index) => (
              <div key={index} className="bg-brown-200 shadow my-4 rounded p-6">
                <FormLabel>Dagboksförfattare</FormLabel>
                <InputGroup>
                  <FormControl
                    value={diary.author}
                    onChange={(e) =>
                      changeDiaries(index, e.target.value, 'author')
                    }
                  />
                </InputGroup>
                <FormLabel>Text</FormLabel>
                <InputGroup>
                  <FormControl
                    value={diary.content}
                    as="textarea"
                    rows={7}
                    onChange={(e) =>
                      changeDiaries(index, e.target.value, 'content')
                    }
                  />
                </InputGroup>
              </div>
            ))}
            <Button
              variant="secondary"
              className="w-full"
              onClick={() =>
                setDiaries([
                  ...diaries,
                  {
                    author: '',
                    content: '',
                  },
                ])
              }
            >
              Lägg till dagbok
            </Button>
          </div>
          <FormLabel>Bilder</FormLabel>
          {newImages.map((image) => (
            <InputGroup key={image.url}>
              <FormControl disabled value={image.url} />
              <Button
                variant="danger"
                onClick={() =>
                  setImages(newImages.filter((img) => img.url !== image.url))
                }
              >
                Ta bort
              </Button>
            </InputGroup>
          ))}
          <Button
            variant="secondary"
            className="w-full my-2"
            onClick={handleAddImage}
          >
            Lägg till bild
          </Button>
          <Button className="w-full" type="submit" disabled={isSubmitting}>
            Spara ändringar
          </Button>
        </Form>
      )}
    </div>
  )
}
