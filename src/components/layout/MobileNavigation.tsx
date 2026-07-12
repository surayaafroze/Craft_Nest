'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X, Package, LayoutDashboard, User, LogOut } from 'lucide-react';
import { Button } from '../ui/Button';

interface MobileNavigationProps {
  isTransparent?: boolean;
  session?: any;
  onLogout?: () => void;
}

export function MobileNavigation({ isTransparent, session, onLogout }: MobileNavigationProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button 
        variant="ghost" 
        size="icon" 
        onClick={() => setIsOpen(true)}
        className={isTransparent ? 'text-white hover:bg-white/20' : ''}
      >
        <Menu className="h-6 w-6" />
        <span className="sr-only">Toggle Menu</span>
      </Button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div className="fixed inset-0 bg-background/80 backdrop-blur-sm dark:bg-black/80" onClick={() => setIsOpen(false)} />
          <div className="fixed inset-y-0 right-0 z-50 w-full max-w-sm border-l border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-6 shadow-lg animate-in slide-in-from-right-full">
            <div className="flex items-center justify-between mb-8">
              <Link href="/" className="flex items-center space-x-2" onClick={() => setIsOpen(false)}>
                <Package className="h-7 w-7 text-emerald-600 dark:text-emerald-450" />
                <span className="font-bold text-2xl font-heading tracking-tight text-zinc-950 dark:text-white">CraftNest</span>
              </Link>
              <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                <X className="h-6 w-6 text-zinc-500" />
                <span className="sr-only">Close Menu</span>
              </Button>
            </div>
            
            <div className="flex flex-col space-y-4">
              <Link href="/explore" className="text-lg font-medium text-zinc-700 dark:text-zinc-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors" onClick={() => setIsOpen(false)}>
                Explore
              </Link>
              <Link href="/blog" className="text-lg font-medium text-zinc-700 dark:text-zinc-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors" onClick={() => setIsOpen(false)}>
                Journal
              </Link>
              <div className="h-px bg-zinc-200 dark:bg-zinc-800 my-4" />
              
              {session ? (
                <>
                  <div className="py-2 px-2 bg-zinc-50 dark:bg-zinc-900 rounded-xl mb-4 border border-zinc-100 dark:border-zinc-800">
                    <p className="text-sm font-medium text-zinc-900 dark:text-white truncate">{session.user.name}</p>
                    <p className="text-xs text-zinc-500 truncate">{session.user.email}</p>
                  </div>
                  <Link href="/dashboard" onClick={() => setIsOpen(false)}>
                    <Button variant="outline" className="w-full justify-start gap-3 rounded-xl border-zinc-200 dark:border-zinc-800">
                      <LayoutDashboard className="h-4 w-4 text-emerald-600" /> Dashboard
                    </Button>
                  </Link>
                  <Link href="/dashboard/settings" onClick={() => setIsOpen(false)}>
                    <Button variant="outline" className="w-full justify-start gap-3 rounded-xl border-zinc-200 dark:border-zinc-800">
                      <User className="h-4 w-4 text-emerald-600" /> Profile
                    </Button>
                  </Link>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start gap-3 rounded-xl border-zinc-200 dark:border-zinc-800 text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/30"
                    onClick={() => {
                      setIsOpen(false);
                      if (onLogout) onLogout();
                    }}
                  >
                    <LogOut className="h-4 w-4" /> Sign Out
                  </Button>
                </>
              ) : (
                <>
                  <Link href="/login" onClick={() => setIsOpen(false)}>
                    <Button variant="outline" className="w-full justify-start rounded-xl">Sign In</Button>
                  </Link>
                  <Link href="/register" onClick={() => setIsOpen(false)}>
                    <Button variant="primary" className="w-full justify-start rounded-xl">Sign Up</Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
