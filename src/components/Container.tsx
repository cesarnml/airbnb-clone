'use client'

type Props = {
  children: React.ReactNode
}

export const Container = ({ children }: Props) => {
  return <div className='mx-auto max-w-[2520px] px-4 sm:px-2 xl:px-20'>{children}</div>
}
