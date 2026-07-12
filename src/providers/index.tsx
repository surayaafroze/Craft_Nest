'use client';

import * as React from 'react';
import { ThemeProvider } from './theme-provider';
import { ToastWrapper } from '@/components/ui/ToastWrapper';

import { ToastProvider } from './toast-provider';

import { AuthSync } from '@/components/auth/AuthSync';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <ToastProvider>
        <AuthSync />
        {children}
      </ToastProvider>
      <ToastWrapper />
    </ThemeProvider>
  );
}
