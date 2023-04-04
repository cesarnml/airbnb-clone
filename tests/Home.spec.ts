import { test, expect } from '@playwright/test'

test('a user can login and logout', async ({ page }) => {
  await page.goto('/')

  const avatarMenu = page.getByRole('img', { name: /avatar/i })
  await avatarMenu.click()

  const loginButton = page.getByText(/login/i)
  await loginButton.click()

  await page.locator('#email').type('test2@email.com')
  await page.locator('#password').type('password')
  await page.getByRole('button', { name: 'Continue', exact: true }).press('Enter')

  const loginSuccessMessage = page.getByText('Logged in')
  await expect(loginSuccessMessage).toBeVisible()

  await avatarMenu.click()
  const logoutButton = page.getByText(/logout/i)
  await expect(logoutButton).toBeVisible()
  await logoutButton.click()

  await avatarMenu.click()
  await expect(loginButton).toBeVisible()
})

test.describe('user NOT logged in', () => {
  test('can view the homepage and see a login and signup button', async ({ page }) => {
    await page.goto('/')

    const avatarMenu = page.getByRole('img', { name: /avatar/i })
    await avatarMenu.click()
    const loginButton = page.getByText(/login/i)
    const signupButton = page.getByText(/sign up/i)

    await expect(loginButton).toBeVisible()
    await expect(signupButton).toBeVisible()
  })

  test('is able to visit individual listing page', async ({ page }) => {
    await page.goto('/')

    const listing = page.getByRole('img', { name: /listing/i }).first()
    await listing.click()
    const reserveButton = page.getByRole('button', { name: /reserve/i })
    await expect(reserveButton).toBeVisible()
  })

  test('on attempt to favorite a listing is prompted to login', async ({ page }) => {
    await page.goto('/')

    const favoriteButton = page.getByRole('button', { name: /favorite/i }).first()
    await favoriteButton.click()

    const loginModal = page.getByRole('heading', { name: 'Login', exact: true })
    await expect(loginModal).toBeVisible()
  })

  test('on attempt to create a property is prompted to login', async ({ page }) => {
    await page.goto('/')

    const createListingButton = page.getByRole('button', { name: /airbnb your home/i })
    await createListingButton.click()
    const loginModal = page.getByRole('heading', { name: 'Login', exact: true })
    await expect(loginModal).toBeVisible()
  })

  test('is able to activate listing search box modal', async ({ page }) => {
    await page.goto('/')

    const searchBox = page.getByRole('button', { name: /search/i })
    await searchBox.click()
    const searchModal = page.getByRole('heading', { name: /filters/i })

    await expect(searchModal).toBeVisible()
  })
})

test.describe('user IS logged in', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')

    const avatarMenu = page.getByRole('img', { name: /avatar/i })
    await avatarMenu.click()

    const loginButton = page.getByText(/login/i)
    await loginButton.click()

    await page.locator('#email').type('test2@email.com')
    await page.locator('#password').type('password')
    await page.getByRole('button', { name: 'Continue', exact: true }).click()
  })

  test('can create a listing', async ({ page }) => {
    const createListingButton = page.getByRole('button', { name: /airbnb your home/i })
    await createListingButton.click()

    const rentModal = page.getByRole('heading', { name: /airbnb your home/i })
    await expect(rentModal).toBeVisible()

    const categoryList = page.getByTestId(/category list/i)
    await categoryList.getByText(/windmills/i).click()
    const nextButton = page.getByRole('button', { name: /next/i })
    await nextButton.click()
    expect(page.getByRole('heading', { name: /where is your place located/i }))

    const countrySelect = page.getByRole('combobox')
    await countrySelect.type('thailand')
    await nextButton.click()
    await expect(page.getByRole('heading', { name: /share some basics/i })).toBeVisible()

    await nextButton.click()
    await nextButton.click()

    const titleInput = page.locator('#title')
    const descriptionInput = page.locator('#description')

    await titleInput.type('New test property')
    await descriptionInput.type('Much wow. Must book!')
    await nextButton.click()

    const createButton = page.getByRole('button', { name: /create/i })
    await createButton.click()
  })
})
