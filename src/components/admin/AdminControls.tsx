'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import SettingsPanel from './SettingsPanel';

export default function AdminControls() {
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    checkAdminStatus();
  }, []);

  const checkAdminStatus = async () => {
    try {
      const res = await fetch('/api/admin/check');
      const data = await res.json();
      setIsAdmin(data.isAdmin);
    } catch {
      setIsAdmin(false);
    }
  };

  const handleLogout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' });
    setIsAdmin(false);
    router.push('/');
  };

  if (!mounted) return null;
  if (!isAdmin) return null;

  return (
    <>
      <div className="fixed top-20 right-6 z-40 flex items-center gap-3">
        <div className="bg-primary/20 border border-primary/50 px-3 py-1.5">
          <span className="text-primary font-['Space_Grotesk'] text-xs tracking-widest">
            [ADMIN_MODE]
          </span>
        </div>
        <button
          onClick={handleLogout}
          className="bg-surface/80 border border-outline-variant/30 px-3 py-1.5 text-on-surface-variant hover:text-primary hover:border-primary/50 text-xs font-['Space_Grotesk'] transition-all"
        >
          [EXIT]
        </button>
      </div>

      <button
        onClick={() => setSettingsOpen(true)}
        className="fixed bottom-6 right-6 z-40 bg-primary/20 border border-primary/50 p-3 text-primary hover:bg-primary/30 transition-all"
      >
        <span className="material-symbols-outlined text-2xl">settings</span>
      </button>

      <SettingsPanel isOpen={settingsOpen} onClose={() => setSettingsOpen(false)} />
    </>
  );
}