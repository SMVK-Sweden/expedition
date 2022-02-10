import * as FaIcons from 'react-icons/fa'
import * as AiIcons from 'react-icons/ai'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { SidebarData } from './SideBarData'
import { IconContext } from 'react-icons'

const NavbarMenu = () => {
  const [sidebar, setSidebar] = useState(false)

  const showSidbar = () => setSidebar(!sidebar)
  return (
    <>
      <IconContext.Provider value={{ color: '#fff' }}>
        <div className="navbar">
          <Link to="#" className="menu-bars">
            <FaIcons.FaBars onClick={showSidbar} />
          </Link>
        </div>
        <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
          <ul className="nav-menu-items" onClick={showSidbar}>
            <li className="navbar-toggle">
              <Link to="#" className="menu-bars">
                <AiIcons.AiOutlineClose />
              </Link>
            </li>
            {SidebarData.map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  <Link to={item.path}>
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>
      </IconContext.Provider>
    </>
  )
}
export default NavbarMenu
