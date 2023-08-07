import { test, expect } from '@playwright/test'

test.beforeEach(async ({ page }) => {
	await page.goto('http://localhost:5173/')
})

test.describe('App feature', () => {
	test('can search for a book', async ({ page }) => {
		await page.getByPlaceholder('Search book titles...').fill('harry')
		await page.waitForTimeout(600)
		const books = await page.getByRole('listitem')

		await expect(await books.count()).toBe(1)
		await expect(books.first()).toContainText('Harry Potter y la piedra filosofal')
	})

	test('can filter by page count', async ({ page }) => {
		const slider = await page.getByLabel('Pages:')
		// await page.locator('input[type=range]')
		// await page.waitForSelector('input[type=range]')

		if (slider) {
			const srcBound = await slider.boundingBox()
			if (srcBound) {
				await page.mouse.move(srcBound.x + srcBound.width / 2, srcBound.y + srcBound.height / 2)
				await page.mouse.down()
				await page.mouse.move(
					srcBound.x + srcBound.width / 2 - 100,
					srcBound.y + srcBound.height / 2
				)
				await page.mouse.up()
				await page.waitForTimeout(600)
			}
		}

		const books = await page.getByRole('listitem')
		const results = await page.getByText('No books')

		await expect(await books.count()).toBe(0)
		await expect(results).toContainText('No books')
	})

	test('can filter books by genre', async ({ page }) => {
		await page.getByRole('button', { name: 'Zombies' }).click()

		const books = await page.getByRole('listitem')

		await expect(await books.count()).toBe(1)
		await expect(books.first()).toContainText('Apocalipsis Zombie')
	})

	test('can add book to favorites', async ({ page }) => {
		await page.getByRole('listitem').getByRole('button').first().click()
		const favorites = await page.locator('ul[role=favorites-list] > li')

		await expect(await favorites.count()).toBe(1)
		await expect(favorites.first()).toContainText('Juego de Tronos')
	})

	test('can remove book from favorites', async ({ page }) => {
		await page.getByRole('listitem').getByRole('button').first().click()
		const favorites = await page.locator('ul[role=favorites-list] > li')

		await expect(await favorites.count()).toBe(1)
		await expect(favorites.first()).toContainText('Juego de Tronos')

		await favorites.first().getByRole('button').click()

		const books = await page.getByRole('listitem')
		await expect(await books.count()).toBe(12)
	})
})
