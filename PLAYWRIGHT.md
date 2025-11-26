# Playwright E2E Testing Setup

This Angular boilerplate includes Playwright for end-to-end testing across multiple projects in the workspace. Playwright provides reliable testing across Chromium, Firefox, and WebKit browsers with project-separated architecture for scalable test organization.

## Installation

Playwright is already configured in this boilerplate. If you need to reinstall:

```bash
npm install -D @playwright/test
npx playwright install
```

## Project Structure

```
e2e/
├── arc-docs/                        # Arc-Docs project tests
│   ├── playwright.config.ts         # Arc-Docs specific config (port 4200)
│   └── tests/
│       ├── arc-docs-test-plan.md
│       ├── seed.spec.ts
│       ├── navigation-and-page-loading/
│       │   ├── initial-page-load.spec.ts
│       │   ├── direct-url-navigation.spec.ts
│       │   └── expand-getting-started-menu.spec.ts
│       ├── getting-started/
│       │   └── navigate-to-introduction-page.spec.ts
│       ├── guide/
│       │   └── navigate-to-cloning-boilerplate-page.spec.ts
│       └── auth/
│           ├── navigate-to-installation-page.spec.ts
│           └── navigate-to-ui-components-page.spec.ts
├── arc/                             # Arc project tests
│   ├── playwright.config.ts         # Arc specific config (port 4201)
│   └── tests/                       # Tests to be added
├── saas-ui/                         # SaaS UI project tests
│   ├── playwright.config.ts         # SaaS UI specific config (port 4202)
│   └── tests/                       # Tests to be added
└── README.md                        # E2E testing documentation
playwright.config.ts                 # Root config (for running all projects)
test-results/                        # Test output directory
├── arc-docs/                        # Arc-Docs test results
├── arc/                             # Arc test results
└── saas-ui/                         # SaaS UI test results
playwright-report/                   # HTML report directory
├── arc-docs/                        # Arc-Docs reports
├── arc/                             # Arc reports
└── saas-ui/                         # SaaS UI reports
```

## Running Tests

### Available Commands

**Run tests for specific projects:**

- `npm run e2e` - Run arc-docs tests (default)
- `npm run e2e:arc-docs` - Run arc-docs tests
- `npm run e2e:arc` - Run arc tests
- `npm run e2e:saas-ui` - Run saas-ui tests
- `npm run e2e:all` - Run all project tests sequentially

**Interactive modes:**

- `npm run e2e:ui:arc-docs` - Playwright UI mode for arc-docs
- `npm run e2e:ui:arc` - Playwright UI mode for arc
- `npm run e2e:ui:saas-ui` - Playwright UI mode for saas-ui
- `npm run e2e:headed` - Run arc-docs tests in headed mode (browser visible)

### Running Specific Tests

```bash
# Run a specific test file for a project
npx playwright test --config=e2e/arc-docs/playwright.config.ts navigation-and-page-loading/initial-page-load.spec.ts

# Run tests in a specific folder
npx playwright test --config=e2e/arc-docs/playwright.config.ts auth/

# Run tests in a specific browser
npx playwright test --config=e2e/arc-docs/playwright.config.ts --project=chromium

# Run all tests for a different project
npx playwright test --config=e2e/arc/playwright.config.ts
```

## Configuration

This workspace uses **project-specific Playwright configurations** located in each project folder:

- `e2e/arc-docs/playwright.config.ts` - Arc-Docs configuration
- `e2e/arc/playwright.config.ts` - Arc configuration
- `e2e/saas-ui/playwright.config.ts` - SaaS UI configuration

Each project configuration includes:

- **Test Directory**: `./tests` (relative to project folder)
- **Multiple browsers**: Desktop Chrome, Firefox, Safari, Mobile Chrome (Pixel 5), Mobile Safari (iPhone 12)
- **Parallel execution**: Tests run in parallel for faster execution (`fullyParallel: true`)
- **Auto-retry**: Failed tests are retried 2 times in CI environments
- **Screenshots**: Captured on failure (`screenshot: 'only-on-failure'`)
- **Videos**: Recorded on failure (`video: 'retain-on-failure'`)
- **Traces**: Collected on first retry for debugging (`trace: 'on-first-retry'`)
- **Web server**: Automatically starts the respective Angular project

