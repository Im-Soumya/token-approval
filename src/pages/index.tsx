import Header from '@/components/Header'
import Hero from '@/components/Hero'
import { Inter_Tight } from 'next/font/google'
import Head from 'next/head'

const inter = Inter_Tight({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Head>
        <title>Token Approval</title>
        <meta property="description" content="Approval of a token" key="description" />
      </Head>

      <main className={`flex min-h-screen flex-col items-center justify-center px-14 md:px-24 lg:px-52 py-7 ${inter.className}`}>
        <Header />
        <Hero />
      </main>
    </>
  )
}
