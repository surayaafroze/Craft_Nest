"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Truck, ShieldCheck, Globe, Clock, PackageCheck, HelpCircle, ArrowRight, Sparkles } from "lucide-react";
import Button from "@/components/ui/Button";

const SHIPPING_FEATURES = [
  {
    icon: Clock,
    title: "Handmade Preparation",
    desc: "Every item is crafted or packaged individually by the artisan. Made-to-order pieces typically dispatch within 3-7 business days."
  },
  {
    icon: ShieldCheck,
    title: "Insured & Tracked",
    desc: "All packages receive end-to-end tracked courier shipping with included transit insurance for complete peace of mind."
  },
  {
    icon: Globe,
    title: "Worldwide Delivery",
    desc: "We connect independent artisans with craft lovers across 45+ countries with transparent international duties support."
  },
  {
    icon: PackageCheck,
    title: "Eco-Friendly Packing",
    desc: "Artisans are guided to use recyclable honeycomb wrap, biodegradable starch peanuts, and compostable kraft boxes."
  }
];

const ESTIMATES = [
  { region: "North America (US & Canada)", standard: "3 - 5 business days", express: "1 - 2 business days", freeOver: "$75" },
  { region: "United Kingdom & Europe", standard: "4 - 7 business days", express: "2 - 3 business days", freeOver: "$90" },
  { region: "Asia Pacific & Oceania", standard: "6 - 10 business days", express: "3 - 5 business days", freeOver: "$120" },
  { region: "Rest of the World", standard: "8 - 14 business days", express: "4 - 7 business days", freeOver: "$150" },
];

export default function ShippingPage() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 pt-28 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-100/70 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs font-semibold uppercase tracking-wider"
          >
            <Truck className="w-3.5 h-3.5" />
            Global Artisan Logistics
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl sm:text-5xl font-extrabold font-heading text-zinc-900 dark:text-white"
          >
            Shipping & Delivery Policy
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="max-w-2xl mx-auto text-base sm:text-lg text-zinc-600 dark:text-zinc-400"
          >
            Discover how your handmade treasures are carefully prepared, safely packaged, and swiftly delivered to your doorstep.
          </motion.p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {SHIPPING_FEATURES.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + idx * 0.05 }}
                className="bg-white dark:bg-zinc-900 rounded-2xl p-6 border border-zinc-200 dark:border-zinc-800 shadow-sm flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/70 border border-emerald-200 dark:border-emerald-800 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-zinc-900 dark:text-white text-base">
                    {feat.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
                    {feat.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Delivery Estimates Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-zinc-900 rounded-3xl p-6 sm:p-8 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-6"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-zinc-100 dark:border-zinc-800 pb-4">
            <div>
              <h2 className="text-xl font-bold font-heading text-zinc-900 dark:text-white">Estimated Delivery Times</h2>
              <p className="text-xs text-zinc-500">Calculated after order crafting & fulfillment dispatch.</p>
            </div>
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 px-3 py-1 rounded-full border border-emerald-200 dark:border-emerald-800">
              <Sparkles className="w-3.5 h-3.5" />
              Free shipping on qualifying studio orders
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-zinc-600 dark:text-zinc-300">
              <thead className="bg-zinc-50 dark:bg-zinc-800/50 text-xs uppercase font-semibold text-zinc-900 dark:text-zinc-100">
                <tr>
                  <th className="px-4 py-3 rounded-l-xl">Destination</th>
                  <th className="px-4 py-3">Standard Transit</th>
                  <th className="px-4 py-3">Express Courier</th>
                  <th className="px-4 py-3 rounded-r-xl">Free Shipping Threshold</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800 text-xs sm:text-sm">
                {ESTIMATES.map((row, idx) => (
                  <tr key={idx} className="hover:bg-zinc-50/50 dark:hover:bg-zinc-800/20">
                    <td className="px-4 py-3.5 font-medium text-zinc-900 dark:text-white">{row.region}</td>
                    <td className="px-4 py-3.5">{row.standard}</td>
                    <td className="px-4 py-3.5">{row.express}</td>
                    <td className="px-4 py-3.5 font-semibold text-emerald-600 dark:text-emerald-400">{row.freeOver}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Detailed Policy FAQs & Terms */}
        <div className="bg-white dark:bg-zinc-900 rounded-3xl p-6 sm:p-10 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-8">
          <h2 className="text-2xl font-bold font-heading text-zinc-900 dark:text-white">
            Detailed Shipping Guidelines
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm text-zinc-600 dark:text-zinc-400">
            <div className="space-y-2">
              <h3 className="font-bold text-zinc-900 dark:text-white">Customs, Duties & Import Taxes</h3>
              <p className="leading-relaxed">
                International orders may be subject to import duties and taxes levied once a shipment reaches your country. CraftNest artisans declare package value accurately according to international customs legislation.
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="font-bold text-zinc-900 dark:text-white">Fragile & High-Value Artisan Goods</h3>
              <p className="leading-relaxed">
                Ceramics, glasswork, and delicate sculptures are double-boxed with reinforced corrugated walls and impact-cushioned lining to ensure 100% safe transit.
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="font-bold text-zinc-900 dark:text-white">Tracking & Dispatch Notifications</h3>
              <p className="leading-relaxed">
                Once the artisan registers the package with the courier, you will receive an instant email confirmation containing the tracking link and estimated arrival date.
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="font-bold text-zinc-900 dark:text-white">Lost or Delayed Deliveries</h3>
              <p className="leading-relaxed">
                If your parcel has not moved for more than 7 business days past the expected arrival, our customer care concierge will initiate an investigation with the carrier immediately.
              </p>
            </div>
          </div>

          <div className="pt-6 border-t border-zinc-100 dark:border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-zinc-500 dark:text-zinc-400 text-xs sm:text-sm">
              <HelpCircle className="w-4 h-4 text-emerald-500" />
              <span>Have questions regarding an active delivery?</span>
            </div>
            <div className="flex items-center gap-3">
              <Link href="/contact">
                <Button variant="outline" size="sm" className="rounded-xl">Contact Support</Button>
              </Link>
              <Link href="/faq">
                <Button variant="ghost" size="sm" className="text-emerald-600 rounded-xl gap-1">
                  Read FAQs <ArrowRight className="w-3.5 h-3.5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
