'use client';

import { Toaster } from 'react-hot-toast';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export function ToastWrapper() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <Toaster
      position="top-center"
      toastOptions={{
        className: 'text-sm font-medium',
        style: {
          background: resolvedTheme === 'dark' ? '#333' : '#fff',
          color: resolvedTheme === 'dark' ? '#fff' : '#333',
        },
      }}
    />
  );
}
