"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { 
  ArrowRight, ShieldCheck, Paintbrush, 
  LayoutDashboard, Star, Users, Briefcase, 
  ShoppingBag, Mail, Send, ChevronLeft, ChevronRight,
  TrendingUp, Award, Clock
} from "lucide-react";
import { ItemCard } from "@/components/items/ItemCard";
import { ItemCardSkeleton } from "@/components/items/ItemCardSkeleton";
import { Button } from "@/components/ui/Button";
import FormInput from "@/components/ui/FormInput";
import toast from "react-hot-toast";
import { Item } from "@/types/item";

const serverUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

// Custom Colors from Blueprint
const colors = {
  primary: "#C1662F",   // Terracotta
  secondary: "#0F6B66", // Deep Teal
  accent: "#D9A441"     // Warm Gold
};

const CATEGORIES = [
  { name: "Ceramics", image: "https://images.unsplash.com/photo-1610701596007-11502861dcfa?q=80&w=600&auto=format&fit=crop" },
  { name: "Woodworking", image: "https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?q=80&w=600&auto=format&fit=crop" },
  { name: "Textiles", image: "https://images.unsplash.com/photo-1528318269466-69d953d630f7?q=80&w=600&auto=format&fit=crop" },
  { name: "Jewelry", image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=600&auto=format&fit=crop" }
];

const TESTIMONIALS = [
  { name: "Sarah Jenkins", role: "Art Collector", text: "CraftNest changed how I discover independent artists. The quality is unmatched.", rating: 5 },
  { name: "David Chen", role: "Interior Designer", text: "I source almost all my bespoke ceramic pieces from makers I found on this platform.", rating: 5 },
  { name: "Maria Garcia", role: "Handmade Enthusiast", text: "A truly beautiful, premium experience from browsing to buying.", rating: 5 }
];

export default function HomePage() {
  const [trendingItems, setTrendingItems] = useState<Item[]>([]);
  const [loadingItems, setLoadingItems] = useState(true);
  
  const [stats, setStats] = useState({ totalUsers: 0, totalItems: 0, approvedItems: 0, totalReviews: 0 });
  const [contributors, setContributors] = useState<any[]>([]);
  const [blogPosts, setBlogPosts] = useState<any[]>([]);
  
  const [email, setEmail] = useState("");
  const [loadingNewsletter, setLoadingNewsletter] = useState(false);
  
  const [heroSlide, setHeroSlide] = useState(0);

  useEffect(() => {
    // 1. Fetch Trending Items (Exactly 8, sorted by newest)
    fetch(`/api/backend/items?limit=8&sort=newest`)
      .then(res => res.json())
      .then(data => {
        setTrendingItems(data.items || []);
        setLoadingItems(false);
      })
      .catch(() => setLoadingItems(false));

    // 2. Fetch Statistics
    fetch(`/api/backend/home/statistics`)
      .then(res => res.json())
      .then(data => {
        if(data.success) setStats(data.data);
      }).catch(console.error);

    // 3. Fetch Top Contributors
    fetch(`/api/backend/home/top-contributors`)
      .then(res => res.json())
      .then(data => {
        if(data.success) setContributors(data.data);
      }).catch(console.error);

    // 4. Fetch Blog Preview
    fetch(`/api/backend/home/blog-preview`)
      .then(res => res.json())
      .then(data => {
        if(data.success) setBlogPosts(data.data);
      }).catch(console.error);
      
    // Auto-rotate hero slide
    const interval = setInterval(() => {
      setHeroSlide(prev => (prev + 1) % 3);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleNewsletter = async (e: React.FormEvent) => {
    e.preventDefault();
    if(!email) return;
    
    setLoadingNewsletter(true);
    try {
      const res = await fetch(`/api/backend/home/newsletter`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email })
      });
      const data = await res.json();
      
      if(data.success) {
        toast.success(data.message || "Subscribed successfully!");
        setEmail("");
      } else {
        toast.error(data.message || "Subscription failed");
      }
    } catch(err) {
      toast.error("Network error. Try again later.");
    } finally {
      setLoadingNewsletter(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 overflow-hidden">
      
      {/* 1. HERO SECTION */}
      <section className="relative h-[80vh] min-h-[600px] flex items-center justify-center overflow-hidden">
        {/* Background Slider */}
        <AnimatePresence mode="wait">
          <motion.div
            key={heroSlide}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0 z-0"
          >
            <div className="absolute inset-0 bg-black/50 z-10" />
            <img 
              src={[
                "https://images.unsplash.com/photo-1452860606245-08befc0ff44b?q=80&w=1920&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1920&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1544441893-675973e31985?q=80&w=1920&auto=format&fit=crop"
              ][heroSlide]}
              alt="Hero Background"
              className="w-full h-full object-cover"
            />
          </motion.div>
        </AnimatePresence>

        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-extrabold font-heading text-white mb-6 drop-shadow-md"
          >
            Discover the World's<br/>Finest Handcrafted Goods
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg md:text-xl text-zinc-200 mb-10 max-w-2xl mx-auto drop-shadow-sm"
          >
            CraftNest is the premier portfolio and marketplace for independent artisans. Connect with makers who pour their passion into every unique piece.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link href="/explore">
              <Button size="lg" className="rounded-full px-8 text-white text-lg font-bold shadow-lg hover:scale-105 transition-transform" style={{ backgroundColor: colors.primary }}>
                Explore Collection
              </Button>
            </Link>
            <Link href="/register">
              <Button variant="outline" size="lg" className="rounded-full px-8 text-lg font-bold bg-white/10 text-white border-white/30 backdrop-blur-md hover:bg-white/20 hover:scale-105 transition-transform">
                Join as Artisan
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* 2. CATEGORY SHOWCASE */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-extrabold font-heading text-zinc-900 dark:text-white"
          >
            Explore by Category
          </motion.h2>
          <div className="w-24 h-1 mx-auto mt-4 rounded-full" style={{ backgroundColor: colors.accent }} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CATEGORIES.map((cat, i) => (
            <Link key={cat.name} href={`/explore?category=${encodeURIComponent(cat.name)}`}>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -10 }}
                className="group relative h-80 rounded-3xl overflow-hidden shadow-sm cursor-pointer"
              >
                <img src={cat.image} alt={cat.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <h3 className="text-2xl font-bold font-heading text-white group-hover:text-[var(--accent)] transition-colors" style={{ '--accent': colors.accent } as any}>
                    {cat.name}
                  </h3>
                  <div className="flex items-center text-white/80 mt-2 text-sm font-medium group-hover:text-white transition-colors">
                    Browse Collection <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-2" />
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </section>

      {/* 3. TRENDING ITEMS */}
      <section className="py-24 bg-zinc-100 dark:bg-zinc-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-end mb-12 gap-4">
            <div>
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-3xl md:text-4xl font-extrabold font-heading text-zinc-900 dark:text-white"
              >
                Trending Masterpieces
              </motion.h2>
              <div className="w-24 h-1 mt-4 rounded-full" style={{ backgroundColor: colors.primary }} />
            </div>
            <Link href="/explore">
              <Button variant="outline" className="rounded-full">View All Items</Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {loadingItems ? (
              Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="h-full">
                  <ItemCardSkeleton />
                </div>
              ))
            ) : trendingItems.length > 0 ? (
              trendingItems.map((item, i) => (
                <motion.div 
                  key={(item as any)._id || item.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: (i % 4) * 0.1 }}
                  className="h-full"
                >
                  <ItemCard item={item} />
                </motion.div>
              ))
            ) : (
              <div className="col-span-full py-12 text-center text-zinc-500">
                No items found.
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 4. WHY CRAFTNEST */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-extrabold font-heading text-zinc-900 dark:text-white"
          >
            Why Choose CraftNest
          </motion.h2>
          <div className="w-24 h-1 mx-auto mt-4 rounded-full" style={{ backgroundColor: colors.secondary }} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: Users, title: "Handmade Community", desc: "Connect directly with authentic makers from around the globe." },
            { icon: ShieldCheck, title: "Secure Platform", desc: "Robust authentication and secure profiles for ultimate peace of mind." },
            { icon: Paintbrush, title: "Creative Portfolio", desc: "Artisans can beautifully showcase their life's work in one place." },
            { icon: LayoutDashboard, title: "Modern Dashboard", desc: "Sleek, intuitive tools for managing items, reviews, and analytics." },
            { icon: Briefcase, title: "Easy Management", desc: "Effortlessly list, edit, and track your artisan inventory." },
            { icon: Star, title: "Premium Experience", desc: "A carefully curated, highly polished interface focused on aesthetics." }
          ].map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-white dark:bg-zinc-900 p-8 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-sm text-center"
            >
              <div className="w-16 h-16 mx-auto rounded-2xl flex items-center justify-center mb-6 shadow-inner" style={{ backgroundColor: `${colors.secondary}15`, color: colors.secondary }}>
                <feature.icon className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold font-heading text-zinc-900 dark:text-white mb-3">{feature.title}</h3>
              <p className="text-zinc-600 dark:text-zinc-400">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 5. PLATFORM STATISTICS */}
      <section className="py-20 relative overflow-hidden" style={{ backgroundColor: colors.secondary }}>
        {/* Decorative pattern */}
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/cubes.png')" }} />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { label: "Total Artisans", value: stats.totalUsers, icon: Users },
              { label: "Unique Items", value: stats.totalItems, icon: ShoppingBag },
              { label: "Verified Reviews", value: stats.totalReviews, icon: Star },
              { label: "Approved Crafts", value: stats.approvedItems, icon: ShieldCheck }
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, type: "spring" }}
                className="flex flex-col items-center"
              >
                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center text-white mb-4 backdrop-blur-sm">
                  <stat.icon className="w-6 h-6" />
                </div>
                <h4 className="text-4xl md:text-5xl font-extrabold font-heading text-white mb-2 tracking-tight">
                  {stat.value.toLocaleString()}+
                </h4>
                <p className="text-white/80 font-medium tracking-wide uppercase text-sm">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. TESTIMONIALS */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-extrabold font-heading text-zinc-900 dark:text-white"
          >
            Loved by the Community
          </motion.h2>
          <div className="w-24 h-1 mx-auto mt-4 rounded-full" style={{ backgroundColor: colors.accent }} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((test, i) => (
            <motion.div
              key={test.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-zinc-50 dark:bg-zinc-900 p-8 rounded-3xl border border-zinc-200 dark:border-zinc-800"
            >
              <div className="flex text-amber-400 mb-6">
                {[...Array(test.rating)].map((_, j) => <Star key={j} className="w-5 h-5 fill-current" />)}
              </div>
              <p className="text-lg text-zinc-700 dark:text-zinc-300 italic mb-8">"{test.text}"</p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-zinc-200 dark:bg-zinc-800 overflow-hidden">
                  <img src={`https://api.dicebear.com/7.x/initials/svg?seed=${test.name}`} alt={test.name} className="w-full h-full" />
                </div>
                <div>
                  <h4 className="font-bold text-zinc-900 dark:text-white font-heading">{test.name}</h4>
                  <p className="text-sm text-zinc-500">{test.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 7. TOP CONTRIBUTORS */}
      <section className="py-24 bg-zinc-100 dark:bg-zinc-900/50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-extrabold font-heading text-zinc-900 dark:text-white"
            >
              Master Artisans
            </motion.h2>
            <div className="w-24 h-1 mx-auto mt-4 rounded-full" style={{ backgroundColor: colors.primary }} />
          </div>

          <div className="flex overflow-x-auto pb-8 -mx-4 px-4 sm:px-0 sm:mx-0 snap-x hide-scrollbar gap-6">
            {contributors.map((user, i) => (
              <motion.div
                key={user.id}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="min-w-[280px] sm:min-w-[320px] snap-center bg-white dark:bg-zinc-900 p-8 rounded-3xl border border-zinc-200 dark:border-zinc-800 flex flex-col items-center text-center flex-shrink-0 hover:shadow-lg transition-shadow"
              >
                <div className="w-24 h-24 rounded-full overflow-hidden mb-6 border-4" style={{ borderColor: `${colors.accent}40` }}>
                  <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                </div>
                <h3 className="text-xl font-bold font-heading text-zinc-900 dark:text-white">{user.name}</h3>
                <p className="text-sm text-zinc-500 mb-6">{user.role}</p>
                <div className="w-full flex justify-between items-center pt-6 border-t border-zinc-100 dark:border-zinc-800">
                  <div className="text-center">
                    <p className="text-xs text-zinc-500 uppercase tracking-wider font-bold">Sales</p>
                    <p className="text-lg font-bold text-zinc-900 dark:text-white">{user.sales}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-zinc-500 uppercase tracking-wider font-bold">Rating</p>
                    <div className="flex items-center text-amber-500">
                      <Star className="w-4 h-4 fill-current mr-1" />
                      <span className="text-lg font-bold">4.9</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. LATEST BLOG PREVIEW */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-end mb-12 gap-4">
          <div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-extrabold font-heading text-zinc-900 dark:text-white"
            >
              The CraftNest Journal
            </motion.h2>
            <div className="w-24 h-1 mt-4 rounded-full" style={{ backgroundColor: colors.secondary }} />
          </div>
          <Link href="/blog">
            <Button variant="outline" className="rounded-full">Read All Articles</Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blogPosts.map((post, i) => (
            <motion.div
              key={post.id || i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group bg-white dark:bg-zinc-900 rounded-3xl overflow-hidden shadow-sm border border-zinc-200 dark:border-zinc-800 flex flex-col"
            >
              <div className="h-48 overflow-hidden bg-zinc-200 relative">
                <img 
                  src={post.image || 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?q=80&w=600&auto=format&fit=crop'} 
                  alt={post.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                />
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <p className="text-xs font-bold text-zinc-400 mb-2">{new Date(post.createdAt || Date.now()).toLocaleDateString()}</p>
                <h3 className="text-xl font-bold font-heading text-zinc-900 dark:text-white mb-3 group-hover:text-[var(--primary)] transition-colors" style={{ '--primary': colors.primary } as any}>
                  {post.title}
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-6 flex-grow">{post.excerpt}</p>
                <Link href="/blog" className="inline-flex items-center text-sm font-bold transition-colors" style={{ color: colors.secondary }}>
                  Read Article <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 9. NEWSLETTER SECTION */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="rounded-3xl p-10 md:p-16 text-center relative overflow-hidden"
          style={{ backgroundColor: colors.secondary }}
        >
          <div className="absolute top-0 right-0 p-12 opacity-10 transform translate-x-1/2 -translate-y-1/2">
            <Mail className="w-64 h-64 text-white" />
          </div>
          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-extrabold font-heading text-white mb-6">
              Join the Maker's Circle
            </h2>
            <p className="text-lg text-white/80 mb-10">
              Subscribe to our newsletter for exclusive interviews, crafting tips, and first access to unique drops.
            </p>
            <form onSubmit={handleNewsletter} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="flex-grow px-6 py-4 rounded-full border-none focus:ring-4 focus:ring-white/20 text-zinc-900 text-lg shadow-inner outline-none placeholder:text-zinc-400"
              />
              <Button 
                type="submit" 
                size="lg" 
                loading={loadingNewsletter}
                className="rounded-full px-8 text-white text-lg font-bold border-none shadow-lg"
                style={{ backgroundColor: colors.primary }}
              >
                <Send className="w-5 h-5 mr-2" /> Subscribe
              </Button>
            </form>
          </div>
        </motion.div>
      </section>

    </div>
  );
}
