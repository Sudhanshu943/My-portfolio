'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLoginPage() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();

      if (res.ok) {
        router.push('/');
      } else {
        setError(data.error || 'Access Denied');
      }
    } catch {
      setError('An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-surface px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-primary font-['Space_Grotesk'] tracking-tight mb-2">
            [TERMINAL_ACCESS]
          </h1>
          <p className="text-on-surface-variant font-mono text-sm">
            Enter admin credentials to continue
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-on-surface-variant font-['Space_Grotesk'] text-sm tracking-widest mb-2">
              [PASSWORD]
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-surface-container border border-outline-variant/30 px-4 py-3 text-on-surface font-mono focus:outline-none focus:border-primary transition-colors"
              placeholder="Enter admin password..."
              required
            />
          </div>

          {error && (
            <div className="bg-error/10 border border-error/30 px-4 py-2 text-error font-mono text-sm">
              [ERROR] {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary/20 border border-primary/50 text-primary font-['Space_Grotesk'] tracking-widest py-3 hover:bg-primary/30 transition-all disabled:opacity-50"
          >
            {loading ? '[AUTHENTICATING...]' : '[ACCESS_SYSTEM]'}
          </button>
        </form>

        <div className="mt-8 text-center">
          <a href="/" className="text-on-surface-variant hover:text-primary font-['Space_Grotesk'] text-sm tracking-widest transition-colors">
            ← [RETURN_TO_BASE]
          </a>
        </div>
      </div>
    </div>
  );
}