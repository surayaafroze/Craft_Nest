"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Package, User } from 'lucide-react';
import { MobileNavigation } from './MobileNavigation';
import { Button } from '../ui/Button';
import Avatar from '../ui/Avatar';
import { useSession, signOut } from '@/app/lib/auth-client';
import { usePathname } from 'next/navigation';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const { data: session } = useSession();
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    // Always check immediately
    handleScroll();

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isTransparent = isHomePage && !scrolled;

  const handleLogout = async () => {
    await signOut({
      fetchOptions: {
        onSuccess: () => {
          window.location.href = "/";
        }
      }
    });
  };

  if (pathname?.startsWith('/dashboard')) return null;

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ${
        isTransparent 
          ? 'bg-transparent text-zinc-950 dark:text-white border-transparent py-4' 
          : 'bg-white/95 dark:bg-zinc-950/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-zinc-950/60 border-b border-zinc-200 dark:border-zinc-800 text-zinc-950 dark:text-white py-2'
      }`}
    >
      <div className="container flex h-16 items-center mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex gap-6 md:gap-10">
          <Link href="/" className="flex items-center space-x-2 group">
            <Package className="h-7 w-7 transition-colors text-emerald-600 dark:text-emerald-450" />
            <span className="inline-block font-bold text-2xl font-heading tracking-tight">CraftNest</span>
          </Link>
          <nav className="hidden md:flex gap-8 items-center">
            <Link 
              href="/explore" 
              className="text-sm font-medium transition-colors text-zinc-600 dark:text-zinc-300 hover:text-emerald-600 dark:hover:text-emerald-400"
            >
              Explore
            </Link>
            <Link 
              href="/blog" 
              className="text-sm font-medium transition-colors text-zinc-600 dark:text-zinc-300 hover:text-emerald-600 dark:hover:text-emerald-400"
            >
              Journal
            </Link>
          </nav>
        </div>
        
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-2">
            <div className="hidden md:flex space-x-4 items-center">
              {session ? (
                <>
                  <Link href="/dashboard">
                    <Button variant={isTransparent ? 'outline' : 'ghost'} className={isTransparent ? 'text-zinc-900 border-zinc-200 hover:bg-zinc-100 dark:text-white dark:border-zinc-700 dark:hover:bg-zinc-800' : ''}>
                      Dashboard
                    </Button>
                  </Link>
                  <div className="h-8 w-px bg-zinc-300/50 dark:bg-zinc-700/50 mx-2" />
                  <Link href="/dashboard/settings" className="flex items-center gap-2 group">
                    <Avatar 
                      src={session.user.image} 
                      alt={session.user.name} 
                      size="sm" 
                      className={`ring-2 ${isTransparent ? 'ring-zinc-200 dark:ring-zinc-700 group-hover:ring-emerald-500' : 'ring-emerald-500/20 group-hover:ring-emerald-500'}`} 
                    />
                  </Link>
                </>
              ) : (
                <>
                  <Link href="/login">
                    <Button variant={isTransparent ? 'outline' : 'ghost'} className={isTransparent ? 'text-zinc-700 border-transparent hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800' : ''}>
                      Sign In
                    </Button>
                  </Link>
                  <Link href="/register">
                    <Button variant="primary" className="rounded-xl shadow-sm">
                      Sign Up
                    </Button>
                  </Link>
                </>
              )}
            </div>
            
            <div className="md:hidden flex items-center">
              {session && (
                <Link href="/dashboard/settings" className="mr-4">
                  <Avatar src={session.user.image} alt={session.user.name} size="sm" />
                </Link>
              )}
              <MobileNavigation isTransparent={isTransparent} session={session} onLogout={handleLogout} />
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
