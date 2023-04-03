'use client'

import { useRouter } from 'next/navigation'
import { Heading } from './Heading'
import { noop } from '$/lib/helpers'
import { Button } from './Button'

type Props = {
  title?: string
  subtitle?: string
  showReset?: boolean
}

export const EmptyState = ({
  title = 'No exact matches',
  subtitle = 'Try changing or removing some of your filters',
  showReset,
}: Props) => {
  const router = useRouter()

  return (
    <div className='flex h-[60vh] flex-col items-center justify-center gap-2'>
      <Heading title={title} subtitle={subtitle} center />
      <div className='mt-4 w-48'>
        {showReset && <Button outline label='Reset all filters' onClick={() => router.push('/')} />}
      </div>
    </div>
  )
}
