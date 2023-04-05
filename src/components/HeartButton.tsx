'use client'

import { useFavorite } from '$/hooks/useFavorite'
import { SafeUser } from '$/types'
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'
import clsx from 'clsx'

type Props = {
  listingId: string
  currentUser?: SafeUser | null
}

export const HeartButton = ({ listingId, currentUser }: Props) => {
  const { hasFavorited, toggleFavorite } = useFavorite({ listingId, currentUser })

  return (
    <button
      onClick={toggleFavorite}
      className='relative cursor-pointer transition hover:opacity-80'
      aria-label='favorite'
    >
      <AiOutlineHeart size={28} className='-top-p[2px] absolute -right-[2px] fill-white' />
      <AiFillHeart
        size={24}
        className={clsx(hasFavorited ? 'fill-red-500' : 'fill-neutral-500/70')}
      />
    </button>
  )
}
