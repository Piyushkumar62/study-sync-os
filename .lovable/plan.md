

## Plan: Hide Navigation Tabs on Landing Page for Unauthenticated Users

The "Platform / Modules / Insights" pill tabs in the landing `Navbar` currently show for all visitors. They should only appear when the user is logged in.

### Change: `src/components/landing/Navbar.tsx`

- Wrap the desktop center `<nav>` tab group (line 29-57) in a conditional: only render when `user` is truthy.
- Similarly wrap the mobile tab list (lines 108-127) in the same `user` check so tabs don't appear in the mobile drawer either.

This is a small conditional rendering change — no new files or database work needed.

