'use client';

import { motion } from 'framer-motion';
import { config } from '@/data/config';

export default function CurrentFocusSection() {
  return (
    <section className="py-[120px] bg-surface-container/85 px-6 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <p className="font-mono-tactical text-xs tracking-[0.3em] text-secondary mb-2">[ SYSTEM_STATUS: CURRENT_FOCUS ]</p>
          <h2 className="text-4xl font-headline font-bold uppercase tracking-tight">Learning Roadmap</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="bg-surface-container p-8 space-y-6 border-l-4 border-primary"
          >
            <h3 className="font-mono-tactical text-xl font-bold text-primary uppercase">Current Modules</h3>
            <ul className="space-y-4">
              {config.currentFocus.learning.map((item, index) => (
                <li key={index} className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-primary"></span>
                  <span className="text-on-surface">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-surface-container p-8 space-y-6 border-l-4 border-secondary"
          >
            <h3 className="font-mono-tactical text-xl font-bold text-secondary uppercase">Next Sequence</h3>
            <ul className="space-y-4">
              {config.currentFocus.next.map((item, index) => (
                <li key={index} className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-secondary"></span>
                  <span className="text-on-surface">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}