import { categories } from '$/components/navbar/Categories'
import * as ReactTesting from '@testing-library/react'
import { vi } from 'vitest'

vi.mock('next/navigation', () => ({
  back: vi.fn(),
  forward: vi.fn(),
  refresh: vi.fn(),
  push: vi.fn(),
  replace: vi.fn(),
  prefetch: vi.fn(),
  useRouter: () => ({
    push: vi.fn(),
  }),
  useSearchParams: () => ({
    get: vi.fn().mockImplementation((category: string) => 'selectedCategory'),
    toString: vi.fn(),
    delete: vi.fn(),
  }),
}))
