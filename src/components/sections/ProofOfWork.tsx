'use client';

import { motion } from 'framer-motion';
import { proofOfWork } from '@/data/proofOfWork';


export default function ProofOfWork() {
  return (
    <section id="proof-of-work" className="py-20 px-4">
      <div className="container mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-3xl font-mono text-primary mb-12 text-center"
        >
          PROOF OF WORK
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {proofOfWork.map((entry, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="bg-gray-900/50 border border-primary/20 rounded-lg p-6"
            >
              <h3 className="text-xl font-mono text-secondary mb-3">{entry.challenge}</h3>
              <p className="text-gray-300 mb-2"><strong>Tools:</strong> {entry.tools.join(', ')}</p>
              <p className="text-gray-300 mb-2"><strong>Approach:</strong> {entry.approach}</p>
              <p className="text-gray-300"><strong>Result:</strong> {entry.result}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}