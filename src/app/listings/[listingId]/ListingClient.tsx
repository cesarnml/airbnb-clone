'use client'

import { Container } from '$/components/Container'
import { ListingHead } from '$/components/listings/ListingHead'
import ListingInfo from '$/components/listings/ListingInfo'
import ListingReservation from '$/components/listings/ListingReservation'
import { categories } from '$/components/navbar/Categories'
import { useLoginModal } from '$/hooks/useLoginModal'
import { SafeListing, SafeUser } from '$/types'
import { Reservation } from '@prisma/client'
import axios from 'axios'
import { differenceInCalendarDays, eachDayOfInterval } from 'date-fns'
import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { Range } from 'react-date-range'
import { toast } from 'react-hot-toast'

const initialDateRange = {
  startDate: new Date(),
  endDate: new Date(),
  key: 'selection',
}

type Props = {
  reservations?: Reservation[]
  listing: SafeListing & {
    user: SafeUser | null
  }
  currentUser: SafeUser | null
}

export const ListingClient = ({ reservations = [], listing, currentUser }: Props) => {
  const loginModal = useLoginModal()
  const router = useRouter()

  const disabledDates = useMemo(() => {
    let dates: Date[] = []

    reservations.forEach((reservation) => {
      const range = eachDayOfInterval({
        start: new Date(reservation.startDate),
        end: new Date(reservation.endDate),
      })
      dates = [...dates, ...range]
    })
    return dates
  }, [reservations])

  const [isLoading, setIsLoading] = useState(false)
  const [totalPrice, setTotalPrice] = useState(listing.price)
  const [dateRange, setDateRange] = useState<Range>(initialDateRange)

  const onCreateReservation = useCallback(async () => {
    if (!currentUser) {
      return loginModal.onOpen()
    }

    setIsLoading(true)

    try {
      await axios.post('/api/reservations', {
        totalPrice,
        startDate: dateRange.startDate,
        endDate: dateRange.endDate,
        listingId: listing.id,
      })
      toast.success('Listing reserved!')
      setDateRange(initialDateRange)
      router.refresh()
    } catch (err) {
      toast.error('Something went wrong.')
    }
  }, [
    currentUser,
    dateRange.endDate,
    dateRange.startDate,
    listing.id,
    loginModal,
    router,
    totalPrice,
  ])

  useEffect(() => {
    if (dateRange.startDate && dateRange.endDate) {
      const dayCount = differenceInCalendarDays(dateRange.endDate, dateRange.startDate)

      if (dayCount && listing.price) {
        setTotalPrice(dayCount * listing.price)
      } else {
        setTotalPrice(listing.price)
      }
    }
  }, [dateRange.endDate, dateRange.startDate, listing.price])

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
            <div className='order-first mb-10 md:order-last md:col-span-3'>
              <ListingReservation
                price={listing.price}
                totalPrice={totalPrice}
                onChangeDate={(value) => setDateRange(value)}
                dateRange={dateRange}
                onSubmit={onCreateReservation}
                disabled={isLoading}
                disabledDates={disabledDates}
              />
            </div>
          </div>
        </div>
      </div>
    </Container>
  )
}
