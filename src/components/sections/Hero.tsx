'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { config } from '../data/config';

export default function Hero() {
  const [currentText, setCurrentText] = useState('');
  const [showOutput, setShowOutput] = useState(false);

  const command = 'root@portfolio:~$ whoami';
  const output = `${config.name} - ${config.role}`;

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setCurrentText(command.slice(0, index + 1));
      index++;
      if (index === command.length) {
        clearInterval(interval);
        setTimeout(() => setShowOutput(true), 500);
      }
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="font-mono text-primary text-xl mb-4">
          {currentText}
          {!showOutput && <span className="animate-pulse">|</span>}
        </div>
        {showOutput && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="font-mono text-secondary text-lg mb-8"
          >
            {output}
          </motion.div>
        )}
        {showOutput && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.5 }}
            className="flex gap-4 justify-center"
          >
            <button className="px-4 py-2 bg-primary text-black font-mono hover:bg-primary/80 transition">
              [ view_projects ]
            </button>
            <a
              href={config.resume}
              download
              className="px-4 py-2 bg-secondary text-black font-mono hover:bg-secondary/80 transition"
            >
              [ download_resume ]
            </a>
          </motion.div>
        )}
      </div>
    </section>
  );
}