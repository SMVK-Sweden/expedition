import { queryHelpers } from '@storybook/testing-library'
import axios from 'axios'
import { useRouter } from 'next/router'
import { useEffect, useMemo, useState } from 'react'
import { Button, Form, FormControl, InputGroup } from 'react-bootstrap'
import useSWR from 'swr'
import { getDay, getDayURL, updateDay } from '../../../lib/api/days'
import { DayWithDiaryEntries } from '../../../lib/types/prismaTypes'
import { useForm } from 'react-hook-form'

export default function DayEdit() {
  const router = useRouter()

  const { data, error } = useSWR<DayWithDiaryEntries>(
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
      console.log(data)
      return {
        place: data?.place,
        latitude: data?.latitude,
        longitude: data?.longitude,
      }
    }, [data]),
  })

  useEffect(() => {
    reset(data)
  }, [data, reset])

  const onSubmit = (data: any) =>
    updateDay(new Date(router.query.date as string), {
      ...data,
      latitude: parseFloat(data.latitude),
      longitude: parseFloat(data.longitude),
    })

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
              step="0.00000000000001"
              {...register('latitude')}
            />
          </InputGroup>
          <InputGroup className="mb-3">
            <InputGroup.Text>Longitude</InputGroup.Text>
            <FormControl
              aria-describedby="longitude"
              type="number"
              step="0.00000000000001"
              {...register('longitude')}
            />
          </InputGroup>
          <Button className="w-full" type="submit" disabled={isSubmitting}>
            Spara ändringar
          </Button>
        </Form>
      )}
    </div>
  )
}
