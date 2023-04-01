'use client'

import { noop } from '$/lib/helpers'
import { AiOutlineMenu } from 'react-icons/ai'
import { Avatar } from '../Avatar'
import { useCallback, useState } from 'react'
import { MenuItem } from './MenuItem'
import { useRegisterModal } from '$/hooks/useRegisterModal'
import { useLoginModal } from '$/hooks/useLoginModal'
import { User } from '@prisma/client'
import { signOut } from 'next-auth/react'

type Props = {
  currentUser?: User | null
}
export const UserMenu = ({ currentUser }: Props) => {
  const loginModal = useLoginModal()
  const registerModal = useRegisterModal()
  const [isOpen, setIsOpen] = useState(false)

  const toggleOpen = useCallback(() => {
    setIsOpen((prev) => !prev)
  }, [])

  return (
    <div className='relative'>
      <div className='flex flex-row items-center gap-3'>
        <div
          className='hidden cursor-pointer rounded-full px-4 py-3 text-sm font-semibold transition hover:bg-neutral-100 md:block'
          onClick={noop}
        >
          AirBnB your home
        </div>
        <div
          className='flex cursor-pointer flex-row items-center gap-3 rounded-full border border-neutral-200 p-4 transition hover:shadow-md md:px-2 md:py-1'
          onClick={toggleOpen}
        >
          <AiOutlineMenu />
          <div className='hidden md:block'>
            <Avatar />
          </div>
        </div>
      </div>
      {isOpen && (
        <div className='absolute right-0 top-12 w-[40vw] overflow-hidden rounded-xl bg-white text-sm shadow-md md:w-3/4'>
          <div className='flex cursor-pointer flex-col'>
            {currentUser ? (
              <>
                <MenuItem onClick={noop} label='My Trips' />
                <MenuItem onClick={noop} label='My Favorites' />
                <MenuItem onClick={noop} label='My reservations' />
                <MenuItem onClick={noop} label='My properties' />
                <MenuItem onClick={noop} label='Airbnb my home' />
                <MenuItem onClick={signOut} label='Logout' />
              </>
            ) : (
              <>
                <MenuItem onClick={loginModal.onOpen} label='Login' />
                <MenuItem onClick={registerModal.onOpen} label='Sign up' />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
