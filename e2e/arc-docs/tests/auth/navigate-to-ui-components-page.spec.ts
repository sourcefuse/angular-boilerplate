// spec: e2e/arc-docs-test-plan.md
// seed: e2e/seed.spec.ts

import {test, expect} from '@playwright/test';

test.describe('Auth Section Navigation', () => {
  test('Navigate to UI Components Page', async ({page}) => {
    // 1. Navigate to `http://localhost:4200/`
    await page.goto('/');

    // 2. Expand "Auth" menu
    await page.getByRole('link', {name: 'Auth'}).click();

    // 3. Click on "UI Components"
    await page.getByRole('link', {name: 'UI Components'}).click();

    // 4. Verify detailed page content
    // Verify page displays "UI Components" heading
    await expect(
      page.getByRole('heading', {name: 'UI Components'}),
    ).toBeVisible();

    // Verify URL changes to `/docs/auth-doc/configureUI`
    await expect(page).toHaveURL('/docs/auth-doc/configureUI');

    // Verify sections for each component are visible
    // Login Component with `<app-login></app-login>` usage
    await expect(page.getByText('Login Component')).toBeVisible();
    await expect(page.getByText('<app-login></app-login>')).toBeVisible();

    // SignUp Component with `<lib-signup></lib-signup>` usage
    await expect(page.getByText('SignUp Component')).toBeVisible();
    await expect(page.getByText('<lib-signup></lib-signup>')).toBeVisible();

    // Forget Password Component with `<lib-forgot-password></lib-forgot-password>` usage
    await expect(page.getByText('Forget Password Component')).toBeVisible();
    await expect(
      page.getByText('<lib-forgot-password></lib-forgot-password>'),
    ).toBeVisible();

    // Reset Password Component with `<lib-reset-password></lib-reset-password>` usage
    await expect(page.getByText('Reset Password Component')).toBeVisible();
    await expect(
      page.getByText('<lib-reset-password></lib-reset-password>'),
    ).toBeVisible();
  });
});
