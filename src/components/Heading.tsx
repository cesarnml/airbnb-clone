'use client'

import clsx from 'clsx'

type Props = {
  title: string
  subtitle?: string
  center?: boolean
}

export const Heading = ({ title, subtitle, center }: Props) => {
  //code
  return (
    <div className={clsx(center ? 'text-center' : 'text-start')} data-testid='heading'>
      <h2 className='text-2xl font-bold'>{title}</h2>
      <h3 className='mt-2 font-light text-neutral-500'>{subtitle}</h3>
    </div>
  )
}
