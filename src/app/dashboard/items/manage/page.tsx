"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useSession, authFetch } from "@/app/lib/auth-client";
import { Item } from "@/types/item";
import { Button } from "@/components/ui/Button";
import { Edit2, Trash2, PlusCircle, ExternalLink } from "lucide-react";
import toast from "react-hot-toast";
import Link from "next/link";
import { motion } from "framer-motion";
import Pagination from "@/components/ui/Pagination";

export default function ManageItemsPage() {
  const router = useRouter();
  const { data: session } = useSession();
  const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:5000";

  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const res = await authFetch(`${serverUrl}/api/items/mine?page=${page}&limit=10`);
      if (!res.ok) throw new Error("Failed to fetch items");
      const data = await res.json();
      setItems(data.items || []);
      setTotalPages(data.pagination?.totalPages || 1);
    } catch (err: any) {
      toast.error(err.message || "Failed to load items");
    } finally {
      setLoading(false);
    }
  }, [page, serverUrl]);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this item? This cannot be undone.")) return;
    
    try {
      setDeletingId(id);
      const res = await authFetch(`${serverUrl}/api/items/${id}`, { method: "DELETE" });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to delete item");
      }
      toast.success("Item deleted successfully");
      fetchItems();
    } catch (err: any) {
      toast.error(err.message || "Could not delete item");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-zinc-900 dark:text-white font-heading tracking-tight">Manage Items</h1>
          <p className="text-zinc-500 mt-1">View, edit, or remove your listed items.</p>
        </div>
        <Link href="/dashboard/items/add">
          <Button className="rounded-xl">
            <PlusCircle className="w-5 h-5 mr-2" />
            Add New Item
          </Button>
        </Link>
      </div>

      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-zinc-600 dark:text-zinc-400">
            <thead className="bg-zinc-50 dark:bg-zinc-950 border-b border-zinc-200 dark:border-zinc-800 text-xs uppercase font-bold tracking-wider text-zinc-500 dark:text-zinc-400">
              <tr>
                <th className="px-6 py-4">Item</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">Price</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
              {loading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center">
                    <div className="flex justify-center items-center">
                      <div className="w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                  </td>
                </tr>
              ) : items.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-zinc-500">
                    You haven't added any items yet.
                  </td>
                </tr>
              ) : (
                items.map((item, idx) => (
                  <motion.tr 
                    key={item.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className="hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-zinc-100 dark:bg-zinc-800 flex-shrink-0 overflow-hidden relative border border-zinc-200 dark:border-zinc-700">
                          {item.images && item.images.length > 0 ? (
                            <img src={item.images[0]} alt={item.title} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-zinc-400">No Img</div>
                          )}
                        </div>
                        <div className="font-semibold text-zinc-900 dark:text-white line-clamp-1 max-w-[200px]">
                          {item.title}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-medium">{item.category}</td>
                    <td className="px-6 py-4 font-bold text-emerald-600 dark:text-emerald-400">${item.price.toFixed(2)}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                        item.status === 'approved' ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400' :
                        item.status === 'pending' ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400' :
                        'bg-rose-100 text-rose-800 dark:bg-rose-900/30 dark:text-rose-400'
                      }`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link href={`/items/${item.id}`} target="_blank">
                          <Button variant="ghost" size="icon" title="View Public Page" className="rounded-lg text-zinc-500 hover:text-blue-600">
                            <ExternalLink className="w-4 h-4" />
                          </Button>
                        </Link>
                        {/* Note: Edit feature would require a separate Edit page, which isn't built yet, so we alert for now or link to dashboard/items/edit */}
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          title="Edit Item" 
                          className="rounded-lg text-zinc-500 hover:text-emerald-600"
                          onClick={() => alert("Edit item feature coming soon")}
                        >
                          <Edit2 className="w-4 h-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          title="Delete Item" 
                          className="rounded-lg text-zinc-500 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-900/20"
                          onClick={() => handleDelete(item.id)}
                          loading={deletingId === item.id}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </motion.tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        
        {!loading && totalPages > 1 && (
          <div className="p-4 border-t border-zinc-200 dark:border-zinc-800 flex justify-center">
            <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
          </div>
        )}
      </div>
    </div>
  );
}
