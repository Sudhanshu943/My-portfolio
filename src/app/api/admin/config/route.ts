import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import fs from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'src/data/admin-config.json');

function ensureFile() {
  if (!fs.existsSync(filePath)) {
    const defaultConfig = {
      repoConfig: {},
      customProjects: [],
      profile: {
        name: "Sudhanshu Thapa",
        bio: "",
        skills: [],
        socialLinks: {}
      }
    };
    fs.writeFileSync(filePath, JSON.stringify(defaultConfig, null, 2));
  }
}

export async function GET() {
  try {
    ensureFile();
    const data = fs.readFileSync(filePath, 'utf8');
    return NextResponse.json(JSON.parse(data));
  } catch {
    return NextResponse.json({ error: 'Failed to read config' }, { status: 500 });
  }
}

async function verifyAdmin(): Promise<boolean> {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) return false;
  return session.user.email.toLowerCase() === process.env.ADMIN_EMAIL?.toLowerCase();
}

export async function PUT(request: NextRequest) {
  const isAdmin = await verifyAdmin();
  if (!isAdmin) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  try {
    ensureFile();
    const existingData = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    const updates = await request.json();
    const newData = { ...existingData, ...updates };
    fs.writeFileSync(filePath, JSON.stringify(newData, null, 2));
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Failed to update config' }, { status: 500 });
  }
}