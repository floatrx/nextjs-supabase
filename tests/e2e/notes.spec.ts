import { expect, test } from '@playwright/test';

test.describe('Notes (unauthenticated)', () => {
  test('notes page redirects unauthenticated users', async ({ page }) => {
    await page.goto('/notes');

    // Should redirect to login
    await expect(page).toHaveURL(/login/);
  });
});
