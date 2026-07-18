# Development

Sole-owner personal portfolio. You are the only editor.

## Getting Started

1. Clone the repository
2. `npm install`
3. Create `.env.local` (see `docs/deployment.md`)
4. `npm run dev`
5. Open [http://localhost:3000](http://localhost:3000)

## Project Conventions

- **Docs**: Read `docs/` before non-trivial changes; update docs when behavior changes
- **Cursor rules**: `.cursor/rules/` — portfolio ownership, admin/data, frontend
- **Components**: `src/components/`, `.tsx`
- **Client Components**: `'use client'` only when using hooks, browser APIs, forms, canvas, or live client fetches
- **Server Components**: Default for `page.tsx` and content sections; use `FadeIn` for motion islands
- **Styling**: Tailwind; theme tokens in `src/app/globals.css`
- **Data**: Admin-editable → `src/data/*.json` (canonical); matching `*.ts` files re-export JSON. Static narrative → TS-only exports.
- **Auth**: Signed session helpers in `src/lib/admin-auth.ts` + `admin-session.ts`
- **API Routes**: `src/app/api/`, REST; mutate only after `isAdminAuthenticated()`

## Key Files

| File | Purpose |
|------|---------|
| `src/app/page.tsx` | Home page — composes sections |
| `src/app/globals.css` | Theme tokens |
| `src/lib/data-store.ts` | JSON read/write + serverless guard |
| `src/lib/admin-auth.ts` | Signed session create/verify |
| `middleware.ts` | Admin route protection |
| `.cursor/rules/` | Agent rules for this repo |

## Updating content

1. Log in at `/admin/login` (local) **or** edit `src/data/`
2. Verify on the home page
3. Commit data file changes before deploying

## Adding a New Section

1. Add component under `src/components/sections/`
2. Import it in `src/app/page.tsx`
3. Match the terminal aesthetic

## Theme

```css
@theme {
  --color-background: #000;
  --color-primary: #00ff9f;
  --color-secondary: #00bfff;
  --color-accent: #ff0033;
}
```

## Admin smoke test

1. `/admin/login` with `ADMIN_PASSWORD`
2. Edit a skill or project
3. Confirm `src/data/*.json` updated
4. Log out; confirm write APIs return 401

## Performance

- Home page uses `next/dynamic` for heavy client chunks: canvas background, GitHub stats, projects, contact, admin controls.
- Particle canvas scales down on mobile, pauses when the tab is hidden, and falls back to a static gradient when `prefers-reduced-motion` is set.
- GitHub stats and projects fetch only when their section approaches the viewport.
- Projects grid shows 9 items first with a “show all” control.
- Prefer Server Components + `FadeIn` over marking entire sections `'use client'`.

## Lint / types

```bash
npm run lint
npx tsc --noEmit
```
