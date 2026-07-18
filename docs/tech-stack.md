# Technology Stack

| Category | Technology | Version | Notes |
|----------|-----------|---------|-------|
| **Framework** | Next.js | 16.2.2 | App Router, React Server Components, TypeScript |
| **UI Library** | React | 19.2.4 | Client components used extensively |
| **Language** | TypeScript | 5.x | Strict mode enabled |
| **Styling** | Tailwind CSS | v4 | `@tailwindcss/postcss` plugin, `@theme` tokens in `globals.css` |
| **Animations** | Framer Motion | 12.x | Page transitions and section animations |
| **Icons** | Material Symbols | — | Google Fonts icon set loaded in root layout |
| **Authentication** | next-auth | 4.x | Environment-configured (admin uses simple cookie + password) |
| **Background** | Canvas API | — | Custom particle system (no external library) |
| **Data Storage** | JSON files | — | Local file system via Node `fs` module |
| **Linting** | ESLint | 9.x | `eslint-config-next/core-web-vitals` + TypeScript |
| **Build Tool** | Next.js (SWC) | — | Built-in compiler |

## Key Configuration

- **Path alias**: `@/*` maps to `./src/*` (defined in `tsconfig.json`)
- **Custom colors**: Background `#000`, Primary `#00ff9f`, Secondary `#00bfff`, Accent `#ff0033`
- **Fonts**: Inter (sans), Space Grotesk (display), JetBrains Mono (monospace/terminal)
