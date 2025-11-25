# Arc-Docs Application - Comprehensive Test Plan

## Application Overview

The Arc-Docs application is an Angular-based documentation portal for the Arc Angular Boilerplate project. The application provides comprehensive documentation about the boilerplate library, covering setup instructions, authentication modules, and integration guides. The application features:

- **Navigation Structure**: Hierarchical sidebar navigation with collapsible menu sections
- **Documentation Categories**: Three main sections - Getting Started, Guide, and Auth
- **Content Pages**: Multiple documentation pages with detailed instructions, code examples, and external links
- **Static Footer**: Privacy and Terms & Conditions links with copyright information
- **URL Routing**: Deep linking support for direct navigation to specific documentation pages
- **Responsive Layout**: Two-column layout with fixed sidebar navigation and scrollable content area

## Test Scenarios

### 1. Navigation and Page Loading

**Seed:** `e2e/seed.spec.ts`

#### 1.1 Initial Page Load

**Steps:**

1. Navigate to `http://localhost:4200/`
2. Observe the page loading behavior

**Expected Results:**

- Application redirects to `/docs` route
- Page title displays "ArcDocs"
- Sidebar navigation is visible with all menu sections collapsed by default
- Logo is displayed in the header
- Footer displays "Privacy", "Terms & conditions" links and "© Boiler Plate" text
- No console errors are displayed

#### 1.2 Direct URL Navigation

**Steps:**

1. Navigate directly to `http://localhost:4200/docs/getting-started/intro`
2. Verify the page loads correctly

**Expected Results:**

- Page loads with the Introduction content displayed
- "Getting Started" menu section is expanded automatically
- "Introduction" menu item is highlighted as active
- Page title remains "ArcDocs"
- URL shows `/docs/getting-started/intro`

#### 1.3 Deep Link Navigation to Auth Pages

**Steps:**

1. Navigate directly to `http://localhost:4200/docs/auth-doc/installation`
2. Verify the page loads correctly

**Expected Results:**

- Installation page content is displayed
- "Auth" menu section is expanded
- "Installation" menu item is highlighted as active
- Sidebar shows all three menu sections (Getting Started, Guide, Auth)

### 2. Sidebar Navigation - Menu Expansion/Collapse

**Seed:** `e2e/seed.spec.ts`

#### 2.1 Expand Getting Started Menu

**Steps:**

1. Navigate to `http://localhost:4200/`
2. Click on "Getting Started" menu item
3. Observe the menu behavior

**Expected Results:**

- "Getting Started" section expands to show submenu
- Submenu displays "Introduction" link
- Expand/collapse icon changes to indicate expanded state
- "Getting Started" menu item is highlighted as active

#### 2.2 Collapse Expanded Menu

**Steps:**

1. Navigate to `http://localhost:4200/`
2. Click on "Getting Started" to expand it
3. Click on "Getting Started" again
4. Observe the menu behavior

**Expected Results:**

- "Getting Started" section collapses
- Submenu items are hidden
- Expand/collapse icon changes to indicate collapsed state
- Menu returns to initial collapsed state

#### 2.3 Expand Multiple Menu Sections

**Steps:**

1. Navigate to `http://localhost:4200/`
2. Click on "Getting Started" to expand it
3. Click on "Guide" to expand it
4. Click on "Auth" to expand it
5. Observe all menu sections

**Expected Results:**

- All three menu sections can be expanded simultaneously
- Each section displays its respective submenu items
- All sections remain expanded
- No automatic collapsing occurs when expanding other sections

#### 2.4 Menu State Persistence During Page Navigation

**Steps:**

1. Navigate to `http://localhost:4200/`
2. Click on "Guide" to expand it
3. Click on "Cloning Boilerplate" to navigate to that page
4. Observe the menu state

**Expected Results:**

- "Guide" section remains expanded after navigation
- "Cloning Boilerplate" is highlighted as active
- Other menu sections ("Getting Started" and "Auth") maintain their collapsed state
- Content area updates to show Cloning Boilerplate page

### 3. Getting Started Section Navigation

**Seed:** `e2e/seed.spec.ts`

#### 3.1 Navigate to Introduction Page

**Steps:**

