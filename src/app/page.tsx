"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useToast } from "@/providers/toast-provider";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import Spinner from "@/components/ui/Spinner";
import Avatar from "@/components/ui/Avatar";

interface FeaturedItem {
  id: string;
  title: string;
  category: string;
  artisan: string;
  price: string;
  image: string;
}

// Reusable Animated Counter Component
function AnimatedCounter({ value, duration = 2000 }: { value: number; duration?: number }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = value;
    if (start === end) return;

    const totalMiliseconds = duration;
    // Cap step times to maintain smooth animations
    const incrementTime = Math.max(Math.floor(totalMiliseconds / end), 15);
    const steps = totalMiliseconds / incrementTime;
    const stepValue = Math.ceil(end / steps);

    const timer = setInterval(() => {
      start += stepValue;
      if (start >= end) {
        clearInterval(timer);
        setCount(end);
      } else {
        setCount(start);
      }
    }, incrementTime);

    return () => clearInterval(timer);
  }, [value, duration]);

  return <>{count.toLocaleString()}</>;
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
      image: "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&q=80&w=800",
    },
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        if (featuredItems.length === 0) {
          throw new Error("No featured items available");
        }
        setLoading(false);
      } catch (err: any) {
        setError(err.message || "Failed to load featured items");
        showToast("Error loading featured assets", "error");
        setLoading(false);
      }
    }, 600);

    return () => clearTimeout(timer);
  }, []);

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
    <div className="space-y-24 pb-24">
      {/* ─── HERO SECTION ─── */}
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

      {/* ─── WHY CRAFTNEST SECTION ─── */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <Badge variant="success" className="px-3 py-1">
            Platform Core
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-950 dark:text-white font-heading">
            Why Shop on CraftNest?
          </h2>
          <p className="text-zinc-500 dark:text-zinc-400 max-w-md mx-auto">
            We value individual craft, sustainable raw materials, and supportive payouts for builders.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "100% Direct Support",
              description: "Artisans receive maximum payouts. There are no corporate markups or third-party distributors taking huge cuts.",
              icon: (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              ),
            },
            {
              title: "Exquisite Quality",
              description: "Every item undergoes platform verification to validate original design files, techniques, and workshop origins.",
              icon: (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
              ),
            },
            {
              title: "Sustainable Building",
              description: "We promote organic paints, non-toxic glazes, reclaimed timber, and eco-friendly packaging footprints.",
              icon: (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              ),
            },
          ].map((adv, index) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              key={index}
              className="rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200/60 dark:border-zinc-800/80 p-8 shadow-sm hover:shadow-md transition-shadow flex flex-col text-left"
            >
              <div className="h-12 w-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-6">
                {adv.icon}
              </div>
              <h3 className="font-bold text-zinc-950 dark:text-white text-lg mb-2">
                {adv.title}
              </h3>
              <p className="text-zinc-500 text-sm leading-relaxed">
                {adv.description}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ─── PLATFORM STATISTICS SECTION ─── */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-emerald-900 text-white p-8 sm:p-12 shadow-xl dark:bg-zinc-900 border dark:border-zinc-800 relative overflow-hidden">
          <div className="absolute top-0 right-0 h-48 w-48 rounded-full bg-emerald-800/20 blur-3xl" />
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center relative z-10">
            <div>
              <p className="text-3xl sm:text-5xl font-extrabold mb-2 font-heading text-emerald-400">
                <AnimatedCounter value={1420} />+
              </p>
              <p className="text-xs sm:text-sm font-semibold text-emerald-100 dark:text-zinc-400 uppercase tracking-wider">
                Crafts Available
              </p>
            </div>
            <div>
              <p className="text-3xl sm:text-5xl font-extrabold mb-2 font-heading text-emerald-400">
                <AnimatedCounter value={380} />+
              </p>
              <p className="text-xs sm:text-sm font-semibold text-emerald-100 dark:text-zinc-400 uppercase tracking-wider">
                Active Artisans
              </p>
            </div>
            <div>
              <p className="text-3xl sm:text-5xl font-extrabold mb-2 font-heading text-emerald-400">
                <AnimatedCounter value={9200} />+
              </p>
              <p className="text-xs sm:text-sm font-semibold text-emerald-100 dark:text-zinc-400 uppercase tracking-wider">
                Happy Customers
              </p>
            </div>
            <div>
              <p className="text-3xl sm:text-5xl font-extrabold mb-2 font-heading text-emerald-400">
                <AnimatedCounter value={42} />
              </p>
              <p className="text-xs sm:text-sm font-semibold text-emerald-100 dark:text-zinc-400 uppercase tracking-wider">
                Countries Reached
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── TESTIMONIALS SECTION ─── */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <Badge variant="success" className="px-3 py-1">
            Testimonials
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-950 dark:text-white font-heading">
            Voices from the Hearth
          </h2>
          <p className="text-zinc-500 dark:text-zinc-400 max-w-md mx-auto">
            Read stories of builders and buyers on our collaborative handcrafted marketplace.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              quote: "The quality of the ceramic plates I bought is simply sublime. You can feel the artisan's fingerprints on the clay. It makes every dinner a celebration.",
              author: "Gabrielle Vance",
              role: "Art Collector",
              avatar: "https://api.dicebear.com/7.x/initials/svg?seed=gabrielle",
            },
            {
              quote: "CraftNest transformed my workshop hobby into a full-time livelihood. Their low fee margins mean I can invest back into premium materials.",
              author: "Marcus Thorne",
              role: "Master Leatherworker",
              avatar: "https://api.dicebear.com/7.x/initials/svg?seed=marcus",
            },
            {
              quote: "Shipping was exceptionally safe and packaged completely using biodegradable paper cushions. The walnut coffee table fits perfectly.",
              author: "Julian Reed",
              role: "Home Owner",
              avatar: "https://api.dicebear.com/7.x/initials/svg?seed=julian",
            },
          ].map((test, index) => (
            <motion.div
              whileHover={{ scale: 1.02 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              key={index}
              className="rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-8 shadow-sm flex flex-col justify-between text-left transition-all"
            >
              <p className="text-zinc-655 text-zinc-600 dark:text-zinc-350 dark:text-zinc-300 text-sm leading-relaxed italic mb-8">
                &ldquo;{test.quote}&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <Avatar src={test.avatar} alt={test.author} size="sm" />
                <div>
                  <h4 className="font-bold text-zinc-900 dark:text-white text-sm">
                    {test.author}
                  </h4>
                  <span className="text-zinc-400 text-xs">{test.role}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
