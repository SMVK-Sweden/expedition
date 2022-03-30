import { NextResponse, NextRequest, NextFetchEvent } from 'next/server'
import todaysDate from './lib/todaysDate'

export async function middleware(req: NextRequest, e: NextFetchEvent) {
  const { pathname } = req.nextUrl
  if (pathname == '/') {
    return NextResponse.redirect(`/days/${todaysDate()}`)
  }
  return NextResponse.next()
}
