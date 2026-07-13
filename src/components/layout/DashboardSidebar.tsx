'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { 
  LayoutDashboard, 
  PlusCircle, 
  List, 
  MessageSquare, 
  Heart, 
  BarChart2, 
  Settings, 
  Users, 
  ShieldCheck, 
  TrendingUp,
  LogOut
} from 'lucide-react';
import { useSession, authClient } from '@/app/lib/auth-client';
import toast from 'react-hot-toast';

export function DashboardSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session } = useSession();
  const isAdmin = (session?.user as any)?.role === 'admin';

  const userLinks = [
    { href: '/dashboard', label: 'Overview', icon: LayoutDashboard },
    { href: '/dashboard/items/add', label: 'Add Item', icon: PlusCircle },
    { href: '/dashboard/items/manage', label: 'Manage Items', icon: List },
    { href: '/dashboard/reviews', label: 'My Reviews', icon: MessageSquare },
    { href: '/dashboard/wishlist', label: 'Wishlist', icon: Heart },
    { href: '/dashboard/analytics', label: 'Analytics', icon: BarChart2 },
    { href: '/dashboard/settings', label: 'Profile & Settings', icon: Settings },
  ];

  const adminLinks = [
    { href: '/dashboard/admin/users', label: 'Manage Users', icon: Users },
    { href: '/dashboard/admin/items', label: 'Moderate Items', icon: ShieldCheck },
    { href: '/dashboard/admin/analytics', label: 'Platform Analytics', icon: TrendingUp },
  ];

  const handleSignOut = async () => {
    try {
      await authClient.signOut();
      toast.success("Signed out successfully");
      router.push('/login');
    } catch (err) {
      toast.error("Failed to sign out");
    }
  };

  return (
    <aside className="w-72 border-r border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950/50 hidden md:block min-h-[calc(100vh-4.5rem)]">
      <div className="flex h-full flex-col py-8 px-4">
        <div className="space-y-1.5 mb-10">
          <h4 className="px-4 text-xs font-bold uppercase tracking-widest text-zinc-500 mb-4 font-heading">
            Dashboard
          </h4>
          {userLinks.map((link) => {
            const isActive = pathname === link.href;
            const Icon = link.icon;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'relative flex items-center space-x-3 rounded-xl px-4 py-3 text-sm font-semibold transition-colors',
                  isActive 
                    ? 'text-emerald-700 dark:text-emerald-300' 
                    : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-200/50 dark:hover:bg-zinc-800/50'
                )}
              >
                {isActive && (
                  <motion.div
                    layoutId="sidebar-active"
                    className="absolute inset-0 rounded-xl bg-emerald-100 dark:bg-emerald-900/30 border border-emerald-200 dark:border-emerald-800/50"
                    initial={false}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <Icon className="h-5 w-5 relative z-10" />
                <span className="relative z-10">{link.label}</span>
              </Link>
            );
          })}
        </div>

        {isAdmin && (
          <div className="space-y-1.5 mb-10">
            <h4 className="px-4 text-xs font-bold uppercase tracking-widest text-zinc-500 mb-4 font-heading">
              Admin Panel
            </h4>
            {adminLinks.map((link) => {
              const isActive = pathname === link.href;
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'relative flex items-center space-x-3 rounded-xl px-4 py-3 text-sm font-semibold transition-colors',
                    isActive 
                      ? 'text-emerald-700 dark:text-emerald-300' 
                      : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-200/50 dark:hover:bg-zinc-800/50'
                  )}
                >
                  {isActive && (
                    <motion.div
                      layoutId="sidebar-active"
                      className="absolute inset-0 rounded-xl bg-emerald-100 dark:bg-emerald-900/30 border border-emerald-200 dark:border-emerald-800/50"
                      initial={false}
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  <Icon className="h-5 w-5 relative z-10" />
                  <span className="relative z-10">{link.label}</span>
                </Link>
              );
            })}
          </div>
        )}

        <div className="mt-auto pt-6 border-t border-zinc-200 dark:border-zinc-800 space-y-1">
          <button
            onClick={handleSignOut}
            className="flex w-full items-center space-x-3 rounded-xl px-4 py-3 text-sm font-semibold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors"
          >
            <LogOut className="h-5 w-5" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>
    </aside>
  );
}
