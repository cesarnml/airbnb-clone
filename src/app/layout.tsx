import { ClientOnly } from '$/components/ClientOnly'
import { LoginModal } from '$/components/modal/LoginModal'
import { RegisterModal } from '$/components/modal/RegisterModal'
import { RentModal } from '$/components/modal/RentModal'
import SearchModal from '$/components/modal/SearchModal'
import { Navbar } from '$/components/navbar/Navbar'
import { Analytics } from '@vercel/analytics/react'
import { Nunito } from 'next/font/google'
import getCurrentUser from './actions/getCurrentUser'
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
