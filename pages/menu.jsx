import * as FiIcons from 'react-icons/fi'
import * as AiIcons from 'react-icons/ai'
import * as GiIcons from 'react-icons/gi'
import React, { useState } from 'react'
import { Info } from './Info'
import { IconContext } from 'react-icons'
import Link from 'next/link'
import { SidebarData } from '../components/Menu/SideBarData'

export default function Menu() {
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
