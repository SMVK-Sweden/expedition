import { useState } from 'react'
import { InfoParagraphs } from './index'
import { todaysTravelDateIndex } from '../shared/utils'
import CalendarData from '../pages/api/calendar_data.json'
import { SiOpenstreetmap } from 'react-icons/si'

export default function Home() {
  const [index] = useState(todaysTravelDateIndex())
  const currentCalendarData = CalendarData[index]

  const { Koordinater, Plats, Datum, ...stories } = currentCalendarData

  const coords = Koordinater as [number, number]

  return (
    <div>
      <div
        style={{
          width: '500px',
          minHeight: '200px',
        }}
      >
        <div className="bg-white max-w-5 w-full m-auto">
          <div className="w-full my-12">
            <InfoParagraphs
              coords={coords}
              Plats={Plats}
              Datum={Datum}
              stories={stories}
            />
            Se på Kartan{' '}
            <SiOpenstreetmap onClick={() => <link href="./index" />} />
          </div>
        </div>
      </div>
    </div>
  )
}
