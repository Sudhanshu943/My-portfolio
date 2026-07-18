'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';

interface NavbarProps {
  adminEmail?: string;
  profilePicture?: string;
}

export default function Navbar({ adminEmail, profilePicture = '/profile.png' }: NavbarProps) {
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [isAdmin, setIsAdmin] = useState(false);
  const settingsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
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
    try {
      await fetch('/api/admin/logout', { method: 'POST' });
      setIsAdmin(false);
      setSettingsOpen(false);
      router.push('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
    }
  };

  useEffect(() => {
    const sections = ['hero', 'proof-of-work', 'projects', 'skills'];
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3 }
    );

    sections.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (settingsRef.current && !settingsRef.current.contains(event.target as Node)) {
        setSettingsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navItems = [
    { id: 'hero', label: 'HOME' },
    { id: 'proof-of-work', label: 'EXPERIENCE' },
    { id: 'projects', label: 'PROJECTS' },
    { id: 'skills', label: 'SKILLS' },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-6 py-3 bg-surface/80 backdrop-blur-xl border-b border-outline-variant/15 shadow-[0_0_20px_rgba(160,255,196,0.05)]">
      <div className="text-lg font-bold text-primary tracking-tighter font-['Space_Grotesk'] uppercase">
        [TERMINAL_OS_v1.0]
      </div>
      
      <div className="hidden md:flex gap-8 font-['Space_Grotesk'] uppercase tracking-widest text-sm">
        {navItems.map((item) => (
          <button 
            key={item.id}
            onClick={() => scrollToSection(item.id)}
            className={`pb-1 transition-all duration-150 ${
              activeSection === item.id 
                ? 'text-primary border-b-2 border-primary' 
                : 'text-on-surface-variant hover:text-primary hover:border-b-2 hover:border-primary/50'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>
      
      <div className="hidden md:flex items-center gap-4 text-primary">
        <span className="material-symbols-outlined text-xl cursor-pointer hover:bg-surface-bright p-1 scale-95 transition-transform">
          terminal
        </span>
        <div className="relative" ref={settingsRef}>
          <button
            onClick={() => setSettingsOpen(!settingsOpen)}
            className="material-symbols-outlined text-xl cursor-pointer hover:bg-surface-bright p-1 scale-95 transition-transform"
          >
            settings_input_component
          </button>
          {settingsOpen && (
            <div className="absolute right-0 top-full mt-2 bg-surface/95 backdrop-blur-xl border border-outline-variant/30 shadow-lg min-w-[180px]">
              <div className="px-4 py-2 border-b border-outline-variant/30">
                <span className="text-primary font-['Space_Grotesk'] text-xs tracking-widest">
                  [SYSTEM_MENU]
                </span>
              </div>
              {isAdmin ? (
                <>
                  <a
                    href="/admin"
                    className="block text-on-surface-variant font-['Space_Grotesk'] text-sm tracking-widest px-4 py-3 hover:bg-primary/10 hover:text-primary transition-all flex items-center gap-2"
                  >
                    <span className="material-symbols-outlined text-lg">admin_panel_settings</span>
                    [ADMIN_PANEL]
                  </a>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left text-on-surface-variant font-['Space_Grotesk'] text-sm tracking-widest px-4 py-3 hover:bg-primary/10 hover:text-primary transition-all flex items-center gap-2"
                  >
                    <span className="material-symbols-outlined text-lg">logout</span>
                    [LOGOUT]
                  </button>
                </>
              ) : (
                <button
                  onClick={() => {
                    setSettingsOpen(false);
                    router.push('/admin/login');
                  }}
                  className="w-full text-left text-on-surface-variant font-['Space_Grotesk'] text-sm tracking-widest px-4 py-3 hover:bg-primary/10 hover:text-primary transition-all flex items-center gap-2"
                >
                  <span className="material-symbols-outlined text-lg">login</span>
                  [ADMIN_LOGIN]
                </button>
              )}
            </div>
          )}
        </div>
        <span className="text-primary font-['Space_Grotesk'] text-sm tracking-widest px-3 py-1 border border-primary/30">
          [SYSTEM_ACTIVE]
        </span>
      </div>

      <button 
        className="md:hidden text-primary p-2"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        aria-label="Toggle menu"
      >
        <span className="material-symbols-outlined text-2xl">
          {mobileMenuOpen ? 'close' : 'menu'}
        </span>
      </button>

      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-surface/95 backdrop-blur-xl border-b border-outline-variant/15 py-4 px-6 flex flex-col gap-4">
          {navItems.map((item) => (
            <button 
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`font-['Space_Grotesk'] uppercase tracking-widest text-sm py-2 text-left border-b border-outline-variant/20 ${
                activeSection === item.id ? 'text-primary' : 'text-on-surface-variant'
              }`}
            >
              {item.label}
            </button>
          ))}
          <div className="flex flex-col gap-2 mt-2 pt-2 border-t border-outline-variant/20">
            {isAdmin ? (
              <>
                <a
                  href="/admin"
                  className="text-primary font-['Space_Grotesk'] text-sm tracking-widest px-3 py-2 border border-primary/30 hover:bg-primary/10 transition-all text-center"
                >
                  [ADMIN_PANEL]
                </a>
                <button
                  onClick={handleLogout}
                  className="text-primary font-['Space_Grotesk'] text-sm tracking-widest px-3 py-2 border border-primary/30 hover:bg-primary/10 transition-all"
                >
                  [LOGOUT]
                </button>
              </>
            ) : (
              <button
                onClick={() => router.push('/admin/login')}
                className="text-primary font-['Space_Grotesk'] text-sm tracking-widest px-3 py-2 border border-primary/30 hover:bg-primary/10 transition-all"
              >
                [ADMIN_LOGIN]
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}