import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import {
  ADMIN_SESSION_COOKIE,
  createAdminSessionToken,
  getAdminCookieOptions,
} from '@/lib/admin-auth';
import {
  checkLoginRateLimit,
  clearLoginFailures,
  getClientIp,
  recordLoginFailure,
} from '@/lib/login-rate-limit';

async function passwordsMatch(
  provided: string,
  expected: string
): Promise<boolean> {
  const encoder = new TextEncoder();
  const a = encoder.encode(provided);
  const b = encoder.encode(expected);

  // Length leak is acceptable; avoid early-return char compares on equal length.
  if (a.length !== b.length) {
    // Still do a dummy compare to keep work roughly similar.
    await crypto.subtle.digest('SHA-256', a);
    await crypto.subtle.digest('SHA-256', b);
    return false;
  }

  const digestA = new Uint8Array(await crypto.subtle.digest('SHA-256', a));
  const digestB = new Uint8Array(await crypto.subtle.digest('SHA-256', b));

  let diff = 0;
  for (let i = 0; i < digestA.length; i++) {
    diff |= digestA[i] ^ digestB[i];
  }
  return diff === 0;
}

export async function POST(request: NextRequest) {
  try {
    const ip = getClientIp(request);
    const rate = checkLoginRateLimit(ip);
    if (!rate.allowed) {
      return NextResponse.json(
        { error: 'Too many attempts. Try again later.' },
        {
          status: 429,
          headers: { 'Retry-After': String(rate.retryAfterSec) },
        }
      );
    }

    const body = await request.json();
    const { password } = body;

    if (typeof password !== 'string' || !password) {
      recordLoginFailure(ip);
      return NextResponse.json({ error: 'Access Denied' }, { status: 401 });
    }

    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!adminPassword) {
      return NextResponse.json(
        { error: 'Admin access not configured' },
        { status: 500 }
      );
    }

    if (
      !process.env.ADMIN_SESSION_SECRET &&
      !process.env.NEXTAUTH_SECRET
    ) {
      return NextResponse.json(
        {
          error:
            'Session secret not configured. Set ADMIN_SESSION_SECRET (or legacy NEXTAUTH_SECRET).',
        },
        { status: 500 }
      );
    }

    const ok = await passwordsMatch(password, adminPassword);
    if (!ok) {
      recordLoginFailure(ip);
      return NextResponse.json({ error: 'Access Denied' }, { status: 401 });
    }

    clearLoginFailures(ip);

    const token = await createAdminSessionToken();
    const cookieStore = await cookies();
    cookieStore.set(ADMIN_SESSION_COOKIE, token, getAdminCookieOptions());

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
