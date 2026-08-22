"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Search, MapPin, Star, Sparkles, ArrowRight, ShieldCheck } from "lucide-react";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import Avatar from "@/components/ui/Avatar";

interface Artisan {
  id: string;
  name: string;
  avatar: string;
  craft: string;
  category: string;
  location: string;
  rating: number;
  reviewsCount: number;
  itemCount: number;
  experienceYears: number;
  bio: string;
  featuredTags: string[];
  recentWorks: string[];
}

const ARTISANS: Artisan[] = [
  {
    id: "artisan-1",
    name: "Elena Rostova",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400",
    craft: "Ceramics & Stoneware Master",
    category: "Pottery & Ceramics",
    location: "Kyoto / Portland",
    rating: 4.95,
    reviewsCount: 142,
    itemCount: 28,
    experienceYears: 12,
    bio: "Specializing in wheel-thrown wabi-sabi porcelain and wood-fired stoneware vessels inspired by organic textures and earth minerals.",
    featuredTags: ["Wheel Thrown", "Natural Glaze", "Hand-Carved"],
    recentWorks: [
      "https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&q=80&w=300",
      "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&q=80&w=300"
    ]
  },
  {
    id: "artisan-2",
    name: "Marcus Vance",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400",
    craft: "Heirloom Woodworker",
    category: "Woodworking",
    location: "Asheville, NC",
    rating: 4.98,
    reviewsCount: 215,
    itemCount: 34,
    experienceYears: 15,
    bio: "Crafting live-edge walnut boards, acoustic sound resonators, and heirloom furniture sourced from sustainably harvested Appalachian timber.",
    featuredTags: ["Black Walnut", "Joinery", "Hand-Planed"],
    recentWorks: [
      "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=300",
      "https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&q=80&w=300"
    ]
  },
  {
    id: "artisan-3",
    name: "Aria Sterling",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=400",
    craft: "Metalsmith & Lapidary",
    category: "Jewelry",
    location: "Santa Fe, NM",
    rating: 4.92,
    reviewsCount: 98,
    itemCount: 19,
    experienceYears: 8,
    bio: "Hand-forging recycled sterling silver and 18k gold jewelry featuring raw ethically-mined gemstones and celestial engravings.",
    featuredTags: ["Recycled Silver", "Raw Gemstones", "Hand-Forged"],
    recentWorks: [
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&q=80&w=300",
      "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&q=80&w=300"
    ]
  },
  {
    id: "artisan-4",
    name: "Liam O'Connor",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400",
    craft: "Traditional Leather Guildsman",
    category: "Leathercraft",
    location: "Dublin / Austin",
    rating: 4.96,
    reviewsCount: 178,
    itemCount: 22,
    experienceYears: 10,
    bio: "Hand-stitched vegetable-tanned full grain leather goods built to age gracefully over decades using traditional saddle stitching.",
    featuredTags: ["Veg-Tan", "Saddle Stitch", "Brass Hardware"],
    recentWorks: [
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&q=80&w=300",
      "https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&q=80&w=300"
    ]
  },
  {
    id: "artisan-5",
    name: "Soraya Chen",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=400",
    craft: "Botanical Textile Weaver",
    category: "Textiles",
    location: "Vancouver, BC",
    rating: 4.91,
    reviewsCount: 84,
    itemCount: 15,
    experienceYears: 7,
    bio: "Loomed merino wool wall hangings and pure linen tablewares dyed with natural indigo, avocado pits, and foraged wild plants.",
    featuredTags: ["Natural Dyes", "Loom Woven", "Organic Linen"],
    recentWorks: [
      "https://images.unsplash.com/photo-1606744837616-56c9a5c6a6eb?auto=format&fit=crop&q=80&w=300",
      "https://images.unsplash.com/photo-1584589167171-541ce45f1eea?auto=format&fit=crop&q=80&w=300"
    ]
  },
  {
    id: "artisan-6",
    name: "Mateo Silva",
    avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&q=80&w=400",
    craft: "Blown Glass & Resin Sculptor",
    category: "Glasswork",
    location: "Barcelona, Spain",
    rating: 4.97,
    reviewsCount: 110,
    itemCount: 18,
    experienceYears: 11,
    bio: "Creating iridescent blown glass decanters and resin ocean dioramas inspired by Mediterranean coastal architecture and marine luminescence.",
    featuredTags: ["Hand-Blown", "Prismatic Glass", "Custom Colors"],
    recentWorks: [
      "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&q=80&w=300",
      "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&q=80&w=300"
    ]
  }
];

const CATEGORIES = ["All", "Pottery & Ceramics", "Woodworking", "Jewelry", "Leathercraft", "Textiles", "Glasswork"];

