# API Routes

All API routes are located under `src/app/api/` and follow REST conventions.

## Admin API (`/api/admin/`)

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `POST` | `/api/admin/login` | None | Authenticate with `ADMIN_PASSWORD`, sets signed httpOnly `admin_session` cookie |
| `POST` | `/api/admin/logout` | Admin | Clears `admin_session` cookie |
| `GET` | `/api/admin/check` | None | Returns whether the current signed admin session is valid |
| `GET` | `/api/admin/config` | Admin | Fetches current `admin-config.json` |
| `PUT` | `/api/admin/config` | Admin | Updates `admin-config.json` |
| `POST` | `/api/admin/project` | Admin | Performs actions on projects (toggle visibility, featured, reorder) |

## Site Config (`/api/config`)

| Method | Description |
|--------|-------------|
| `GET` | Fetch site configuration (profile, bio, social links, resume) |
| `PUT` | Update site configuration (owner session; local writes only) |

## Education API (`/api/education`)

| Method | Description |
|--------|-------------|
| `GET` | Fetch all education entries |
| `POST` | Create new education entry |
| `PUT` | Update existing education entry |
| `DELETE` | Delete education entry |

## Projects API (`/api/projects`)

| Method | Description |
|--------|-------------|
| `GET` | Fetch all custom (non-GitHub) projects |
| `POST` | Create new custom project |
| `PUT` | Update existing custom project |
| `DELETE` | Delete custom project |

## Portfolio Projects (`/api/portfolio/projects`)

| Method | Description |
|--------|-------------|
| `GET` | Returns merged projects: GitHub repos + custom projects, filtered by visibility config |

## Skills API (`/api/skills`)

| Method | Description |
|--------|-------------|
| `GET` | Fetch all skills |
| `POST` | Create new skill |
| `PUT` | Update existing skill |
| `DELETE` | Delete skill |

## GitHub Repos (`/api/github/repos`)

| Method | Description |
|--------|-------------|
| `GET` | Fetches repositories from `Sudhanshu943` GitHub account. Cached with 300s revalidation. |
