import '@/styles/globals.css'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return <div>
    <button>Everywhere button</button>
    <Component {...pageProps} />
  </div>
}
