<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Project identity

Personal cybersecurity portfolio for **one owner** (Sudhanshu Thapa). Visitors read-only; only the owner edits content. Prefer local JSON + git over adding a database unless explicitly requested.

## Cursor rules

Project rules live in `.cursor/rules/` (`portfolio-core`, `admin-and-data`, `frontend`). Follow them in addition to this file.

## Documentation

All project documentation lives in the `docs/` directory. Consult these files before writing or modifying code:

| File | Content |
|------|---------|
| `docs/overview.md` | Project purpose, ownership model, features |
| `docs/tech-stack.md` | Framework versions, dependencies, and theme configuration |
| `docs/structure.md` | Full directory tree with explanations of key directories |
| `docs/admin-panel.md` | Admin dashboard, auth, and sole-owner edit workflow |
| `docs/api-routes.md` | All API endpoints, methods, and authentication requirements |
| `docs/data-files.md` | Data formats, source of truth, persistence rules |
| `docs/deployment.md` | Build, env vars, Vercel write limitations |
| `docs/development.md` | Setup, conventions, contribution guidelines |
| `docs/components.md` | Component reference including all 14 sections and terminal commands |
