import { expect, test as setup } from '@playwright/test';

import { STORAGE_STATE } from '@/playwright.config';

setup('authenticate', async ({ page }) => {
  const email = process.env.E2E_TEST_EMAIL;
  const password = process.env.E2E_TEST_PASSWORD;

  if (!email || !password) {
    throw new Error('E2E_TEST_EMAIL and E2E_TEST_PASSWORD must be set in .env file');
  }

  // Go to login page
  await page.goto('/login');

  // Fill in credentials
  await page.getByTestId('email-input').fill(email);
  await page.getByTestId('password-input').fill(password);

  // Submit login form
  await page.getByTestId('auth-submit-button').click();

  // Wait for redirect to homepage (successful login)
  await page.waitForURL('/', { timeout: 10000 });

  // Verify logged in - logout button should be visible
  await expect(page.getByTestId('logout-button')).toBeVisible({ timeout: 5000 });

  // Save authentication state
  await page.context().storageState({ path: STORAGE_STATE });
});
