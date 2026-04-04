'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';


interface Project {
  title: string;
  problem: string;
  approach: string;
  techStack: string[];
  outcome: string;
  github: string;
  demo: string | null;
}

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    fetch('/api/projects')
      .then(res => res.json())
      .then(setProjects);
  }, []);

  return (
    <section id="projects" className="py-20 px-4">
      <div className="container mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-3xl font-mono text-primary mb-12 text-center"
        >
          PROJECTS
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.03, boxShadow: '0 0 15px rgba(0, 255, 159, 0.2)' }}
              className="bg-gray-900/50 border border-primary/20 rounded-lg p-6 hover:border-primary/40 transition duration-300"
            >
              <h3 className="text-xl font-mono text-secondary mb-3">{project.title}</h3>
              <p className="text-gray-300 mb-3 line-clamp-2">{project.outcome}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.techStack.slice(0, 3).map((tech, i) => (
                  <span key={i} className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                    {tech}
                  </span>
                ))}
              </div>
              <div className="flex gap-4">
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:text-secondary transition duration-300"
                >
                  GitHub →
                </a>
                {project.demo && (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-secondary hover:text-primary transition duration-300"
                  >
                    Demo →
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}