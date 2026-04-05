import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import fs from 'fs';
import path from 'path';

const configPath = path.join(process.cwd(), 'src/data/admin-config.json');

async function verifyAdmin(): Promise<boolean> {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) return false;
  return session.user.email.toLowerCase() === process.env.ADMIN_EMAIL?.toLowerCase();
}

function readConfig() {
  if (!fs.existsSync(configPath)) {
    return { repoConfig: {}, customProjects: [], profile: { name: "", bio: "", skills: [], socialLinks: {} } };
  }
  return JSON.parse(fs.readFileSync(configPath, 'utf8'));
}

function writeConfig(data: any) {
  fs.writeFileSync(configPath, JSON.stringify(data, null, 2));
}

export async function POST(request: NextRequest) {
  const isAdmin = await verifyAdmin();
  if (!isAdmin) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  try {
    const { action, repoName, config, index } = await request.json();
    const data = readConfig();

    switch (action) {
      case 'updateRepoConfig': {
        if (!repoName) {
          return NextResponse.json({ error: 'repoName required' }, { status: 400 });
        }
        data.repoConfig = data.repoConfig || {};
        data.repoConfig[repoName] = { ...data.repoConfig[repoName], ...config };
        writeConfig(data);
        return NextResponse.json({ success: true });
      }

      case 'addCustomProject': {
        data.customProjects = data.customProjects || [];
        data.customProjects.push(config);
        writeConfig(data);
        return NextResponse.json({ success: true });
      }

      case 'deleteCustomProject': {
        if (typeof index !== 'number') {
          return NextResponse.json({ error: 'index required' }, { status: 400 });
        }
        data.customProjects = data.customProjects || [];
        data.customProjects.splice(index, 1);
        writeConfig(data);
        return NextResponse.json({ success: true });
      }

      case 'updateCustomProject': {
        if (typeof index !== 'number') {
          return NextResponse.json({ error: 'index required' }, { status: 400 });
        }
        data.customProjects = data.customProjects || [];
        data.customProjects[index] = { ...data.customProjects[index], ...config };
        writeConfig(data);
        return NextResponse.json({ success: true });
      }

      case 'updateProfile': {
        data.profile = { ...data.profile, ...config };
        writeConfig(data);
        return NextResponse.json({ success: true });
      }

      default:
        return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
    }
  } catch (error) {
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}