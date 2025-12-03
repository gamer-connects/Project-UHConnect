import { test, expect } from '@playwright/test';

test.describe('Games Page', () => {
  test('loads and shows game cards', async ({ page }) => {
    await page.goto('/games');

    // Page title
    await expect(page.getByRole('heading', { name: 'Games' })).toBeVisible();

    // Game titles (inside the cards)
    await expect(page.locator('text=Minecraft')).toBeVisible();
    await expect(page.locator('text=Valorant')).toBeVisible();
  });

  test('clicking Minecraft card redirects correctly', async ({ page }) => {
    await page.goto('/games');

    await page.locator('a[href="/games/minecraft"]').click();

    await expect(page).toHaveURL(/\/games\/minecraft$/);
  });

  test('clicking Valorant card redirects correctly', async ({ page }) => {
    await page.goto('/games');

    await page.locator('a[href="/games/valorant"]').click();

    await expect(page).toHaveURL(/\/games\/valorant$/);
  });
});
