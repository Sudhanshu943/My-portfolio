'use client';

import { useState, type ReactNode } from 'react';
import BootLoader from '@/components/ui/BootLoader';

/** Set to `true` to show the terminal boot intro before the portfolio. */
export const ENABLE_BOOT_LOADER = false;

/**
 * Optional client shell around the home page.
 * When boot is disabled, children render immediately (no loader flash).
 */
export default function HomeShell({ children }: { children: ReactNode }) {
  const [booted, setBooted] = useState(!ENABLE_BOOT_LOADER);

  if (!booted) {
    return <BootLoader onComplete={() => setBooted(true)} />;
  }

  return <>{children}</>;
}
