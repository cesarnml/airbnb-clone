import clsx from 'clsx'
import { IconType } from 'react-icons'

type Props = {
  icon: IconType
  label: string
  selected?: boolean
  onClick: (value: string) => void
}

export const CategoryInput = ({ icon: Icon, label, selected, onClick }: Props) => {
  return (
    <div
      onClick={() => onClick(label)}
      className={clsx(
        'flex cursor-pointer flex-col gap-3 rounded-xl border-2 p-4 transition hover:border-black',
        selected ? 'border-black' : 'border-neutral-200',
      )}
    >
      <Icon size={30} />
      <div className='font-semibold'>{label}</div>
    </div>
  )
}
