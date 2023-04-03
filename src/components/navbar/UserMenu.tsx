'use client'

import { useLoginModal } from '$/hooks/useLoginModal'
import { useRegisterModal } from '$/hooks/useRegisterModal'
import { noop } from '$/lib/helpers'
import { SafeUser } from '$/types'
import { signOut } from 'next-auth/react'
import { useCallback, useState } from 'react'
import { AiOutlineMenu } from 'react-icons/ai'
import { Avatar } from '../Avatar'
import { MenuItem } from './MenuItem'
import { useRentModal } from '$/hooks/useRentModal'
import { useRouter } from 'next/navigation'

type Props = {
  currentUser?: SafeUser | null
}
export const UserMenu = ({ currentUser }: Props) => {
  const router = useRouter()
  const loginModal = useLoginModal()
  const registerModal = useRegisterModal()
  const rentModal = useRentModal()

  const [isOpen, setIsOpen] = useState(false)

  const toggleOpen = useCallback(() => {
    setIsOpen((prev) => !prev)
  }, [])

  const onRent = useCallback(() => {
    if (!currentUser) {
      return loginModal.onOpen()
    }
    rentModal.onOpen()
  }, [currentUser, loginModal, rentModal])

  return (
    <div className='relative'>
      <div className='flex flex-row items-center gap-3'>
        <div
          className='hidden cursor-pointer rounded-full px-4 py-3 text-sm font-semibold transition hover:bg-neutral-100 md:block'
          onClick={onRent}
        >
          AirBnB your home
        </div>
        <div
          className='flex cursor-pointer flex-row items-center gap-3 rounded-full border border-neutral-200 p-4 transition hover:shadow-md md:px-2 md:py-1'
          onClick={toggleOpen}
        >
          <AiOutlineMenu />
          <div className='hidden md:block'>
            <Avatar src={currentUser?.image} />
          </div>
        </div>
      </div>
      {isOpen && (
        <div className='absolute right-0 top-12 w-[40vw] overflow-hidden rounded-xl bg-white text-sm shadow-md md:w-3/4'>
          <div className='flex cursor-pointer flex-col'>
            {currentUser ? (
              <>
                <MenuItem onClick={() => router.push('/trips')} label='My trips' />
                <MenuItem onClick={() => router.push('/favorites')} label='My favorites' />
                <MenuItem onClick={() => router.push('/reservations')} label='My reservations' />
                <MenuItem onClick={noop} label='My properties' />
                <MenuItem onClick={rentModal.onOpen} label='Airbnb my home' />
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
