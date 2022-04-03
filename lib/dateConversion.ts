import dateTime from 'date-and-time'

// helpers
export function yearMonthDay(date: Date): string {
  return dateTime.format(new Date(date), 'YYYY-MM-DD')
}
