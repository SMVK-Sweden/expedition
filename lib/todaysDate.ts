// calculate what date of the travel that should be shown
// TODO: this needs to be updated to work for the whole
// travel, and not only for the year 1884. Needs to take
// into account when the travel begins in "real time"
export default function todaysDate(): string {
  const today = new Date()
  const monthStr = (today.getMonth() + 1).toString().padStart(2, '0')
  const dayStr = today.getDate().toString().padStart(2, '0')
  return `1884-${monthStr}-${dayStr}`
}
