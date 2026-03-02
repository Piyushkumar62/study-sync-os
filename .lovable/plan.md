

## Plan: Build the Planner Section

Create a full study planner with a calendar view, the ability to add/edit/delete study sessions, and persistence via a database table.

### 1. Database: `study_sessions` table

Create a new table to store planned study sessions per user:

| Column | Type | Notes |
|--------|------|-------|
| id | uuid (PK) | default `gen_random_uuid()` |
| user_id | uuid | NOT NULL |
| topic_id | text | nullable — links to study data topic |
| title | text | NOT NULL |
| description | text | default '' |
| date | date | NOT NULL |
| start_time | time | nullable |
| duration_minutes | integer | default 60 |
| completed | boolean | default false |
| created_at | timestamptz | default now() |

RLS policies: users can only SELECT, INSERT, UPDATE, DELETE their own rows (`auth.uid() = user_id`).

### 2. New Component: `src/components/app/PlannerContent.tsx`

**Layout** (two-column on desktop, stacked on mobile):
- **Left**: Calendar widget (using existing `<Calendar />` component) for date picking. Below it, a mini "Upcoming" list showing the next 3–5 sessions.
- **Right**: Selected day's session list. Each session card shows title, time, duration, topic tag, and a completed checkbox. Empty state when no sessions.

**Add Session**: A dialog/sheet form with fields for title, date (pre-filled from calendar selection), start time, duration, and an optional topic dropdown (populated from `studyData.ts` subjects/topics). Saves to `study_sessions` table.

**Edit/Delete**: Click a session card to open the same dialog pre-filled for editing. Delete button inside the dialog.

**Mark Complete**: Checkbox on each session card toggles `completed` via an update query.

**Data fetching**: Use `@tanstack/react-query` with the Supabase client to fetch sessions for the selected month, and mutations for create/update/delete.

### 3. Wire into AppDashboard

**Edit: `src/pages/AppDashboard.tsx`**
- Import `PlannerContent` and add a route condition: `if (location.pathname === "/app/planner") return <PlannerContent />;`

### Technical Details

- Calendar `pointer-events-auto` class will be added per shadcn datepicker guidelines.
- Sessions fetched by month range to keep queries efficient.
- Optimistic updates on complete toggle for snappy UX.
- Toast notifications on create/update/delete success/failure.

