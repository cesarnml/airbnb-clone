import { render, screen } from '@testing-library/react'
import { ClientOnly } from './ClientOnly'

test('it renders children', async () => {
  render(
    <ClientOnly>
      <div>child</div>
    </ClientOnly>,
  )
  expect(screen.getByText('child')).toBeInTheDocument()
})
