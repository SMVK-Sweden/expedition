import NavigationBar from './NavigationBar'

interface LayoutProps {
  children: JSX.Element
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div>
      <NavigationBar />
      {children}
      <p>footer</p>
    </div>
  )
}
