import { useState } from 'react'
import Head from 'next/head'
import Navbar from '../components/Navbar'
import Timeline from '../components/Timeline'
import Map from '../components/Map'
import styles from '../styles/Home.module.css'
import CalendarData from '../pages/api/calendar_data.json'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'

function InfoParagraphs({ data }: { data: any }) {
  console.log(data)
  const { Datum, Koordinater, Plats, ...stories } = data
  // create the paragraps to display info about the day
  return (
    <div className="prose lg:prose-xl">
      <h3 className="text-gray-700">{Datum}</h3>
      <h2>{Plats}</h2>
      {Object.keys(stories).map((key) => {
        if (key === 'Länk/Objekt') {
          return (
            <p className="mb-10">
              <span className="font-bold">{`${key}: `}</span>
              <a href={stories[key]} className="text-blue-500">
                {stories[key]}
              </a>
            </p>
          )
        } else {
          return (
            <div>
              <h4>{key}</h4>
              <p className="mb-10">{stories[key]}</p>
            </div>
          )
        }
      })}
    </div>
  )
}

function findBestCoords(index: number): [number, number] {
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
  const [index, setIndex] = useState(0)
  const currentCalendarData = CalendarData[index]
  const center: [number, number] =
    currentCalendarData.Koordinater === undefined
      ? findBestCoords(index)
      : (currentCalendarData.Koordinater as [number, number])

  const markers: [number, number][] = CalendarData.map(
    (data) => data.Koordinater as [number, number]
  )

  const decreaseIndex = () => setIndex(index - 1 < 0 ? 0 : index - 1)

  const increaseIndex = () =>
    setIndex(
      index + 1 > CalendarData.length ? CalendarData.length - 1 : index + 1
    )

  return (
    <div>
      <Head>
        <title>Expedition vanadis</title>
        <link rel="icon" href="/ship.png" />
      </Head>
      <div className="flex flex-col overflow-hidden">
        <Map
          position={center}
          markers={markers}
          clickMarker={(i) => setIndex(i)}
        />

        {/* 
        <Timeline
          calendarData={CalendarData}
          currentCalendarData={currentCalendarData}
          changeCurrentCalendarData={(elem: any) =>
            setCurrentCalendarData(elem)
          }
        /> */}
        <div className="bg-white max-w-6xl w-full m-auto">
          <div className="flex">
            <button
              onClick={decreaseIndex}
              className="flex-auto bg-gray-100 border-1 hover:bg-white transition-all px-4 py-4"
            >
              igår
            </button>
            <button
              onClick={increaseIndex}
              className="flex-auto bg-gray-100 border-1 hover:bg-white transition-all px-4 py-4"
            >
              imorgon
            </button>
          </div>
          <input
            className="w-full p-4"
            type="range"
            value={index}
            min={0}
            max={CalendarData.length}
            onChange={(e) => setIndex(parseInt(e.target.value))}
          />
          <div className="w-full my-12">
            <InfoParagraphs data={currentCalendarData} />
          </div>
        </div>
      </div>
    </div>
  )
}
