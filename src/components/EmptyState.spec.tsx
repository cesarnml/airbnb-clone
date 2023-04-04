import { render, screen } from '@testing-library/react'
import { EmptyState } from './EmptyState'

test('it renders a reset button when `showReset`', async () => {
  render(<EmptyState showReset />)

  expect(screen.getByRole('button', { name: /reset all filters/i })).toBeInTheDocument()
})

test('it does not render a reset button', async () => {
  render(<EmptyState />)

  expect(screen.queryByRole('button', { name: /reset all filters/i })).not.toBeInTheDocument()
})