export default function ArtisansPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredArtisans = ARTISANS.filter((artisan) => {
    const matchesCategory = selectedCategory === "All" || artisan.category === selectedCategory;
    const matchesSearch =
      artisan.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      artisan.craft.toLowerCase().includes(searchQuery.toLowerCase()) ||
      artisan.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      artisan.bio.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 pt-28 pb-20 px-4 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto mb-12 text-center space-y-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-100/70 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs font-semibold uppercase tracking-wider"
        >
          <Sparkles className="w-3.5 h-3.5" />
          Master Crafters & Independent Guilds
        </motion.div>
        
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-heading text-zinc-900 dark:text-white tracking-tight"
        >
          Meet the Artisans Behind CraftNest
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="max-w-2xl mx-auto text-base sm:text-lg text-zinc-600 dark:text-zinc-400"
        >
          Every item on CraftNest has a story, molded with patience, precision, and lifelong dedication to heritage craftsmanship.
        </motion.p>

        {/* Search and Filters */}
        <div className="max-w-3xl mx-auto mt-8 space-y-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search artisans by name, specialty, materials or location..."
              className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-sm"
            />
          </div>

          {/* Category Chips */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
            {CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-1.5 rounded-xl text-xs sm:text-sm font-medium transition-all cursor-pointer ${
                  selectedCategory === category
                    ? "bg-emerald-600 text-white shadow-sm"
                    : "bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 border border-zinc-200 dark:border-zinc-800"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Artisans Grid */}
      <div className="max-w-7xl mx-auto">
        <AnimatePresence mode="popLayout">
          {filteredArtisans.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {filteredArtisans.map((artisan, index) => (
                <motion.div
                  key={artisan.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: index * 0.05 }}
                  className="group bg-white dark:bg-zinc-900 rounded-3xl p-6 border border-zinc-200 dark:border-zinc-800 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    {/* Header: Avatar, Name & Location */}
                    <div className="flex items-start gap-4">
                      <div className="relative">
                        <Avatar
                          src={artisan.avatar}
                          alt={artisan.name}
                          size="lg"
                          className="ring-2 ring-emerald-500/30 group-hover:ring-emerald-500 transition-all"
                        />
                        <span className="absolute -bottom-1 -right-1 bg-emerald-500 text-white p-1 rounded-full text-xs" title="Verified Master Artisan">
                          <ShieldCheck className="w-3.5 h-3.5" />
                        </span>
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h2 className="font-bold font-heading text-lg text-zinc-900 dark:text-white truncate">
                            {artisan.name}
                          </h2>
                          <div className="flex items-center text-amber-500 font-semibold text-xs gap-1">
                            <Star className="w-3.5 h-3.5 fill-current" />
                            <span>{artisan.rating}</span>
                            <span className="text-zinc-400">({artisan.reviewsCount})</span>
                          </div>
                        </div>
                        <p className="text-xs font-medium text-emerald-600 dark:text-emerald-400 truncate">
                          {artisan.craft}
                        </p>
                        <div className="flex items-center gap-1 text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                          <MapPin className="w-3 h-3 text-zinc-400" />
                          <span>{artisan.location}</span>
                          <span className="mx-1">•</span>
                          <span>{artisan.experienceYears} yrs craft</span>
                        </div>
                      </div>
                    </div>

                    {/* Bio */}
                    <p className="text-sm text-zinc-600 dark:text-zinc-400 line-clamp-3 leading-relaxed">
                      {artisan.bio}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5">
                      {artisan.featuredTags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-0.5 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 text-[11px] font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Recent Works Mini Gallery */}
                    <div className="pt-2">
                      <p className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider mb-2">Signature Works</p>
                      <div className="grid grid-cols-2 gap-2">
                        {artisan.recentWorks.map((workImg, wIdx) => (
                          <div key={wIdx} className="relative h-20 rounded-xl overflow-hidden bg-zinc-100 dark:bg-zinc-800">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={workImg}
                              alt={`${artisan.name} creation`}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="mt-6 pt-4 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between">
                    <span className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">
                      {artisan.itemCount} listed works
                    </span>
                    <Link href={`/explore?category=${encodeURIComponent(artisan.category)}`}>
                      <Button variant="outline" size="sm" className="rounded-xl text-xs gap-1 group/btn">
                        View Collection
                        <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-0.5" />
                      </Button>
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800">
              <p className="text-base text-zinc-500 dark:text-zinc-400">No artisans found matching your query.</p>
              <Button
                variant="ghost"
                onClick={() => {
                  setSelectedCategory("All");
                  setSearchQuery("");
                }}
                className="mt-4 text-emerald-600"
              >
                Reset filters
              </Button>
            </div>
          )}
        </AnimatePresence>

        {/* Join as an Artisan CTA Banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 rounded-3xl bg-gradient-to-br from-emerald-900 via-zinc-900 to-zinc-950 p-8 sm:p-12 text-white border border-emerald-800/40 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8"
        >
          <div className="space-y-3 max-w-xl text-center md:text-left z-10">
            <Badge variant="success" className="bg-emerald-500/20 text-emerald-300 border-emerald-500/30">
              Maker Invitation
            </Badge>
            <h3 className="text-2xl sm:text-3xl font-bold font-heading">
              Are you a maker or studio craftsperson?
            </h3>
            <p className="text-zinc-300 text-sm sm:text-base leading-relaxed">
              Showcase your handcrafted portfolio to a passionate community of patrons, collectors, and design lovers worldwide. No upfront listing fees.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto z-10">
            <Link href="/register" className="w-full sm:w-auto">
              <Button variant="primary" className="w-full sm:w-auto bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold px-6 py-3 rounded-2xl shadow-lg">
                Create Maker Profile
              </Button>
            </Link>
            <Link href="/faq" className="w-full sm:w-auto">
              <Button variant="outline" className="w-full sm:w-auto border-zinc-700 hover:bg-zinc-800 text-white px-6 py-3 rounded-2xl">
                Learn More
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
