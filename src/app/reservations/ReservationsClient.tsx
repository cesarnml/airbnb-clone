'use client'

import { toast } from 'react-hot-toast'
import axios from 'axios'
import { useCallback, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Container } from '$/components/Container'
import { Heading } from '$/components/Heading'
import { ListingCard } from '$/components/ListingCard'
import { SafeReservation, SafeUser } from '$/types'

type Props = {
  reservations: SafeReservation[]
  currentUser?: SafeUser | null
}

const ReservationsClient = ({ reservations, currentUser }: Props) => {
  const router = useRouter()
  const [deletingId, setDeletingId] = useState('')

  const onCancel = useCallback(
    async (id: string) => {
      setDeletingId(id)

      try {
        await axios.delete(`/api/reservations/${id}`)
        toast.success('Reservation cancelled')
        router.refresh()
      } catch (err) {
        toast.error('Something went wrong.')
      }

      setDeletingId('')
    },
    [router],
  )

  return (
    <Container>
      <Heading title='Reservations' subtitle='Bookings on your properties' />
      <div className='mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6'>
        {reservations.map((reservation: any) => (
          <ListingCard
            key={reservation.id}
            data={reservation.listing}
            reservation={reservation}
            actionId={reservation.id}
            onAction={onCancel}
            disabled={deletingId === reservation.id}
            actionLabel='Cancel guest reservation'
            currentUser={currentUser}
          />
        ))}
      </div>
    </Container>
  )
}

export default ReservationsClient
