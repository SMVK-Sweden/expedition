import Navbar from '../components/Navbar'
import Page from '../shared/types/Page'

let pages: Page[] = [
  {title: "home", href: "/"},
  {title: "about", href: "/about"},
]

export default function About() {
  return(
    <div className="">
      <Navbar pages={pages} logo_url="/ship.png"/>
      <p>Här finns inget att se än.</p>
    </div>
  )
}
