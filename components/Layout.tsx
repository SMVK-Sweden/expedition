import NavigationBar from './NavigationBar'
import Footer from './Footer'

interface LayoutProps {
  children: JSX.Element
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="flex flex-col">
      <NavigationBar />
      {children}
      <Footer />
    </div>
  )
}
