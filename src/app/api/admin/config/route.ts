import { NextRequest, NextResponse } from 'next/server';
import { isAdminAuthenticated } from '@/lib/admin-session';
import {
  DataPersistError,
  ensureJsonFile,
  persistErrorResponse,
  readJsonFile,
  writeJsonFile,
} from '@/lib/data-store';

const FILE = 'admin-config.json';

const DEFAULT_CONFIG = {
  repoConfig: {},
  profile: {
    name: 'Sudhanshu Thapa',
    bio: '',
    skills: [],
    socialLinks: {},
  },
};

function ensureFile() {
  ensureJsonFile(DEFAULT_CONFIG, FILE);
}

export async function GET() {
  const isAdmin = await isAdminAuthenticated();
  if (!isAdmin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    ensureFile();
    return NextResponse.json(readJsonFile(FILE));
  } catch (error) {
    if (error instanceof DataPersistError) {
      const { body, status } = persistErrorResponse(error);
      return NextResponse.json(body, { status });
    }
    return NextResponse.json({ error: 'Failed to read config' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  const isAdmin = await isAdminAuthenticated();
  if (!isAdmin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    ensureFile();
    const existingData = readJsonFile<Record<string, unknown>>(FILE);
    const updates = await request.json();
    const newData = { ...existingData, ...updates };
    writeJsonFile(newData, FILE);
    return NextResponse.json({ success: true });
  } catch (error) {
    const { body, status } = persistErrorResponse(error);
    if (status === 503) return NextResponse.json(body, { status });
    return NextResponse.json({ error: 'Failed to update config' }, { status: 500 });
  }
}
