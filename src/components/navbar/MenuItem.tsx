'use client'

type Props = {
  onClick: () => void
  label: string
}

export const MenuItem = ({ onClick, label }: Props) => {
  return (
    <div className='px-4 py-3 font-semibold transition hover:bg-neutral-100' onClick={onClick}>
      {label}
    </div>
  )
}
