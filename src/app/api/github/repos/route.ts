import { NextResponse } from 'next/server';

const GITHUB_USERNAME = 'Sudhanshu943';

export const revalidate = 300;

export async function GET() {
  try {
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

    const formattedRepos = repos.map((repo: any) => ({
      id: repo.id,
      name: repo.name,
      fullName: repo.full_name,
      description: repo.description,
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
      size: repo.size,
    }));

    return NextResponse.json(formattedRepos);
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}