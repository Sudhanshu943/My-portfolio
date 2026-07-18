# Data Files

Content is stored in `src/data/` as a mix of TypeScript exports (used by components) and JSON files (used by API routes).

## Files

| File | Format | Used By | Content |
|------|--------|---------|---------|
| `config.ts` | TS Export | Components | Profile info, bio, social links, resume URL |
| `config.json` | JSON | API | Site configuration (profile, bio, social links, resume) |
| `admin-config.json` | JSON | API + Admin | Repo visibility, featured projects, custom projects, profile overrides |
| `projects.ts` | TS Export | Components | Custom project entries with metadata |
| `projects.json` | JSON | API | Custom project entries (persisted by admin panel) |
| `skills.ts` | TS Export | Components | Skills categorized by type with proficiency levels |
| `skills.json` | JSON | API | Skills entries (persisted by admin panel) |
| `education.json` | JSON | API + Components | Education history entries |
| `timeline.ts` | TS Export | Components | Career/achievement timeline events |
| `ctfWriteups.ts` | TS Export | Components | CTF competition writeups |
| `proofOfWork.ts` | TS Export | Components | Proof of work / certifications |
| `securityLabs.ts` | TS Export | Components | Security lab projects and descriptions |

## Data Flow

1. **Static data** (`*.ts` exports) — Loaded directly by components at build time.
2. **Editable data** (`*.json` files) — Read/written by API routes using Node `fs` module. Modified through the admin panel.
3. **GitHub data** — Fetched at runtime from GitHub API, cached with 300s revalidation, merged with custom projects.
