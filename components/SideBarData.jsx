import React from 'react'
import { AiFillHome } from 'react-icons/ai'
import { GiSailboat, GiPositionMarker } from 'react-icons/gi'
import { FiPhoneCall } from 'react-icons/fi'

export const SidebarData = [
  {
    title: 'Vanadis info',
    path: 'https://sv.wikipedia.org/wiki/Vanadis_v%C3%A4rldsomsegling',
    icon: <GiSailboat />,
    cName: 'nav-text',
  },
  {
    title: 'Kontakta oss',
    path: 'https://www.etnografiskamuseet.se/besok/kontakta-oss/',
    icon: <FiPhoneCall />,
    cName: 'nav-text',
  },
  {
    title: 'Home',
    path: '/',
    icon: <AiFillHome />,
    cName: 'nav-text',
  },
  {
    title: 'Var är skeppet idag',
    path: '/position',
    icon: <GiPositionMarker />,
    cName: 'nav-text',
  },
]
