import { useState } from 'react'
import Head from 'next/head'
import Map from '../components/Map'
import { Marker } from '../components/Map/Map'
import CalendarData from '../pages/api/calendar_data.json'
import { todaysTravelDateIndex } from '../shared/utils'
import Button from '../components/Button'
import SideBar from '../components/SideBar'
import D3WorldMap from '../components/D3WorldMap'

export interface InfoParagraphsProps {
  Plats?: string
  coords?: [number, number]
  Datum?: string
  stories: any
}

export function InfoParagraphs({
  Datum,
  coords,
  Plats,
  stories,
}: InfoParagraphsProps) {
  // create the paragraps to display info about the day
  return (
    <div className="prose lg:prose-xl">
      <h3 className="text-gray-700">{Datum}</h3>
      <h2>{Plats}</h2>
      {coords && <h5>{`${coords[0]}, ${coords[1]}`}</h5>}
      {Object.keys(stories).map((key, i) => {
        if (key === 'Länk/Objekt') {
          return (
            <p className="mb-10" key={i}>
              <span className="font-bold">{`${key}: `}</span>
              <a href={stories[key]} className="text-blue-500">
                {stories[key]}
              </a>
            </p>
          )
        } else {
          return (
            <div key={i}>
              <h4>{key}</h4>
              <p className="mb-10">{stories[key]}</p>
            </div>
          )
        }
      })}
    </div>
  )
}

export function findBestCoords(index: number): [number, number] {
  for (let i = index; i > 0; i--) {
    if (CalendarData[i].Koordinater)
      return CalendarData[i].Koordinater as [number, number]
  }
  for (let i = index; i < CalendarData.length; i++) {
    if (CalendarData[i].Koordinater)
      return CalendarData[i].Koordinater as [number, number]
  }
  return [0, 0]
}

export default function Home() {
  const [index, setIndex] = useState(todaysTravelDateIndex())
  const currentCalendarData = CalendarData[index]
  const center: [number, number] =
    currentCalendarData.Koordinater === undefined
      ? findBestCoords(index)
      : (currentCalendarData.Koordinater as [number, number])

  const markers: Marker[] = CalendarData.map(
    (data, index) =>
      ({
        coords: data.Koordinater,
        index,
        hasInformation: Object.keys(data).length > 3,
      } as Marker)
  )

  const decreaseIndex = () => setIndex(index - 1 < 0 ? 0 : index - 1)

  const increaseIndex = () =>
    setIndex(
      index + 1 > CalendarData.length ? CalendarData.length - 1 : index + 1
    )

  const { Koordinater, Plats, Datum, ...stories } = currentCalendarData

  const coords = Koordinater as [number, number]

  // generate a path of the past coordinates
  const path = CalendarData.filter((elem, elemIndex) => elemIndex < index)
    .filter((elem) => elem.Koordinater)
    .map((elem) => elem.Koordinater)

  return (
    <div>
      <Head>
        <title>Expedition vanadis</title>
        <link rel="icon" href="/ship.png" />
      </Head>

      <SideBar />

      <div className="flex flex-col overflow-hidden">
        <div
          className="w-full max-w-6xl m-auto mt-10"
          style={{ height: '50vh' }}
        >
          {/* <Map
            position={center}
            zoom={4}
            markers={markers}
            clickMarker={(i) => setIndex(i)}
          /> */}
          <D3WorldMap boatCoordinates={Koordinater} path={path} />
        </div>
        <div className="bg-white max-w-6xl w-full m-auto mt-30">
          <div className="flex gap-x-2">
            <Button className="flex-auto" onClick={decreaseIndex}>
              igår
            </Button>
            <Button className="flex-auto" onClick={increaseIndex}>
              imorgon
            </Button>
          </div>
          <input
            className="w-full p-4"
            type="range"
            value={index}
            min={0}
            max={CalendarData.length - 1}
            onChange={(e) => setIndex(parseInt(e.target.value))}
          />
          <div className="w-full my-12">
            <InfoParagraphs
              coords={coords}
              Plats={Plats}
              Datum={Datum}
              stories={stories}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
