import siteConfig from './config.json';

export type SiteConfig = {
  name: string;
  role: string;
  bio: string;
  socialLinks: {
    github: string;
    linkedin: string;
    email: string;
  };
  resume: string;
  resumeLastUpdated: string;
  profilePicture: string;
  currentFocus: {
    learning: string[];
    next: string[];
  };
  securityMindset: string;
};

/** Canonical site config — source of truth is `config.json` (admin-editable). */
export const config: SiteConfig = siteConfig;
