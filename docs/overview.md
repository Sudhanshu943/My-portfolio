# Portfolio Project Overview

A cybersecurity-themed **personal portfolio** for **Sudhanshu Thapa** (sole owner/editor), designed as "TERMINAL_OS_v1.0". Visitors browse; only you change content.

## Ownership model

| Who | What they can do |
|-----|------------------|
| **You (owner)** | Edit via `/admin` locally, or edit `src/data/*` in git, then deploy |
| **Visitors** | View the site, use the terminal UI, submit contact (if configured) |

This is not a multi-user CMS. Do not add public write access or multi-account auth.

## Features

- **Interactive Terminal Hero** — Commands like `help`, `about`, `skills`, `projects`, `contact`, `timeline`, `clear`.
- **Animated Particle Background** — Canvas particle system with mouse-reactive lines.
- **GitHub-Live Projects** — Repos from `Sudhanshu943`, merged with custom projects.
- **Owner Admin Panel** — Password + signed session. Edits JSON under `src/data/` (durable when committed).
- **Security Headers** — `X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`.
- **Route Protection** — Middleware + HMAC-signed `admin_session` cookie.
- **Boot Loader Intro** — Optional; enable via `ENABLE_BOOT_LOADER` in `src/components/ui/HomeShell.tsx`.
- **Section Components** — 14 sections: Navbar, Hero, ProofOfWork, SecurityLab, CTFWriteups, GitHubStats, Projects, Skills, Timeline, Education, CurrentFocus, SecurityMindset, Contact, Footer.

## How you update content

1. Run locally (`npm run dev`).
2. Log in at `/admin/login` and edit, **or** edit files in `src/data/` directly.
3. Commit changed JSON/TS data files.
4. Deploy — production serves the committed files.

On Vercel, live admin **writes** are disabled (ephemeral filesystem). Reads still work from deployed files.

## Progress

See **[docs/status.md](./status.md)** for a checklist of completed hardening work and recommended next steps (env setup, Formspree, real project content, optional engineering).
