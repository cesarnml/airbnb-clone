'use client '
import { SafeUser } from '$/types'
import { Container } from '../Container'
import { Categories } from './Categories'
import { Logo } from './Logo'
import { Search } from './Search'
import { UserMenu } from './UserMenu'

type Props = {
  currentUser?: SafeUser | null
}

export const Navbar = ({ currentUser }: Props) => {
  return (
    <div className='sticky z-10 w-full bg-white shadow-sm'>
      <div className='border-b py-4'>
        <Container>
          <div className='flex flex-row items-center justify-between gap-3 md:gap-0'>
            <Logo />
            <Search />
            <UserMenu currentUser={currentUser} />
          </div>
        </Container>
      </div>
      <Categories />
    </div>
  )
}
