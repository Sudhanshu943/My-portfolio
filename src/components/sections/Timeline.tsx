'use client';

import { motion } from 'framer-motion';
import { timeline } from '@/data/timeline';

export default function Timeline() {
  return (
    <section id="timeline" className="py-16 px-4">
      <div className="container mx-auto">
        <h2 className="text-3xl font-mono text-primary mb-8 text-center">TIMELINE LOG</h2>
        <div className="max-w-2xl mx-auto">
          {timeline.map((event, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.2 }}
              className="flex items-center mb-6"
            >
              <div className="flex-shrink-0 w-4 h-4 bg-primary rounded-full mr-4"></div>
              <div className="font-mono text-secondary">[{event.year}]</div>
              <div className="ml-4 text-gray-300">{event.event}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}