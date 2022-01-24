import Link from "next/link"
import type Page from '../shared/types/Page'
import Image from 'next/image'

type NavbarProps = {
  pages: Page[],
  logo_url: string
}

export default function Navbar({pages, logo_url} : NavbarProps) {
  let pageList = pages.map((page) => <li className="pr-10 pl-10 font-sans text-white hover:bg-white hover:text-gray-300 transition-all"><Link href={page.href}>{page.title}</Link></li>)
  return (
    <div className="flex">
      <div className='bg-gray-300 flex w-100 h-100'>
          <Image src={logo_url} height='60' width='100'/>
      </div>
      <ul className="flex justify-end w-screen bg-gray-300 text-4xl">{pageList}</ul>
    </div>
  )
}
