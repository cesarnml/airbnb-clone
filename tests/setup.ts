import { afterEach } from 'vitest'
import { cleanup } from '@testing-library/react'
import { test, expect } from '@playwright/test'

// extends Vitest's expect method with methods from react-testing-library
import '@testing-library/jest-dom'

// runs a cleanup after each test case (e.g. clearing jsdom)
afterEach(() => {
  cleanup()
})
