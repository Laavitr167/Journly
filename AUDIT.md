# Journly Website Polish Audit Report

**Date:** 2026-09-24

## 1. Route Analysis

List of every route in `app/` and whether each is public or requires sign-in:

- `/`: public
- `/plan`: public
- `/trip/[id]`: public
- `/api/generate-itinerary`: public
- `/api/test-itinerary`: public
- `/_not-found`: public (Next.js built-in error route)

**Note:** No authentication patterns (useSession, session checks, getServerSideProps redirects, etc.) were found in any route files or layouts. All routes appear to be publicly accessible.

## 2. Landing Page Analysis

### Build Output Summary
```
> journly@0.1.0 build
> next build

▲ Next.js 16.3.4 (Turbopack)
- Environments: .env.local
⚠ Warning: Next.js ignored package-lock.json in C:\Users\lavig because it is outside the current Git repository (C:\Users\lavig\journly).
 To use this directory, set `turbopack.root` in your Next.js config.

✓ Running next.config.ts took 305ms

  Creating an optimized production build ...
✓ Compiled successfully in 15.0s
  Running TypeScript ...
  Finished TypeScript in 3.7s ...
  Collecting page data using 9 workers ...
  Generating static pages using 9 workers (0/7) ...
  Generating static pages using 9 workers (1/7) 
  Generating static pages using 9 workers (3/7) 
  Generating static pages using 9 workers (5/7) 
✓ Generating static pages using 9 workers (7/7) in 933ms
  Finalizing page optimization ...

Route (app)
┌ ○ /
├ ○ /_not-found
├ ƒ /api/generate-itinerary
├ ƒ /api/test-itinerary
├ ○ /plan
└ ƒ /trip/[id]


○  (Static)   prerendered as static content
ƒ  (Dynamic)  server-rendered on demand
```

### Landing Page HTML (curl localhost:3000)
The landing page shows "Loading..." before content. The server-rendered HTML contains:
```html
<div>Loading...</div>
```
followed by hydration scripts. The page does not show content immediately; it displays a loading state while client-side components hydrate.

**Verdict:** The landing page is a client component that shows "Loading..." before content (not fully server-rendered for initial content display).

## 3. Leftover Defaults Check

### 3.1 "Create Next App" String
- **Not found** in the codebase.

### 3.2 Favicon Check
- `public/favicon.ico`: Does not exist
- `app/favicon.ico`: Exists (25,931 bytes) - significantly larger than default Next.js favicon, indicating it's been customized
- **Verdict:** Custom favicon is in use (not the default).

### 3.3 Placeholder Text (Lorem Ipsum)
- **Not found**: No occurrences of "Lorem ipsum dolor sit amet" or "Lorem ipsum"

### 3.4 TODO Comments
- **Found 1 occurrence**:
  - **File**: `components/PaywallModal.tsx`
  - **Lines**: 24-27
  - **Content**: 
    ```
    // TODO: Integrate with Stripe or other payment provider here
    // When payment is successful, call onConfirm() and then:
    // - For 'save': persist the trip to database (currently stored in memory)
    // - For 'pdf': generate and download PDF using generateTripPdf()
    ```

### 3.5 console.log Calls
- **Not found**: No `console.log` statements in JavaScript or TypeScript files

## 4. Next.js Configuration

### next.config.ts Analysis
The configuration does not set `productionBrowserSourceMaps`. The file contains only a placeholder comment:

```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};

export default nextConfig;
```

**Verdict:** `productionBrowserSourceMaps` is **not set** (defaults to false in production builds).

## 5. Production Build Asset Sizes

From the `next build` output above, we can see the compilation succeeded. However, the detailed route-specific JS sizes were not explicitly printed in the output we captured. The build process completed successfully in 15.0s.

## 6. Image and Icon Element Accessibility

### Findings:
- Total `<img>` tags found: 0
- Total `<svg>` tags found: 1 (loading spinner in button)
- Total icon components found: 0 (no components matching icon library patterns like Fi, Io, Md, etc. or containing 'Icon' in the name)

### Details:
**File:** `app/plan/page.tsx`
**Element:** svg
**Tag:** `<svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">`
**HasTextAlternative:** no
**TextAlternative:** *(empty)*

The SVG element is used as a loading spinner inside a button. It does not have any text alternative attributes (`aria-label`, `aria-labelledby`, or `role="img"`). However, it is accompanied by visible text ("Generating...") that conveys the same loading state, making it primarily decorative/presentational.

## 7. Development Server Warnings/Errors

From running `npm run dev` for 20 seconds:

```
> journly@0.1.0 dev
> next dev

⚠ Port 3000 is in use by process 8916, using available port 3001 instead.
▲ Next.js 16.3.4 (Turbopack)
- Local:         http://localhost:3001
- Network:       http://10.168.46.46:3001
- Environments: .env.local
✓ Ready in 6.3s
⚠ Warning: Next.js ignored package-lock.json in C:\Users\lavig because it is outside the current Git repository (C:\Users\lavig\journly).
 To use this directory, set `turbopack.root` in your Next.js config.

✓ Running next.config.ts took 500ms
```

**Key findings:**
1. Port 3000 was already in use, so the dev server started on port 3001 instead (warning)
2. Next.js ignored the package-lock.json file because it's located outside the current Git repository (warning)
3. The application started successfully with no errors reported during the 20-second window
4. **No** Leaflet marker icon warnings, hydration mismatches, or missing keys were observed in the output

## Summary of Polish Issues

### High Priority
1. **Landing page shows "Loading..."** - Not fully optimized for initial content display (client-component hydration delay)
2. **SVG loading spinner lacks accessibility attributes** - Missing `aria-label` or `role="img"` for screen readers

### Medium Priority
3. **TODO in PaywallModal** - Payment integration needs completion
4. **productionBrowserSourceMaps not configured** - May impact debuggability in production
5. **Dev server port conflict warning** - Minor configuration issue

### Low Priority
6. No other significant polish issues found (no lorem ipsum, no default strings, no console.logs, etc.)

## Recommendations
1. Consider making landing page content server-rendered to avoid "Loading..." flash
2. Add appropriate aria-label to the SVG loading spinner (or hide from screen readers if decorative)
3. Address the TODO in PaywallModal for payment integration
4. Consider setting `productionBrowserSourceMaps: true` in next.config.ts if source maps are desired in production
5. The port warning is environmental and not code-related