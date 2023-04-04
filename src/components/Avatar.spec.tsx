import { render, screen } from '@testing-library/react'
import { Avatar } from './Avatar'

test('it renders an image', async () => {
  render(<Avatar src='/images/placeholder.jpg' />)

  const image = screen.getByRole('img', { name: /avatar/i })
  expect(image).toBeInTheDocument()
})
