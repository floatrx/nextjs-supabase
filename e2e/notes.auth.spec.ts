import { expect, test } from '@playwright/test';

test.describe('Notes (authenticated)', () => {
  test('note form is visible', async ({ page }) => {
    await page.goto('/notes');

    await expect(page.getByTestId('note-input')).toBeVisible();
    await expect(page.getByTestId('add-note-button')).toBeVisible();
  });

  test('can add a new note', async ({ page }) => {
    await page.goto('/notes');

    const noteText = `Test note ${Date.now()}`;
    await page.getByTestId('note-input').fill(noteText);
    await page.getByTestId('add-note-button').click();

    // Wait for the note to appear in the list
    await expect(page.getByTestId('note-item').first()).toBeVisible({ timeout: 5000 });
  });

  test.skip('can delete a note', async ({ page }) => {
    await page.goto('/notes');

    // First, add a note to delete
    const noteText = `Note to delete ${Date.now()}`;
    await page.getByTestId('note-input').fill(noteText);
    await page.getByTestId('add-note-button').click();

    // Wait for note to appear
    await expect(page.getByTestId('note-item').first()).toBeVisible({ timeout: 5000 });

    // Count notes before deletion
    const countBefore = await page.getByTestId('note-item').count();

    // Delete the first note
    await page.getByTestId('delete-note-button').first().click();

    // Wait for the note count to decrease
    await expect(async () => {
      const countAfter = await page.getByTestId('note-item').count();
      expect(countAfter).toBeLessThan(countBefore);
    }).toPass({ timeout: 5000 });
  });
});
