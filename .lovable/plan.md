

## Plan: Add Placeholder/Sample Data to Settings Fields

Add realistic placeholder text to all input fields across the Settings page so users can see how the form looks when filled out.

### Changes: `src/components/app/SettingsContent.tsx`

**Profile tab:**
- Display Name input: change placeholder to `"e.g. Alex Johnson"`
- Bio textarea: change placeholder to `"e.g. Computer Science student at MIT, focused on algorithms and distributed systems."`

**Appearance tab:**
- Already has a select with values — no change needed.

**Notifications tab:**
- Already uses toggles — no placeholder needed.

**Account tab:**
- Delete confirmation input: already has placeholder `"DELETE"` — fine as-is.

This is a minor text update across 2 fields.

