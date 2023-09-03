import './globals.css'
import Nav from '@components/nav/Nav'
import Footer from '@components/footer/Footer'
import type { Metadata } from 'next'
import { Oxygen } from 'next/font/google'

const oxygen = Oxygen({
  subsets: ['latin'],
  weight: '400'
})

export const metadata: Metadata = {
  title: 'Social Media Explorer',
  description: 'Social Media Explorer App',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={oxygen.className}>
        <Nav/>
        {children}
        <Footer/>
      </body>
    </html>
  )
}
