'use client'

import { Heading } from '$/components/Heading'
import { HeartButton } from '$/components/HeartButton'
import { useCountries } from '$/hooks/useCountries'
import { SafeUser } from '$/types'
import Image from 'next/image'

type Props = {
  id: string
  title: string
  locationValue: string
  imageSrc: string
  currentUser?: SafeUser | null
}

export const ListingHead = ({ id, title, locationValue, imageSrc, currentUser }: Props) => {
  const { getByValue } = useCountries()

  const location = getByValue(locationValue)

  return (
    <>
      <Heading title={title} subtitle={`${location?.region}, ${location?.label}`} />
      <div className='relative h-[60vh] w-full overflow-hidden rounded-xl'>
        <Image alt='property' src={imageSrc} fill className='w-full object-cover' />
        <div className='absolute right-5 top-5'>
          <HeartButton listingId={id} currentUser={currentUser} />
        </div>
      </div>
    </>
  )
}
