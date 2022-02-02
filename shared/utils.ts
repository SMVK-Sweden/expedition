import CalendarData from '../pages/api/calendar_data.json'
import JSDOM from 'jsdom'

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
export function getImageLink(search: string): string {
  const searchUrl = `https://kulturarvsdata.se/ksamsok/api?method=search&hitsPerPage=1&query=%22${search}%22%20and%20thumbnailExists=j`
  let link = ''
  fetch(searchUrl)
    .then((response) => response.text())
    .then((data) => {
      const xml = new DOMParser().parseFromString(data, 'application/xml')
      link = xml.querySelector('Image lowresSource')?.textContent || ''
      console.log('from getImageLink()', link)
      return link
    })
    .catch(console.error)
}
