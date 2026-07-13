"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useSession, authFetch } from "@/app/lib/auth-client";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer,
  BarChart, Bar, PieChart, Pie, Cell, Legend
} from "recharts";
import { Package, Star, MessageSquare } from "lucide-react";
import { motion } from "framer-motion";

const COLORS = ['#10b981', '#f59e0b', '#3b82f6', '#8b5cf6', '#ec4899'];

export default function AnalyticsPage() {
  const { data: session } = useSession();
  const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:5000";

  const [analytics, setAnalytics] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const fetchAnalytics = useCallback(async () => {
    try {
      setLoading(true);
      const res = await authFetch(`${serverUrl}/api/analytics/user`);
      if (res.ok) {
        const data = await res.json();
        setAnalytics(data);
      }
    } catch (err) {
      console.error("Failed to load analytics", err);
    } finally {
      setLoading(false);
    }
  }, [serverUrl]);

  useEffect(() => {
    fetchAnalytics();
  }, [fetchAnalytics]);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-32">
        <div className="w-10 h-10 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!analytics) {
    return (
      <div className="text-center py-20 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl shadow-sm">
        <p className="text-zinc-500 dark:text-zinc-400">Could not load analytics data at this time.</p>
      </div>
    );
  }

  const { stats, charts } = analytics;

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-12">
      <div>
        <h1 className="text-3xl font-extrabold text-zinc-900 dark:text-white font-heading tracking-tight">Analytics</h1>
        <p className="text-zinc-500 mt-1">Track the performance and engagement of your items.</p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white dark:bg-zinc-900 p-6 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-sm flex items-center gap-4">
          <div className="w-14 h-14 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-2xl flex items-center justify-center">
            <Package className="w-7 h-7" />
          </div>
          <div>
            <p className="text-sm font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Total Items</p>
            <p className="text-3xl font-black text-zinc-900 dark:text-white font-heading">{stats.totalItems}</p>
          </div>
        </motion.div>
        
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-white dark:bg-zinc-900 p-6 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-sm flex items-center gap-4">
          <div className="w-14 h-14 bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 rounded-2xl flex items-center justify-center">
            <Star className="w-7 h-7" />
          </div>
          <div>
            <p className="text-sm font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Avg Rating</p>
            <p className="text-3xl font-black text-zinc-900 dark:text-white font-heading">{stats.avgRating.toFixed(1)}</p>
          </div>
        </motion.div>
        
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-white dark:bg-zinc-900 p-6 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-sm flex items-center gap-4">
          <div className="w-14 h-14 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-2xl flex items-center justify-center">
            <MessageSquare className="w-7 h-7" />
          </div>
          <div>
            <p className="text-sm font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Reviews Received</p>
            <p className="text-3xl font-black text-zinc-900 dark:text-white font-heading">{stats.totalReviewsReceived}</p>
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Activity Over Time */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="bg-white dark:bg-zinc-900 p-6 sm:p-8 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-sm lg:col-span-2">
          <h3 className="text-xl font-bold text-zinc-900 dark:text-white font-heading mb-6">Item Creation Activity (30 Days)</h3>
          <div className="h-72 w-full">
            {charts.activityOverTime && charts.activityOverTime.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={charts.activityOverTime} margin={{ top: 5, right: 30, left: -20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#52525b" opacity={0.2} vertical={false} />
                  <XAxis dataKey="date" stroke="#a1a1aa" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#a1a1aa" fontSize={12} tickLine={false} axisLine={false} allowDecimals={false} />
                  <RechartsTooltip 
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                    cursor={{ stroke: '#10b981', strokeWidth: 2, strokeDasharray: '5 5', opacity: 0.5 }}
                  />
                  <Line type="monotone" dataKey="itemsCreated" name="Items Created" stroke="#10b981" strokeWidth={4} dot={{ r: 4, strokeWidth: 2, fill: '#fff', stroke: '#10b981' }} activeDot={{ r: 6, strokeWidth: 0 }} />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <div className="w-full h-full flex items-center justify-center text-zinc-500">No activity data for the last 30 days.</div>
            )}
          </div>
        </motion.div>

        {/* Category Distribution */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="bg-white dark:bg-zinc-900 p-6 sm:p-8 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
          <h3 className="text-xl font-bold text-zinc-900 dark:text-white font-heading mb-6">Items by Category</h3>
          <div className="h-64 w-full">
            {charts.categoryDistribution && charts.categoryDistribution.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={charts.categoryDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {charts.categoryDistribution.map((entry: any, index: number) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <RechartsTooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                  <Legend verticalAlign="bottom" height={36} iconType="circle" />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="w-full h-full flex items-center justify-center text-zinc-500">No category data.</div>
            )}
          </div>
        </motion.div>

        {/* Rating Distribution */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="bg-white dark:bg-zinc-900 p-6 sm:p-8 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
          <h3 className="text-xl font-bold text-zinc-900 dark:text-white font-heading mb-6">Rating Distribution</h3>
          <div className="h-64 w-full">
            {charts.ratingDistribution && charts.ratingDistribution.some((r: any) => r.count > 0) ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={charts.ratingDistribution} layout="vertical" margin={{ top: 5, right: 30, left: 10, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#52525b" opacity={0.2} horizontal={false} />
                  <XAxis type="number" stroke="#a1a1aa" fontSize={12} tickLine={false} axisLine={false} allowDecimals={false} />
                  <YAxis dataKey="rating" type="category" stroke="#a1a1aa" fontSize={12} tickLine={false} axisLine={false} width={50} />
                  <RechartsTooltip cursor={{ fill: 'rgba(16, 185, 129, 0.1)' }} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                  <Bar dataKey="count" name="Reviews" fill="#f59e0b" radius={[0, 4, 4, 0]} barSize={24} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="w-full h-full flex items-center justify-center text-zinc-500">No ratings received yet.</div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
