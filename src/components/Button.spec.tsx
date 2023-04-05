import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Button } from './Button'
import { noop } from '$/lib/helpers'
import { AiFillAlert } from 'react-icons/ai'
import { vi } from 'vitest'

test('it renders a button that displays a label with default styling', async () => {
  const testLabel = 'testLabel'
  const { container } = render(<Button label={testLabel} onClick={noop} />)

  const button = screen.getByRole('button', { name: RegExp(testLabel, 'i') })
  expect(button).toBeInTheDocument()

  // Default styles/status
  expect(button).not.toHaveAttribute('disabled')
  expect(button).toHaveClass('text-white')
  expect(button).toHaveClass('text-md')

  // Default to no icon
  const svg = container.querySelector('svg')
  expect(svg).not.toBeInTheDocument()
})

test('it renders a disabled button when `disabled` prop is passed', async () => {
  const testLabel = 'testLabel'
  render(<Button label={testLabel} onClick={noop} disabled />)

  const button = screen.getByRole('button', { name: RegExp(testLabel, 'i') })
  expect(button).toBeDisabled()
})

test('it renders an outline button when passed `outline` prop', async () => {
  const testLabel = 'testLabel'
  render(<Button label={testLabel} onClick={noop} outline />)

  const button = screen.getByRole('button', { name: RegExp(testLabel, 'i') })
  expect(button).toHaveClass('text-black')
})

test('it renders an small button when passed `small` prop', async () => {
  const testLabel = 'testLabel'
  render(<Button label={testLabel} onClick={noop} small />)

  const button = screen.getByRole('button', { name: RegExp(testLabel, 'i') })
  expect(button).toHaveClass('text-sm')
})

test('it renders an icon when passed `icon` prop', async () => {
  const testLabel = 'testLabel'
  const { container } = render(<Button label={testLabel} onClick={noop} icon={AiFillAlert} />)
  const svg = container.querySelector('svg')
  expect(svg).toBeInTheDocument()
})

test('it calls the `onClick` handler when clicked', async () => {
  const testLabel = 'testLabel'
  const onClickMock = vi.fn()
  render(<Button label={testLabel} onClick={onClickMock} icon={AiFillAlert} />)
  const button = screen.getByRole('button', { name: RegExp(testLabel, 'i') })
  expect(onClickMock).not.toHaveBeenCalled()
  await userEvent.click(button)
  expect(onClickMock).toHaveBeenCalled()
})
