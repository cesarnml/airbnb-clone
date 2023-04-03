'use client'

import { EmptyState } from '$/components/EmptyState'
import { useEffect } from 'react'

interface Props {
  error: Error
}

const ErrorState = ({ error }: Props) => {
  useEffect(() => {
    console.error(error)
  }, [error])

  return <EmptyState title='Uh Oh' subtitle='Something went wrong!' />
}

export default ErrorState
