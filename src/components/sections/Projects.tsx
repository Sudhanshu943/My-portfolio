'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import Image from 'next/image';

interface Project {
  id: number | string;
  name: string;
  type: 'github' | 'custom';
  title: string;
  description: string | null;
  htmlUrl: string;
  stargazersCount: number;
  language: string;
  topics: string[];
  homepage: string;
  customImage: string | null;
  customTags: string[];
  featured: boolean;
  github?: string;
  demo?: string;
}

export default function ProjectsSection() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/portfolio/projects')
      .then(res => res.json())
      .then(data => {
        setProjects(data.projects || []);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
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
        
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-[24px]">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-surface-container-high p-6 animate-pulse">
                <div className="h-4 w-24 bg-surface-container-low mb-4"></div>
                <div className="h-6 w-full bg-surface-container-low mb-2"></div>
                <div className="h-16 w-full bg-surface-container-low"></div>
              </div>
            ))}
          </div>
        ) : projects.length === 0 ? (
          <p className="text-on-surface-variant">No projects to display.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-[24px]">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className={`group bg-surface-container-high p-1 hover:bg-gradient-to-br from-primary/30 to-transparent transition-all duration-300 ${
                  project.featured ? 'ring-2 ring-secondary' : ''
                }`}
              >
                <div className="bg-surface-container p-6 h-full flex flex-col transition-transform group-hover:scale-[1.01]">
                  {project.customImage && (
                    <div className="relative w-full h-40 mb-4 rounded border border-outline-variant/20 overflow-hidden bg-surface-bright">
                      <Image
                        src={project.customImage}
                        alt={project.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                  )}
                  <div className="mb-4 flex items-center gap-2 flex-wrap">
                    {(project.customTags && project.customTags.length > 0 ? project.customTags : [project.language].filter(Boolean)).slice(0, 3).map((tag, i) => (
                      <span key={i} className="text-[10px] font-mono-tactical bg-primary/10 text-primary px-2 py-1">
                        {tag || project.type.toUpperCase()}
                      </span>
                    ))}
                    {project.featured && (
                      <span className="text-[10px] font-mono-tactical bg-secondary/10 text-secondary px-2 py-1">
                        FEATURED
                      </span>
                    )}
                  </div>
                  <h3 className="text-lg font-headline font-bold mb-2">{project.title}</h3>
                  <p className="text-sm text-on-surface-variant mb-6 line-clamp-2">
                    {project.description || 'No description available.'}
                  </p>
                  <div className="mt-auto space-y-4">
                    <div className="flex flex-wrap gap-2">
                      {project.stargazersCount > 0 && (
                        <span className="text-[10px] font-mono-tactical text-on-surface-variant">
                          {project.stargazersCount} ⭐
                        </span>
                      )}
                    </div>
                    <div className="flex gap-4">
                      <a
                        href={project.htmlUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-mono-tactical text-primary flex items-center gap-1 hover:underline"
                      >
                        <span className="material-symbols-outlined text-sm">code</span>
                        {project.type === 'custom' && project.github ? 'SOURCE' : 'GITHUB'}
                      </a>
                      {(project.homepage || project.demo) && (
                        <a
                          href={project.homepage || project.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs font-mono-tactical text-secondary flex items-center gap-1 hover:underline"
                        >
                          <span className="material-symbols-outlined text-sm">visibility</span>
                          {project.type === 'custom' && project.demo ? 'DEMO' : 'LIVE'}
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}