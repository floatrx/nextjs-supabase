import { expect, test } from '@playwright/test';

test.describe('Navigation', () => {
  test('homepage loads successfully', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/SupabaseBlog/i);
  });

  test('can navigate to blog page', async ({ page }) => {
    await page.goto('/');
    // Wait for the page to load
    await page.waitForLoadState('networkidle');
  });

  test('login page is accessible', async ({ page }) => {
    await page.goto('/login');
    await expect(page.getByTestId('email-input')).toBeVisible();
    await expect(page.getByTestId('password-input')).toBeVisible();
    await expect(page.getByTestId('auth-submit-button')).toBeVisible();
  });

  test('OAuth buttons are visible on login page', async ({ page }) => {
    await page.goto('/login');
    await expect(page.getByTestId('google-login')).toBeVisible();
    await expect(page.getByTestId('github-login')).toBeVisible();
  });

  test('unauthenticated user sees login button', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByTestId('login-button')).toBeVisible();
  });

  test('private routes redirect to login', async ({ page }) => {
    await page.goto('/notes');
    // Should redirect to login page
    await expect(page).toHaveURL(/login/);
  });
});
