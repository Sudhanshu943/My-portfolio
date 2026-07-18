import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import {
  ADMIN_SESSION_COOKIE,
  getAdminCookieOptions,
} from '@/lib/admin-auth';

export async function POST() {
  try {
    const cookieStore = await cookies();
    cookieStore.set(ADMIN_SESSION_COOKIE, '', {
      ...getAdminCookieOptions(),
      maxAge: 0,
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
