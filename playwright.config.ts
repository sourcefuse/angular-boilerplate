import {defineConfig} from '@playwright/test';

/**
 * Root Playwright configuration
 *
 * This configuration serves as a master config for running tests across all projects.
 * Each project (arc-docs, arc, saas-ui) has its own dedicated playwright.config.ts
 * in the e2e/<project-name>/ directory.
 *
 * To run tests for a specific project:
 * - npm run e2e:arc-docs
 * - npm run e2e:arc
 * - npm run e2e:saas-ui
 *
 * To run all tests: npm run e2e:all
 *
 * See https://playwright.dev/docs/test-configuration.
 */
//This config in not in use, but kept for reference
export default defineConfig({
  // This config is intentionally minimal as project-specific configs are in subdirectories
  // You can run tests from specific project directories or use the npm scripts

  testDir: './e2e',

  /* Global settings */
  fullyParallel: false, // Sequential execution when running multiple projects
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,

  reporter: [['html', {outputFolder: 'playwright-report/all'}], ['list']],

  // Note: Each project has its own webServer configuration in their respective configs
});
