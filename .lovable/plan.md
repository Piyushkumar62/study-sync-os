

## Plan: Authentication System + Dark Mode Color Update

### 1. Authentication Pages

**New file: `src/pages/Auth.tsx`**
- Create a single auth page with togglable Sign In / Sign Up forms
- Fields: email + password (sign up adds confirm password)
- Uses the existing Supabase client for `signUp` and `signInWithPassword`
- Shows toast on errors; redirects to `/app` on success
- Clean, minimal design matching the app's neobrutalist style

**New file: `src/hooks/useAuth.tsx`**
- Auth context provider wrapping the app
- Exposes `user`, `session`, `loading`, `signOut`
- Uses `onAuthStateChange` listener (set up before `getSession`)

### 2. Route Protection

**Edit: `src/App.tsx`**
- Wrap app in `AuthProvider`
- Add `/auth` route pointing to the Auth page

**New file: `src/components/app/ProtectedRoute.tsx`**
- Checks if user is authenticated; if not, redirects to `/auth`
- Shows loading spinner while session is resolving

**Edit: `src/pages/AppDashboard.tsx`**
- Wrap with `ProtectedRoute` so all `/app/*` routes require login

**Edit: `src/components/landing/Navbar.tsx`**
- "Modules" link behavior: if not logged in, redirect to `/auth` instead of `/app/modules`
- "Sign in" / "Get started" buttons link to `/auth`

### 3. Dark Mode Color Overhaul

**Edit: `src/index.css`** — Change `.dark` theme from pure black/white to a deep indigo/slate palette:
- `--background`: deep navy (~230 25% 8%)
- `--foreground`: soft white (~220 15% 92%)
- `--card`: slightly lighter navy (~230 22% 11%)
- `--border`: muted slate (~230 15% 22%) instead of white
- `--primary`: indigo accent (~238 65% 65%)
- `--secondary`: dark slate (~230 18% 16%)
- `--muted-foreground`: medium slate (~220 10% 55%)
- Matching shadow vars updated to subtle dark shadows instead of white box-shadows

### Technical Notes
- Email confirmation will be required (no auto-confirm) per security guidelines
- RLS on `user_topic_progress` already requires `auth.uid()`, so auth is essential for that table to work
- No profiles table needed initially — just email/password auth

