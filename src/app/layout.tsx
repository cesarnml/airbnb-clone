import { Nunito } from 'next/font/google'

import { ClientOnly } from '$/components/ClientOnly'
import { RegisterModal } from '$/components/modal/RegisterModal'
import { LoginModal } from '$/components/modal/LoginModal'
import { Navbar } from '$/components/navbar/Navbar'
import { ToasterProvider } from './providers/ToasterProvider'
import { Analytics } from '@vercel/analytics/react'

import './globals.css'
import getCurrentUser from './actions/getCurrentUser'
import { RentModal } from '$/components/modal/RentModal'
import SearchModal from '$/components/modal/SearchModal'

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

export default async function RootLayout({ children }: Props) {
  const currentUser = await getCurrentUser()

  return (
    <html lang='en'>
      <body className={font.className}>
        <ClientOnly>
          <ToasterProvider />
          <RegisterModal />
          <LoginModal />
          <RentModal />
          <SearchModal />
          <Navbar currentUser={currentUser} />
        </ClientOnly>
        <Analytics />
        <div className='py-8'>{children}</div>
      </body>
    </html>
  )
}
