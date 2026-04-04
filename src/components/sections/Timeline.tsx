'use client';

import { motion } from 'framer-motion';
import { timeline } from '@/data/timeline';

export default function Timeline() {
  return (
    <section id="timeline" className="py-20 px-4">
      <div className="container mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-3xl font-mono text-primary mb-12 text-center"
        >
          TIMELINE
        </motion.h2>
        <div className="max-w-2xl mx-auto">
          {timeline.map((event, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="flex items-start mb-8"
            >
              <div className="flex-shrink-0 w-3 h-3 bg-primary rounded-full mt-2 mr-6"></div>
              <div>
                <div className="font-mono text-secondary text-sm mb-1">[{event.year}]</div>
                <div className="text-gray-300">{event.event}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}