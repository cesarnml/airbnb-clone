'use client'

import { ReactElement, useState } from 'react'

type Props = {
  isOpen?: boolean
  onClose: () => void
  onSubmit: () => void
  title?: string
  body?: ReactElement
  footer?: ReactElement
  actionLabel: string
  disabled?: boolean
  secondaryAction?: () => void
  secondaryLabel?: string
}
export const Modal = ({
  actionLabel,
  onClose,
  onSubmit,
  body,
  disabled,
  isOpen,
  title,
  footer,
  secondaryAction,
  secondaryLabel,
}: Props) => {
  const [showModal, setShowModal] = useState(false)
  return <div>Modal</div>
}
