import { test, expect } from '@playwright/test'

test('sign in/logout/sign in', async ({ page }) => {
  await page.goto('http://localhost:3000/')

  const avatar = page.getByRole('img', { name: /avatar/i })

  await avatar.click()

  const signUp = page.getByText(/login/i)
  await signUp.click()
  await page.locator('#email').type('test2@email.com')
  // await page.locator('#name').type('Cesar Napoleon')
  await page.locator('#password').type('password')

  await page.getByRole('button', { name: 'Continue', exact: true }).press('Enter')

  await avatar.click()
  const successMsg = page.getByText('Logged in')
  expect(successMsg).toBeDefined()

  await avatar.click()
  const logout = page.getByText(/logout/i)
  expect(logout).toBeDefined()
  await logout.click()
  await avatar.click()
  const login = page.getByText(/login/i)
  expect(login).toBeDefined()
})
