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
    { time: '0.002s', text: 'Initializing system...' },
    { time: '0.458s', text: 'Loading modules: [SEC_NET, CRYPTO_CORE, UI_KERNEL]' },
    { time: '1.022s', text: 'Access granted. Welcome, user.' },
  ], []);

  useEffect(() => {
    if (phase < messages.length) {
      const message = messages[phase];
      let index = 0;
      const interval = setInterval(() => {
        setCurrentText(message.text.slice(0, index + 1));
        index++;
        if (index === message.text.length) {
          clearInterval(interval);
          setTimeout(() => {
            setPhase(phase + 1);
          }, 800);
        }
      }, 40);
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
          className="fixed inset-0 bg-surface-container-lowest flex items-center justify-center z-50"
        >
          <div className="max-w-2xl w-full px-6">
            <div className="text-lg font-bold text-[#a0ffc4] tracking-tighter font-mono-tactical mb-12 uppercase">
              [TERMINAL_OS_v1.0]
            </div>
            <div className="space-y-2 text-primary-dim opacity-80 font-mono-tactical">
              {messages.slice(0, phase).map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 0.8, y: 0 }}
                  className="flex items-center gap-3"
                >
                  <span className="text-on-surface-variant">{msg.time}</span>
                  {i === 1 ? (
                    <span>{msg.text.replace('Loading modules: ', '')}</span>
                  ) : (
                    <span>{msg.text}</span>
                  )}
                </motion.div>
              ))}
              {phase < messages.length && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-center gap-3"
                >
                  <span className="text-on-surface-variant">{messages[phase].time}</span>
                  <span>{currentText}</span>
                  <span className="animate-pulse">|</span>
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}