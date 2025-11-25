// spec: e2e/arc-docs-test-plan.md
// seed: e2e/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Navigation and Page Loading', () => {
  test('Direct URL Navigation', async ({ page }) => {
    // 1. Navigate directly to `http://localhost:4200/docs/getting-started/intro`
    await page.goto('http://localhost:4200/docs/getting-started/intro');

    // 2. Verify the page loads correctly
    // Verify page loads with the Introduction content displayed
    await expect(page.getByText('What is Arc-Angular-Boilerplate')).toBeVisible();

    // Verify page title remains "ArcDocs"
    await expect(page).toHaveTitle('ArcDocs');

    // Verify URL shows `/docs/getting-started/intro`
    await expect(page).toHaveURL('/docs/getting-started/intro');

    // Verify "Getting Started" menu section is expanded and "Introduction" menu item is visible
    await expect(page.getByRole('link', { name: 'Introduction' }).nth(0)).toBeVisible();
  });
});
