import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const GITHUB_USERNAME = 'Sudhanshu943';

const configPath = path.join(process.cwd(), 'src/data/admin-config.json');

function readConfig() {
  try {
    if (!fs.existsSync(configPath)) {
      return { repoConfig: {}, customProjects: [], profile: { name: "", bio: "", skills: [], socialLinks: {} } };
    }
    return JSON.parse(fs.readFileSync(configPath, 'utf8'));
  } catch {
    return { repoConfig: {}, customProjects: [], profile: { name: "", bio: "", skills: [], socialLinks: {} } };
  }
}

export const revalidate = 300;

export async function GET() {
  try {
    const config = readConfig();
    const repoConfig = config.repoConfig || {};
    const customProjects = config.customProjects || [];

    const response = await fetch(
      `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100`,
      {
        headers: {
          'Accept': 'application/vnd.github.v3+json',
          'User-Agent': 'Portfolio-App',
        }
      }
    );

    if (!response.ok) {
      return NextResponse.json(
        { error: 'Failed to fetch GitHub repos' },
        { status: response.status }
      );
    }

    const repos = await response.json();

    let mergedRepos = repos
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

    const formattedCustomProjects = customProjects.map((project: any, index: number) => ({
      id: `custom-${index}`,
      name: project.title?.toLowerCase().replace(/\s+/g, '-') || `custom-${index}`,
      type: 'custom',
      title: project.title,
      description: project.description,
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
      featured: project.featured || false,
      order: project.order ?? 999,
      customImage: project.image || null,
      customTags: project.techStack || [],
      github: project.github || null,
      demo: project.demo || null,
    }));

    formattedCustomProjects.sort((a: any, b: any) => {
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      return a.order - b.order;
    });

    const allProjects = [...mergedRepos, ...formattedCustomProjects];

    return NextResponse.json({
      projects: allProjects,
      profile: config.profile,
      lastUpdated: new Date().toISOString(),
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}