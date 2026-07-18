# Data Files

Content lives in `src/data/`. Sole-owner portfolio: edit locally (or via admin), commit, deploy.

## Source of truth

| Content | Canonical file | TS helper |
|---------|----------------|-----------|
| Site config (name, bio, socials, resume, focus, mindset) | `config.json` | `config.ts` re-exports |
| Custom projects | `projects.json` | `projects.ts` re-exports; merged in `/api/portfolio/projects` |
| Skills | `skills.json` | `skills.ts` re-exports |
| Education | `education.json` | — |
| Admin / GitHub merge | `admin-config.json` | Repo visibility + profile overrides |
| Timeline | `timeline.ts` only | static |
| CTF writeups | `ctfWriteups.ts` only | static |
| Proof of work | `proofOfWork.ts` only | static |
| Security labs | `securityLabs.ts` only | static |

**Rule:** Never duplicate the same field in both a hand-maintained `.ts` object and a `.json` file. JSON owns admin-editable data; `.ts` files either re-export that JSON or hold static-only narrative.

## Files

| File | Used By | Content |
|------|---------|---------|
| `config.json` + `config.ts` | Components, `/api/config`, admin | Full site profile |
| `admin-config.json` | Admin + `/api/portfolio/projects` | Repo visibility, profile overrides |
| `projects.json` + `projects.ts` | `/api/projects`, portfolio merge, Hero/Terminal | Custom projects (single source) |
| `skills.json` + `skills.ts` | `/api/skills` | Skills by category |
| `education.json` | `/api/education` | Education history |
| `timeline.ts` | Timeline, Terminal | Career timeline |
| `ctfWriteups.ts` | CTFWriteups | CTF writeups |
| `proofOfWork.ts` | ProofOfWork | Certifications |
| `securityLabs.ts` | SecurityLab | Lab entries |

## Data flow

1. **JSON (admin-editable)** — Read/written via `src/lib/data-store.ts` in API routes. Components may `import` the matching `.ts` re-export or `fetch` the API.
2. **Static TS** — Imported directly by sections (timeline, CTF, labs, proof-of-work).
3. **GitHub** — Fetched at runtime (~300s cache), merged with `admin-config.json`.

## Persistence

- Local / self-hosted Node: writes allowed.
- Vercel (`VERCEL=1`) or `DISABLE_DATA_WRITES=true`: writes → `503 DATA_WRITES_DISABLED`.
- Production = committed git files.
