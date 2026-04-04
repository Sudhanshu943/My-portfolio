'use client';

import { motion } from 'framer-motion';
import { config } from '@/data/config';
import { Target } from 'lucide-react';

export default function CurrentFocus() {
  return (
    <section id="current-focus" className="py-20 px-4">
      <div className="container mx-auto">
        <h2 className="text-3xl font-mono text-primary mb-8 text-center flex items-center justify-center gap-2">
          <Target size={32} />
          CURRENT FOCUS
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="bg-gray-900 border border-primary/20 rounded p-6"
          >
            <h3 className="text-xl font-mono text-secondary mb-4">Currently Learning</h3>
            <ul className="space-y-2">
              {config.currentFocus.learning.map((item, index) => (
                <li key={index} className="text-gray-300">• {item}</li>
              ))}
            </ul>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-gray-900 border border-primary/20 rounded p-6"
          >
            <h3 className="text-xl font-mono text-secondary mb-4">Next Up</h3>
            <ul className="space-y-2">
              {config.currentFocus.next.map((item, index) => (
                <li key={index} className="text-gray-300">• {item}</li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}