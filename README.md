# My Portfolio

A cybersecurity-themed personal portfolio website designed with a "TERMINAL_OS_v1.0" hacker/terminal aesthetic. Features an interactive terminal hero, animated particle background, live GitHub integration, and a full admin panel for dynamic content management.

## Features

- **Interactive Terminal Hero** — Command-line interface with commands: `help`, `about`, `skills`, `projects`, `contact`, `timeline`, `clear`
- **Animated Particle Background** — Canvas-based particle system with mouse-reactive connecting lines
- **GitHub-Live Projects** — Fetches and displays repositories from GitHub in real-time
- **Admin Panel** — Password-protected dashboard for managing projects, skills, education, and site configuration
- **Security Headers** — Global security headers configured via Next.js
- **14 Page Sections** — Navbar, Hero, ProofOfWork, SecurityLab, CTFWriteups, GitHubStats, Projects, Skills, Timeline, Education, CurrentFocus, SecurityMindset, Contact, Footer

## Tech Stack

- Next.js 16.2.2 (App Router, TypeScript)
- React 19.2.4
- Tailwind CSS v4
- Framer Motion 12
- Canvas API (particle background)
- Material Symbols (icons)

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create `.env.local` with required environment variables (see [docs/deployment.md](./docs/deployment.md))
4. Start the development server:
   ```bash
   npm run dev
   ```
5. Open [http://localhost:3000](http://localhost:3000)

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |

## Documentation

Full documentation is available in the [`docs/`](./docs/) directory:

| File | Content |
|------|---------|
| `docs/overview.md` | Project purpose, features, and high-level description |
| `docs/tech-stack.md` | Framework versions, dependencies, and theme configuration |
| `docs/structure.md` | Full directory tree with explanations of key directories |
| `docs/admin-panel.md` | Admin dashboard, authentication, and data persistence details |
| `docs/api-routes.md` | All API endpoints, methods, and authentication requirements |
| `docs/data-files.md` | Data file formats, locations, and data flow between TS/JSON |
| `docs/deployment.md` | Build commands, environment variables, and deployment platforms |
| `docs/development.md` | Development setup, conventions, and contribution guidelines |
| `docs/components.md` | Component reference including all 14 sections and terminal commands |

## Admin Panel

Navigate to `/admin` and log in with the password set in your `ADMIN_PASSWORD` environment variable to manage portfolio content.

## Deployment

See [docs/deployment.md](./docs/deployment.md) for deployment instructions, environment variables, and security considerations.

## License

Private — All rights reserved.
