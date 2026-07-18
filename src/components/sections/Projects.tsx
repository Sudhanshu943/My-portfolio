'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import FadeIn from '@/components/ui/FadeIn';

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

const INITIAL_VISIBLE = 9;

export default function ProjectsSection() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const fetchedRef = useRef(false);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;

    const load = () => {
      if (fetchedRef.current) return;
      fetchedRef.current = true;

      fetch('/api/portfolio/projects')
        .then((res) => res.json())
        .then((data) => {
          setProjects(data.projects || []);
          setLoading(false);
        })
        .catch(() => {
          setLoading(false);
        });
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          load();
          observer.disconnect();
        }
      },
      { rootMargin: '240px' }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const visible = showAll ? projects : projects.slice(0, INITIAL_VISIBLE);
  const hasMore = projects.length > INITIAL_VISIBLE;

  return (
    <section
      ref={sectionRef}
      className="py-20 md:py-[120px] bg-surface/40 px-6 backdrop-blur-sm"
      id="projects"
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-12 md:mb-16">
          <div>
            <p className="font-mono-tactical text-xs tracking-[0.3em] text-secondary mb-2">
              [ DIRECTORY: /PROJECTS ]
            </p>
            <h2 className="text-4xl font-headline font-bold uppercase tracking-tight">
              Technical Portfolio
            </h2>
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
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-[24px]">
              {visible.map((project, index) => (
                <FadeIn
                  key={project.id}
                  delay={Math.min(index, 5) * 0.05}
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
                          sizes="(max-width: 768px) 100vw, 33vw"
                          className="object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                    )}
                    <div className="mb-4 flex items-center gap-2 flex-wrap">
                      {(project.customTags?.length
                        ? project.customTags
                        : [project.language].filter(Boolean)
                      )
                        .slice(0, 3)
                        .map((tag, i) => (
                          <span
                            key={i}
                            className="text-[10px] font-mono-tactical bg-primary/10 text-primary px-2 py-1"
                          >
                            {tag || project.type.toUpperCase()}
                          </span>
                        ))}
                      {project.featured && (
                        <span className="text-[10px] font-mono-tactical bg-secondary/10 text-secondary px-2 py-1">
                          FEATURED
                        </span>
                      )}
                    </div>
                    <h3 className="text-lg font-headline font-bold mb-2">
                      {project.title}
                    </h3>
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
                          <span className="material-symbols-outlined text-sm">
                            code
                          </span>
                          {project.type === 'custom' && project.github
                            ? 'SOURCE'
                            : 'GITHUB'}
                        </a>
                        {(project.homepage || project.demo) && (
                          <a
                            href={project.homepage || project.demo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs font-mono-tactical text-secondary flex items-center gap-1 hover:underline"
                          >
                            <span className="material-symbols-outlined text-sm">
                              visibility
                            </span>
                            {project.type === 'custom' && project.demo
                              ? 'DEMO'
                              : 'LIVE'}
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>

            {hasMore && !showAll && (
              <div className="mt-10 text-center">
                <button
                  type="button"
                  onClick={() => setShowAll(true)}
                  className="font-mono-tactical text-xs tracking-widest uppercase border border-primary/40 text-primary px-6 py-3 hover:bg-primary/10 transition-colors"
                >
                  Show all {projects.length} projects
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
