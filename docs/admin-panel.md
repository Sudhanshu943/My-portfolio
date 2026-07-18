# Admin Panel

The admin panel provides a password-protected interface for managing portfolio content without touching code. All changes persist to local JSON files.

## Access

- **URL**: `/admin`
- **Authentication**: Password-based via `ADMIN_PASSWORD` environment variable
- **Route Protection**: Middleware validates `admin_session` cookie for all `/admin/*` routes

## Admin Dashboard

Located at `src/app/admin/page.tsx`, the dashboard renders `<AdminDashboard />` which provides:

### Tabs

1. **GitHub Repos** — Manage visibility, featured status, custom title/description/tags/image, and sort order for GitHub-fetched repositories.
2. **Custom Projects** — Add, edit, and delete custom (non-GitHub) portfolio projects.
3. **Profile** — Edit profile information, social links, and resume URL.

### In-Page Editor

The `<AdminControls />` and `<SettingsPanel />` components provide floating controls on the main portfolio page (visible when logged in) for quick editing of:
- Projects
- Skills
- Social links
- Resume link
- Education entries

## Data Persistence

Admin changes are saved to JSON files in `src/data/`:

| File | Content |
|------|---------|
| `admin-config.json` | Repo visibility config, custom projects, profile overrides |
| `projects.json` | Custom project entries |
| `skills.json` | Skills categorized by type with proficiency levels |
| `education.json` | Education history entries |

## API Routes

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/admin/login` | Authenticate with password, sets `admin_session` cookie |
| `POST` | `/api/admin/logout` | Clear `admin_session` cookie |
| `GET` | `/api/admin/check` | Check if admin session is active |
| `GET` | `/api/admin/config` | Fetch current admin config |
| `PUT` | `/api/admin/config` | Update admin config |
| `POST` | `/api/admin/project` | Perform project actions (visibility, featured, etc.) |

## Environment Variables

Required in `.env.local`:

```
ADMIN_PASSWORD=SecureAdminPass2024!
NEXTAUTH_SECRET=...
NEXTAUTH_URL=http://localhost:3000
GITHUB_CLIENT_ID=...
GITHUB_CLIENT_SECRET=...
ADMIN_EMAIL=...
NEXT_PUBLIC_ADMIN_EMAIL=...
```
