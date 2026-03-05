

## Plan: Profiles, Notification Dropdown, and Account Deletion

Three changes: create a `profiles` table for user data, add a notification dropdown in the topbar, and enable the delete account button.

### 1. Database: `profiles` table + delete account function

**New table `profiles`:**

| Column | Type | Notes |
|--------|------|-------|
| id | uuid (PK) | references auth.users(id) ON DELETE CASCADE |
| display_name | text | nullable |
| avatar_url | text | nullable |
| bio | text | default '' |
| created_at | timestamptz | default now() |
| updated_at | timestamptz | default now() |

- RLS: users can SELECT/UPDATE only their own row (`auth.uid() = id`).
- Trigger: auto-create a profile row on new user signup via `auth.users` insert trigger using a `SECURITY DEFINER` function.
- Attach the existing `update_updated_at_column` trigger on updates.

**New function `delete_user_account`:**
- A `SECURITY DEFINER` function that deletes the calling user from `auth.users` (cascades to profiles, study_sessions, user_topic_progress).
- Only callable by the authenticated user for their own account.

### 2. Update Profile tab in Settings

**Edit: `src/components/app/SettingsContent.tsx`**
- Fetch profile from `profiles` table on mount (display_name, avatar_url, bio).
- Save profile updates to `profiles` table instead of just auth metadata.
- Add avatar display (initials fallback) and bio textarea field.

### 3. Notification dropdown in topbar

**Edit: `src/components/app/AppShell.tsx`**
- Replace the static Bell button with a Popover that opens a notification panel.
- Show a list of recent notifications (study reminders, milestone alerts) -- initially with placeholder/mock items since there is no notifications table yet.
- Show user's display name and initials from auth context in the avatar area. Clicking opens a small dropdown with "Settings" and "Sign out" links.

### 4. Enable Delete Account

**Edit: `src/components/app/SettingsContent.tsx`**
- Enable the Delete Account button. On click, show an AlertDialog confirmation requiring the user to type "DELETE" to confirm.
- On confirm, call the `delete_user_account` RPC function, then sign out and redirect to `/`.

### 5. Update topbar avatar with real user data

**Edit: `src/components/app/AppShell.tsx`**
- Use `useAuth()` to get the current user and display their initials (from email or display_name) in the avatar circle.
- Show actual current date range instead of hardcoded "Feb 10 - Feb 16, 2026".

