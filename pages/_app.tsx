import '../styles/globals.css'
import '../styles/menu.css'
// add bootstrap css
import 'bootstrap/dist/css/bootstrap.css'
import type { AppProps } from 'next/app'
import Layout from '../components/Layout'
import axios from 'axios'

// global axios config
axios.defaults.baseURL = process.env.API_URL || '/'
axios.defaults.headers.common['Accept'] = 'application/json'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}

export default MyApp
