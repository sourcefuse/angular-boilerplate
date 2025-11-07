# CLI Integration Implementation Guide

This guide provides step-by-step instructions for implementing CLI integration support.

## Overview

This PR restructures the Angular boilerplate to support the SourceLoop CLI with MCP integration by creating facade modules that make optional features (auth, themes, breadcrumbs) removable during scaffolding.

## Related Links

- **CLI PR**: https://github.com/sourcefuse/loopback4-microservice-catalog/pull/2359
- **Detailed Implementation Guide**: See parent directory `ANGULAR_PR_DETAILED.md`
- **Analysis Document**: See parent directory `REQUIRED_CHANGES_ANALYSIS.md`

## Quick Summary

### What We're Doing

Creating lightweight facade modules in `projects/arc/src/` that re-export functionality from `arc-lib`. The CLI can then remove these facades while keeping `arc-lib` intact.

### Why

- Makes auth, themes, and breadcrumbs truly optional
- Enables CLI flags: `--with-auth=false`, `--with-themes=false`, `--with-breadcrumbs=false`
- Reduces bundle size for projects that don't need all features
- Maintains backward compatibility (arc-lib unchanged)

## Implementation Steps

### Phase 1: Create Module Facades (30 min)

1. **Create Auth Facade**:
   ```bash
   mkdir -p projects/arc/src/auth
   ```

   Create `projects/arc/src/auth/auth.module.ts`:
   ```typescript
   import {NgModule} from '@angular/core';
   import {AuthenticationModule} from '@project-lib/core/authentication';

   @NgModule({
     imports: [AuthenticationModule],
     exports: [AuthenticationModule],
   })
   export class AuthModule {}
   ```

   Create `projects/arc/src/auth/index.ts`:
   ```typescript
   export * from './auth.module';
   export * from '@project-lib/core/authentication';
   ```

2. **Create Themes Facade**:
   ```bash
   mkdir -p projects/arc/src/themes
   ```

   Create `projects/arc/src/themes/theme.module.ts`:
   ```typescript
   import {NgModule, ModuleWithProviders} from '@angular/core';
   import {ThemeModule as LibThemeModule} from '@project-lib/theme/theme.module';

   @NgModule({
     imports: [LibThemeModule],
     exports: [LibThemeModule],
   })
   export class ThemeModule {
     static forRoot(theme: string): ModuleWithProviders<ThemeModule> {
       return {
         ngModule: ThemeModule,
         providers: LibThemeModule.forRoot(theme).providers || [],
       };
     }
   }
   ```

   Create `projects/arc/src/themes/index.ts`:
   ```typescript
   export * from './theme.module';
   export * from '@project-lib/theme';
   ```

3. **Create Breadcrumb Facade**:
   ```bash
   mkdir -p projects/arc/src/breadcrumbs
   ```

   Create `projects/arc/src/breadcrumbs/breadcrumb.module.ts`:
   ```typescript
   import {NgModule} from '@angular/core';
   import {BreadcrumbComponent, BreadcrumbModule as LibBreadcrumbModule} from '@project-lib/components';

   @NgModule({
     imports: [LibBreadcrumbModule],
     exports: [LibBreadcrumbModule, BreadcrumbComponent],
   })
   export class BreadcrumbModule {}
   ```

   Create `projects/arc/src/breadcrumbs/index.ts`:
   ```typescript
   export * from './breadcrumb.module';
   export * from '@project-lib/components/breadcrumb';
   ```

### Phase 2: Update app.module.ts (20 min)

Replace direct arc-lib imports with conditional facade imports.

**File**: `projects/arc/src/app/app.module.ts`

Add at the top:
```typescript
// Import facades (conditional)
import {AuthModule} from '../auth';
import {ThemeModule} from '../themes';
import {BreadcrumbModule} from '../breadcrumbs';
```

Update imports array to use conditional logic:
```typescript
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    CoreModule,
    LocalizationModule,

    // Optional modules - these can be removed by CLI
    ...(typeof AuthModule !== 'undefined' ? [AuthModule] : []),
    ...(typeof ThemeModule !== 'undefined' ? [ThemeModule.forRoot('default')] : []),
    ...(typeof BreadcrumbModule !== 'undefined' ? [BreadcrumbModule] : []),

    // Keep other imports
    OverlayModule,
    SelectModule,
    GanttModule,
    NbIconModule,
    NbEvaIconsModule,
  ],
  // ... rest of module
})
export class AppModule {}
```

### Phase 3: Test Module Removal (30 min)

```bash
# Test 1: Build with all modules
npm run build
# Expected: Success ✅

# Test 2: Remove auth
rm -rf projects/arc/src/auth
npm run build
# Expected: Success ✅

# Test 3: Restore and remove themes
git checkout projects/arc/src/auth
rm -rf projects/arc/src/themes
npm run build
# Expected: Success ✅

# Test 4: Restore and remove breadcrumbs
git checkout projects/arc/src/themes
rm -rf projects/arc/src/breadcrumbs
npm run build
# Expected: Success ✅

# Test 5: Remove all
git checkout projects/arc/src/breadcrumbs
rm -rf projects/arc/src/{auth,themes,breadcrumbs}
npm run build
# Expected: Success ✅

# Restore all
git checkout projects/arc/src/
```

### Phase 4: CLI Integration Test (30 min)

Requires CLI PR #2359:

```bash
# Clone and setup CLI
cd /tmp
git clone https://github.com/sourcefuse/loopback4-microservice-catalog.git
cd loopback4-microservice-catalog/packages/cli
git checkout feat/unified-cli-angular-react-support
npm install
npm link

# Test scaffolding
cd /tmp
sl angular:scaffold test-app --localPath=/path/to/angular-boilerplate --with-auth=false
cd test-app
npm install
npm run build
# Expected: Success, auth/ directory missing ✅
```

## Testing Checklist

- [ ] Build succeeds with all modules
- [ ] Build succeeds without auth module
- [ ] Build succeeds without themes module
- [ ] Build succeeds without breadcrumbs module
- [ ] Build succeeds without any optional modules
- [ ] App runs correctly without auth
- [ ] App runs correctly without themes
- [ ] App runs correctly without breadcrumbs
- [ ] CLI can scaffold with `--with-auth=false`
- [ ] CLI can scaffold with `--with-themes=false`
- [ ] CLI can scaffold with `--with-breadcrumbs=false`
- [ ] CLI can scaffold with all flags false

## Expected Timeline

- Phase 1 (Facades): 30 minutes
- Phase 2 (app.module.ts): 20 minutes
- Phase 3 (Testing): 30 minutes
- Phase 4 (CLI Integration): 30 minutes
- **Total**: ~2 hours

## Support

For questions or issues:
1. Check the detailed guide: `ANGULAR_PR_DETAILED.md`
2. Review the analysis: `REQUIRED_CHANGES_ANALYSIS.md`
3. Check CLI PR: https://github.com/sourcefuse/loopback4-microservice-catalog/pull/2359

## Success Criteria

✅ All tests pass
✅ Modules can be removed individually
✅ App works without any optional modules
✅ CLI integration tests pass
✅ No breaking changes to existing projects
