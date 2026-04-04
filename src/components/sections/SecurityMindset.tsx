'use client';

import { motion } from 'framer-motion';
import { config } from '@/data/config';

export default function SecurityMindsetSection() {
  return (
    <section className="py-[120px] bg-surface/40 px-6 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto">
        <section className="grid grid-cols-1 md:grid-cols-12 gap-12 items-end">
          <div className="md:col-span-8 space-y-6">
            <p className="font-mono-tactical text-secondary tracking-widest uppercase text-sm">[SESSION_ID: 0x8A2F91]</p>
            <h1 className="font-mono-tactical text-5xl md:text-7xl font-bold leading-none tracking-tighter">
              SECURITY <span className="text-primary">MINDSET</span>
            </h1>
            <p className="text-xl text-on-surface-variant max-w-2xl leading-relaxed">
              {config.securityMindset}
            </p>
            <div className="flex gap-4">
              <button 
                onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-primary text-on-primary font-mono-tactical px-6 py-3 font-bold hover:shadow-[0_0_20px_rgba(160,255,196,0.3)] transition-all"
              >
                INITIATE_PROTOCOL
              </button>
              <button className="border border-outline-variant text-secondary font-mono-tactical px-6 py-3 font-bold hover:bg-surface-bright transition-all">
                _ [READ_MANIFESTO]
              </button>
            </div>
          </div>
          <div className="md:col-span-4 hidden md:block">
            <div className="bg-surface-container p-6 border-l-4 border-primary">
              <p className="font-mono-tactical text-xs text-on-surface-variant mb-2">LAST_BREACH_SIMULATION</p>
              <p className="font-mono-tactical text-primary text-lg">SUCCESSFUL: ROOT_ACCESS</p>
              <div className="mt-4 h-1 bg-surface-container-high w-full">
                <div className="bg-primary h-full w-3/4"></div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </section>
  );
}