### Project-Specific Configuration

**Arc-Docs:**

- **Base URL**: `http://localhost:4200`
- **Web Server Command**: `npm run start:arc-docs`
- **Reports**: `playwright-report/arc-docs/`
- **Test Results**: `test-results/arc-docs/`

**Arc:**

- **Base URL**: `http://localhost:4201`
- **Web Server Command**: `npm run start:arc`
- **Reports**: `playwright-report/arc/`
- **Test Results**: `test-results/arc/`

**SaaS UI:**

- **Base URL**: `http://localhost:4202`
- **Web Server Command**: `npm run start:saas-ui`
- **Reports**: `playwright-report/saas-ui/`
- **Test Results**: `test-results/saas-ui/`

### Shared Configuration

- **Server Timeout**: 2 minutes (120,000ms) for Angular to start
- **Reporters**: HTML, List, and JUnit
- **CI Optimization**: Single worker and retry enabled in CI environments
- **Reuse Server**: Development server reused locally, fresh start in CI

## Test Organization

### Test Plan Structure

Each project has its own test organization. For arc-docs, the comprehensive test plan is documented in `e2e/arc-docs/tests/arc-docs-test-plan.md`, which covers:

1. **Navigation and Page Loading**

   - Initial page load and redirect behavior
   - Direct URL navigation to documentation pages
   - Deep linking support

2. **Sidebar Navigation**

   - Menu expansion and collapse
   - Section navigation (Getting Started, Guide, Auth)
   - Active state highlighting

3. **Documentation Sections**
   - Getting Started section
   - Guide section
   - Auth documentation section

### Test File Organization

Tests are organized by project, then by feature/section with descriptive names:

```typescript
// spec: e2e/arc-docs/tests/arc-docs-test-plan.md
// seed: e2e/arc-docs/tests/seed.spec.ts

import {test, expect} from '@playwright/test';

test.describe('Navigation and Page Loading', () => {
  test('Initial Page Load', async ({page}) => {
    // Test steps with clear comments
    await page.goto('/');
    await expect(page).toHaveURL('/docs');
    await expect(page).toHaveTitle('ArcDocs');
  });
});
```

Each test file includes:

- Reference to the test plan specification
- Reference to the seed file
- Descriptive test suite and test names
- Step-by-step comments matching the test plan

## Writing Tests

### Best Practices Used in This Project

1. **Use semantic selectors** with roles and accessible names:

   ```typescript
   await page.getByRole('link', {name: 'Getting Started'}).click();
   await expect(page.getByRole('navigation')).toBeVisible();
   ```

2. **Verify URL changes** after navigation:

   ```typescript
   await expect(page).toHaveURL('/docs/getting-started/intro');
   ```

3. **Check page titles** for proper loading:

   ```typescript
   await expect(page).toHaveTitle('ArcDocs');
   ```

4. **Organize tests by feature** in separate directories for maintainability

5. **Document test origin** with spec and seed file references at the top

### Angular-Specific Configuration

Each project's web server configuration ensures the correct Angular app is ready before tests run:

**Arc-Docs:**

```typescript
webServer: {
  command: 'npm run start:arc-docs',
  url: 'http://localhost:4200',
  reuseExistingServer: !process.env.CI,
  timeout: 120 * 1000,
}
```

**Arc:**

```typescript
webServer: {
  command: 'npm run start:arc',
  url: 'http://localhost:4201',
  reuseExistingServer: !process.env.CI,
  timeout: 120 * 1000,
}
```

**SaaS UI:**

```typescript
webServer: {
  command: 'npm run start:saas-ui',
  url: 'http://localhost:4202',
  reuseExistingServer: !process.env.CI,
  timeout: 120 * 1000,
}
```

## CI/CD Integration

### GitHub Actions Example

