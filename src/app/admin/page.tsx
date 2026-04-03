'use client';

import { useSession, signIn, signOut } from 'next-auth/react';
import { useState } from 'react';
import { config as defaultConfig } from '@/data/config';
import Providers from '@/components/Providers';

function AdminContent() {
  const { data: session, status } = useSession();
  const [config, setConfig] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('portfolio_config');
      return saved ? JSON.parse(saved) : defaultConfig;
    }
    return defaultConfig;
  });

  const saveConfig = () => {
    localStorage.setItem('portfolio_config', JSON.stringify(config));
    alert('Config saved!');
  };

  if (status === 'loading') return <div>Loading...</div>;

  if (!session) {
    return (
      <div className="min-h-screen bg-background text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-mono text-primary mb-4">Admin Access Required</h1>
          <button
            onClick={() => signIn('github')}
            className="px-4 py-2 bg-primary text-black font-mono hover:bg-primary/80"
          >
            Sign in with GitHub
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-white p-8">
      <div className="container mx-auto max-w-2xl">
        <h1 className="text-3xl font-mono text-primary mb-8">Admin Dashboard</h1>
        <div className="mb-8">
          <h2 className="text-xl font-mono text-secondary mb-4">Edit Config</h2>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Name"
              value={config.name}
              onChange={(e) => setConfig({ ...config, name: e.target.value })}
              className="w-full p-2 bg-gray-900 border border-primary/20 text-white"
            />
            <input
              type="text"
              placeholder="Role"
              value={config.role}
              onChange={(e) => setConfig({ ...config, role: e.target.value })}
              className="w-full p-2 bg-gray-900 border border-primary/20 text-white"
            />
            <textarea
              placeholder="Bio"
              value={config.bio}
              onChange={(e) => setConfig({ ...config, bio: e.target.value })}
              className="w-full p-2 bg-gray-900 border border-primary/20 text-white"
            />
            <input
              type="text"
              placeholder="GitHub"
              value={config.socialLinks.github}
              onChange={(e) => setConfig({
                ...config,
                socialLinks: { ...config.socialLinks, github: e.target.value }
              })}
              className="w-full p-2 bg-gray-900 border border-primary/20 text-white"
            />
            <button
              onClick={saveConfig}
              className="px-4 py-2 bg-primary text-black font-mono hover:bg-primary/80"
            >
              Save Config
            </button>
          </div>
        </div>
        <button
          onClick={() => signOut()}
          className="px-4 py-2 bg-accent text-white font-mono hover:bg-accent/80"
        >
          Sign Out
        </button>
      </div>
    </div>
  );
}

export default function Admin() {
  return (
    <Providers>
      <AdminContent />
    </Providers>
  );
}