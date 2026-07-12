import { ReactNode } from 'react';
import { DashboardSidebar } from './DashboardSidebar';
import { PageTransition } from './PageTransition';

export function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-[calc(100vh-4rem)]">
      <DashboardSidebar />
      <main className="flex-1 overflow-y-auto bg-background/50 p-6 md:p-8">
        <PageTransition className="mx-auto max-w-6xl">
          {children}
        </PageTransition>
      </main>
    </div>
  );
}
