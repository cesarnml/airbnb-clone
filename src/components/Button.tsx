import clsx from 'clsx'
import { MouseEvent } from 'react'
import { IconType } from 'react-icons'

type Props = {
  label: string
  onClick: (e: MouseEvent<HTMLButtonElement>) => void
  disabled?: boolean
  outline?: boolean
  small?: boolean
  icon?: IconType
}

export const Button = ({ label, onClick, disabled, outline, small, icon: Icon }: Props) => {
  return (
    <button
      className={clsx(
        'relative w-full rounded-lg transition hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-70',
        outline ? 'border-black bg-white text-black' : 'border-rose-500 bg-rose-500 text-white',
        small ? 'border py-1 text-sm font-light' : 'text-md border-2 py-3 font-semibold',
      )}
      onClick={onClick}
      disabled={disabled}
    >
      {Icon && <Icon size={24} className='absolute left-4 top-3' />}
      {label}
    </button>
  )
}
