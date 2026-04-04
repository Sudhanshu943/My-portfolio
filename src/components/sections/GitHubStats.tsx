'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { GitBranch, Code, Calendar } from 'lucide-react';

interface GitHubStats {
  repos: number;
  languages: { [key: string]: number };
  contributions: number; // placeholder
}

export default function GitHubStats() {
  const [stats, setStats] = useState<GitHubStats | null>(null);
  const username = 'Sudhanshu943';

  useEffect(() => {
    async function fetchStats() {
      try {
        const reposRes = await fetch(`https://api.github.com/users/${username}/repos?per_page=100`);
        const repos = await reposRes.json();

        const languages: { [key: string]: number } = {};
        for (const repo of repos) {
          if (repo.language) {
            languages[repo.language] = (languages[repo.language] || 0) + 1;
          }
        }

        // Sort languages by count
        const sortedLanguages = Object.entries(languages)
          .sort(([,a], [,b]) => b - a)
          .slice(0, 5);

        setStats({
          repos: repos.length,
          languages: Object.fromEntries(sortedLanguages),
          contributions: 0 // Placeholder, as API doesn't provide easily
        });
      } catch (error) {
        console.error('Error fetching GitHub stats:', error);
      }
    }

    fetchStats();
  }, []);

  if (!stats) return <div>Loading GitHub stats...</div>;

  return (
    <section id="github-stats" className="py-20 px-4">
      <div className="container mx-auto">
        <h2 className="text-3xl font-mono text-primary mb-8 text-center flex items-center justify-center gap-2">
          <GitBranch size={32} />
          GITHUB STATS
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="bg-gray-900 border border-primary/20 rounded p-6 text-center"
          >
            <Code size={48} className="text-primary mx-auto mb-4" />
            <h3 className="text-xl font-mono text-secondary mb-2">Public Repositories</h3>
            <p className="text-2xl text-primary">{stats.repos}</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-gray-900 border border-primary/20 rounded p-6"
          >
            <h3 className="text-xl font-mono text-secondary mb-4 text-center">Top Languages</h3>
            <div className="space-y-2">
              {Object.entries(stats.languages).map(([lang, count]) => (
                <div key={lang} className="flex justify-between">
                  <span className="text-gray-300">{lang}</span>
                  <span className="text-primary">{count}</span>
                </div>
              ))}
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gray-900 border border-primary/20 rounded p-6 text-center"
          >
            <Calendar size={48} className="text-primary mx-auto mb-4" />
            <h3 className="text-xl font-mono text-secondary mb-2">Contributions</h3>
            <p className="text-2xl text-primary">View on GitHub</p>
            <a href={`https://github.com/${username}`} target="_blank" rel="noopener noreferrer" className="text-primary hover:text-secondary">
              github.com/{username}
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}