'use client '
import { User } from '@prisma/client'
import { Container } from '../Container'
import { Logo } from './Logo'
import { Search } from './Search'
import { UserMenu } from './UserMenu'

type Props = {
  currentUser?: User | null
}

export const Navbar = ({ currentUser }: Props) => {
  return (
    <div className='fixed z-10 w-full bg-white shadow-sm'>
      <div className='border-b py-4'>
        <Container>
          <div className='flex flex-row items-center justify-between gap-3 md:gap-0'>
            <Logo />
            <Search />
            <UserMenu currentUser={currentUser} />
          </div>
        </Container>
      </div>
    </div>
  )
}