1. Navigate to `http://localhost:4200/`
2. Click on "Getting Started" to expand the menu
3. Click on "Introduction" link
4. Verify content loads correctly

**Expected Results:**

- URL changes to `/docs/getting-started/intro`
- Page displays heading "What is Arc-Angular-Boilerplate"
- Content includes sections: "Key Features:" and "Why We need to Use Angular Boilerplate?"
- "Introduction" menu item is highlighted as active
- Content is scrollable if it exceeds viewport height

#### 3.2 Verify Introduction Page Content Structure

**Steps:**

1. Navigate to `http://localhost:4200/docs/getting-started/intro`
2. Scroll through the entire page content
3. Verify all content sections are present

**Expected Results:**

- Introduction paragraph explaining Arc-Boilerplate is visible
- "Key Features:" section contains list items for:
  - Angular Components
  - Directives and Pipes
  - Services and Utilities
  - Integration and Compatibility
- "Why We need to Use Angular Boilerplate?" section contains detailed bullet points
- All text content is readable and properly formatted
- No broken images or layout issues

### 4. Guide Section Navigation

**Seed:** `e2e/seed.spec.ts`

#### 4.1 Navigate to Cloning Boilerplate Page

**Steps:**

1. Navigate to `http://localhost:4200/`
2. Click on "Guide" to expand the menu
3. Click on "Cloning Boilerplate"
4. Verify page content

**Expected Results:**

- URL changes to `/docs/guide/clone`
- Page displays sections: "Prerequisites", "Cloning Process", "Usage", "Run Project", "Additional Resources"
- "Cloning Boilerplate" menu item is highlighted as active
- Code snippets are displayed with proper formatting
- External links to Git Official Website and GitHub documentation are present

#### 4.2 Verify Code Snippets Display

**Steps:**

1. Navigate to `http://localhost:4200/docs/guide/clone`
2. Locate all code snippet sections
3. Verify code formatting

**Expected Results:**

- Code snippets are displayed in monospace font
- Code blocks have distinct background styling
- Commands like `cd path/to/your/directory`, `git clone`, `npm i`, and `ng serve` are visible
- Code is copyable (can be selected with mouse)

#### 4.3 Navigate to Backend Integration Page

**Steps:**

1. Navigate to `http://localhost:4200/`
2. Expand "Guide" menu
3. Click on "Backend Integration"
4. Verify page content

**Expected Results:**

- URL changes to `/docs/guide/backend-integration`
- Page displays sections: "Overview", "Prerequisites", "Backend-setup"
- Prerequisites list includes: Node.js, Angular CLI, Database, Redis, REST APIs knowledge
- Environment variables code example is displayed
- External link to "Backend Setup Documentation" is present

#### 4.4 Test External Links

**Steps:**

1. Navigate to `http://localhost:4200/docs/guide/clone`
2. Locate the "Git Official Website" link
3. Right-click and verify link target (do not navigate away)

**Expected Results:**

- Link href points to `https://git-scm.com/`
- Link opens in same tab (or new tab based on implementation)
- Link is visually distinct (underlined or different color)

### 5. Auth Section Navigation

**Seed:** `e2e/seed.spec.ts`

#### 5.1 Navigate to Auth Introduction Page

**Steps:**

1. Navigate to `http://localhost:4200/`
2. Click on "Auth" to expand the menu
3. Click on "Introduction" under Auth section
4. Verify page content

**Expected Results:**

- URL changes to `/docs/auth-doc/authDocIntro`
- Page displays "Auth Module" heading
- Content includes sections on Authentication UI components, Auth Strategies, and Helping services
- Note section with link to backend services documentation is visible
- Lists of components (Login, Sign Up, Forget Password, Reset Password) are displayed

#### 5.2 Navigate to Installation Page

**Steps:**

1. Navigate to `http://localhost:4200/`
2. Expand "Auth" menu
3. Click on "Installation"
4. Verify page content

**Expected Results:**

- URL changes to `/docs/auth-doc/installation`
- Page displays sections: "Install the module", "HttpClientModule", "Configure a strategy", "Enable Auth Components"
- Code examples and images are displayed
- External link to "NbPasswordAuthStrategy" documentation is present
- Images labeled "moduleImg" and "routeImg" are visible

#### 5.3 Navigate to Getting User Token Page

