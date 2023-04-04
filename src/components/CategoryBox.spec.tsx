import { render, screen } from '@testing-library/react'
import { CategoryBox } from './CategoryBox'
import { AiFillAlert } from 'react-icons/ai'
import userEvent from '@testing-library/user-event'

test('it renders a non-selected category box with an svg, label, selected styles', async () => {
  const testLabel = 'selectedCategory'

  const { container } = render(<CategoryBox label={testLabel} icon={AiFillAlert} />)

  const svg = container.querySelector('svg')
  expect(svg).toBeInTheDocument()

  const label = screen.getByText(testLabel)
  expect(label).toBeInTheDocument()
  const box = screen.getByTestId('category-box')
  expect(box).toHaveClass('border-b-neutral-800 text-neutral-800')
})

test('it renders a non-selected category box with an svg, label, non-selected styles', async () => {
  const testLabel = 'non-selectedCategory'

  const { container } = render(<CategoryBox label={testLabel} icon={AiFillAlert} />)

  const svg = container.querySelector('svg')
  expect(svg).toBeInTheDocument()

  const label = screen.getByText(testLabel)
  expect(label).toBeInTheDocument()
  const box = screen.getByTestId('category-box')
  expect(box).toHaveClass('border-b-transparent text-neutral-500')
})
