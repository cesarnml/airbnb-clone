import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { HeartButton } from './HeartButton'
import { vi } from 'vitest'
import axios from 'axios'

test('it renders a favorited heart (red)', async () => {
  const favoriteId = 'favoriteId'
  const currentUser = {
    id: 'userId',
    name: 'Cesar',
    email: null,
    emailVerified: '',
    image: '',
    hashedPassword: '',
    createdAt: '',
    updatedAt: '',
    favoriteIds: [favoriteId],
  }

  const { container } = render(<HeartButton listingId={favoriteId} currentUser={currentUser} />)
  const svgs = container.querySelectorAll('svg')
  const heartSvg = svgs[1]
  expect(heartSvg).toHaveClass('fill-red-500')
})

test('it renders a un-favorited heart (neutral)', async () => {
  const notFavoriteId = 'notFavoriteId'
  const currentUser = {
    id: 'userId',
    name: 'Cesar',
    email: null,
    emailVerified: '',
    image: '',
    hashedPassword: '',
    createdAt: '',
    updatedAt: '',
    favoriteIds: [notFavoriteId],
  }

  const { container } = render(<HeartButton listingId={notFavoriteId} currentUser={currentUser} />)
  const svgs = container.querySelectorAll('svg')
  const heartSvg = svgs[1]
  expect(heartSvg).toHaveClass('fill-red-500')
})
