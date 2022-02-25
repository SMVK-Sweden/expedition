import CalendarData from '../pages/api/calendar_data.json'

// calculate what date of the travel that should be shown
// TODO: this needs to be updated to work for the whole
// travel, and not only for the year 1884. Needs to take
// into account when the travel begins in "real time"
function todaysTravelDate() {
  const today = new Date()
  const monthStr = (today.getMonth() + 1).toString().padStart(2, '0')
  const dayStr = (today.getDate()).toString().padStart(2, '0')
  return `1884-${monthStr}-${dayStr}`
}

// get the index of todays travel date in the CalendarData list
function todaysTravelDateIndex(): number {
  return CalendarData.findIndex(obj => obj.Datum == todaysTravelDate())
}

export {todaysTravelDate, todaysTravelDateIndex}
