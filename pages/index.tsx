import {useState} from 'react'
import Head from 'next/head'
import Navbar from '../components/Navbar'
import Timeline from '../components/Timeline'
import Map from '../components/Map'
import Page from '../shared/types/Page'
import styles from '../styles/Home.module.css'
import CalendarData from '../pages/api/calendar_data.json'

let pages: Page[] = [
  {title: "home", href: "/"},
  {title: "about", href: "/about"},
]


export default function Home() {
  // get the date that was 100 years ago - this implementation
  // will break in the future and needs improvment
  let date = new Date()
  date.setFullYear(date.getFullYear() - 138)
  const dateString = `${date.getFullYear()}-${("0" + (date.getMonth()+1)).slice(-2)}-${("0" + date.getDate()).slice(-2)}`
  // search for the date in the records
  const startCalendarData = CalendarData.find(elem => elem.Datum == dateString)

  // state of this component
  const [currentCalendarData, setCurrentCalendarData] = useState(startCalendarData)

  // create the paragraps to display info about the day
  let infoParagraphs = []
  for (const key in currentCalendarData) {
    if (key === "Länk/Objekt") {
      infoParagraphs.push(<p className="mb-10"><span className="font-bold">{key}: </span><a href={currentCalendarData[key]} className="text-blue-500">{currentCalendarData[key]}</a></p>)
    } else {
      infoParagraphs.push(<p className="mb-10"><span className="font-bold">{key}</span>: {currentCalendarData[key]}</p>)
    }
  }

  // functions to change day
  const incCurrentData = () => {
    const index = CalendarData.indexOf(currentCalendarData)
    setCurrentCalendarData(CalendarData[index + 1])
  }
  const decCurrentData = () => {
    const index = CalendarData.indexOf(currentCalendarData)
    setCurrentCalendarData(CalendarData[index - 1])
  }

  // render component
  return (
    <div>
      <Head>
        <title>Expedition vanadis</title>
        <link rel="icon" href="/ship.png" />
      </Head>

      <div className="flex flex-col overflow-hidden">
        <Navbar pages={pages} logo_url="/ship.png"/>

        <Map className={styles.homeMap} center={currentCalendarData.Koordinater} zoom={4} >
          {({ TileLayer, Marker }) => (
            <>
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
              />
              {
                CalendarData.map((data) => {
                  if (data.Koordinater) {
                    return (
                      <Marker position={data.Koordinater} key={data.Datum} eventHandlers={{
                        click: () => {
                          setCurrentCalendarData(data)
                        }
                    }} icon={L.icon({
                      iconUrl: 'dot.png',
                      iconSize: [20, 20],
                    })}></Marker>
                    )
                  }
                })
              }
              <Marker position={currentCalendarData.Koordinater} icon={L.icon({iconUrl: 'ship.png', iconSize: [100, 100]})}></Marker>
            </>
          )}
        </Map>

        <Timeline calendarData={CalendarData} currentCalendarData={currentCalendarData} changeCurrentCalendarData={(elem) => setCurrentCalendarData(elem)} />

        <div className="overflow-scroll bg-white">
          <div className="flex bg bg-gray-200">
            <button onClick={decCurrentData} className="flex-auto hover:bg-white transition-all ">igår</button>
            <button onClick={incCurrentData} className="flex-auto hover:bg-white transition-all">imorgon</button>
          </div>
          <div className="">
            {infoParagraphs}
          </div>
        </div>
      </div>
    </div>
  )
}
