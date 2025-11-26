# E2E Test Organization

This directory contains end-to-end tests organized by Angular project.

## Structure

```
e2e/
├── arc-docs/                    # Tests for arc-docs project
│   ├── playwright.config.ts     # Project-specific config
│   └── tests/                   # Test files
│       ├── auth/
│       ├── getting-started/
│       ├── guide/
│       └── navigation-and-page-loading/
├── arc/                         # Tests for arc project
│   ├── playwright.config.ts     # Project-specific config
│   └── tests/                   # Test files (to be added)
└── saas-ui/                     # Tests for saas-ui project
    ├── playwright.config.ts     # Project-specific config
    └── tests/                   # Test files (to be added)
```

## Running Tests

### Run tests for a specific project:

```bash
npm run e2e:arc-docs        # Run arc-docs tests
npm run e2e:arc             # Run arc tests
npm run e2e:saas-ui         # Run saas-ui tests
```

### Run all tests sequentially:

```bash
npm run e2e:all
```

## Project Configuration

Each project has its own `playwright.config.ts` with:

- **Dedicated test directory**: `./tests`
- **Unique base URL and port**:
  - arc-docs: `http://localhost:4200`
  - arc: `http://localhost:4201`
  - saas-ui: `http://localhost:4202`
- **Project-specific reports**: `playwright-report/<project-name>/`
- **Automatic dev server startup**: Each config starts its respective Angular app

## Adding Tests for New Projects

1. Create a new folder: `e2e/<project-name>/`
2. Copy an existing `playwright.config.ts` and update:
   - Base URL and port
   - Web server command
   - Report output paths
3. Create `tests/` folder for your test files
4. Add npm scripts to `package.json`

## Best Practices

1. **Keep tests isolated**: Each project's tests should be independent
2. **Consistent naming**: Follow the existing test file naming conventions
3. **Page Object Models**: Consider creating POMs within each project's test folder
4. **Environment variables**: Use `.env` files for environment-specific configuration