**Steps:**

1. Navigate to `http://localhost:4200/`
2. Expand "Auth" menu
3. Click on "Getting User Token"
4. Verify page loads

**Expected Results:**

- URL changes to `/docs/auth-doc/configureToken`
- Page content loads successfully
- "Getting User Token" menu item is highlighted as active

#### 5.4 Navigate to Setting Up Api Configuration Page

**Steps:**

1. Navigate to `http://localhost:4200/`
2. Expand "Auth" menu
3. Click on "Setting Up Api Configration"
4. Verify page loads

**Expected Results:**

- URL changes to `/docs/auth-doc/configureEnvs`
- Page content loads successfully
- "Setting Up Api Configration" menu item is highlighted as active

#### 5.5 Navigate to UI Components Page

**Steps:**

1. Navigate to `http://localhost:4200/`
2. Expand "Auth" menu
3. Click on "UI Components"
4. Verify detailed page content

**Expected Results:**

- URL changes to `/docs/auth-doc/configureUI`
- Page displays "UI Components" heading
- Sections for each component are visible:
  - Login Component with `<app-login></app-login>` usage
  - SignUp Component with `<lib-signup></lib-signup>` usage
  - Forget Password Component with `<lib-forgot-password></lib-forgot-password>` usage
  - Reset Password Component with `<lib-reset-password></lib-reset-password>` usage
- "Configuration of UI Forms in AuthModule" section is displayed
- Component usage examples are formatted as code

### 6. Sequential Navigation Through All Pages

**Seed:** `e2e/seed.spec.ts`

#### 6.1 Navigate Through All Pages in Order

**Steps:**

1. Navigate to `http://localhost:4200/`
2. Expand "Getting Started" and click "Introduction"
3. Expand "Guide" and click "Cloning Boilerplate"
4. Click "Backend Integration"
5. Expand "Auth" and navigate through all Auth pages in order:
   - Introduction
   - Installation
   - Getting User Token
   - Setting Up Api Configration
   - UI Components
6. Verify each page loads correctly

**Expected Results:**

- Each page transition is smooth without errors
- Active menu item updates for each navigation
- Content area updates with correct information
- No 404 errors or broken routes
- URL reflects the current page location
- Page scroll resets to top on navigation

### 7. Logo and Header Interactions

**Seed:** `e2e/seed.spec.ts`

#### 7.1 Click Logo Image

**Steps:**

1. Navigate to any documentation page (e.g., `/docs/auth-doc/installation`)
2. Click on the logo image in the header
3. Observe the behavior

**Expected Results:**

- Clicking logo returns user to home/docs page
- URL may change to `/docs` or remain on current page
- Page does not crash or show errors
- Logo is always visible in header regardless of page

#### 7.2 Logo Link Behavior

**Steps:**

1. Navigate to `http://localhost:4200/docs/guide/clone`
2. Locate the logo link element
3. Verify link properties

**Expected Results:**

- Logo link has `href="javascript:void(0)"` or similar
- Logo is clickable (cursor changes to pointer on hover)
- Logo image loads correctly without broken image icon

### 8. Footer Interactions

**Seed:** `e2e/seed.spec.ts`

#### 8.1 Click Privacy Link

**Steps:**

1. Navigate to any documentation page
2. Scroll to footer section
3. Click on "Privacy" link
4. Observe behavior

**Expected Results:**

- Privacy link is highlighted/becomes active
- URL may remain the same (javascript:void(0))
- No navigation occurs or privacy page loads
- Link state changes visually to indicate it was clicked

#### 8.2 Click Terms & Conditions Link

**Steps:**

1. Navigate to any documentation page
2. Scroll to footer section
3. Click on "Terms & conditions" link
4. Observe behavior

**Expected Results:**

- Terms & conditions link is highlighted/becomes active
- URL may remain the same (javascript:void(0))
- No navigation occurs or terms page loads
- Link state changes visually to indicate it was clicked

#### 8.3 Verify Footer Visibility

**Steps:**

1. Navigate to each documentation page
2. Scroll to verify footer is present
3. Check footer content

**Expected Results:**

- Footer is visible on all pages
- Footer displays "Privacy" and "Terms & conditions" links
- Copyright text "© Boiler Plate" is displayed
- Footer remains at bottom of sidebar, not main content area

