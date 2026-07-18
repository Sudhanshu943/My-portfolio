# Project Structure

```
my-portfolio/
├── .env.local                  # Environment variables (gitignored)
├── .gitignore
├── AGENTS.md                   # Agent instructions for this project
├── CLAUDE.md                   # Claude-specific instructions
├── eslint.config.mjs           # ESLint configuration
├── middleware.ts               # Route protection for /admin
├── next.config.ts              # Next.js config + security headers
├── package.json                # Dependencies and scripts
├── package-lock.json
├── postcss.config.mjs          # PostCSS config (Tailwind v4)
├── tailwind.config.js          # Tailwind v4 legacy config
├── tsconfig.json               # TypeScript configuration
├── README.md                   # Project readme
├── public/                     # Static assets
│   ├── profile.png             # Author profile photo
│   ├── resume.pdf              # Resume download
│   ├── projects/               # Project images
│   │   ├── encryption-app.svg
│   │   └── password-analyzer.svg
│   └── *.svg                   # Default Next.js assets
├── src/
│   ├── app/                    # App Router (pages & API routes)
│   │   ├── globals.css         # Global styles + Tailwind theme tokens
│   │   ├── layout.tsx          # Root layout (fonts, metadata, theme)
│   │   ├── page.tsx            # Home page (composes all sections)
│   │   ├── admin/              # Admin pages
│   │   │   ├── login/
│   │   │   │   └── page.tsx    # Admin login form
│   │   │   └── page.tsx        # Admin dashboard (protected)
│   │   └── api/                # API routes
│   │       ├── admin/          # Admin API (login, logout, config, project actions)
│   │       ├── config/         # Site config (GET/PUT)
│   │       ├── education/      # Education entries (CRUD)
│   │       ├── github/
│   │       │   └── repos/      # GitHub repo fetcher (300s revalidation)
│   │       ├── portfolio/
│   │       │   └── projects/   # Merged projects (GitHub + custom)
│   │       ├── projects/       # Custom projects (CRUD)
│   │       └── skills/         # Skills (CRUD)
│   ├── components/             # Reusable React components
│   │   ├── admin/              # Admin UI components
│   │   │   ├── AdminControls.tsx
│   │   │   └── SettingsPanel.tsx
│   │   ├── sections/           # Page sections (14 total)
│   │   │   ├── Navbar.tsx
│   │   │   ├── Hero.tsx
│   │   │   ├── ProofOfWork.tsx
│   │   │   ├── SecurityLab.tsx
│   │   │   ├── CTFWriteups.tsx
│   │   │   ├── GitHubStats.tsx
│   │   │   ├── Projects.tsx
│   │   │   ├── Skills.tsx
│   │   │   ├── Timeline.tsx
│   │   │   ├── Education.tsx
│   │   │   ├── CurrentFocus.tsx
│   │   │   ├── SecurityMindset.tsx
│   │   │   ├── Contact.tsx
│   │   │   └── Footer.tsx
│   │   ├── terminal/
│   │   │   └── Terminal.tsx    # Interactive terminal section
│   │   ├── ui/
│   │   │   └── BootLoader.tsx  # Boot sequence animation
│   │   ├── AdminDashboard.tsx  # Full admin dashboard
│   │   └── AnimatedBackground.tsx  # Canvas particle system
│   ├── data/                   # Content data files
│   │   ├── config.ts / config.json
│   │   ├── admin-config.json
│   │   ├── projects.ts / projects.json
│   │   ├── skills.ts / skills.json
│   │   ├── education.json
│   │   ├── timeline.ts
│   │   ├── ctfWriteups.ts
│   │   ├── proofOfWork.ts
│   │   └── securityLabs.ts
│   └── lib/                    # Utility libraries (currently empty)
├── docs/                       # Documentation (this folder)
└── .next/                      # Next.js build output
```

## Key Directories

| Directory | Purpose |
|-----------|---------|
| `src/app/` | Next.js App Router pages and API routes |
| `src/app/admin/` | Admin panel pages (login + dashboard) |
| `src/app/api/` | REST API endpoints for frontend data |
| `src/components/sections/` | All visible page sections |
| `src/components/admin/` | Admin panel UI components |
| `src/components/terminal/` | Interactive terminal emulator |
| `src/data/` | Static and editable content (JSON + TS exports) |
| `public/` | Static assets (images, PDFs, SVGs) |
