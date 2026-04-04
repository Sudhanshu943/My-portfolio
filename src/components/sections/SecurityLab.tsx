'use client';

import { motion } from 'framer-motion';
import { securityLabs } from '@/data/securityLabs';
import { TestTube } from 'lucide-react';

export default function SecurityLab() {
  return (
    <section id="security-lab" className="py-20 px-4">
      <div className="container mx-auto">
        <h2 className="text-3xl font-mono text-primary mb-8 text-center flex items-center justify-center gap-2">
          <TestTube size={32} />
          SECURITY LAB
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {securityLabs.map((lab, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(0, 255, 159, 0.3)' }}
              className="bg-gray-900 border border-primary/20 rounded p-6"
            >
              <h3 className="text-xl font-mono text-secondary mb-2">{lab.name}</h3>
              <p className="text-gray-300 mb-2"><strong>Tool:</strong> {lab.tool}</p>
              <p className="text-gray-300"><strong>Discovery:</strong> {lab.discovery}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}