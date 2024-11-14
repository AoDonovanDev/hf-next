import { Courier_Prime } from 'next/font/google';
import { Analytics } from '@vercel/analytics/react';
import './globals.css';
import Navbar from './ui/Navbar';

const inter = Courier_Prime({ subsets: ['latin'], weight: '400' })

export const metadata = {
  title: 'Housefly Victuals',
  description: '*~-*-~*',
}

console.log("***Testing alerts all over the dang place");

export default function RootLayout({ children }) {

  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        {children}
        <Analytics />
      </body>
    </html>
  )
}
