'use client';

import { useEffect, useRef, useState } from 'react';
import FadeIn from '@/components/ui/FadeIn';

interface GitHubStats {
  repos: number;
  languages: { [key: string]: number };
  followers: number;
  publicGists: number;
}

const USERNAME = 'Sudhanshu943';

export default function GitHubStatsSection() {
  const [stats, setStats] = useState<GitHubStats | null>(null);
  const [error, setError] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const fetchedRef = useRef(false);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;

    const load = async () => {
      if (fetchedRef.current) return;
      fetchedRef.current = true;

      try {
        const [userRes, reposRes] = await Promise.all([
          fetch(`https://api.github.com/users/${USERNAME}`),
          fetch(
            `https://api.github.com/users/${USERNAME}/repos?per_page=100&sort=updated`
          ),
        ]);

        if (!userRes.ok || !reposRes.ok) throw new Error('GitHub API error');

        const userData = await userRes.json();
        const repos = await reposRes.json();

        const languages: { [key: string]: number } = {};
        for (const repo of repos) {
          if (repo.language) {
            languages[repo.language] = (languages[repo.language] || 0) + 1;
          }
        }

        const sortedLanguages = Object.entries(languages)
          .sort(([, a], [, b]) => b - a)
          .slice(0, 5);

        setStats({
          repos: Array.isArray(repos) ? repos.length : 0,
          languages: Object.fromEntries(sortedLanguages),
          followers: userData.followers || 0,
          publicGists: userData.public_gists || 0,
        });
      } catch {
        setError(true);
        setStats({
          repos: 0,
          languages: {},
          followers: 0,
          publicGists: 0,
        });
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          load();
          observer.disconnect();
        }
      },
      { rootMargin: '200px' }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-20 md:py-[120px] bg-surface-container-low/40 px-6 backdrop-blur-sm"
    >
      <div className="max-w-7xl mx-auto">
        <div className="mb-12 md:mb-16">
          <p className="font-mono-tactical text-xs tracking-[0.3em] text-primary mb-2">
            [ DIRECTORY: /GITHUB ]
          </p>
          <h2 className="text-4xl font-headline font-bold uppercase tracking-tight">
            Repository Statistics
          </h2>
        </div>

        {!stats ? (
          <p className="font-mono-tactical text-on-surface-variant text-sm">
            Loading GitHub stats…
          </p>
        ) : (
          <>
            {error && (
              <p className="font-mono-tactical text-xs text-on-surface-variant mb-6">
                Live stats temporarily unavailable — visit the profile link below.
              </p>
            )}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <FadeIn className="bg-surface-container p-6 text-center border-l-4 border-primary">
                <span className="material-symbols-outlined text-4xl text-primary mx-auto mb-4">
                  code_blocks
                </span>
                <h3 className="font-mono-tactical text-secondary mb-2 uppercase">
                  Public Repositories
                </h3>
                <p className="text-3xl font-headline font-bold text-primary">
                  {stats.repos}
                </p>
              </FadeIn>
              <FadeIn delay={0.1} className="bg-surface-container p-6">
                <h3 className="font-mono-tactical text-secondary mb-4 text-center uppercase">
                  Top Languages
                </h3>
                <div className="space-y-2">
                  {Object.entries(stats.languages).length > 0 ? (
                    Object.entries(stats.languages).map(([lang, count]) => (
                      <div key={lang} className="flex justify-between items-center">
                        <span className="text-on-surface">{lang}</span>
                        <span className="text-primary font-mono-tactical">{count}</span>
                      </div>
                    ))
                  ) : (
                    <p className="text-on-surface-variant text-sm text-center">—</p>
                  )}
                </div>
              </FadeIn>
              <FadeIn
                delay={0.2}
                className="bg-surface-container p-6 text-center border-l-4 border-secondary"
              >
                <span className="material-symbols-outlined text-4xl text-secondary mx-auto mb-4">
                  people
                </span>
                <h3 className="font-mono-tactical text-secondary mb-2 uppercase">
                  Followers
                </h3>
                <p className="text-3xl font-headline font-bold text-secondary">
                  {stats.followers}
                </p>
              </FadeIn>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <FadeIn
                delay={0.25}
                className="bg-surface-container p-6 border-l-4 border-tertiary"
              >
                <span className="font-mono-tactical text-secondary mb-2 block uppercase">
                  Public Gists
                </span>
                <p className="text-2xl font-headline font-bold text-tertiary">
                  {stats.publicGists}
                </p>
              </FadeIn>
              <FadeIn
                delay={0.3}
                className="bg-surface-container p-6 text-center border-l-4 border-primary/50"
              >
                <p className="text-on-surface-variant mb-4 text-sm">
                  View full contribution graph and activity
                </p>
                <a
                  href={`https://github.com/${USERNAME}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-primary text-on-primary font-mono-tactical font-bold px-4 py-2 uppercase text-xs hover:scale-[1.05] transition-transform"
                >
                  <span className="material-symbols-outlined text-sm">open_in_new</span>
                  Visit GitHub Profile
                </a>
              </FadeIn>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
