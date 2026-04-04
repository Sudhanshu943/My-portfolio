'use client';

import { useState, useEffect } from 'react';
import BootLoader from '@/components/ui/BootLoader';
import AnimatedBackground from '@/components/AnimatedBackground';
import Navbar from '@/components/sections/Navbar';
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
import Contact from '@/components/sections/Contact';
import Footer from '@/components/sections/Footer';

export default function Home() {
  const [booted, setBooted] = useState(false);

  return (
    <>
      {!booted ? (
        <BootLoader onComplete={() => setBooted(true)} />
      ) : (
        <>
          <AnimatedBackground />
          <div className="relative z-10 min-h-screen text-on-surface">
            <Navbar />
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
          <Contact />
          <Footer />
          </div>
        </>
      )}
    </>
  );
}