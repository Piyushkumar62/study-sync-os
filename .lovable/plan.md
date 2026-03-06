

## Connect Navbar "Modules" Tab to the App Modules Page

Currently, the landing page navbar tabs ("Platform", "Modules", "Insights") only toggle an active state visually but don't navigate anywhere. The goal is to make the "Modules" tab navigate to `/app/modules`.

### Changes

**File: `src/components/landing/Navbar.tsx`**

1. Make the "Modules" tab a link that navigates to `/app/modules` using React Router's `Link` component (or `useNavigate`).
2. Keep "Platform" and "Insights" as scroll/tab toggles on the landing page (existing behavior).
3. Apply the same change in the mobile drawer -- tapping "Modules" on mobile will also navigate to `/app/modules`.

### Technical Details

- In the desktop `nav` loop and the mobile drawer loop, add a condition: if `tab === "Modules"`, render a `<Link to="/app/modules">` instead of a plain `<button>`.
- The styling classes remain the same so visual consistency is preserved.
- Close the mobile drawer on navigation (already handled by `setMobileOpen(false)`).

