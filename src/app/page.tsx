import dynamic from 'next/dynamic';
import HomeShell from '@/components/ui/HomeShell';
import SectionSkeleton from '@/components/ui/SectionSkeleton';
import {
  AdminControls,
  AnimatedBackground,
} from '@/components/ui/ClientOnlyIslands';
import Navbar from '@/components/sections/Navbar';
import Hero from '@/components/sections/Hero';
import ProofOfWork from '@/components/sections/ProofOfWork';
import SecurityLab from '@/components/sections/SecurityLab';
import CTFWriteups from '@/components/sections/CTFWriteups';
import Skills from '@/components/sections/Skills';
import Timeline from '@/components/sections/Timeline';
import CurrentFocus from '@/components/sections/CurrentFocus';
import SecurityMindset from '@/components/sections/SecurityMindset';
import Footer from '@/components/sections/Footer';
import Education from '@/components/sections/Education';

const GitHubStats = dynamic(() => import('@/components/sections/GitHubStats'), {
  loading: () => <SectionSkeleton label="Loading GitHub stats" />,
});

const Projects = dynamic(() => import('@/components/sections/Projects'), {
  loading: () => <SectionSkeleton label="Loading projects" />,
});

const Contact = dynamic(() => import('@/components/sections/Contact'), {
  loading: () => <SectionSkeleton label="Loading contact" />,
});

/**
 * Home page is a Server Component composed of section islands.
 * `ssr: false` dynamics live in ClientOnlyIslands (required by Next 16+).
 * Toggle boot intro via `ENABLE_BOOT_LOADER` in `HomeShell.tsx`.
 */
export default function Home() {
  return (
    <HomeShell>
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
        <Education />
        <CurrentFocus />
        <SecurityMindset />
        <Contact />
        <Footer />
        <AdminControls />
      </div>
    </HomeShell>
  );
}
