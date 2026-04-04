'use client';

import { motion } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { config } from '@/data/config';
import Image from 'next/image';

interface Line {
  type: 'input' | 'output';
  text: string;
}

export default function Hero() {
  const [showContent, setShowContent] = useState(false);
  const [showOutput, setShowOutput] = useState(false);
  const [configData, setConfigData] = useState({ resume: config.resume, resumeLastUpdated: config.resumeLastUpdated, profilePicture: '/profile.png' });
  
  // Terminal state
  const [lines, setLines] = useState<Line[]>([]);
  const [currentInput, setCurrentInput] = useState('');
  const [typingOutput, setTypingOutput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [projects, setProjects] = useState<Array<any>>([]);
  const [skills, setSkills] = useState<Record<string, any>>({});

  useEffect(() => {
    fetch('/api/config')
      .then(res => res.json())
      .then(setConfigData);
  }, []);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
    fetch('/api/projects').then(res => res.json()).then(setProjects);
    fetch('/api/skills').then(res => res.json()).then(setSkills);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setShowContent(true), 300);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (showContent) {
      setTimeout(() => setShowOutput(true), 400);
    }
  }, [showContent]);

  const addOutput = (text: string) => {
    setIsTyping(true);
    let index = 0;
    const interval = setInterval(() => {
      setTypingOutput(text.slice(0, index + 1));
      index++;
      if (index === text.length) {
        clearInterval(interval);
        setIsTyping(false);
        setLines(prev => [...prev, { type: 'output', text }]);
        setTypingOutput('');
      }
    }, 30);
  };

  const handleCommand = (command: string) => {
    setLines(prev => [...prev, { type: 'input', text: `root@portfolio:~$ ${command}` }]);
    const cmd = command.trim().toLowerCase();
    switch (cmd) {
      case 'help':
        addOutput('AVAILABLE COMMANDS:\n> about — Display bio information\n> skills — List technical proficiency\n> projects — View featured work\n> contact — System communication channels\n> clear — Reset terminal state');
        break;
      case 'about':
        addOutput(`${config.name} - ${config.role}\n${config.bio}`);
        break;
      case 'skills':
        const skillText = Object.entries(skills)
          .map(([cat, list]: [string, any]) => `${cat.toUpperCase()}: ${list.map((s: any) => s.name).join(', ')}`)
          .join('\n');
        addOutput(skillText || 'No skills available');
        break;
      case 'projects':
        const projectText = projects
          .map(p => `• ${p.title}: ${p.techStack.join(', ')}`)
          .join('\n');
        addOutput(projectText || 'No projects available');
        break;
      case 'contact':
        addOutput(`Email: ${config.socialLinks.email}\nGitHub: ${config.socialLinks.github}\nLinkedIn: ${config.socialLinks.linkedin}`);
        break;
      case 'clear':
        setLines([]);
        break;
      default:
        addOutput(`Command not found: ${cmd}. Type "help" for available commands.`);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      if (currentInput.trim()) {
        handleCommand(currentInput);
        setCurrentInput('');
      }
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-b from-surface-container-lowest/40 to-surface-container-lowest/40 relative overflow-hidden px-6" id="hero">
      <div className="scanline top-0"></div>
      <div className="max-w-7xl w-full">
        {!showContent ? (
          <div></div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            {/* Left side - Profile picture + info */}
            <div className="flex flex-col items-center lg:items-start">
              {/* Profile picture */}
              {showContent && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="w-full md:w-80"
                >
                  <div className="relative mx-auto md:mx-0">
                    {/* Glow background */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-secondary/30 blur-2xl rounded-2xl"></div>
                    
                    {/* Profile picture container */}
                    <div className="relative bg-surface-container border-2 border-primary/30 rounded-2xl overflow-hidden p-1">
                      <Image
                        src={configData.profilePicture}
                        alt={config.name}
                        width={320}
                        height={320}
                        className="w-full h-auto rounded-xl object-cover aspect-square"
                        priority
                      />
                    </div>
                    
                    {/* Decorative elements */}
                    <div className="absolute top-4 right-4 w-3 h-3 rounded-full bg-primary animate-pulse"></div>
                    <div className="absolute bottom-4 left-4 w-2 h-2 rounded-full bg-secondary animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                  </div>
                </motion.div>
              )}

              {/* Name and info below picture */}
              {showContent && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="mt-8 text-center lg:text-left w-full"
                >
                  <h2 className="text-3xl font-headline font-bold text-primary mb-2">
                    {config.name}
                  </h2>
                  <p className="text-lg font-mono-tactical text-on-surface-variant mb-4 tracking-wide uppercase">
                    {config.role}
                  </p>
                  <p className="text-sm text-on-surface-variant leading-relaxed max-w-xs">
                    {config.bio}
                  </p>
                  
                  {/* Buttons below info */}
                  {showOutput && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1, duration: 0.5 }}
                      className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
                    >
                      <button 
                        onClick={() => document.getElementById('proof-of-work')?.scrollIntoView({ behavior: 'smooth' })}
                        className="px-6 py-2 bg-primary text-on-primary font-mono-tactical font-bold uppercase tracking-tighter text-sm hover:scale-[1.05] transition-all hover:shadow-[0_0_20px_rgba(160,255,196,0.3)]"
                      >
                        [ View Work ]
                      </button>
                      <a
                        href={configData.resume}
                        download
                        className="px-6 py-2 border border-outline-variant text-secondary font-mono-tactical font-bold uppercase tracking-tighter text-sm hover:bg-surface-bright transition-all"
                      >
                        [ Resume ]
                      </a>
                    </motion.div>
                  )}
                </motion.div>
              )}
            </div>

            {/* Right side - Terminal */}
            {showContent && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="lg:col-span-1"
              >
                {/* Terminal Header */}
                <div className="bg-surface-container-high rounded-t-lg overflow-hidden flex items-center px-3 py-2 gap-2 border border-outline-variant/20">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 rounded-full bg-error/40"></div>
                    <div className="w-2 h-2 rounded-full bg-secondary-fixed/40"></div>
                    <div className="w-2 h-2 rounded-full bg-primary/40"></div>
                  </div>
                  <div className="mx-auto text-[8px] font-mono-tactical text-on-surface-variant tracking-widest uppercase">
                    system_terminal
                  </div>
                </div>

                {/* Terminal Body */}
                <div className="bg-black/80 backdrop-blur-md p-4 h-96 lg:h-[500px] border-x border-b border-outline-variant/20 font-mono-tactical text-xs space-y-2 overflow-y-auto">
                  <p className="text-on-surface-variant">Type <span className="text-primary">'help'</span> to see commands</p>
                  
                  {lines.map((line, index) => (
                    <div key={index} className={line.type === 'input' ? 'flex gap-2' : 'pl-4 text-secondary-dim text-[10px]'}>
                      {line.type === 'input' ? (
                        <>
                          <span className="text-primary flex-shrink-0">$</span>
                          <span className="text-on-surface break-all">{line.text.replace('root@portfolio:~$ ', '')}</span>
                        </>
                      ) : (
                        <span className="text-secondary-dim break-all whitespace-pre-wrap">{line.text}</span>
                      )}
                    </div>
                  ))}

                  {isTyping && (
                    <div className="flex gap-2">
                      <span className="text-primary flex-shrink-0">$</span>
                      <span className="text-on-surface">
                        {typingOutput}
                        <span className="animate-pulse">|</span>
                      </span>
                    </div>
                  )}

                  {!isTyping && (
                    <div className="flex gap-2">
                      <span className="text-primary flex-shrink-0">$</span>
                      <input
                        ref={inputRef}
                        type="text"
                        value={currentInput}
                        onChange={(e) => setCurrentInput(e.target.value)}
                        onKeyPress={handleKeyPress}
                        className="bg-transparent outline-none flex-1 text-primary text-xs"
                        disabled={isTyping}
                        autoFocus
                      />
                      <span className="w-1.5 h-3 bg-primary animate-pulse flex-shrink-0"></span>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}