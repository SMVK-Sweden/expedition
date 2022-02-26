import React, { useState } from 'react'
import Link from 'next/link'
import { AiFillHome, AiOutlineSearch } from 'react-icons/ai'
import { GiSailboat, GiPositionMarker } from 'react-icons/gi'
import { FiPhoneCall } from 'react-icons/fi'

import * as AiIcons from 'react-icons/ai'
import * as GiIcons from 'react-icons/gi'
import { IconContext } from 'react-icons'
import { ImDatabase } from 'react-icons/im'

const SidebarData = [
  {
    title: 'Introduktion',
    path: '/about',
    icon: <GiSailboat />,
    cName: 'nav-text',
  },
  {
    title: 'Idag',
    path: '/',
    icon: <GiPositionMarker />,
    cName: 'nav-text',
  },
  {
    title: 'Ksamsök',
    path: '/images',
    icon: <AiOutlineSearch />,
    cName: 'nav-text',
  },
  {
    title: 'Databas',
    path: '/api/days',
    icon: <ImDatabase />,
    cName: 'nav-text',
  },
]

export default function SideBar() {
  const [sidebar, setSidebar] = useState(false)
  const showSidbar = () => setSidebar(!sidebar)
  return (
    <div className="navbar">
      <GiIcons.GiHamburgerMenu className="menu-btn" onClick={showSidbar} />
      <IconContext.Provider value={{ color: '#fff' }}>
        <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
          <ul className="nav-menu-items" onClick={showSidbar}>
            <li className="navbar-toggle">
              <AiIcons.AiOutlineCloseCircle
                className="menu-bars"
                onClick={showSidbar}
              />
            </li>
            {SidebarData.map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  <Link href={item.path}>
                    <a>
                      {item.icon} <span>{item.title}</span>{' '}
                    </a>
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>
      </IconContext.Provider>
    </div>
  )
}
