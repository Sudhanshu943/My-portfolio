'use client';

import { motion } from 'framer-motion';
import { ctfWriteups } from '@/data/ctfWriteups';
import { FileText } from 'lucide-react';

export default function CTFWriteups() {
  return (
    <section id="ctf-writeups" className="py-20 px-4">
      <div className="container mx-auto">
        <h2 className="text-3xl font-mono text-primary mb-8 text-center flex items-center justify-center gap-2">
          <FileText size={32} />
          CTF WRITEUPS
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ctfWriteups.map((writeup, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(0, 255, 159, 0.3)' }}
              className="bg-gray-900 border border-primary/20 rounded p-6"
            >
              <h3 className="text-xl font-mono text-secondary mb-2">{writeup.title}</h3>
              <p className="text-gray-300 mb-2"><strong>Summary:</strong> {writeup.summary}</p>
              <p className="text-gray-300 mb-2"><strong>Tools:</strong> {writeup.tools.join(', ')}</p>
              <p className="text-gray-300 mb-2"><strong>Steps:</strong> {writeup.steps}</p>
              <p className="text-gray-300"><strong>Result:</strong> {writeup.result}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}