```yaml
name: E2E Tests
on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '18'

      - name: Install dependencies
        run: npm ci

      - name: Install Playwright Browsers
        run: npx playwright install --with-deps

      - name: Run Playwright tests
        run: npm run e2e

      - name: Upload test results
        uses: actions/upload-artifact@v4
        if: always()
        with:
          name: playwright-report
          path: playwright-report/

      - name: Upload JUnit results
        uses: actions/upload-artifact@v4
        if: always()
        with:
          name: junit-results
          path: test-results/junit-results.xml
```

### CI-Specific Behavior

The configuration automatically optimizes for CI:

- Fails build if `test.only()` is accidentally committed
- Retries failed tests 2 times
- Runs tests sequentially (1 worker) for stability
- Always starts a fresh server
- Generates JUnit XML report for CI integration

## Debugging Tests

### Visual Debugging

1. **Headed mode**: See browser actions (arc-docs by default)

   ```bash
   npm run e2e:headed
   npx playwright test --headed --config=e2e/arc/playwright.config.ts
   ```

2. **UI mode**: Interactive test runner per project
   ```bash
   npm run e2e:ui:arc-docs
   npm run e2e:ui:arc
   npm run e2e:ui:saas-ui
   ```

### Trace Viewer

View detailed traces of failed tests:

```bash
npx playwright show-trace test-results/<test-name>/trace.zip
```

The trace includes:

- DOM snapshots at each step
- Network activity
- Console logs
- Screenshots
- Timing information

### Screenshots and Videos

Failed tests automatically capture:

- Screenshots in `test-results/` (only on failure)
- Videos in `test-results/` (retained on failure)
- Traces for retry attempts

## Advanced Features

### Multi-Project Testing

The configuration includes 5 browser projects:

1. **Desktop Chrome** (chromium)
2. **Desktop Firefox** (firefox)
3. **Desktop Safari** (webkit)
4. **Mobile Chrome** (Pixel 5)
5. **Mobile Safari** (iPhone 12)

Run specific projects:

```bash
npx playwright test --project=chromium
npx playwright test --project="Mobile Chrome"
```

### Accessibility Testing

Add axe-playwright for comprehensive a11y testing:

```bash
npm install -D @axe-core/playwright
```

```typescript
import {injectAxe, checkA11y} from '@axe-core/playwright';

test('should have no accessibility violations', async ({page}) => {
  await page.goto('/docs');
  await injectAxe(page);
  await checkA11y(page);
});
```

### Visual Regression Testing

Add visual comparisons with screenshots:

```typescript
test('should match visual baseline', async ({page}) => {
  await page.goto('/docs/getting-started/intro');
  await expect(page).toHaveScreenshot('introduction-page.png');
});
```

## Troubleshooting

### Common Issues

1. **Angular server timeout**: The timeout is set to 2 minutes. If your system is slow, increase it in `playwright.config.ts`
2. **Tests failing locally but passing in CI**: Check if `reuseExistingServer` is causing issues with stale state
3. **Port already in use**: Kill existing Angular dev servers on port 4200
4. **Flaky tests**: The project uses stable role-based selectors, but wait for Angular routing to complete

### Performance Tips

- Tests run fully parallel by default for speed
- Use `--headed=false` (default) for faster execution
- Focus on specific test files during development
- Use `test.only()` for debugging (but don't commit it!)
- Run single project during development: `--project=chromium`

## Current Test Coverage

The project currently covers:

✅ Initial page load and redirects  
✅ Direct URL navigation  
✅ Menu expansion/collapse  
✅ Navigation to Getting Started section  
✅ Navigation to Guide section  
✅ Navigation to Auth documentation  
✅ Footer verification  
✅ Title and URL validation

## Resources

- [Playwright Documentation](https://playwright.dev/)
- [Angular Testing Guide](https://angular.io/guide/testing)
- [Playwright Best Practices](https://playwright.dev/docs/best-practices)
- [E2E Organization Guide](e2e/README.md)
- [Arc-Docs Test Plan](e2e/arc-docs/tests/arc-docs-test-plan.md)
