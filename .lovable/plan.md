

## Plan: Remove "Sign in" Button from Navbar

Remove the duplicate "Sign in" button from the landing page navbar since "Get started" already links to the same `/auth` page.

### Change: `src/components/landing/Navbar.tsx`

- Remove the "Sign in" `<Link>` + `<Button>` block from the desktop right actions section (unauthenticated state).
- Remove the "Sign in" `<Link>` + `<Button>` block from the mobile drawer (unauthenticated state).

