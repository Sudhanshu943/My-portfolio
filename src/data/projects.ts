import projectsData from './projects.json';

export type Project = {
  title: string;
  problem: string;
  approach: string;
  techStack: string[];
  outcome: string;
  github: string | null;
  demo: string | null;
  image: string | null;
};

/** Canonical projects — source of truth is `projects.json` (admin-editable). */
export const projects: Project[] = projectsData;
