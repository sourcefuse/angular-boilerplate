// spec: e2e/arc-docs-test-plan.md
// seed: e2e/seed.spec.ts

import {test, expect} from '@playwright/test';

test.describe('Sidebar Navigation - Menu Expansion/Collapse', () => {
  test('Expand Getting Started Menu', async ({page}) => {
    // 1. Navigate to `http://localhost:4200/`
    await page.goto('/');

    // 2. Click on "Getting Started" menu item
    await page.getByRole('link', {name: 'Getting Started'}).click();

    // 3. Verify "Getting Started" section expands to show submenu
    // Verify submenu displays "Introduction" link
    await expect(
      page.getByRole('link', {name: 'Introduction'}).first(),
    ).toBeVisible();
  });
});