### 9. Browser Navigation (Back/Forward)

**Seed:** `e2e/seed.spec.ts`

#### 9.1 Use Browser Back Button

**Steps:**

1. Navigate to `http://localhost:4200/`
2. Navigate to Introduction page
3. Navigate to Cloning Boilerplate page
4. Navigate to Auth Installation page
5. Click browser back button three times
6. Verify page history

**Expected Results:**

- First back click returns to Cloning Boilerplate page
- Second back click returns to Introduction page
- Third back click returns to initial docs page
- Active menu items update correctly with each back navigation
- Content area updates appropriately
- URL reflects the correct page

#### 9.2 Use Browser Forward Button

**Steps:**

1. Navigate to multiple pages as in 9.1
2. Click back button twice
3. Click forward button
4. Verify navigation

**Expected Results:**

- Forward navigation restores the next page in history
- Active menu state is restored
- Content displays correctly
- URL updates to reflect current page

### 10. URL Manipulation and Direct Access

**Seed:** `e2e/seed.spec.ts`

#### 10.1 Invalid Route Handling

**Steps:**

1. Navigate to `http://localhost:4200/docs/invalid-page`
2. Observe application behavior

**Expected Results:**

- Application handles invalid route gracefully
- May redirect to `/docs` home page
- Or displays 404/not found message
- Application does not crash or show console errors

#### 10.2 Root Path Redirect

**Steps:**

1. Navigate to `http://localhost:4200/`
2. Verify redirect behavior

**Expected Results:**

- Application automatically redirects to `/docs`
- No blank page or loading errors
- Redirect happens quickly without visible delay

#### 10.3 Partial Path Navigation

**Steps:**

1. Navigate to `http://localhost:4200/docs/guide`
2. Observe behavior

**Expected Results:**

- Application handles partial path appropriately
- May show default content or redirect
- No broken page or errors displayed

### 11. Content Scrolling and Layout

**Seed:** `e2e/seed.spec.ts`

#### 11.1 Content Area Scrolling

**Steps:**

1. Navigate to Introduction page (longest content page)
2. Scroll through entire content
3. Verify scroll behavior

**Expected Results:**

- Content area is independently scrollable
- Sidebar navigation remains fixed while scrolling content
- Header remains visible (if sticky)
- Scroll is smooth without jumps or layout shifts

#### 11.2 Sidebar Scrolling with Long Menu

**Steps:**

1. Navigate to `http://localhost:4200/`
2. Expand all menu sections
3. Verify sidebar scroll behavior if needed

**Expected Results:**

- If menu exceeds viewport height, sidebar becomes scrollable
- Content area scroll is independent of sidebar scroll
- All menu items remain accessible
- Footer remains at bottom of sidebar

#### 11.3 Content Width and Responsiveness

**Steps:**

1. Navigate to any content page
2. Observe content layout
3. Resize browser window (if testing responsiveness)

**Expected Results:**

- Content does not overflow its container
- Text wraps appropriately
- Code blocks are contained or horizontally scrollable
- Images scale appropriately
- Two-column layout (sidebar + content) is maintained

### 12. Active State and Visual Feedback

**Seed:** `e2e/seed.spec.ts`

#### 12.1 Menu Item Active State

**Steps:**

1. Navigate to different pages sequentially
2. Observe active state highlighting for each page

**Expected Results:**

- Currently selected menu item is visually distinct (highlighted)
- Only one menu item shows active state at a time
- Parent menu section may also show active/expanded state
- Active state updates immediately upon navigation

#### 12.2 Hover States

**Steps:**

1. Hover over different menu items
2. Hover over links in content area
3. Hover over footer links
4. Observe visual feedback

**Expected Results:**

- Menu items show hover state (color change, background, etc.)
- Links show cursor change to pointer
- Content links may underline or change color on hover
- Visual feedback is immediate and clear

### 13. Multiple Page Type Verification

**Seed:** `e2e/seed.spec.ts`

#### 13.1 Pages with Code Examples

**Steps:**

1. Navigate to Cloning Boilerplate page
2. Navigate to Backend Integration page
3. Navigate to Installation page
4. Verify code snippets on each

**Expected Results:**

