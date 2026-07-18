# Development

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create `.env.local` with required environment variables
4. Start the development server:
   ```bash
   npm run dev
   ```
5. Open [http://localhost:3000](http://localhost:3000)

## Project Conventions

- **Components**: Located in `src/components/`, use `.tsx` extension
- **Client Components**: Marked with `'use client'` directive when using hooks, state, or browser APIs
- **Server Components**: Default for App Router pages and API route handlers
- **Styling**: Use Tailwind CSS utility classes. Theme tokens defined in `src/app/globals.css`
- **Data**: Static content in `src/data/` as TS exports; editable content in JSON files
- **API Routes**: Located in `src/app/api/`, follow REST conventions

## Key Files

| File | Purpose |
|------|---------|
| `src/app/page.tsx` | Main home page — composes all sections |
| `src/app/globals.css` | Global styles + Tailwind v4 theme tokens |
| `src/app/layout.tsx` | Root layout with fonts, metadata, theme provider |
| `src/components/sections/` | All page section components |
| `src/components/terminal/Terminal.tsx` | Interactive terminal emulator |
| `src/components/AnimatedBackground.tsx` | Canvas particle animation |
| `middleware.ts` | Admin route protection |
| `next.config.ts` | Next.js configuration + security headers |

## Adding a New Section

1. Create a new component in `src/components/sections/`
2. Import and add it to `src/app/page.tsx`
3. Ensure the component follows the project's dark/terminal aesthetic

## Modifying Theme Colors

Edit `@theme` tokens in `src/app/globals.css`:

```css
@theme {
  --color-background: #000;
  --color-primary: #00ff9f;
  --color-secondary: #00bfff;
  --color-accent: #ff0033;
}
```

## Testing Admin Panel

1. Navigate to `/admin`
2. Log in with the password set in `ADMIN_PASSWORD` environment variable
3. Use the dashboard to manage projects, skills, and site configuration

## Linting

```bash
npm run lint
```

## TypeScript

The project uses strict TypeScript. Run `tsc --noEmit` to check types without building.
