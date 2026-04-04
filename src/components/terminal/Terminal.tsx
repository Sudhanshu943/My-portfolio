'use client';

import { useState, useEffect, useRef } from 'react';
import { config } from '@/data/config';
import { timeline } from '@/data/timeline';

interface Line {
  type: 'input' | 'output';
  text: string;
}

interface Project {
  title: string;
  problem: string;
  approach: string;
  techStack: string[];
  outcome: string;
  github: string;
  demo: string | null;
}

interface SkillsData {
  [key: string]: { name: string; level: number }[];
}

export default function TerminalSection() {
  const [lines, setLines] = useState<Line[]>([]);
  const [currentInput, setCurrentInput] = useState('');
  const [typingOutput, setTypingOutput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [skills, setSkills] = useState<SkillsData>({});

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
    fetch('/api/projects').then(res => res.json()).then(setProjects);
    fetch('/api/skills').then(res => res.json()).then(setSkills);
  }, []);

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
          .map(([cat, list]) => `${cat.toUpperCase()}: ${list.map(s => s.name).join(', ')}`)
          .join('\n');
        addOutput(skillText || 'No skills available');
        break;
      case 'projects':
        const projectText = projects
          .map(p => `• ${p.title}: ${p.techStack.join(', ')}`)
          .join('\n');
        addOutput(projectText || 'No projects available');
        break;
      case 'timeline':
        const timelineText = timeline
          .map(t => `[${t.year}] ${t.event}`)
          .join('\n');
        addOutput(timelineText);
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
    <section className="py-[120px] bg-surface-container-lowest px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(160,255,196,0.03),transparent)] pointer-events-none"></div>
      <div className="max-w-4xl mx-auto">
        <div className="glass-panel bg-surface-container-high rounded-t-lg overflow-hidden flex items-center px-4 py-2 gap-2">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-error/40"></div>
            <div className="w-3 h-3 rounded-full bg-secondary-fixed/40"></div>
            <div className="w-3 h-3 rounded-full bg-primary/40"></div>
          </div>
          <div className="mx-auto text-[10px] font-mono-tactical text-on-surface-variant tracking-widest uppercase">
            system_console — sudhanshu@root
          </div>
        </div>
        <div className="bg-black/80 backdrop-blur-md p-6 h-[400px] border-x border-b border-outline-variant/20 font-mono-tactical text-sm space-y-3 overflow-y-auto">
          <p className="text-on-surface-variant">Type <span className="text-primary">'help'</span> to see available commands.</p>
          {lines.map((line, index) => (
            <div key={index} className={line.type === 'input' ? 'flex gap-2' : 'pl-6 text-secondary-dim'}>
              {line.type === 'input' ? (
                <>
                  <span className="text-primary">root@portfolio:~$</span>
                  <span className="text-on-surface">{line.text.replace('root@portfolio:~$ ', '')}</span>
                </>
              ) : (
                <span className="text-secondary-dim">{line.text}</span>
              )}
            </div>
          ))}
          {isTyping && (
            <div className="flex gap-2">
              <span className="text-primary">root@portfolio:~$</span>
              <span className="text-on-surface">
                {typingOutput}
                <span className="animate-pulse">|</span>
              </span>
            </div>
          )}
          {!isTyping && (
            <div className="flex gap-2">
              <span className="text-primary">root@portfolio:~$</span>
              <input
                ref={inputRef}
                type="text"
                value={currentInput}
                onChange={(e) => setCurrentInput(e.target.value)}
                onKeyPress={handleKeyPress}
                className="bg-transparent outline-none flex-1 text-primary"
                disabled={isTyping}
                autoFocus
              />
              <span className="w-2 h-5 bg-primary animate-pulse"></span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}