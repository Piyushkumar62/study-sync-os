

## Plan: Add Navbar to Auth Page

The user wants the Auth page to include the site's navbar (with "Sign in" / "Get started" buttons visible in the top-right), rather than being a bare centered form on a blank page.

### Change

**Edit: `src/pages/Auth.tsx`**
- Import and render the `<Navbar />` component at the top of the page, before the auth form.
- This gives users the full website header with navigation, branding, and login/signup buttons, making it feel like part of the site rather than an isolated page.

