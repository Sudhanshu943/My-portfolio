# Admin Panel

Owner-only dashboard for managing portfolio content. **Only you** should have `ADMIN_PASSWORD`. Visitors never get write access.

## Access

- **URL**: `/admin`
- **Authentication**: Password via `ADMIN_PASSWORD`
- **Route Protection**: Middleware validates a signed `admin_session` cookie for `/admin` and `/admin/*` (except `/admin/login`)
- **Session**: HMAC-SHA256 signed token with expiry; secret from `ADMIN_SESSION_SECRET` (legacy alias: `NEXTAUTH_SECRET`)

## Recommended workflow (sole owner)

Only **you** log in. Visitors never get write access.

```
Local edit (admin UI or src/data/*.json) → git commit → deploy
```

Login is rate-limited (5 attempts / 15 min / IP). Use a strong unique `ADMIN_PASSWORD`.

| Environment | Admin reads | Admin writes |
|-------------|-------------|--------------|
| Local `npm run dev` / self-hosted Node | Yes | Yes → `src/data/*.json` |
| Vercel / serverless | Yes (committed files) | **No** — returns `503 DATA_WRITES_DISABLED` |

Set `DISABLE_DATA_WRITES=true` to force read-only anywhere.

## Admin Dashboard

Located at `src/app/admin/page.tsx`, renders `<AdminDashboard />`:

### Tabs

1. **GitHub Repos** — Visibility, featured, custom title/description/tags/image, sort order.
2. **Custom Projects** — Add, edit, delete non-GitHub projects.
3. **Profile** — Profile info, social links, resume URL.

### In-Page Editor

`<AdminControls />` / `<SettingsPanel />` on the main page when logged in:
- Projects, skills, social links, resume, education

## Data Persistence

Writes go through `src/lib/data-store.ts` into:

| File | Content |
|------|---------|
| `admin-config.json` | Repo visibility, profile overrides (GitHub merge) |
| `projects.json` | Custom projects (canonical — used by Hero, Settings, Projects grid) |
| `skills.json` | Skills by category |
| `education.json` | Education history |
| `config.json` | Site config (resume, profile picture, etc.) |

After local edits, **commit these files** so production stays in sync.

## API Routes

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/admin/login` | Password auth → signed `admin_session` cookie |
| `POST` | `/api/admin/logout` | Clear session cookie |
| `GET` | `/api/admin/check` | Whether session is valid |
| `GET` | `/api/admin/config` | Fetch `admin-config.json` |
| `PUT` | `/api/admin/config` | Update `admin-config.json` |
| `POST` | `/api/admin/project` | Project/repo/profile actions |

## Environment Variables

```
ADMIN_PASSWORD=your-strong-password
ADMIN_SESSION_SECRET=long-random-secret-for-signing-cookies
# NEXTAUTH_SECRET=...   # optional legacy alias for ADMIN_SESSION_SECRET
NEXT_PUBLIC_FORMSPREE_ID=your_formspree_form_id
```

Helpers: `src/lib/admin-auth.ts`, `src/lib/admin-session.ts`, `src/lib/data-store.ts`, `src/lib/login-rate-limit.ts`.