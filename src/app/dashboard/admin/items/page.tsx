"use client";

import { useEffect, useState } from 'react';
import { updateItemStatus } from '@/lib/admin';
import { apiClient, handleApiError } from '@/lib/api';
import { Button } from '@/components/ui/Button';
import toast from 'react-hot-toast';
import { Check, X, Clock, ExternalLink } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function ModerateItemsPage() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'pending' | 'approved' | 'rejected'>('pending');

  useEffect(() => {
    fetchItems(filter);
  }, [filter]);

  const fetchItems = async (status: string) => {
    try {
      setLoading(true);
      const response = await apiClient.get(`/items?status=${status}&limit=50`);
      setItems(response.data.items);
    } catch (error) {
      toast.error(handleApiError(error));
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (itemId: string, newStatus: string) => {
    try {
      await updateItemStatus(itemId, newStatus);
      toast.success(`Item marked as ${newStatus}`);
      fetchItems(filter); // refresh the list
    } catch (error) {
      toast.error(handleApiError(error));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">Moderate Items</h2>
          <p className="text-muted-foreground mt-1">Review and approve or reject user submissions.</p>
        </div>
        <div className="flex bg-zinc-100 dark:bg-zinc-900 p-1 rounded-lg w-fit">
          <button 
            onClick={() => setFilter('pending')}
            className={`px-4 py-1.5 text-sm font-medium rounded-md transition-colors ${filter === 'pending' ? 'bg-white dark:bg-zinc-800 shadow-sm text-zinc-900 dark:text-white' : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200'}`}
          >
            Pending
          </button>
          <button 
            onClick={() => setFilter('approved')}
            className={`px-4 py-1.5 text-sm font-medium rounded-md transition-colors ${filter === 'approved' ? 'bg-white dark:bg-zinc-800 shadow-sm text-zinc-900 dark:text-white' : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200'}`}
          >
            Approved
          </button>
          <button 
            onClick={() => setFilter('rejected')}
            className={`px-4 py-1.5 text-sm font-medium rounded-md transition-colors ${filter === 'rejected' ? 'bg-white dark:bg-zinc-800 shadow-sm text-zinc-900 dark:text-white' : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200'}`}
          >
            Rejected
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex h-64 items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-emerald-500 border-t-transparent" />
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {items.map((item) => (
            <motion.div 
              key={item.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-950 transition-all hover:shadow-md"
            >
              <div className="relative h-48 w-full bg-zinc-100 dark:bg-zinc-900">
                {item.images && item.images.length > 0 ? (
                  <img src={item.images[0]} alt={item.title} className="h-full w-full object-cover" />
                ) : (
                  <div className="flex h-full items-center justify-center text-zinc-400">No Image</div>
                )}
                <div className="absolute top-2 right-2">
                  <Badge variant={item.status === 'pending' ? 'warning' : item.status === 'approved' ? 'success' : 'destructive'} className="capitalize backdrop-blur-md bg-white/90 dark:bg-zinc-900/90">
                    {item.status === 'pending' && <Clock className="w-3 h-3 mr-1" />}
                    {item.status === 'approved' && <Check className="w-3 h-3 mr-1" />}
                    {item.status === 'rejected' && <X className="w-3 h-3 mr-1" />}
                    {item.status}
                  </Badge>
                </div>
              </div>
              
              <div className="flex flex-1 flex-col p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-zinc-900 dark:text-white line-clamp-1" title={item.title}>
                    {item.title}
                  </h3>
                  <span className="font-bold text-emerald-600 dark:text-emerald-400 whitespace-nowrap ml-2">
                    ${item.price}
                  </span>
                </div>
                
                <p className="text-sm text-zinc-500 dark:text-zinc-400 line-clamp-2 mb-4 flex-1">
                  {item.shortDescription}
                </p>
                
                <div className="text-xs text-zinc-500 dark:text-zinc-400 mb-4 flex justify-between items-center bg-zinc-50 dark:bg-zinc-900/50 p-2 rounded-lg">
                  <div>
                    <span className="block font-medium text-zinc-700 dark:text-zinc-300">Category</span>
                    <span>{item.category}</span>
                  </div>
                  <div className="text-right">
                    <span className="block font-medium text-zinc-700 dark:text-zinc-300">Submitted by</span>
                    <span>{item.owner?.name || 'Unknown'}</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 mt-auto pt-4 border-t border-zinc-100 dark:border-zinc-800">
                  <Link href={`/items/${item.id}`} target="_blank" className="flex-1">
                    <Button variant="outline" size="sm" className="w-full text-xs">
                      <ExternalLink className="w-3 h-3 mr-1.5" /> View Full
                    </Button>
                  </Link>
                  
                  {filter !== 'approved' && (
                    <Button 
                      variant="primary" 
                      size="sm" 
                      className="flex-1 text-xs"
                      onClick={() => handleUpdateStatus(item.id, 'approved')}
                    >
                      <Check className="w-3 h-3 mr-1.5" /> Approve
                    </Button>
                  )}
                  
                  {filter !== 'rejected' && (
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex-1 text-xs text-rose-600 hover:text-rose-700 hover:bg-rose-50 border-rose-200 dark:border-rose-900/30 dark:hover:bg-rose-900/20"
                      onClick={() => handleUpdateStatus(item.id, 'rejected')}
                    >
                      <X className="w-3 h-3 mr-1.5" /> Reject
                    </Button>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {!loading && items.length === 0 && (
        <div className="flex flex-col items-center justify-center p-12 text-center rounded-xl border border-dashed border-zinc-300 dark:border-zinc-800">
          <Check className="h-12 w-12 text-zinc-300 dark:text-zinc-700 mb-3" />
          <h3 className="text-lg font-medium text-zinc-900 dark:text-zinc-100">All caught up!</h3>
          <p className="text-zinc-500 max-w-sm mt-1">
            There are no {filter} items in the moderation queue at the moment.
          </p>
        </div>
      )}
    </div>
  );
}
