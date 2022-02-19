import React from 'react'
import Button from '../components/Button'
import About from '../pages/about'
import Link from 'next/link'
import Fetcher from '../components/Fetcher'

export default function Characters() {
  return (
    <ul>
      <li>
        <Button>
          <Link href="/characters">
            <a>Characters</a>
          </Link>
        </Button>
        <Link href="/">
          <Button>Home</Button>
        </Link>
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
  )
}
