# Portfolio Project Overview

A cybersecurity-themed personal portfolio website for **Sudhanshu Thapa**, designed with a "TERMINAL_OS_v1.0" hacker/terminal aesthetic. The site presents itself as an interactive terminal operating system, featuring particle animations, live GitHub integration, and a full admin panel for dynamic content management.

## Features

- **Interactive Terminal Hero** — A command-line interface hero section where visitors can type commands like `help`, `about`, `skills`, `projects`, `contact`, `timeline`, and `clear`.
- **Animated Particle Background** — A Canvas-based particle system with mouse-reactive connecting lines and glow gradients.
- **GitHub-Live Projects** — Fetches and displays repositories from `Sudhanshu943` in real-time, merged with custom portfolio projects.
- **Admin Panel** — Password-protected dashboard for managing projects, skills, education, social links, and site configuration. Changes persist to local JSON files.
- **Security Headers** — Global security headers (`X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`) configured in Next.js.
- **Route Protection** — Middleware-based protection for `/admin/*` routes using an `admin_session` cookie.
- **Boot Loader Intro** — An optional boot-sequence animation that simulates a system startup.
- **Section Components** — 14 distinct sections: Navbar, Hero, ProofOfWork, SecurityLab, CTFWriteups, GitHubStats, Projects, Skills, Timeline, Education, CurrentFocus, SecurityMindset, Contact, Footer.
