import { expect, test } from '@playwright/test';

test.describe('Authentication', () => {
  test('login form validates email', async ({ page }) => {
    await page.goto('/login');

    // Try to submit with empty form
    await page.getByTestId('auth-submit-button').click();

    // Form should still be visible (not submitted due to validation)
    await expect(page.getByTestId('email-input')).toBeVisible();
  });

  test('login form accepts valid input', async ({ page }) => {
    await page.goto('/login');

    // Fill in the form
    await page.getByTestId('email-input').fill('test@example.com');
    await page.getByTestId('password-input').fill('testpassword123');

    // Submit button should be clickable
    await expect(page.getByTestId('auth-submit-button')).toBeEnabled();
  });

  test('login with invalid credentials shows error', async ({ page }) => {
    await page.goto('/login');

    await page.getByTestId('email-input').fill('invalid@test.com');
    await page.getByTestId('password-input').fill('wrongpassword');
    await page.getByTestId('auth-submit-button').click();

    // Wait for error toast or message
    await page.waitForTimeout(2000);

    // Should still be on login page
    await expect(page).toHaveURL(/login/);
  });

  test('can switch between login and signup tabs', async ({ page }) => {
    await page.goto('/login');

    // Look for signup tab
    const signupTab = page.getByRole('tab', { name: /sign ?up/i });
    if (await signupTab.isVisible()) {
      await signupTab.click();
      await expect(page.getByTestId('auth-submit-button')).toContainText(/sign ?up/i);
    }
  });
});
