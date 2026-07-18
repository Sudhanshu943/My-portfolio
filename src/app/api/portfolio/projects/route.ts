import { NextResponse } from 'next/server';
import { readJsonFile } from '@/lib/data-store';
import type { Project } from '@/data/projects';

const GITHUB_USERNAME = 'Sudhanshu943';

function readAdminConfig() {
  try {
    return readJsonFile<{
      repoConfig?: Record<string, any>;
      profile?: Record<string, unknown>;
    }>('admin-config.json');
  } catch {
    return {
      repoConfig: {},
      profile: { name: '', bio: '', skills: [], socialLinks: {} },
    };
  }
}

function readCustomProjects(): Project[] {
  try {
    return readJsonFile<Project[]>('projects.json');
  } catch {
    return [];
  }
}

export const revalidate = 300;

export async function GET() {
  try {
    const config = readAdminConfig();
    const repoConfig = config.repoConfig || {};
    const customProjects = readCustomProjects();

    const response = await fetch(
      `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100`,
      {
        headers: {
          Accept: 'application/vnd.github.v3+json',
          'User-Agent': 'Portfolio-App',
        },
        next: { revalidate: 300 },
      }
    );

    if (!response.ok) {
      return NextResponse.json(
        { error: 'Failed to fetch GitHub repos' },
        { status: response.status }
      );
    }

    const repos = await response.json();

    const mergedRepos = repos
      .map((repo: any) => {
        const repoConfigItem = repoConfig[repo.name];
        if (repoConfigItem?.visible === false) {
          return null;
        }

        return {
          id: repo.id,
          name: repo.name,
          type: 'github',
          title: repoConfigItem?.customTitle || repo.name,
          description: repoConfigItem?.customDescription || repo.description,
          htmlUrl: repo.html_url,
          stargazersCount: repo.stargazers_count,
          watchersCount: repo.watchers_count,
          forksCount: repo.forks_count,
          language: repo.language,
          topics: repo.topics || [],
          homepage: repo.homepage,
          pushedAt: repo.pushed_at,
          createdAt: repo.created_at,
          updatedAt: repo.updated_at,
          visible: repoConfigItem?.visible !== false,
          featured: repoConfigItem?.featured || false,
          order: repoConfigItem?.order ?? 999,
          customImage: repoConfigItem?.customImage || null,
          customTags: repoConfigItem?.customTags || [],
        };
      })
      .filter(Boolean);

    mergedRepos.sort((a: any, b: any) => {
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      return a.order - b.order;
    });

    const formattedCustomProjects = customProjects.map((project, index) => ({
      id: `custom-${index}`,
      name:
        project.title?.toLowerCase().replace(/\s+/g, '-') || `custom-${index}`,
      type: 'custom' as const,
      title: project.title,
      description: project.problem || project.approach || null,
      htmlUrl: project.demo || project.github || null,
      stargazersCount: 0,
      watchersCount: 0,
      forksCount: 0,
      language: project.techStack?.[0] || null,
      topics: project.techStack || [],
      homepage: project.demo,
      pushedAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      visible: true,
      featured: false,
      order: 999,
      customImage: project.image || null,
      customTags: project.techStack || [],
      github: project.github || null,
      demo: project.demo || null,
    }));

    const allProjects = [...mergedRepos, ...formattedCustomProjects];

    return NextResponse.json({
      projects: allProjects,
      profile: config.profile,
      lastUpdated: new Date().toISOString(),
    });
  } catch {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
