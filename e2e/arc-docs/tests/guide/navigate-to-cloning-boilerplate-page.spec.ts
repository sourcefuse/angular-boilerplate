// spec: e2e/arc-docs-test-plan.md
// seed: e2e/seed.spec.ts

import {test, expect} from '@playwright/test';

test.describe('Guide Section Navigation', () => {
  test('Navigate to Cloning Boilerplate Page', async ({page}) => {
    // 1. Navigate to `http://localhost:4200/`
    await page.goto('/');

    // 2. Click on "Guide" to expand the menu
    await page.getByRole('link', {name: 'Guide'}).click();

    // 3. Click on "Cloning Boilerplate"
    await page.getByRole('link', {name: 'Cloning Boilerplate'}).click();

    // 4. Verify page content
    // Verify URL changes to `/docs/guide/clone`
    await expect(page).toHaveURL('/docs/guide/clone');

    // Verify page displays sections
    await expect(page.getByText('Prerequisites')).toBeVisible();
    await expect(
      page.getByRole('heading', {name: 'Cloning Process'}),
    ).toBeVisible();
    await expect(page.getByText('Usage')).toBeVisible();
    await expect(page.getByText('Run Project')).toBeVisible();
    await expect(page.getByText('Additional Resources')).toBeVisible();
  });
});
