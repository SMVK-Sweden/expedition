import CalendarData from '../pages/api/calendar_data.json'

// calculate what date of the travel that should be shown
// TODO: this needs to be updated to work for the whole
// travel, and not only for the year 1884. Needs to take
// into account when the travel begins in "real time"
export function todaysTravelDate(): string {
  const today = new Date()
  const monthStr = (today.getMonth() + 1).toString().padStart(2, '0')
  const dayStr = today.getDate().toString().padStart(2, '0')
  return `1884-${monthStr}-${dayStr}`
}

// get the index of todays travel date in the CalendarData list
export function todaysTravelDateIndex(): number {
  return CalendarData.findIndex((obj) => obj.Datum == todaysTravelDate())
}

// search ksamsök and pares the xml that is returned to get the image link
export async function getImageLink(search: string) {
  const query = encodeURIComponent(`"${search}" and thumbnailExists=j`)
  const searchUrl = `https://kulturarvsdata.se/ksamsok/api?method=search&hitsPerPage=100&recordSchema=xml&fields=lowresSource&query=${query}`

  const response = await fetch(searchUrl, {
    headers: {
      'Content-Type': 'application/json',
      accept: 'application/json'
    }
  })
  const json = await response.json()

  const randomIndex = Math.floor(Math.random()*100)
  return json.result.records.record[randomIndex].field[1].content
}

