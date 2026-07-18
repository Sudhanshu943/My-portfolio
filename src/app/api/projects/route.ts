import { NextRequest, NextResponse } from 'next/server';
import { isAdminAuthenticated } from '@/lib/admin-session';
import {
  persistErrorResponse,
  readJsonFile,
  writeJsonFile,
} from '@/lib/data-store';

const FILE = 'projects.json';

export async function GET() {
  try {
    return NextResponse.json(readJsonFile(FILE));
  } catch {
    return NextResponse.json({ error: 'Failed to read projects' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const isAdmin = await isAdminAuthenticated();
  if (!isAdmin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const newProject = await request.json();
    const data = readJsonFile<unknown[]>(FILE);
    data.push(newProject);
    writeJsonFile(data, FILE);
    return NextResponse.json({ success: true });
  } catch (error) {
    const { body, status } = persistErrorResponse(error);
    if (status === 503) return NextResponse.json(body, { status });
    return NextResponse.json({ error: 'Failed to add project' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  const isAdmin = await isAdminAuthenticated();
  if (!isAdmin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { index, ...updatedProject } = await request.json();
    const data = readJsonFile<Record<string, unknown>[]>(FILE);
    data[index] = { ...data[index], ...updatedProject };
    writeJsonFile(data, FILE);
    return NextResponse.json({ success: true });
  } catch (error) {
    const { body, status } = persistErrorResponse(error);
    if (status === 503) return NextResponse.json(body, { status });
    return NextResponse.json({ error: 'Failed to update project' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  const isAdmin = await isAdminAuthenticated();
  if (!isAdmin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { index } = await request.json();
    const data = readJsonFile<unknown[]>(FILE);
    data.splice(index, 1);
    writeJsonFile(data, FILE);
    return NextResponse.json({ success: true });
  } catch (error) {
    const { body, status } = persistErrorResponse(error);
    if (status === 503) return NextResponse.json(body, { status });
    return NextResponse.json({ error: 'Failed to delete project' }, { status: 500 });
  }
}
