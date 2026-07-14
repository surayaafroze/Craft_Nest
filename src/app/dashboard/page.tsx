'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { authFetch, useSession } from '@/app/lib/auth-client';
import { 
  Package, 
  Star, 
  MessageSquare, 
  Clock,
  CheckCircle,
  XCircle,
  PlusCircle,
  Settings
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { ItemCard } from '@/components/items/ItemCard';
import { ReviewCard } from '@/components/items/ReviewCard';
import ErrorState from '@/components/ui/ErrorState';

export default function DashboardOverviewPage() {
  const router = useRouter();
  const { data: session } = useSession();
  const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:5000";

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [overview, setOverview] = useState<any>(null);
  const [recentItems, setRecentItems] = useState<any[]>([]);
  const [recentReviews, setRecentReviews] = useState<any[]>([]);

  const fetchDashboardData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const [overviewRes, itemsRes, reviewsRes] = await Promise.all([
        authFetch(`/api/backend/dashboard/overview`),
        authFetch(`/api/backend/items/mine?limit=4`),
        authFetch(`/api/backend/reviews/me`)
      ]);

      if (!overviewRes.ok) throw new Error("Failed to load dashboard overview");
      const overviewData = await overviewRes.json();
      setOverview(overviewData);

      if (itemsRes.ok) {
        const itemsData = await itemsRes.json();
        setRecentItems(itemsData.items || []);
      }

      if (reviewsRes.ok) {
        const reviewsData = await reviewsRes.json();
        setRecentReviews((reviewsData.reviews || []).slice(0, 3));
      }

    } catch (err: any) {
      setError(err.message || "Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  }, [serverUrl]);

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="w-10 h-10 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <ErrorState 
        title="Error loading dashboard"
        description={error}
        onAction={fetchDashboardData}
        actionText="Try Again"
      />
    );
  }

  const stats = [
    {
      title: "Total Items",
      value: overview?.totalItems || 0,
      icon: Package,
      color: "text-blue-600 dark:text-blue-400",
      bg: "bg-blue-50 dark:bg-blue-900/20",
    },
    {
      title: "Approved Items",
      value: overview?.approvedItems || 0,
      icon: CheckCircle,
      color: "text-emerald-600 dark:text-emerald-400",
      bg: "bg-emerald-50 dark:bg-emerald-900/20",
    },
    {
      title: "Pending Items",
      value: overview?.pendingItems || 0,
      icon: Clock,
      color: "text-amber-500 dark:text-amber-400",
      bg: "bg-amber-50 dark:bg-amber-900/20",
    },
    {
      title: "Rejected Items",
      value: overview?.rejectedItems || 0,
      icon: XCircle,
      color: "text-rose-600 dark:text-rose-400",
      bg: "bg-rose-50 dark:bg-rose-900/20",
    },
    {
      title: "Total Reviews",
      value: overview?.totalReviews || 0,
      icon: MessageSquare,
      color: "text-indigo-600 dark:text-indigo-400",
      bg: "bg-indigo-50 dark:bg-indigo-900/20",
    },
    {
      title: "Average Rating",
      value: (overview?.averageRating || 0).toFixed(1),
      icon: Star,
      color: "text-yellow-600 dark:text-yellow-400",
      bg: "bg-yellow-50 dark:bg-yellow-900/20",
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } }
  };

  return (
    <div className="space-y-10">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-zinc-900 dark:text-white font-heading tracking-tight">
            Welcome back, {session?.user?.name?.split(' ')[0] || 'User'}!
          </h1>
          <p className="text-zinc-500 dark:text-zinc-400 mt-1">Here is a quick overview of your store.</p>
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <Button 
            className="flex-1 sm:flex-none rounded-xl bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200"
            onClick={() => router.push('/dashboard/items/add')}
          >
            <PlusCircle className="w-4 h-4 mr-2" />
            Add Item
          </Button>
          <Button 
            variant="outline" 
            className="flex-1 sm:flex-none rounded-xl"
            onClick={() => router.push('/dashboard/settings')}
          >
            <Settings className="w-4 h-4 mr-2" />
            Settings
          </Button>
        </div>
      </div>

      <motion.div 
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 sm:gap-6"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <motion.div 
              key={idx}
              variants={itemVariants}
              className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div className={`w-12 h-12 flex items-center justify-center rounded-2xl mb-4 ${stat.bg} ${stat.color}`}>
                <Icon className="w-6 h-6" />
              </div>
              <div>
                <p className="text-2xl font-black text-zinc-900 dark:text-white font-heading">
                  {stat.value}
                </p>
                <p className="text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mt-1">
                  {stat.title}
                </p>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <motion.div 
          className="xl:col-span-2 space-y-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          {/* Recent Items */}
          <div className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 sm:p-8 shadow-sm">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-xl font-bold font-heading text-zinc-900 dark:text-white">Recently Added</h2>
              <Button variant="ghost" size="sm" onClick={() => router.push('/dashboard/items/manage')}>
                Manage Items
              </Button>
            </div>
            
            {recentItems.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {recentItems.map((item, index) => (
                  <ItemCard key={item.id} item={item} priority={index === 0} />
                ))}
              </div>
            ) : (
              <div className="text-center py-10 bg-zinc-50 dark:bg-zinc-900/50 rounded-2xl border border-dashed border-zinc-200 dark:border-zinc-800">
                <Package className="w-8 h-8 mx-auto text-zinc-400 mb-3" />
                <h3 className="text-sm font-semibold text-zinc-900 dark:text-white mb-1">No items yet</h3>
                <p className="text-xs text-zinc-500 mb-4">Start selling your crafts by adding your first item.</p>
                <Button size="sm" onClick={() => router.push('/dashboard/items/add')}>
                  Add New Item
                </Button>
              </div>
            )}
          </div>
        </motion.div>

        <motion.div 
          className="xl:col-span-1 space-y-8"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          {/* Latest Reviews */}
          <div className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 sm:p-8 shadow-sm">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-xl font-bold font-heading text-zinc-900 dark:text-white">My Reviews</h2>
              <Button variant="ghost" size="sm" onClick={() => router.push('/dashboard/reviews')}>
                View All
              </Button>
            </div>

            {recentReviews.length > 0 ? (
              <div className="space-y-6">
                {recentReviews.map(review => (
                  <div key={review.id} className="border-b border-zinc-100 dark:border-zinc-800/50 pb-6 last:border-0 last:pb-0">
                    <ReviewCard review={review} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-10 bg-zinc-50 dark:bg-zinc-900/50 rounded-2xl border border-dashed border-zinc-200 dark:border-zinc-800">
                <MessageSquare className="w-8 h-8 mx-auto text-zinc-400 mb-3" />
                <p className="text-sm text-zinc-500">You haven't written any reviews yet.</p>
              </div>
            )}
          </div>
          
          <div className="bg-emerald-50 dark:bg-emerald-900/10 border border-emerald-100 dark:border-emerald-900/30 rounded-3xl p-6 sm:p-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <Star className="w-24 h-24 text-emerald-500" />
            </div>
            <h3 className="text-lg font-bold font-heading text-emerald-900 dark:text-emerald-100 mb-2 relative z-10">
              Pro Tip
            </h3>
            <p className="text-sm text-emerald-700 dark:text-emerald-300/80 leading-relaxed relative z-10">
              High-quality images and detailed descriptions can increase your item's visibility and sales by up to 40%. Keep your inventory updated!
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
