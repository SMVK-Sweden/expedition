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
    path: '/info',
    icon: <GiIcons.GiSailboat />,
    cName: 'nav-text',
  },
  {
    title: 'Kontakta oss',
    path: '/contact',
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
    icon: <GiIcons.GiPaperBoat />,
    cName: 'nav-text',
  },
]
