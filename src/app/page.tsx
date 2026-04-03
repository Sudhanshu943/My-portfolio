'use client';

import { useState } from 'react';
import BootLoader from '../components/ui/BootLoader';
// import Hero from '../components/sections/Hero';
// import Projects from '../components/sections/Projects';
// import Skills from '../components/sections/Skills';
// import Timeline from '../components/sections/Timeline';
// import { config } from '../data/config';
// import { GitBranch, User, Mail } from 'lucide-react';

export default function Home() {
  const [booted, setBooted] = useState(true);

  if (!booted) {
    return <BootLoader onComplete={() => setBooted(true)} />;
  }

  return <h1 className="text-white bg-black">Hello World</h1>;
}
