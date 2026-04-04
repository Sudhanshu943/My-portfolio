'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { config } from '@/data/config';
import { X } from 'lucide-react';
import Image from 'next/image';

export default function Hero() {
  const [currentText, setCurrentText] = useState('');
  const [showOutput, setShowOutput] = useState(false);
  const [showResumeModal, setShowResumeModal] = useState(false);
  const [configData, setConfigData] = useState({ resume: config.resume, resumeLastUpdated: config.resumeLastUpdated, profilePicture: '/profile.png' });

  useEffect(() => {
    fetch('/api/config')
      .then(res => res.json())
      .then(setConfigData);
  }, []);

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
    <section className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center max-w-2xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <Image
            src={configData.profilePicture}
            alt="Profile"
            width={128}
            height={128}
            className="rounded-full mx-auto mb-6 border-2 border-primary/50"
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-8"
        >
          <div className="font-mono text-primary text-xl mb-4">
            {currentText}
            {!showOutput && <span className="animate-pulse">|</span>}
          </div>
          {showOutput && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
              className="font-mono text-secondary text-lg"
            >
              {output}
            </motion.div>
          )}
        </motion.div>
        {showOutput && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.5 }}
            className="flex gap-4 justify-center flex-wrap"
          >
            <button
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-6 py-3 border border-primary text-primary font-mono hover:bg-primary hover:text-black transition duration-300"
            >
              [ view_projects ]
            </button>
            <a
              href={configData.resume}
              download
              className="px-6 py-3 border border-secondary text-secondary font-mono hover:bg-secondary hover:text-black transition duration-300"
            >
              [ download_resume ]
            </a>
          </motion.div>
        )}
      </div>
      {showResumeModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
          onClick={() => setShowResumeModal(false)}
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            className="bg-gray-900 border border-primary/20 rounded-lg p-4 max-w-4xl w-full max-h-[90vh] overflow-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-mono text-primary">Resume Preview</h3>
              <button
                onClick={() => setShowResumeModal(false)}
                className="text-primary hover:text-secondary"
              >
                <X size={24} />
              </button>
            </div>
            <div className="mb-2 text-gray-300 text-sm">
              Last updated: {configData.resumeLastUpdated}
            </div>
            <iframe
              src={configData.resume}
              className="w-full h-[70vh] border border-primary/20 rounded"
              title="Resume Preview"
            />
          </motion.div>
        </motion.div>
      )}
    </section>
  );
}