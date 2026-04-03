'use client';

import { useState } from 'react';
import BootLoader from '@/components/ui/BootLoader';
import Hero from '@/components/sections/Hero';
import Projects from '@/components/sections/Projects';
import Skills from '@/components/sections/Skills';
import Timeline from '@/components/sections/Timeline';
import { config } from '@/data/config';
import { GitBranch, User, Mail } from 'lucide-react';

export default function Home() {
  const [booted, setBooted] = useState(false);

  if (!booted) {
    return <BootLoader onComplete={() => setBooted(true)} />;
  }

  return (
    <div className="bg-background text-white">
      <Hero />
      <Projects />
      <Skills />
      <Timeline />
      <footer className="py-8 px-4 border-t border-primary/20">
        <div className="container mx-auto flex justify-center gap-6">
          <a href={config.socialLinks.github} target="_blank" rel="noopener noreferrer" className="text-primary hover:text-secondary transition">
            <GitBranch size={24} />
          </a>
          <a href={config.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="text-primary hover:text-secondary transition">
            <User size={24} />
          </a>
          <a href={`mailto:${config.socialLinks.email}`} className="text-primary hover:text-secondary transition">
            <Mail size={24} />
          </a>
        </div>
      </footer>
    </div>
  );
}
