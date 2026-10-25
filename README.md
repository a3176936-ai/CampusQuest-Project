# CampusQuest React

A standalone React/Vite evaluation build inspired by the existing vanilla CampusQuest site. The original `CampusQuest/` folder is intentionally left untouched; this application uses its own routes, styling, and demo data.

## Run locally

```bash
npm install
npm run dev
```

Open the URL printed by Vite (normally `http://localhost:5173`). Sign in using the **Continue as demo student** button, or register a demo profile. The sign-in form accepts any valid email and non-empty password; there is no real account service.

```bash
npm run build
npm run preview
```

There is no configured automated test suite yet. The production build is the current compile/import validation command.

## Project structure

```text
src/
  app/store.js                  Redux store and quest persistence
  components/UI.jsx             Shared buttons, fields, cards, modal, and states
  context/                      Auth, theme, and toast notification providers
  data/mockData.js              Sample campus data
  features/quests/              Redux Toolkit quest slice and quest page
  hooks/useDebouncedValue.js    Shared debounce hook
  layouts/Layout.jsx            Responsive sidebar, topbar, and nested outlet
  pages/                        Routes for campus pages and account forms
  services/lostFoundService.js  Async local-browser CRUD adapter
  App.jsx                       React Router route tree and access guard
  index.css                     Theme tokens, components, and responsive layouts
  main.jsx                      Application providers and entry point
```

## Rubric map

| Evaluation area | Demonstration |
| --- | --- |
| React Router | `BrowserRouter`, nested protected layout, `Outlet`, `NavLink`, route parameters for company details, redirects, and a 404 page. |
| Context API | Auth/profile, theme, and notifications are shared through separate contexts. Profile edits update the sidebar immediately. |
| Redux Toolkit | The quest slice owns quest items and XP. Completing a quest is idempotent; its reward cannot be collected twice. The dashboard and leaderboard read the same Redux state. Redux DevTools support comes from `configureStore`. |
| React forms | Registration, login, profile editing, quest creation, and Lost & Found reports use controlled fields and field-level validation. Passwords are never persisted. |
| Campus pages | Dashboard, academics, timetable, events, companies/details, quests, leaderboard, Lost & Found, profile, and settings have demo content and working interactions. Dashboard and profile show quest activity; profile also displays earned/in-progress achievements. |
| Async/data states | Lost & Found CRUD uses an asynchronous local-storage-backed service adapter with loading, error/retry, empty, search, sorting, and pagination states. Search on several pages is debounced. |
| Persistence | Theme, profile, notification preferences, quest progress, event registrations, and Lost & Found reports persist in this browser's local storage. Nothing is sent to a server. |
| Responsive/accessibility | Small-screen sidebar, responsive page grids, labeled controls, keyboard-operable dialogs, visible focus states, status announcements, and reduced-motion support. |

## Demo and manual checks

1. Start with `npm run dev`, choose **Continue as demo student**, and verify the dashboard, sidebar, and profile name.
2. Open Quests, complete a quest, and check its XP and level progress. Click its disabled **Completed** button and confirm the reward cannot be repeated. Add a new quest and reload.
3. Edit the profile name and branch. Confirm the sidebar and dashboard greeting reflect the update, then reload.
4. Switch dark/light theme in Settings, reload, and confirm the selection persists.
5. In Events, search/filter/sort, open details, register, cancel, and reload to verify the registration state.
6. In Companies, filter a sector and open a company detail route. Refresh that detail URL while running Vite.
7. In Lost & Found, search and filter, post a report, edit it, mark it recovered, delete another report, and page through results. Reload to verify the saved reports persist. Clear the browser key `campusquest-react-lost-found` to restore the sample reports.
8. Try invalid and valid registration/profile/report values and confirm field errors and success toasts.
9. Visit an unknown path and verify the not-found page. Test the sidebar at a narrow viewport.

### Short evaluator walkthrough

Sign in with the demo student → edit the profile → complete a quest and show the Redux DevTools state/XP update → filter and register for an event → add a Lost & Found report → switch the theme → refresh and point out browser-only persistence.

### Viva prompts

- **Why React Router?** It maps URL paths to components and lets the shared layout remain mounted while nested page content changes.
- **What belongs in Context?** App-wide profile/authentication, theme, and notification concerns shared by unrelated pages.
- **What belongs in local component state?** Temporary form values, filters, open dialogs, and pagination controls used by one page.
- **Why Redux Toolkit for quests?** Quest completion and XP are related shared state used by multiple pages; a slice centralizes the transitions and prevents a second reward.
- **What is a controlled form?** React state owns each field value through `value` and `onChange`, allowing validation before submission.
- **Is the demo login secure?** No. There is no server-side identity check, and the app is explicitly for a local evaluation demo.
- **Does the app use a REST backend?** No. The Lost & Found service is an asynchronous local-browser adapter. It persists to this browser only and does not simulate a successful remote save.

## Deployment notes

Vite handles deep links in its development server. A production static host must serve the app's `index.html` for unknown application routes; otherwise a refresh at `/companies/c1` may return a server 404. The `public/_redirects` file is included for Netlify (`/* /index.html 200`). For other hosts, configure the equivalent SPA fallback. For example, with Nginx inside the site's `server` block:

```nginx
location / {
  try_files $uri $uri/ /index.html;
}
```

The standalone demo starts with sample content and does not import accounts or browser data from the original vanilla project. Profile fields, event registrations, quest data, preferences, and reports are stored in local storage and are not a substitute for a backend or production authentication.
