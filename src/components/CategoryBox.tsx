import { useSearchParams, useRouter } from 'next/navigation'
import { IconType } from 'react-icons'
import qs from 'query-string'
import { useCallback } from 'react'
import clsx from 'clsx'

type Props = {
  label: string
  icon: IconType
}

export const CategoryBox = ({ label, icon: Icon }: Props) => {
  const router = useRouter()
  const params = useSearchParams()

  const isSelected = params?.get('category') === label

  const handleClick = useCallback(() => {
    let currentQuery = {}

    if (params) {
      currentQuery = qs.parse(params.toString())
    }

    const updatedQuery: any = {
      ...currentQuery,
      category: label,
    }

    if (isSelected) {
      delete updatedQuery.category
    }

    const url = qs.stringifyUrl(
      {
        url: '/',
        query: updatedQuery,
      },
      { skipNull: true },
    )

    router.push(url)
  }, [isSelected, label, params, router])

  return (
    <div
      className={clsx(
        'flex cursor-pointer flex-col items-center justify-center gap-2 border-b-2 p-3 transition hover:text-neutral-800',
        isSelected
          ? 'border-b-neutral-800 text-neutral-800'
          : 'border-b-transparent text-neutral-500',
      )}
      onClick={handleClick}
      data-testid='category-box'
    >
      <Icon size={26} />
      <div className='font-md text-sm'>{label}</div>
    </div>
  )
}
