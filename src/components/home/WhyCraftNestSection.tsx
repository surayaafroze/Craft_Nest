"use client";

import { motion } from "framer-motion";
import {
  Users,
  ShieldCheck,
  Paintbrush,
  LayoutDashboard,
  Briefcase,
  Star,
} from "lucide-react";

interface FeatureCard {
  icon: React.ElementType;
  title: string;
  desc: string;
}

const FEATURES: FeatureCard[] = [
  {
    icon: Users,
    title: "Handmade Community",
    desc: "Connect directly with authentic makers and independent artisans around the globe.",
  },
  {
    icon: ShieldCheck,
    title: "Secure Platform",
    desc: "Robust authentication and verified user profiles for ultimate trust and safety.",
  },
  {
    icon: Paintbrush,
    title: "Creative Portfolio",
    desc: "Artisans can beautifully showcase their life's work in one unified portfolio space.",
  },
  {
    icon: LayoutDashboard,
    title: "Modern Dashboard",
    desc: "Sleek, intuitive tools for managing items, reviews, and platform analytics.",
  },
  {
    icon: Briefcase,
    title: "Easy Management",
    desc: "Effortlessly list, edit, and track your artisan inventory with real-time status updates.",
  },
  {
    icon: Star,
    title: "Premium Experience",
    desc: "A carefully curated, highly polished interface focused on aesthetics and fluid motion.",
  },
];

export function WhyCraftNestSection() {
  return (
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
        <div className="w-24 h-1 mx-auto mt-4 rounded-full bg-[#0F6B66]" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {FEATURES.map((feature, i) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            whileHover={{ y: -5 }}
            className="bg-white dark:bg-zinc-900 p-8 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-sm text-center transition-all hover:shadow-md"
          >
            <div className="w-16 h-16 mx-auto rounded-2xl flex items-center justify-center mb-6 bg-[#0F6B66]/10 text-[#0F6B66]">
              <feature.icon className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold font-heading text-zinc-900 dark:text-white mb-3">
              {feature.title}
            </h3>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed text-sm">
              {feature.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
