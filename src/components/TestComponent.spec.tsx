import { render, screen } from '@testing-library/react'
import TestComponent from '$/components/TestComponent'

it('test a test component', () => {
  render(<TestComponent />)
  const hello = screen.getByText(/hello/i)
  expect(hello).toBeInTheDocument()
})
