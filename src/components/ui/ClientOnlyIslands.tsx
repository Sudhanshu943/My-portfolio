'use client';

import dynamic from 'next/dynamic';

/** Client-only islands — `ssr: false` must live in a Client Component on Next 16+. */
export const AnimatedBackground = dynamic(
  () => import('@/components/AnimatedBackground'),
  { ssr: false }
);

export const AdminControls = dynamic(
  () => import('@/components/admin/AdminControls'),
  { ssr: false, loading: () => null }
);
