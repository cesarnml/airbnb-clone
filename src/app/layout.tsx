import { Nunito } from 'next/font/google'

import { ClientOnly } from '$/components/ClientOnly'
import { RegisterModal } from '$/components/modal/RegisterModal'
import { Navbar } from '$/components/navbar/Navbar'
import { ToasterProvider } from './providers/ToasterProvider'

import './globals.css'

export const metadata = {
  title: 'AirBnB',
  description: 'AirBnB clone',
}

const font = Nunito({
  subsets: ['latin'],
})

type Props = {
  children: React.ReactNode
}

export default function RootLayout({ children }: Props) {
  return (
    <html lang='en'>
      <body className={font.className}>
        <ClientOnly>
          <ToasterProvider />
          <RegisterModal />
          <Navbar />
        </ClientOnly>
        {children}
      </body>
    </html>
  )
}
