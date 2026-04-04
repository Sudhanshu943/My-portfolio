'use client';

import Image from 'next/image';

interface NavbarProps {
  profilePicture?: string;
}

export default function Navbar({ profilePicture = '/profile.png' }: NavbarProps) {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-6 py-3 bg-surface/80 backdrop-blur-xl border-b border-outline-variant/15 shadow-[0_0_20px_rgba(160,255,196,0.05)]">
      <div className="text-lg font-bold text-primary tracking-tighter font-['Space_Grotesk'] uppercase">
        [TERMINAL_OS_v1.0]
      </div>
      <div className="hidden md:flex gap-8 font-['Space_Grotesk'] uppercase tracking-widest text-sm">
        <button 
          onClick={() => scrollToSection('hero')}
          className="text-primary border-b-2 border-primary pb-1"
        >
          HOME
        </button>
        <button 
          onClick={() => scrollToSection('proof-of-work')}
          className="text-on-surface-variant hover:text-primary transition-all duration-150"
        >
          EXPERIENCE
        </button>
        <button 
          onClick={() => scrollToSection('projects')}
          className="text-on-surface-variant hover:text-primary transition-all duration-150"
        >
          PROJECTS
        </button>
        <button 
          onClick={() => scrollToSection('skills')}
          className="text-on-surface-variant hover:text-primary transition-all duration-150"
        >
          SKILLS
        </button>
      </div>
      <div className="flex items-center gap-4 text-primary">
        <span className="material-symbols-outlined text-xl cursor-pointer hover:bg-surface-bright p-1 scale-95 transition-transform">
          terminal
        </span>
        <span className="material-symbols-outlined text-xl cursor-pointer hover:bg-surface-bright p-1 scale-95 transition-transform">
          settings_input_component
        </span>
        <span className="text-primary font-['Space_Grotesk'] text-sm tracking-widest px-3 py-1 border border-primary/30">
          [SYSTEM_ACTIVE]
        </span>
      </div>
    </nav>
  );
}