import React from 'react'
import * as FaIcons from 'react-icons/fa'
import * as AiIcons from 'react-icons/ai'
import * as IoIcons from 'react-icons/Io'
import * as GiIcons from 'react-icons/Gi'
import * as GoIcons from 'react-icons/Go'
import * as FiIcons from 'react-icons/Fi'

export const SidebarData = [
  {
    title: 'Vanadis info',
    path: 'https://sv.wikipedia.org/wiki/Vanadis_v%C3%A4rldsomsegling',
    icon: <GiIcons.GiSailboat />,
    cName: 'nav-text',
  },
  {
    title: 'Kontakta oss',
    path: 'https://www.etnografiskamuseet.se/besok/kontakta-oss/',
    icon: <FiIcons.FiPhoneCall />,
    cName: 'nav-text',
  },
  {
    title: 'Home',
    path: '/',
    icon: <AiIcons.AiFillHome />,
    cName: 'nav-text',
  },
  {
    title: 'Var är skeppet idag',
    path: '/position',
    icon: <GiIcons.GiPositionMarker />,
    cName: 'nav-text',
  },
]
