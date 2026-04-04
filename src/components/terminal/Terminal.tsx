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

export default function Terminal() {
  const [lines, setLines] = useState<Line[]>([
    { type: 'output', text: 'Welcome to the interactive terminal. Type "help" for commands.' },
  ]);
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
        addOutput('Available commands: help, about, skills, projects, timeline, contact, clear');
        break;
      case 'about':
        addOutput(config.bio);
        break;
      case 'skills':
        const skillText = Object.entries(skills)
          .map(([cat, list]) => `${cat.toUpperCase()}: ${list.map(s => s.name).join(', ')}`)
          .join('\n');
        addOutput(skillText);
        break;
      case 'projects':
        const projectText = projects
          .map(p => `${p.title}: ${p.problem} (${p.techStack.join(', ')})`)
          .join('\n');
        addOutput(projectText);
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
    <div className="bg-black text-primary font-mono p-4 rounded border border-primary/20 max-w-4xl mx-auto">
      <div className="mb-4">
        {lines.map((line, index) => (
          <div key={index} className={line.type === 'input' ? 'text-secondary' : 'text-white'}>
            {line.text}
          </div>
        ))}
        {isTyping && (
          <div className="text-white">
            {typingOutput}
            <span className="animate-pulse">|</span>
          </div>
        )}
      </div>
      <div className="flex">
        <span className="text-secondary">root@portfolio:~$ </span>
        <input
          ref={inputRef}
          type="text"
          value={currentInput}
          onChange={(e) => setCurrentInput(e.target.value)}
          onKeyPress={handleKeyPress}
          className="bg-transparent outline-none flex-1 text-primary"
          disabled={isTyping}
        />
        {!isTyping && <span className="animate-pulse">|</span>}
      </div>
    </div>
  );
}