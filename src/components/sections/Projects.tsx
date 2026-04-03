'use client';

import { motion } from 'framer-motion';
import { projects } from '@/data/projects';
import { ExternalLink, GitBranch } from 'lucide-react';

export default function Projects() {
  return (
    <section id="projects" className="py-16 px-4">
      <div className="container mx-auto">
        <h2 className="text-3xl font-mono text-primary mb-8 text-center">PROJECTS</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(0, 255, 159, 0.3)' }}
              className="bg-gray-900 border border-primary/20 rounded p-6"
            >
              <h3 className="text-xl font-mono text-secondary mb-2">{project.title}</h3>
              <p className="text-gray-300 mb-4">{project.description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.techStack.map((tech, i) => (
                  <span key={i} className="text-xs bg-primary/20 text-primary px-2 py-1 rounded">
                    {tech}
                  </span>
                ))}
              </div>
              <div className="flex gap-4">
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-primary hover:text-secondary transition"
                >
                  <GitBranch size={16} />
                  GitHub
                </a>
                {project.demo && (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-primary hover:text-secondary transition"
                  >
                    <ExternalLink size={16} />
                    Demo
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