// This is a seed file used as a starting point for generating new tests.
// All actual test scenarios are implemented in their respective feature folders:
// - navigation-and-page-loading/
// - getting-started/
// - guide/
// - auth/
//
// See e2e/arc-docs-test-plan.md for the complete test plan.

import {test, expect} from '@playwright/test';

test.describe('Seed Test', () => {
  test('basic navigation smoke test', async ({page}) => {
    // Basic smoke test to verify the application loads
    await page.goto('/');

    // Verify redirect to /docs
    await expect(page).toHaveURL('/docs');

    // Verify page title
    await expect(page).toHaveTitle('ArcDocs');
  });
});
