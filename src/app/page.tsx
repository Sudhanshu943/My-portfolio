'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import BootLoader from '@/components/ui/BootLoader';
import Hero from '@/components/sections/Hero';
import ProofOfWork from '@/components/sections/ProofOfWork';
import SecurityLab from '@/components/sections/SecurityLab';
import CTFWriteups from '@/components/sections/CTFWriteups';
import GitHubStats from '@/components/sections/GitHubStats';
import Projects from '@/components/sections/Projects';
import Skills from '@/components/sections/Skills';
import Timeline from '@/components/sections/Timeline';
import CurrentFocus from '@/components/sections/CurrentFocus';
import SecurityMindset from '@/components/sections/SecurityMindset';
import { config } from '@/data/config';
import Providers from '@/components/Providers';

export default function Home() {
  const [profilePicture, setProfilePicture] = useState('/profile.png');

  useEffect(() => {
    fetch('/api/config')
      .then(res => res.json())
      .then(data => setProfilePicture(data.profilePicture));
  }, []);
  const [booted, setBooted] = useState(false);

  return (
    <Providers>
      {!booted ? (
        <BootLoader onComplete={() => setBooted(true)} />
      ) : (
        <div className="bg-background text-white pt-16">
          <nav className="fixed top-0 w-full bg-black/80 backdrop-blur-sm border-b border-primary/20 z-40">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <Image
                  src={profilePicture}
                  alt="Profile"
                  width={32}
                  height={32}
                  className="rounded-full border border-primary/50"
                />
                <span className="font-mono text-primary">sudhanshu</span>
              </div>
              <div className="flex gap-6">
                <button
                  onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                  className="text-gray-300 hover:text-primary transition duration-300 font-mono"
                >
                  projects
                </button>
                <button
                  onClick={() => document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth' })}
                  className="text-gray-300 hover:text-primary transition duration-300 font-mono"
                >
                  skills
                </button>
                <button
                  onClick={() => document.getElementById('timeline')?.scrollIntoView({ behavior: 'smooth' })}
                  className="text-gray-300 hover:text-primary transition duration-300 font-mono"
                >
                  timeline
                </button>
              </div>
            </div>
          </nav>
          <Hero />
          <ProofOfWork />
          <SecurityLab />
          <CTFWriteups />
          <GitHubStats />
          <Projects />
          <Skills />
          <Timeline />
          <CurrentFocus />
          <SecurityMindset />
          <footer className="py-12 px-4 border-t border-primary/20">
            <div className="container mx-auto flex justify-center gap-8">
              <a href={config.socialLinks.github} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary transition duration-300">
                GitHub
              </a>
              <a href={config.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary transition duration-300">
                LinkedIn
              </a>
              <a href={`mailto:${config.socialLinks.email}`} className="text-gray-400 hover:text-primary transition duration-300">
                Email
              </a>
            </div>
          </footer>
        </div>
      )}
    </Providers>
  );
}