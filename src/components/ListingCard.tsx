'use client'

import { useCountries } from '$/hooks/useCountries'
import { SafeListing, SafeUser } from '$/types'
import { Reservation } from '@prisma/client'
import { format } from 'date-fns'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { MouseEvent, useCallback, useMemo } from 'react'
import { HeartButton } from './HeartButton'
import { Button } from './Button'

type Props = {
  currentUser?: SafeUser | null
  data: SafeListing
  reservation?: Reservation
  onAction?: (id: string) => void
  disabled?: boolean
  actionLabel?: string
  actionId?: string
}

export const ListingCard = ({
  data,
  currentUser,
  reservation,
  onAction,
  disabled,
  actionLabel,
  actionId = '',
}: Props) => {
  const router = useRouter()
  const { getByValue } = useCountries()

  const location = getByValue(data.locationValue)

  const handleCancel = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation()

      if (disabled) {
        return
      }
      onAction?.(actionId)
    },
    [actionId, disabled, onAction],
  )

  const price = useMemo(() => {
    if (reservation) {
      return reservation.totalPrice
    }
    return data.price
  }, [data.price, reservation])

  const reservationDate = useMemo(() => {
    if (!reservation) {
      return null
    }
    const start = new Date(reservation.startDate)
    const end = new Date(reservation.endDate)

    return `${format(start, 'PP')} - ${format(end, 'PP')}`
  }, [reservation])
  return (
    <div
      className='group col-span-1 cursor-pointer'
      onClick={() => router.push(`/listings/${data.id}`)}
    >
      <div className='flex w-full flex-col gap-2'>
        <div className='relative aspect-square w-full overflow-hidden rounded-xl'>
          <Image
            fill
            alt='Listing'
            src={data.imageSrc}
            className='h-full w-full object-cover transition group-hover:scale-110'
          />
          <div className='absolute right-3 top-3'>
            <HeartButton listingId={data.id} currentUser={currentUser} />
          </div>
        </div>
        <div className='text-lg font-semibold'>
          {location?.region}, {location?.label}
        </div>
        <div className='font-light text-neutral-500'>{reservationDate || data.category}</div>
        <div className='flex flex-row items-center gap-1'>
          <div className='font-semibold'>$ {price}</div>
          {!reservation && <div className='font-light'>night</div>}
        </div>
        {onAction && actionLabel && (
          <Button disabled={disabled} small label={actionLabel} onClick={handleCancel} />
        )}
      </div>
    </div>
  )
}
