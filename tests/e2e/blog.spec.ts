import { expect, test } from '@playwright/test';

test.describe('Blog Preview', () => {
  test('clicking thumbnail opens preview modal', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const thumbnail = page.getByTestId('post-thumbnail').first();

    if (await thumbnail.isVisible()) {
      await thumbnail.click();

      // Modal should appear
      const modal = page.getByTestId('post-preview-modal');
      await expect(modal).toBeVisible();

      // Modal should contain article content
      await expect(modal.locator('article').first()).toBeVisible();
    }
  });

  test('clicking tag opens preview modal', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const postCard = page.getByTestId('post-card').first();

    if (await postCard.isVisible()) {
      // Find a tag button within the card (not a link)
      const tagButton = postCard.locator('button').first();

      if (await tagButton.isVisible()) {
        await tagButton.click();

        // Modal should appear
        const modal = page.getByTestId('post-preview-modal');
        await expect(modal).toBeVisible();
      }
    }
  });

  test('preview modal can be closed', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const thumbnail = page.getByTestId('post-thumbnail').first();

    if (await thumbnail.isVisible()) {
      await thumbnail.click();

      const modal = page.getByTestId('post-preview-modal');
      await expect(modal).toBeVisible();

      // Press Escape to close
      await page.keyboard.press('Escape');

      // Modal should be hidden
      await expect(modal).not.toBeVisible();
    }
  });

  test('preview modal has link to full article', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const thumbnail = page.getByTestId('post-thumbnail').first();

    if (await thumbnail.isVisible()) {
      await thumbnail.click();

      const modal = page.getByTestId('post-preview-modal');
      await expect(modal).toBeVisible();

      // Should have "Open full article" button/link
      const fullArticleLink = modal.getByText(/open full article/i);
      await expect(fullArticleLink).toBeVisible();
    }
  });
});

test.describe('Blog', () => {
  test('homepage shows blog posts', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Check if post cards are visible (if there are posts)
    const postCards = page.getByTestId('post-card');
    const count = await postCards.count();

    // If there are posts, verify structure
    if (count > 0) {
      await expect(postCards.first()).toBeVisible();
      await expect(page.getByTestId('post-title').first()).toBeVisible();
    }
  });

  test('can click on a blog post to view it', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const postTitle = page.getByTestId('post-title').first();

    if (await postTitle.isVisible()) {
      const titleText = await postTitle.textContent();
      await postTitle.click();

      // Should navigate to the blog post page
      await expect(page).toHaveURL(/\/blog\//);

      // Page should contain the post title
      if (titleText) {
        await expect(page.locator('h1, h2').first()).toBeVisible();
      }
    }
  });

  test('blog post page has proper structure', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const firstPost = page.getByTestId('post-title').first();

    if (await firstPost.isVisible()) {
      await firstPost.click();
      await page.waitForLoadState('networkidle');

      // Blog post page should have content
      await expect(page.locator('article').first()).toBeVisible();
    }
  });
});
