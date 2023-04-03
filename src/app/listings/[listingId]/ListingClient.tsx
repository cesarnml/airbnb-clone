'use client'

import { Container } from '$/components/Container'
import { ListingHead } from '$/components/listings/ListingHead'
import ListingInfo from '$/components/listings/ListingInfo'
import { categories } from '$/components/navbar/Categories'
import { SafeListing, SafeUser } from '$/types'
import { Reservation } from '@prisma/client'
import { useMemo } from 'react'

type Props = {
  reservations?: Reservation[]
  listing: SafeListing & {
    user: SafeUser | null
  }
  currentUser: SafeUser | null
}

export const ListingClient = ({ reservations, listing, currentUser }: Props) => {
  const category = useMemo(() => {
    return categories.find((category) => category.label === listing.category)
  }, [listing.category])

  return (
    <Container>
      <div className='mx-auto max-w-screen-lg'>
        <div className='flex flex-col gap-6'>
          <ListingHead
            title={listing.title}
            imageSrc={listing.imageSrc}
            locationValue={listing.locationValue}
            id={listing.id}
            currentUser={currentUser}
          />
          <div className='mt-6 grid grid-cols-1 md:grid-cols-7 md:gap-10'>
            <ListingInfo
              user={listing.user}
              category={category}
              description={listing.description}
              guestCount={listing.guestCount}
              roomCount={listing.roomCount}
              bathroomCount={listing.bathroomCount}
              locationValue={listing.locationValue}
            />
          </div>
        </div>
      </div>
    </Container>
  )
}
