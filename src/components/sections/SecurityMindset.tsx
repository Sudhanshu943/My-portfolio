'use client';

import { motion } from 'framer-motion';
import { config } from '@/data/config';
import { Brain } from 'lucide-react';

export default function SecurityMindset() {
  return (
    <section id="security-mindset" className="py-20 px-4">
      <div className="container mx-auto">
        <h2 className="text-3xl font-mono text-primary mb-8 text-center flex items-center justify-center gap-2">
          <Brain size={32} />
          SECURITY MINDSET
        </h2>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="bg-gray-900 border border-primary/20 rounded p-6 max-w-2xl mx-auto text-center"
        >
          <p className="text-gray-300 text-lg">{config.securityMindset}</p>
        </motion.div>
      </div>
    </section>
  );
}