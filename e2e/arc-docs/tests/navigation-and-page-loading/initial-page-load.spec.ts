// spec: e2e/arc-docs-test-plan.md
// seed: e2e/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Navigation and Page Loading', () => {
  test('Initial Page Load', async ({ page }) => {
    // 1. Navigate to `http://localhost:4200/`
    await page.goto('/');

    // 2. Verify application redirects to `/docs` route
    await expect(page).toHaveURL('/docs');

    // Verify page title displays "ArcDocs"
    await expect(page).toHaveTitle('ArcDocs');

    // Verify sidebar navigation is visible with all menu sections collapsed by default
    await expect(page.getByRole('navigation')).toBeVisible();

    // Verify logo is displayed in the header
    await expect(page.getByRole('img', { name: 'logo' })).toBeVisible();

    // Verify footer displays "Privacy", "Terms & conditions" links and "© Boiler Plate" text
    await expect(page.getByRole('link', { name: 'Privacy' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Terms & conditions' })).toBeVisible();
    await expect(page.getByText('© Boiler Plate')).toBeVisible();
  });
});
