// spec: e2e/arc-docs-test-plan.md
// seed: e2e/seed.spec.ts

import {test, expect} from '@playwright/test';

test.describe('Auth Section Navigation', () => {
  test('Navigate to Installation Page', async ({page}) => {
    // 1. Navigate to `http://localhost:4200/`
    await page.goto('/');

    // 2. Expand "Auth" menu
    await page.getByRole('link', {name: 'Auth'}).click();

    // 3. Click on "Installation"
    await page.getByRole('link', {name: 'Installation'}).click();

    // 4. Verify page content
    // Verify URL changes to `/docs/auth-doc/installation`
    await expect(page).toHaveURL('/docs/auth-doc/installation');

    // Verify page displays sections
    await expect(
      page.getByRole('heading', {name: 'Install the module'}),
    ).toBeVisible();
    await expect(
      page.getByRole('heading', {name: 'HttpClientModule'}),
    ).toBeVisible();
    await expect(page.getByText('Configure a strategy')).toBeVisible();
    await expect(page.getByText('Enable Auth Components')).toBeVisible();
  });
});
