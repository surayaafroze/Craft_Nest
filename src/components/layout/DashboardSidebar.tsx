'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
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
import { useUser } from '@/hooks/useUser';

export function DashboardSidebar() {
  const pathname = usePathname();
  const { user } = useUser();
  const isAdmin = (user as any)?.role === 'admin';

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

  return (
    <aside className="w-64 border-r bg-muted/20 hidden md:block min-h-[calc(100vh-4rem)]">
      <div className="flex h-full flex-col py-6 px-3">
        <div className="space-y-1 mb-8">
          <h4 className="px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
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
                  'flex items-center space-x-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                  isActive 
                    ? 'bg-primary text-primary-foreground' 
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                )}
              >
                <Icon className="h-4 w-4" />
                <span>{link.label}</span>
              </Link>
            );
          })}
        </div>

        {isAdmin && (
          <div className="space-y-1 mb-8">
            <h4 className="px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
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
                    'flex items-center space-x-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                    isActive 
                      ? 'bg-primary text-primary-foreground' 
                      : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                  )}
                >
                  <Icon className="h-4 w-4" />
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </div>
        )}

        <div className="mt-auto pt-4 border-t space-y-1">
          <button
            className="flex w-full items-center space-x-3 rounded-lg px-3 py-2 text-sm font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"
          >
            <LogOut className="h-4 w-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>
    </aside>
  );
}
