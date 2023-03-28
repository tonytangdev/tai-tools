import '@/styles/globals.css'
import dayjs from 'dayjs'
import type { AppProps } from 'next/app'
require('dayjs/locale/fr')

dayjs.locale('fr')

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
