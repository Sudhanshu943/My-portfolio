'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useMemo } from 'react';

interface BootLoaderProps {
  onComplete: () => void;
}

export default function BootLoader({ onComplete }: BootLoaderProps) {
  const [currentText, setCurrentText] = useState('');
  const [phase, setPhase] = useState(0);

  const messages = useMemo(() => [
    'Initializing system...',
    'Loading security protocols...',
    'Access granted',
  ], []);

  useEffect(() => {
    if (phase < messages.length) {
      const message = messages[phase];
      let index = 0;
      const interval = setInterval(() => {
        setCurrentText(message.slice(0, index + 1));
        index++;
        if (index === message.length) {
          clearInterval(interval);
          setTimeout(() => {
            setPhase(phase + 1);
          }, 1000);
        }
      }, 50);
      return () => clearInterval(interval);
    } else {
      setTimeout(onComplete, 1000);
    }
  }, [phase, onComplete, messages]);

  return (
    <AnimatePresence>
      {phase < messages.length && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="fixed inset-0 bg-black flex items-center justify-center z-50"
        >
          <div className="text-primary text-2xl font-mono">
            {currentText}
            <span className="animate-pulse">|</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}