"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Heart, Globe, Shield, Users } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 pt-28 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto space-y-24">
        
        {/* Hero */}
        <div className="text-center max-w-3xl mx-auto space-y-8">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl sm:text-6xl font-extrabold font-heading text-zinc-900 dark:text-white leading-tight"
          >
            Empowering Independent Artisans Globally.
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-zinc-600 dark:text-zinc-400"
          >
            CraftNest is the premier destination for finding truly unique, handcrafted goods directly from the makers who pour their hearts into every piece.
          </motion.p>
        </div>

        {/* Image Grid */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <div className="aspect-[4/5] rounded-3xl overflow-hidden bg-zinc-200">
            <img src="https://images.unsplash.com/photo-1452860606245-08befc0ff44b?q=80&w=800&auto=format&fit=crop" alt="Pottery" className="w-full h-full object-cover" />
          </div>
          <div className="aspect-[4/5] rounded-3xl overflow-hidden bg-zinc-200 md:mt-12">
            <img src="https://images.unsplash.com/photo-1544441893-675973e31985?q=80&w=800&auto=format&fit=crop" alt="Clothing" className="w-full h-full object-cover" />
          </div>
          <div className="aspect-[4/5] rounded-3xl overflow-hidden bg-zinc-200">
            <img src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=800&auto=format&fit=crop" alt="Fashion" className="w-full h-full object-cover" />
          </div>
        </motion.div>

        {/* Core Values */}
        <div className="bg-white dark:bg-zinc-900 rounded-3xl p-10 sm:p-16 border border-zinc-200 dark:border-zinc-800">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold font-heading text-zinc-900 dark:text-white">Our Core Values</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {[
              { icon: Heart, title: "Passion First", desc: "We believe in the power of human creativity and the passion of independent makers." },
              { icon: Globe, title: "Global Community", desc: "Connecting local artisans with buyers across the world without borders." },
              { icon: Shield, title: "Authenticity", desc: "Every item on CraftNest is guaranteed to be authentically handcrafted." },
              { icon: Users, title: "Fair Trade", desc: "Makers keep the majority of their sales, supporting sustainable livelihoods." }
            ].map((value, i) => (
              <div key={i} className="text-center flex flex-col items-center">
                <div className="w-16 h-16 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 rounded-2xl flex items-center justify-center mb-6">
                  <value.icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold font-heading text-zinc-900 dark:text-white mb-3">{value.title}</h3>
                <p className="text-zinc-600 dark:text-zinc-400">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center space-y-8 pb-10">
          <h2 className="text-3xl font-extrabold font-heading text-zinc-900 dark:text-white">Ready to join the nest?</h2>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/explore">
              <Button size="lg" className="rounded-xl px-8 w-full sm:w-auto">Explore Items</Button>
            </Link>
            <Link href="/register">
              <Button variant="outline" size="lg" className="rounded-xl px-8 w-full sm:w-auto">Become a Maker</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
