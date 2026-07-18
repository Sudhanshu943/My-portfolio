import { NextRequest, NextResponse } from 'next/server';
import { isAdminAuthenticated } from '@/lib/admin-session';
import {
  persistErrorResponse,
  readJsonFile,
  writeJsonFile,
} from '@/lib/data-store';

const FILE = 'skills.json';

type SkillsData = Record<string, unknown[]>;

export async function GET() {
  try {
    return NextResponse.json(readJsonFile(FILE));
  } catch {
    return NextResponse.json({ error: 'Failed to read skills' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const isAdmin = await isAdminAuthenticated();
  if (!isAdmin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { category, ...skill } = await request.json();
    const data = readJsonFile<SkillsData>(FILE);
    if (!data[category]) data[category] = [];
    data[category].push(skill);
    writeJsonFile(data, FILE);
    return NextResponse.json({ success: true });
  } catch (error) {
    const { body, status } = persistErrorResponse(error);
    if (status === 503) return NextResponse.json(body, { status });
    return NextResponse.json({ error: 'Failed to add skill' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  const isAdmin = await isAdminAuthenticated();
  if (!isAdmin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { category, index, skill } = await request.json();
    const data = readJsonFile<SkillsData>(FILE);
    data[category][index] = skill;
    writeJsonFile(data, FILE);
    return NextResponse.json({ success: true });
  } catch (error) {
    const { body, status } = persistErrorResponse(error);
    if (status === 503) return NextResponse.json(body, { status });
    return NextResponse.json({ error: 'Failed to update skill' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  const isAdmin = await isAdminAuthenticated();
  if (!isAdmin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { category, index } = await request.json();
    const data = readJsonFile<SkillsData>(FILE);
    data[category].splice(index, 1);
    writeJsonFile(data, FILE);
    return NextResponse.json({ success: true });
  } catch (error) {
    const { body, status } = persistErrorResponse(error);
    if (status === 503) return NextResponse.json(body, { status });
    return NextResponse.json({ error: 'Failed to delete skill' }, { status: 500 });
  }
}
