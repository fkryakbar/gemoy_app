import '../styles/globals.css'
import type { AppProps } from 'next/app'
import NextNProgress from 'nextjs-progressbar';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <div className='bg-slate-100 w-100% h-screen overflow-y-auto'>
        <NextNProgress color='#f472b6' />
        <Component {...pageProps} />
      </div>
    </>

  )
}
