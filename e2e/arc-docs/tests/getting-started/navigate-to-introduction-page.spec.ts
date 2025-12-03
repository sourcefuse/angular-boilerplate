// spec: e2e/arc-docs-test-plan.md
// seed: e2e/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Getting Started Section Navigation', () => {
  test('Navigate to Introduction Page', async ({ page }) => {
    // 1. Navigate to `http://localhost:4200/`
    await page.goto('/');

    // 2. Click on "Getting Started" to expand the menu
    await page.getByRole('link', { name: 'Getting Started' }).click();

    // 3. Click on "Introduction" link
    await page.getByRole('link', { name: 'Introduction' }).first().click();

    // 4. Verify content loads correctly
    // Verify URL changes to `/docs/getting-started/intro`
    await expect(page).toHaveURL('/docs/getting-started/intro');

    // Verify page displays heading "What is Arc-Angular-Boilerplate"
    await expect(page.getByText('What is Arc-Angular-Boilerplate')).toBeVisible();

    // Verify content includes sections: "Key Features:" and "Why We need to Use Angular Boilerplate?"
    await expect(page.getByText('Key Features:')).toBeVisible();
    await expect(page.getByText('Why We need to Use Angular Boilerplate?')).toBeVisible();
  });
});
