# Components Reference

## Section Components

Located in `src/components/sections/`.

| Component | Description | Rendering |
|-----------|-------------|-----------|
| `Navbar` | Top navigation bar with smooth scroll links | Client |
| `Hero` | Terminal-styled hero with typing animation | Client |
| `ProofOfWork` | Certifications and proof of work | Server + FadeIn |
| `SecurityLab` | Security laboratory showcase | Server + FadeIn |
| `CTFWriteups` | CTF competition writeups | Server + FadeIn |
| `GitHubStats` | GitHub contribution statistics | Client |
| `Projects` | Portfolio projects (GitHub + custom) | Client |
| `Skills` | Skills by category (SSR from JSON) | Server + FadeIn |
| `Timeline` | Career timeline | Server + FadeIn |
| `Education` | Formal education (SSR from JSON) | Server |
| `CurrentFocus` | Current learning focus | Server + FadeIn |
| `SecurityMindset` | Security philosophy | Server |
| `Contact` | Contact form and social links | Client |
| `Footer` | Site footer | Server |

## Special Components

| Component | Location | Description |
|-----------|----------|-------------|
| `Terminal` | `src/components/terminal/Terminal.tsx` | Full interactive terminal emulator with command processing |
| `AnimatedBackground` | `src/components/AnimatedBackground.tsx` | Canvas-based particle system with mouse interaction |
| `BootLoader` | `src/components/ui/BootLoader.tsx` | Terminal boot sequence animation |
| `FadeIn` | `src/components/ui/FadeIn.tsx` | Client motion island for scroll-in effects on server sections |
| `SectionSkeleton` | `src/components/ui/SectionSkeleton.tsx` | Placeholder while dynamic sections load |
| `ClientOnlyIslands` | `src/components/ui/ClientOnlyIslands.tsx` | `ssr: false` dynamic wrappers (canvas, admin) |
| `HomeShell` | `src/components/ui/HomeShell.tsx` | Optional boot gate (`ENABLE_BOOT_LOADER`) |
| `AdminDashboard` | `src/components/AdminDashboard.tsx` | Tabbed admin interface for content management |
| `AdminControls` | `src/components/admin/AdminControls.tsx` | Floating in-page admin editor |
| `SettingsPanel` | `src/components/admin/SettingsPanel.tsx` | Settings panel within admin interface |

## Terminal Commands

The interactive terminal supports the following commands:

| Command | Description |
|---------|-------------|
| `help` | Display available commands |
| `about` | Show about information |
| `skills` | List technical skills |
| `projects` | Show portfolio projects |
| `contact` | Display contact information |
| `timeline` | Show career timeline |
| `clear` | Clear terminal output |
