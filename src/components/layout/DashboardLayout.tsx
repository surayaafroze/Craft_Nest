'use client';

import { ReactNode, useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { Menu, X, Package, Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import Link from 'next/link';
import { DashboardSidebar } from './DashboardSidebar';
import { PageTransition } from './PageTransition';
import { Breadcrumb } from './Breadcrumb';
import { Button } from '@/components/ui/Button';
import { useSession } from '@/app/lib/auth-client';
import Avatar from '@/components/ui/Avatar';

export function DashboardLayout({ children }: { children: ReactNode }) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const { data: session } = useSession();

  useEffect(() => setMounted(true), []);

  // Generate breadcrumb items
  const pathSegments = pathname.split('/').filter(Boolean);
  const breadcrumbItems = pathSegments.map((segment, index) => {
    const href = '/' + pathSegments.slice(0, index + 1).join('/');
    const label = segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, ' ');
    return { label, href: index === pathSegments.length - 1 ? undefined : href };
  });

  return (
    <div className="flex min-h-screen bg-zinc-50 dark:bg-zinc-950 font-sans">
      {/* Desktop Sidebar */}
      <div className="hidden md:block">
        <DashboardSidebar />
      </div>

      {/* Mobile Sidebar Overlay */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          <div className="fixed inset-0 bg-zinc-900/80 backdrop-blur-sm" onClick={() => setIsMobileOpen(false)} />
          <div className="fixed inset-y-0 left-0 w-72 bg-white dark:bg-zinc-950 shadow-2xl flex flex-col z-50 animate-in slide-in-from-left">
            <div className="flex items-center justify-between p-6 border-b border-zinc-200 dark:border-zinc-800">
              <Link href="/" className="flex items-center gap-2">
                <Package className="h-6 w-6 text-emerald-600" />
                <span className="font-bold text-xl font-heading tracking-tight text-zinc-900 dark:text-white">CraftNest</span>
              </Link>
              <Button variant="ghost" size="icon" onClick={() => setIsMobileOpen(false)}>
                <X className="h-5 w-5 text-zinc-500" />
              </Button>
            </div>
            <div className="flex-1 overflow-y-auto" onClick={() => setIsMobileOpen(false)}>
              <DashboardSidebar />
            </div>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0">
        {/* Dashboard Header */}
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md px-4 sm:px-6 lg:px-8 shadow-sm">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMobileOpen(true)}>
              <Menu className="h-5 w-5" />
            </Button>
            <div className="hidden sm:block">
              <Breadcrumb items={breadcrumbItems} />
            </div>
          </div>

          <div className="flex items-center gap-4">
            {mounted && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="text-zinc-600 dark:text-zinc-400"
              >
                {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </Button>
            )}
            
            <div className="flex items-center gap-3 pl-4 border-l border-zinc-200 dark:border-zinc-800">
              <div className="hidden sm:flex flex-col items-end text-sm">
                <span className="font-semibold text-zinc-900 dark:text-white">{session?.user?.name || 'User'}</span>
                <span className="text-xs text-zinc-500">{session?.user?.email}</span>
              </div>
              <Avatar 
                src={session?.user?.image} 
                fallback={session?.user?.name?.charAt(0) || 'U'}
                size="sm"
                className="ring-2 ring-emerald-500/20"
              />
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <PageTransition className="mx-auto max-w-6xl">
            {children}
          </PageTransition>
        </div>
      </main>
    </div>
  );
}
