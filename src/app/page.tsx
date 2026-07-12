"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useToast } from "@/providers/toast-provider";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import Spinner from "@/components/ui/Spinner";

interface FeaturedItem {
  id: string;
  title: string;
  category: string;
  artisan: string;
  price: string;
  image: string;
}

export default function HomePage() {
  const { showToast } = useToast();
  const [activeSlide, setActiveSlide] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const featuredItems: FeaturedItem[] = [
    {
      id: "f1",
      title: "Hand-Thrown Speckled Ceramic Vase",
      category: "Ceramics",
      artisan: "Elena Rostova",
      price: "$84.00",
      image: "https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?auto=format&fit=crop&q=80&w=800",
    },
    {
      id: "f2",
      title: "Heritage Full-Grain Leather Satchel",
      category: "Leather Goods",
      artisan: "Marcus Thorne",
      price: "$210.00",
      image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&q=80&w=800",
    },
    {
      id: "f3",
      title: "Live-Edge Solid Walnut Coffee Table",
      category: "Woodworking",
      artisan: "Silas Miller",
      price: "$450.00",
      image: "https://images.unsplash.com/photo-1533090161767 -e6ffed986c88?auto=format&fit=crop&q=80&w=800",
    },
  ];

  // Simulate dynamic asset loading or validation
  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        // Simple assertion to verify featuredItems availability
        if (featuredItems.length === 0) {
          throw new Error("No featured items available");
        }
        setLoading(false);
      } catch (err: any) {
        setError(err.message || "Failed to load featured items");
        showToast("Error loading featured assets", "error");
        setLoading(false);
      }
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  // Slide rotation timer
  useEffect(() => {
    if (loading || error) return;
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % featuredItems.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [loading, error]);

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center bg-zinc-50 dark:bg-zinc-950 transition-colors">
        <div className="flex flex-col items-center gap-4">
          <Spinner className="h-10 w-10 text-emerald-600 dark:text-emerald-450 animate-spin" />
          <p className="text-sm font-medium text-zinc-500">Loading featured crafts...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center px-4 bg-zinc-50 dark:bg-zinc-950 transition-colors">
        <div className="w-full max-w-md text-center p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-xl">
          <div className="h-12 w-12 rounded-full bg-red-100 dark:bg-red-950/30 text-red-600 dark:text-red-450 flex items-center justify-center mx-auto mb-4">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-2">Error Loading Assets</h3>
          <p className="text-sm text-zinc-500 mb-6">{error}</p>
          <Button onClick={() => window.location.reload()} variant="primary" className="rounded-xl">
            Retry
          </Button>
        </div>
      </div>
    );
  }

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-emerald-50 via-white to-zinc-50 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950 min-h-[65vh] flex items-center py-16 sm:py-24 transition-colors">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* CTA Info Column */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6 text-left"
          >
            <Badge variant="success" className="px-3 py-1">
              Artisan Marketplace
            </Badge>
            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-zinc-950 dark:text-white leading-[1.1] font-heading">
              Handcrafted Goods, <br />
              <span className="bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">
                Made with Passion.
              </span>
            </h1>
            <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 max-w-lg leading-relaxed">
              Explore CraftNest, a premium curated marketplace connecting independent artisans with those who appreciate the beauty of human craft. Every item has a soul, a builder, and a story.
            </p>
            <div className="flex gap-4">
              <Link href="/explore">
                <Button variant="primary" size="lg" className="rounded-xl shadow-lg shadow-emerald-500/20">
                  Explore Items
                </Button>
              </Link>
              <Link href="/about">
                <Button variant="outline" size="lg" className="rounded-xl">
                  Our Mission
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* Featured Slider Column */}
          <div className="relative h-[320px] sm:h-[400px] w-full flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSlide}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0 rounded-3xl overflow-hidden border border-zinc-200 dark:border-zinc-800 shadow-2xl bg-zinc-100 dark:bg-zinc-900 group"
              >
                <img
                  src={featuredItems[activeSlide].image}
                  alt={featuredItems[activeSlide].title}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6 sm:p-8 text-left">
                  <span className="text-emerald-400 text-xs sm:text-sm font-semibold tracking-wider uppercase mb-1">
                    Featured in {featuredItems[activeSlide].category}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 leading-tight">
                    {featuredItems[activeSlide].title}
                  </h3>
                  <div className="flex justify-between items-center text-zinc-300 text-sm">
                    <span>By {featuredItems[activeSlide].artisan}</span>
                    <span className="text-white font-semibold text-lg">{featuredItems[activeSlide].price}</span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Slider Navigation Dots */}
            <div className="absolute -bottom-6 flex gap-2 justify-center z-25">
              {featuredItems.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveSlide(i)}
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    activeSlide === i ? "w-6 bg-emerald-600 dark:bg-emerald-400" : "w-2.5 bg-zinc-300 dark:bg-zinc-700"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
