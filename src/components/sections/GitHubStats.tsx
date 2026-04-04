'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface GitHubStats {
  repos: number;
  languages: { [key: string]: number };
  followers: number;
  publicGists: number;
  profile: {
    avatar_url: string;
    bio: string;
    company: string;
  };
}

export default function GitHubStatsSection() {
  const [stats, setStats] = useState<GitHubStats | null>(null);
  const username = 'Sudhanshu943';

  useEffect(() => {
    async function fetchStats() {
      try {
        // Fetch user profile data
        const userRes = await fetch(`https://api.github.com/users/${username}`);
        const userData = await userRes.json();

        // Fetch repositories
        const reposRes = await fetch(`https://api.github.com/users/${username}/repos?per_page=100`);
        const repos = await reposRes.json();

        // Calculate languages
        const languages: { [key: string]: number } = {};
        for (const repo of repos) {
          if (repo.language) {
            languages[repo.language] = (languages[repo.language] || 0) + 1;
          }
        }

        const sortedLanguages = Object.entries(languages)
          .sort(([,a], [,b]) => b - a)
          .slice(0, 5);

        setStats({
          repos: repos.length,
          languages: Object.fromEntries(sortedLanguages),
          followers: userData.followers || 0,
          publicGists: userData.public_gists || 0,
          profile: {
            avatar_url: userData.avatar_url,
            bio: userData.bio || 'Security Researcher & Developer',
            company: userData.company || 'Independent'
          }
        });
      } catch (error) {
        console.error('Error fetching GitHub stats:', error);
        // Fallback data
        setStats({
          repos: 0,
          languages: {},
          followers: 0,
          publicGists: 0,
          profile: {
            avatar_url: '',
            bio: 'Security Researcher & Developer',
            company: 'Independent'
          }
        });
      }
    }

    fetchStats();
  }, []);

  if (!stats) return (
    <div className="py-[120px] bg-surface-container-low px-6">
      <div className="max-w-7xl mx-auto text-center font-mono-tactical text-on-surface-variant">
        Loading GitHub stats...
      </div>
    </div>
  );

  return (
    <section className="py-[120px] bg-surface-container-low/40 px-6 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <p className="font-mono-tactical text-xs tracking-[0.3em] text-primary mb-2">[ DIRECTORY: /GITHUB ]</p>
          <h2 className="text-4xl font-headline font-bold uppercase tracking-tight">Repository Statistics</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="bg-surface-container p-6 text-center border-l-4 border-primary"
          >
            <span className="material-symbols-outlined text-4xl text-primary mx-auto mb-4">code_blocks</span>
            <h3 className="font-mono-tactical text-secondary mb-2 uppercase">Public Repositories</h3>
            <p className="text-3xl font-headline font-bold text-primary">{stats.repos}</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-surface-container p-6"
          >
            <h3 className="font-mono-tactical text-secondary mb-4 text-center uppercase">Top Languages</h3>
            <div className="space-y-2">
              {Object.entries(stats.languages).length > 0 ? (
                Object.entries(stats.languages).map(([lang, count]) => (
                  <div key={lang} className="flex justify-between items-center">
                    <span className="text-on-surface">{lang}</span>
                    <span className="text-primary font-mono-tactical">{count}</span>
                  </div>
                ))
              ) : (
                <p className="text-on-surface-variant text-sm">Loading languages...</p>
              )}
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-surface-container p-6 text-center border-l-4 border-secondary"
          >
            <span className="material-symbols-outlined text-4xl text-secondary mx-auto mb-4">people</span>
            <h3 className="font-mono-tactical text-secondary mb-2 uppercase">Followers</h3>
            <p className="text-3xl font-headline font-bold text-secondary">{stats.followers}</p>
          </motion.div>
        </div>

        {/* Additional stats row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-surface-container p-6 border-l-4 border-tertiary"
          >
            <span className="font-mono-tactical text-secondary mb-2 block uppercase">Public Gists</span>
            <p className="text-2xl font-headline font-bold text-tertiary">{stats.publicGists}</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-surface-container p-6 text-center border-l-4 border-primary/50"
          >
            <p className="text-on-surface-variant mb-4 text-sm">View full contribution graph and activity</p>
            <a 
              href={`https://github.com/${username}`} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-primary text-on-primary font-mono-tactical font-bold px-4 py-2 uppercase text-xs hover:scale-[1.05] transition-transform"
            >
              <span className="material-symbols-outlined text-sm">open_in_new</span>
              Visit GitHub Profile
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}