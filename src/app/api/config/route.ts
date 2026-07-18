import { NextRequest, NextResponse } from 'next/server';
import { isAdminAuthenticated } from '@/lib/admin-session';
import {
  persistErrorResponse,
  readJsonFile,
  writeJsonFile,
} from '@/lib/data-store';

const FILE = 'config.json';

export async function GET() {
  try {
    return NextResponse.json(readJsonFile(FILE));
  } catch {
    return NextResponse.json({ error: 'Failed to read config' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  const isAdmin = await isAdminAuthenticated();
  if (!isAdmin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const updatedConfig = await request.json();
    const data = readJsonFile<Record<string, unknown>>(FILE);
    const newData = { ...data, ...updatedConfig };
    writeJsonFile(newData, FILE);
    return NextResponse.json({ success: true });
  } catch (error) {
    const { body, status } = persistErrorResponse(error);
    if (status === 503) return NextResponse.json(body, { status });
    return NextResponse.json({ error: 'Failed to update config' }, { status: 500 });
  }
}
