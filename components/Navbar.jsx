import Link from 'next/link'
import Image from 'next/image'

export default function Navbar({ pages, logo_url }) {
  let pageList = pages.map((page) => (
    <li
      key={page}
      className="pr-10 pl-10 font-sans text-white hover:bg-white hover:text-gray-300 transition-all"
    >
      <Link href={page.href}>{page.title}</Link>
    </li>
  ))
  return (
    <div className="flex">
      <div className="bg-gray-300 flex w-100 h-100">
        <Image src={logo_url} height="60" width="100" alt="Logo" />
      </div>
      <ul className="flex justify-end w-screen bg-gray-300 text-4xl">
        {pageList}
      </ul>
    </div>
  )
}
