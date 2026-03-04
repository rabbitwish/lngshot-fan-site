# Feature: THE BOYS Latest Schedule

## What
A schedule/calendar section showing LNGSHOT members' upcoming events — concerts, fan meetings, TV appearances, V-Live/Weverse streams, album releases, etc.

## Placement
Between the Hot News section and Albums section (or as a new dedicated tab/view).

---

## Plan

### 1. Data Structure
Create a `SCHEDULE` array with event objects:
```js
const SCHEDULE = [
  {
    id: "event-001",
    date: "2026-03-15",
    time: "19:00",          // KST
    title: "Inkigayo Comeback Stage",
    type: "tv",             // tv | concert | fansign | vlive | release | variety
    members: ["ALL"],       // or specific: ["OHYUL", "RYUL"]
    location: "SBS Studio, Seoul",
    link: "https://...",    // optional external link
    description: "First comeback stage for new single!",
    confirmed: true,        // false = rumored/unconfirmed
  }
];
```

### 2. Event Types & Icons
| Type     | Emoji | Color   | Label          |
|----------|-------|---------|----------------|
| tv       | 📺    | #3498DB | TV / Music Show|
| concert  | 🎤    | #FF6B35 | Concert / Tour |
| fansign  | 💜    | #9B59B6 | Fan Sign / Meet|
| vlive    | 🎬    | #2ECC71 | Live Stream    |
| release  | 💿    | #E74C3C | New Release    |
| variety  | 🎮    | #F39C12 | Variety / Other|

### 3. UI Component — `ScheduleSection`
- Header: "📅 UPCOMING SCHEDULE" (matching site style)
- Timeline/list view showing next 5-7 events
- Each event card shows:
  - Date badge (month + day)
  - Type icon + colored tag
  - Event title
  - Members involved (if not all)
  - Location
  - "confirmed" vs "rumored" badge
- Past events auto-fade or move to a "past" section
- "No upcoming events" state with a cute message

### 4. Optional Enhancements (Future)
- Filter by member (click a member card → see only their schedule)
- Filter by event type
- "Add to Calendar" button (generates .ics file or Google Calendar link)
- Countdown timer for the next big event
- Pull schedule data from an external source (Google Sheet, Notion API, or JSON file hosted on GitHub) so non-devs can update it easily

### 5. Data Source Options
- **Phase 1**: Hardcoded `SCHEDULE` array in App.jsx (simple, works now)
- **Phase 2**: Move to a separate `schedule.json` file in `/public` → fetch at runtime
- **Phase 3**: Google Sheets as CMS → fetch via Sheets API (no backend needed, easy for fans to edit)

---

## Priority: Medium
## Status: Planned — not yet started
## Created: 2026-02-27
