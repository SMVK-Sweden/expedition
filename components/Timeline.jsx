export default function Timeline({calendarData, currentCalendarData, changeCurrentCalendarData}) {
  const items = calendarData.map(elem => {
    const flex = elem == currentCalendarData ? 'flex-none' : 'flex-auto'
    const content = elem == currentCalendarData ? currentCalendarData.Datum : '*'
    return (<div className={`${flex} bg-white cursor-pointer hover:bg-gray-200`} onClick={() => {
      if (elem.Koordinater) changeCurrentCalendarData(elem)
    }} >{content}</div>)
  })

  return (
    <div className="flex h-10 w-screen">
      { items }
    </div>
  )
}
