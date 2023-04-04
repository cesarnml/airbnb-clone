import { render, screen } from '@testing-library/react'
import { Container } from './Container'

test('it renders children', async () => {
  render(
    <Container>
      <div>child</div>
    </Container>,
  )
  expect(screen.getByText('child')).toBeInTheDocument()
})
