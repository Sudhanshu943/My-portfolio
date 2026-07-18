# Deployment

## Prerequisites

- Node.js 18+ (recommended)
- npm, yarn, pnpm, or bun
- Environment variables configured (see Environment section below)

## Environment Variables

Create a `.env.local` file in the project root with the following variables:

```env
# Admin Authentication
ADMIN_PASSWORD=your_secure_password_here

# NextAuth Configuration
NEXTAUTH_SECRET=your_nextauth_secret_here
NEXTAUTH_URL=https://your-domain.com

# GitHub OAuth (for live repo fetching)
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret

# Admin Email
ADMIN_EMAIL=your_email@example.com
NEXT_PUBLIC_ADMIN_EMAIL=your_email@example.com
```

## Build Commands

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm run start

# Run linter
npm run lint
```

## Deployment Platforms

### Vercel (Recommended)

1. Push repository to GitHub
2. Import project in Vercel
3. Add all environment variables in Vercel dashboard
4. Deploy

### Netlify

1. Push repository to GitHub
2. Import project in Netlify
3. Set build command: `npm run build`
4. Set publish directory: `.next`
5. Add environment variables
6. Deploy

### Self-Hosted

```bash
npm run build
npm run start
```

Server must support Node.js and be configured to run the Next.js server.

## Security Considerations

- `ADMIN_PASSWORD` should be a strong, unique password
- `NEXTAUTH_SECRET` should be a cryptographically secure random string
- The `.env.local` file is gitignored — never commit secrets
- Consider implementing rate limiting on admin login in production
- The current admin authentication is simple (shared password + cookie). For production, consider upgrading to a proper authentication system.
