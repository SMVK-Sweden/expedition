import NavigationBar from './NavigationBar'
import Footer from './Footer'
import Head from 'next/head'

interface LayoutProps {
  children: JSX.Element
}

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <Head>
        <title>Expedition Vanadis</title>
        <link rel="icon" href="/bild_logga.png" />
      </Head>
      <div className="flex flex-col h-screen justify-between">
        <NavigationBar />
        {children}
        <Footer />
      </div>
    </>
  )
}
