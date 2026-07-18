# Project Status

Last updated: July 2026  
Owner model: **sole editor** (only you log in to admin). Visitors are read-only.

Use this file as the living checklist of what shipped and what is still open.

---

## Done

### Security & admin (sole-owner)

- [x] Replaced forgeable `admin_session=true` with **HMAC-SHA256 signed** session cookies
- [x] Middleware protects `/admin` and `/admin/*`, leaves `/admin/login` public
- [x] Centralized `isAdminAuthenticated()` for all mutate APIs
- [x] Login **rate limit** (5 attempts / 15 min / IP) + digest-based password compare
- [x] Logout clears cookie with full cookie options
- [x] Documented that only the owner authenticates; no multi-user auth planned

### Data & persistence

- [x] `src/lib/data-store.ts` — JSON read/write; **Vercel writes disabled** (`503 DATA_WRITES_DISABLED`)
- [x] Workflow: edit locally → commit `src/data/*` → deploy
- [x] Unified **config / skills / projects** — JSON is canonical; `.ts` files re-export
- [x] Custom projects use **one store**: `projects.json` (Hero, Settings, Admin dashboard, `/api/portfolio/projects`)
- [x] `admin-config.json` keeps GitHub repo visibility + profile overrides only

### Frontend / architecture

- [x] Home `page.tsx` is a **Server Component** (content sections SSR where possible)
- [x] `FadeIn` client island for motion; static sections no longer fully client
- [x] Skills & Education SSR from JSON via `data-store`
- [x] Dynamic loading for GitHub / Projects / Contact; `ssr: false` islands in `ClientOnlyIslands.tsx` (Next 16 requirement)
- [x] Optional boot intro via `HomeShell` + `ENABLE_BOOT_LOADER`
- [x] Canvas performance: fewer particles on mobile, pause when tab hidden, `prefers-reduced-motion` fallback
- [x] Projects grid shows 9 first, then “show all”
- [x] GitHub stats / projects fetch deferred until near viewport
- [x] `suppressHydrationWarning` on `html`/`body` for browser-extension attribute noise

### Cleanup & deps

- [x] Removed unused `next-auth` and `lucide-react`
- [x] Upgraded **Next.js** to `16.2.10` (+ matching `eslint-config-next`)
- [x] Cursor rules: `.cursor/rules/` (`portfolio-core`, `admin-and-data`, `frontend`)
- [x] Docs updated for ownership, auth, data, deployment, components

### Content polish (partial)

- [x] Contact form reads `NEXT_PUBLIC_FORMSPREE_ID` (mailto fallback if unset)
- [x] Removed fake `alexjohnson/*` project URLs (point at your GitHub for now)
- [x] Profile image path set to `/profile.png` (`public/profile.png`)

---

## Do next (recommended order)

### You should do (config / content)

| # | Task | Notes |
|---|------|--------|
| 1 | Set env secrets in `.env.local` / host | `ADMIN_PASSWORD`, `ADMIN_SESSION_SECRET` (required). Optional: `NEXT_PUBLIC_FORMSPREE_ID` for contact. |
| 2 | Confirm Formspree | Create a form at Formspree and put the form id in `NEXT_PUBLIC_FORMSPREE_ID`, or rely on mailto links. |
| 3 | Replace placeholder project copy | Update `src/data/projects.json` with your real project titles, writeups, and real repo/demo URLs. |
| 4 | Keep `public/profile.png` current | Already wired; swap the file anytime and redeploy. |
| 5 | Commit & push outstanding work | Include code + docs + data; never commit `.env.local`. |

### Optional engineering (nice-to-have)

| # | Task | Why |
|---|------|-----|
| 1 | Mutate-API schema validation | Allowlist fields, bound indexes, allow only `https:` / relative URLs — stops bad pastes after login. |
| 2 | CSP + `Permissions-Policy` (+ HSTS at host) | Hardening beyond current frame/nosniff/referrer headers. |
| 3 | Proxy GitHub stats through `/api` | Avoids browser GitHub rate limits; cache with `revalidate`. |
| 4 | `robots.ts` / `sitemap.ts` / `metadataBase` | SEO; disallow `/admin` in robots. |
| 5 | `ALLOW_DATA_WRITES=true` opt-in | Safer default on non-Vercel serverless (writes off unless explicit). |
| 6 | Shorten session max-age or add `ADMIN_SESSION_VERSION` | Easier revoke if a cookie leaks (optional for sole-you). |

### Explicitly out of scope (unless you ask)

- Multi-user accounts / OAuth admin / CAPTCHA / full CSRF tokens
- Database CMS for production writes on Vercel
- Redesigning the terminal theme

---

## Quick reference — how content flows

```
You (local)
  ├─ /admin or edit src/data/*.json
  ├─ git commit
  └─ deploy
        └─ production reads committed JSON (+ live GitHub API merge)
```

| Content | Canonical file |
|---------|----------------|
| Profile, bio, socials, resume, focus | `src/data/config.json` |
| Custom projects | `src/data/projects.json` |
| Skills | `src/data/skills.json` |
| Education | `src/data/education.json` |
| GitHub visibility / featured | `src/data/admin-config.json` |
| Timeline, CTF, labs, proof-of-work | `src/data/*.ts` (code-only) |

---

## Related docs

| File | Use when |
|------|----------|
| `docs/overview.md` | What the site is |
| `docs/admin-panel.md` | Login & admin workflow |
| `docs/data-files.md` | What file to edit |
| `docs/deployment.md` | Env vars & platforms |
| `docs/development.md` | Local conventions |
