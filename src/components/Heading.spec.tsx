import { render, screen } from '@testing-library/react'
import { Heading } from './Heading'

test('it renders a heading (h2) and a subheading (h3)', async () => {
  const title = 'test title'
  const subtitle = 'test subtitle'
  render(<Heading title={title} subtitle={subtitle} />)

  const heading = screen.getByRole('heading', { name: RegExp(title, 'i') })
  const subheading = screen.getByRole('heading', { name: RegExp(subtitle, 'i') })
  const div = screen.getByTestId('heading')
  expect(heading).toBeInTheDocument()
  expect(subheading).toBeInTheDocument()
  expect(div).toHaveClass('text-start')
})

test('it centers text when passed `center`', async () => {
  const title = 'test title'
  const subtitle = 'test subtitle'
  render(<Heading title={title} subtitle={subtitle} center />)
  const div = screen.getByTestId('heading')
  expect(div).toHaveClass('text-center')
})