- Code snippets are formatted consistently across pages
- Syntax highlighting may be present
- Code blocks have distinct visual styling
- Commands are clearly distinguishable from explanatory text

#### 13.2 Pages with Lists

**Steps:**

1. Navigate to Introduction page
2. Navigate to Auth Introduction page
3. Verify list formatting

**Expected Results:**

- Bulleted lists are properly indented
- Nested lists show hierarchy
- List items are aligned consistently
- Strong/bold text in lists is emphasized

#### 13.3 Pages with External Links

**Steps:**

1. Navigate to Cloning Boilerplate page
2. Navigate to Backend Integration page
3. Navigate to Installation page
4. Identify all external links

**Expected Results:**

- External links are visually distinct from internal navigation
- Link text clearly indicates destination
- Links have proper href attributes to external URLs
- External links include Git documentation, GitHub, and Nebular documentation

### 14. Console and Network Verification

**Seed:** `e2e/seed.spec.ts`

#### 14.1 Console Errors Check

**Steps:**

1. Navigate through all major pages
2. Monitor browser console for errors
3. Check for warnings

**Expected Results:**

- No JavaScript errors in console during navigation
- No 404 errors for missing resources
- Angular development mode message is acceptable
- Webpack dev server messages are acceptable
- No authentication or API errors

#### 14.2 Asset Loading

**Steps:**

1. Navigate to pages with images (Installation, UI Components)
2. Verify images load correctly
3. Check network tab for failed requests

**Expected Results:**

- All images referenced in content load successfully
- Logo image loads correctly
- Icons in menu (expand/collapse) display properly
- No broken image placeholders
- All static assets return 200 status codes

### 15. Edge Cases and Error Scenarios

**Seed:** `e2e/seed.spec.ts`

#### 15.1 Rapid Menu Clicking

**Steps:**

1. Navigate to `http://localhost:4200/`
2. Rapidly click different menu sections multiple times
3. Observe application stability

**Expected Results:**

- Application handles rapid clicks without errors
- Menu expand/collapse animations complete properly
- No race conditions cause broken states
- Application remains responsive

#### 15.2 Navigation During Page Load

**Steps:**

1. Navigate to a documentation page
2. Immediately click another menu item before page fully loads
3. Observe behavior

**Expected Results:**

- Navigation completes successfully
- Latest navigation request takes precedence
- No partial content from previous page is displayed
- Application does not crash or freeze

#### 15.3 Repeated Navigation to Same Page

**Steps:**

1. Navigate to Introduction page
2. Click "Introduction" menu item again
3. Repeat several times
4. Verify behavior

**Expected Results:**

- Application handles repeated navigation gracefully
- Page does not flicker or reload unnecessarily
- Active state remains consistent
- No console errors or memory leaks

## Test Execution Guidelines

1. **Environment Setup**: Ensure arc-docs application is running on `http://localhost:4200/` before executing tests
2. **Test Sequence**: Tests can be run in any order as each scenario assumes a fresh/blank state
3. **Browser Compatibility**: Execute tests on major browsers (Chrome, Firefox, Safari, Edge)
4. **Mobile Testing**: If responsive design is implemented, test on mobile viewports
5. **Accessibility**: Consider adding accessibility tests for keyboard navigation and screen readers
6. **Performance**: Monitor page load times and navigation speed
7. **Documentation**: Log any deviations from expected results with screenshots

## Known Assumptions

- Application requires backend services to be running for some Auth-related functionality
- Footer links (Privacy, Terms & conditions) may be placeholder links with `javascript:void(0)`
- Some images may be referenced but not visible in accessibility snapshots
- Code snippets are display-only and not interactive/executable
- External links open in same or new tab based on implementation (not specified in requirements)

## Test Coverage Summary

This test plan covers:

- ✓ All navigation menu sections and sub-items
- ✓ All documented pages (8+ unique pages)
- ✓ Menu expansion and collapse functionality
- ✓ Active state management
- ✓ URL routing and deep linking
- ✓ Browser navigation (back/forward)
- ✓ Content display and formatting
- ✓ External link verification
- ✓ Footer functionality
- ✓ Logo/header interactions
- ✓ Error handling and edge cases
- ✓ Content scrolling and layout
- ✓ Visual feedback and hover states
