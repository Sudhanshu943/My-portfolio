import { NextRequest, NextResponse } from 'next/server';
import { isAdminAuthenticated } from '@/lib/admin-session';
import {
  persistErrorResponse,
  readJsonFile,
  writeJsonFile,
} from '@/lib/data-store';

const FILE = 'admin-config.json';

type AdminConfig = {
  repoConfig?: Record<string, unknown>;
  profile?: Record<string, unknown>;
};

function readConfig(): AdminConfig {
  try {
    return readJsonFile<AdminConfig>(FILE);
  } catch {
    return {
      repoConfig: {},
      profile: { name: '', bio: '', skills: [], socialLinks: {} },
    };
  }
}

function writeConfig(data: AdminConfig) {
  writeJsonFile(data, FILE);
}

export async function POST(request: NextRequest) {
  const isAdmin = await isAdminAuthenticated();
  if (!isAdmin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { action, repoName, config } = await request.json();
    const data = readConfig();

    switch (action) {
      case 'updateRepoConfig': {
        if (!repoName) {
          return NextResponse.json({ error: 'repoName required' }, { status: 400 });
        }
        data.repoConfig = data.repoConfig || {};
        data.repoConfig[repoName] = {
          ...(data.repoConfig[repoName] as object),
          ...config,
        };
        writeConfig(data);
        return NextResponse.json({ success: true });
      }

      case 'updateProfile': {
        data.profile = { ...data.profile, ...config };
        writeConfig(data);
        return NextResponse.json({ success: true });
      }

      default:
        return NextResponse.json(
          {
            error:
              'Invalid action. Custom projects use /api/projects (projects.json).',
          },
          { status: 400 }
        );
    }
  } catch (error) {
    const { body, status } = persistErrorResponse(error);
    if (status === 503) return NextResponse.json(body, { status });
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}
