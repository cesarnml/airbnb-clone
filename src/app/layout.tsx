import { Nunito } from 'next/font/google'

import './globals.css'
import { Navbar } from '$/components/navbar/Navbar'
import { ClientOnly } from '$/components/ClientOnly'
import { Modal } from '$/components/modal/Modal'

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
          <Modal />
          <Navbar />
        </ClientOnly>
        {children}
      </body>
    </html>
  )
}
