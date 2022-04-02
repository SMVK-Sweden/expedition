import React from 'react'
import Button from '../components/Button'
//import About from '../pages/about'
import Link from 'next/link'
import Fetcher from '../components/Fetcher'

import useSWR from 'swr'
import info from '../pages/api/about_page.json'
import SideBar from '../components/SideBar'
import NavigationBar from '../components/NavigationBar'

const fetcher = (...args) => fetch(...args).then((res) => res.json())

export default function About() {
  return (
    <div>
      <ul>
        <li>
          <Fetcher> </Fetcher>

          <p className="text-left md:text-left">
            {' '}
            Etnografiska musueet information:{' '}
          </p>
          <p className="text-right md:text-right">
            {' '}
            Vanadis Expedition sammanfattning:{' '}
          </p>
        </li>
      </ul>
    </div>
  )
}
