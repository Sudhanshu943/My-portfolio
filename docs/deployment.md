# Deployment

Personal portfolio for a **single owner**. Production content comes from **git-committed** `src/data/` files.

## Prerequisites

- Node.js 18+
- npm / yarn / pnpm / bun
- Environment variables configured

## Environment Variables

```env
# Admin Authentication (owner only — only you log in)
ADMIN_PASSWORD=your_secure_password_here
ADMIN_SESSION_SECRET=your_long_random_session_secret_here

# Optional legacy alias for ADMIN_SESSION_SECRET
# NEXTAUTH_SECRET=...

# Contact form (Formspree form id)
NEXT_PUBLIC_FORMSPREE_ID=your_formspree_form_id

# Optional: force read-only data APIs
# DISABLE_DATA_WRITES=true
```

GitHub public repo listing does **not** require OAuth client credentials.
Login is rate-limited to slow password guessing on the public admin URL.

## Content deploy workflow

1. Edit locally with `/admin` or by changing `src/data/*`
2. Commit JSON/TS data changes
3. Push → platform builds and serves those files

On **Vercel**, admin **writes** are automatically disabled (`VERCEL=1`). That is expected for a sole-owner site — no database required.

## Build Commands

```bash
npm install
npm run dev      # local — admin writes work
npm run build
npm run start    # self-hosted Node — admin writes work
npm run lint
```

## Platforms

### Vercel

1. Import the GitHub repo
2. Add env vars in the dashboard (`ADMIN_PASSWORD`, `ADMIN_SESSION_SECRET`)
3. Deploy
4. Use local admin (or direct file edits) + git for content updates

### Self-hosted Node

```bash
npm run build && npm run start
```

Writable filesystem → admin panel can persist JSON on the server. Still commit important changes to git for backup.

### Netlify

Prefer the Next.js runtime (not static export alone). Same rule: serverless writes to `src/data` are not durable — use the commit workflow.

## Security

- Strong unique `ADMIN_PASSWORD` (only you log in)
- Strong `ADMIN_SESSION_SECRET` for HMAC sessions
- Never commit `.env.local`
- Sessions expire after 7 days; forging `admin_session=true` fails
- Login rate-limited: 5 attempts / 15 minutes / IP
- Set `NEXT_PUBLIC_FORMSPREE_ID` for the contact form (otherwise mailto fallback message)
