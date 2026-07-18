import { NextResponse } from 'next/server';
import { isAdminAuthenticated } from '@/lib/admin-session';

export async function GET() {
  try {
    const isAdmin = await isAdminAuthenticated();
    return NextResponse.json({ isAdmin });
  } catch {
    return NextResponse.json({ isAdmin: false });
  }
}
