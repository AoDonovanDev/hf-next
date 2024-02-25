import { Inter } from 'next/font/google'
import { Courier_Prime } from 'next/font/google'
import './globals.css'
import Link from 'next/link'
import Image from 'next/image'
import Navbar from './ui/Navbar'

const inter = Courier_Prime({ subsets: ['latin'], weight: '400' })

export const metadata = {
  title: 'Housefly Victuals',
  description: '*~-*-~*',
}


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        {children}
      </body>
    </html>
  )
}
