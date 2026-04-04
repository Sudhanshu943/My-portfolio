'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import Image from 'next/image';

interface Project {
  title: string;
  problem: string;
  approach: string;
  techStack: string[];
  outcome: string;
  github: string;
  demo: string | null;
  image?: string;
}

export default function ProjectsSection() {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    fetch('/api/projects')
      .then(res => res.json())
      .then(setProjects);
  }, []);

  return (
    <section className="py-[120px] bg-surface/40 px-6 backdrop-blur-sm" id="projects">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-16">
          <div>
            <p className="font-mono-tactical text-xs tracking-[0.3em] text-secondary mb-2">[ DIRECTORY: /PROJECTS ]</p>
            <h2 className="text-4xl font-headline font-bold uppercase tracking-tight">Technical Portfolio</h2>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-[24px]">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="group bg-surface-container-high p-1 hover:bg-gradient-to-br from-primary/30 to-transparent transition-all duration-300"
            >
              <div className="bg-surface-container p-6 h-full flex flex-col transition-transform group-hover:scale-[1.01]">
                {project.image && (
                  <div className="relative w-full h-40 mb-4 rounded border border-outline-variant/20 overflow-hidden bg-surface-bright">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                )}
                <div className="mb-4">
                  <span className="text-[10px] font-mono-tactical bg-primary/10 text-primary px-2 py-1">
                    {project.techStack[0] || 'PROJECT'}
                  </span>
                </div>
                <h3 className="text-lg font-headline font-bold mb-2">{project.title}</h3>
                <p className="text-sm text-on-surface-variant mb-6 line-clamp-2">{project.outcome}</p>
                <div className="mt-auto space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {project.techStack.slice(0, 3).map((tech, i) => (
                      <span key={i} className="text-[10px] font-mono-tactical text-secondary-dim">
                        #{tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-4">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-mono-tactical text-primary flex items-center gap-1 hover:underline"
                    >
                      <span className="material-symbols-outlined text-sm">code</span>
                      GITHUB
                    </a>
                    {project.demo && (
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-mono-tactical text-secondary flex items-center gap-1 hover:underline"
                      >
                        <span className="material-symbols-outlined text-sm">visibility</span>
                        DEMO
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}