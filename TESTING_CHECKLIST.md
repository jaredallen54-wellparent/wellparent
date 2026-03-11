# WellParent Phase 1–3 Testing Checklist

Use this checklist to validate the full build before launch. Work through each phase in order.

---

## Phase 1 — Core MVP

### Onboarding *(complete on a fresh session)*
- [ ] Complete all 5 steps: Welcome → Persona → Goals → Equipment → Commitment
- [ ] Verify choices are reflected in the **You** tab settings

### Workouts
- [ ] Browse the workout list and test filters (duration, equipment, focus)
- [ ] Start a workout → pause mid-workout → resume it
- [ ] Complete a workout and confirm the streak increments
- [ ] Toggle **Postpartum Mode** on and verify safety caution pills appear on exercises
- [ ] Set an **injury flag** (e.g. low back) and confirm affected exercises are modified

### Home Screen
- [ ] Tap the **Reset card** and complete a 5-min Reset workout
- [ ] After completing a workout, verify the **energy check-in** prompt appears
- [ ] Simulate 7+ days of use and confirm the **AI Insight card** is visible

### Mind Tab
- [ ] Play a breathing exercise all the way through
- [ ] View journal prompts and write an entry

---

## Phase 2 — Engagement Features

- [ ] **Smart Reminders** — Set days + time and save; verify preview copy appears
- [ ] **Pulse Survey** — Trigger the day 7 check-in, answer all 3 questions, submit and see thank-you screen
- [ ] **AI Insights** — View rotating insight cards; confirm premium upgrade prompt appears
- [ ] **Community Space** — Browse threads in all 3 categories; confirm compose is locked behind premium
- [ ] **Wearable Connect** — Connect Apple/Google Fit demo and confirm Readiness Score card appears on Home

---

## Phase 3 — Preview Stubs *(verify navigable and correct locked state)*

- [ ] **AI Coach** — Demo chat is visible; input field shows "Unlock with Premium"
- [ ] **Coach Booking** — 3 trainer profiles load with specialty, rating, and time slots
- [ ] **Education Hub** — Article cards load across all topic categories
- [ ] **Family Plan** — Stub screen is navigable
- [ ] **Corporate Portal** — Stub screen is navigable

---

## Cross-Cutting Checks

- [ ] Bottom navigation works on all 5 tabs
- [ ] No broken routes or blank white screens
- [ ] Subscription/paywall page loads with monthly/annual toggle
- [ ] PostHog dashboard shows `wellparent_` prefixed events firing correctly

---

*Last updated: 2026-03-11*
