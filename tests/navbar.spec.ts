import { test, expect } from '@playwright/test';

test('navbar links redirect correctly', async ({ page }) => {
  await page.goto('http://127.0.0.1:3000/');

  const navbar = page.locator('nav');
  await expect(navbar).toBeVisible();

  await page.click('text=Games');

  await expect(page).toHaveURL('http://127.0.0.1:3000/games');
  await expect(page.getByRole('heading', { name: 'Games' })).toBeVisible();
});
