'use client'

import { ReactNode, useEffect, useState } from 'react'

type Props = {
  children: ReactNode
}

/**
 * Wrapper component that guarantees children only render client-side
 */
export const ClientOnly = ({ children }: Props) => {
  const [hasMounted, setHasMounted] = useState(false)
  useEffect(() => {
    setHasMounted(true)
  }, [])

  if (!hasMounted) {
    return null
  }
  return <>{children}</>
}
