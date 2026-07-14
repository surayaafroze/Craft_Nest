"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import ErrorState from "@/components/ui/ErrorState";

const BLOG_POSTS = {
  "ceramic-glazing": {
    title: "The Art of Ceramic Glazing",
    category: "Craftsmanship",
    date: "July 13, 2026",
    author: "Elena Rossi",
    image: "/images/seed/ceramic-bowl.png",
    content: `Glazing is arguably the most magical part of the pottery process. It is where science meets art, and where a simple clay vessel is transformed into a functional piece of beauty. 

The process begins with selecting the right glaze, which is essentially a mixture of silica, fluxes, and alumina. Artisans carefully dip, pour, or brush the glaze onto the bisqueware. When fired in the kiln at extreme temperatures, these raw materials melt and fuse into a glass-like coating.

What makes handmade ceramics so special is the unpredictability of the kiln. Even master potters cannot always predict exactly how a glaze will break over a texture or pool at the bottom of a bowl, making each piece entirely unique.`
  },
  "sustainable-leather": {
    title: "Sustainable Leather Sourcing",
    category: "Sustainability",
    date: "July 13, 2026",
    author: "James Chen",
    image: "/images/seed/leather-wallet.png",
    content: `In an era of fast fashion and disposable goods, the shift towards sustainable materials is more critical than ever. The leather industry has historically been scrutinized for its environmental impact, but ethical tanneries are changing the landscape.

By utilizing vegetable tanning methods—using natural tannins from tree bark instead of harmful chemicals like chromium—artisans can create beautiful, durable leather goods without the toxic runoff. This process takes much longer, often months instead of days, but the result is a product that ages gracefully and develops a unique patina over time.

Choosing sustainable, handcrafted leather goods means supporting an eco-friendly economy and ensuring that the products we bring into our lives are crafted with respect for the planet.`
  },
  "sustainable-materials": {
    title: "Sustainable Leather Sourcing",
    category: "Sustainability",
    date: "July 13, 2026",
    author: "James Chen",
    image: "/images/seed/leather-wallet.png",
    content: `In an era of fast fashion and disposable goods, the shift towards sustainable materials is more critical than ever. The leather industry has historically been scrutinized for its environmental impact, but ethical tanneries are changing the landscape.

By utilizing vegetable tanning methods—using natural tannins from tree bark instead of harmful chemicals like chromium—artisans can create beautiful, durable leather goods without the toxic runoff. This process takes much longer, often months instead of days, but the result is a product that ages gracefully and develops a unique patina over time.

Choosing sustainable, handcrafted leather goods means supporting an eco-friendly economy and ensuring that the products we bring into our lives are crafted with respect for the planet.`
  },
  "wood-joinery": {
    title: "Mastering Wood Joinery",
    category: "Behind the Scenes",
    date: "July 13, 2026",
    author: "Maya Patel",
    image: "/images/seed/walnut-box.png",
    content: `Wood joinery is the true test of a furniture maker's skill. Long before screws and nails became commonplace, artisans relied on the mechanical strength of interlocking wood to build structures that would last for generations.

The dovetail joint is perhaps the most famous. Its interlocking pins and tails create a bond with incredible tensile strength, making it ideal for drawer construction. Mortise and tenon joints, on the other hand, are the backbone of chair and table frames.

The beauty of traditional joinery lies in its precision. A well-cut joint fits together seamlessly, often requiring no glue at all. These techniques celebrate the natural properties of wood and the meticulous, intentional art of making things by hand.`
  }
};

export default function BlogPostPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;
  
  const post = BLOG_POSTS[slug as keyof typeof BLOG_POSTS];

  if (!post) {
    return (
      <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 pt-28 pb-16">
        <ErrorState
          title="Post Not Found"
          description="The article you are looking for does not exist."
          onAction={() => router.push("/blog")}
          actionText="Back to Journal"
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 pb-20">
      {/* Hero Image */}
      <div className="w-full h-[40vh] sm:h-[50vh] relative bg-zinc-200 dark:bg-zinc-800">
        <img 
          src={post.image} 
          alt={post.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 -mt-32 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-zinc-900 rounded-3xl p-8 sm:p-12 shadow-xl border border-zinc-200 dark:border-zinc-800"
        >
          <Link 
            href="/blog" 
            className="inline-flex items-center text-sm font-bold text-zinc-500 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors mb-8 uppercase tracking-wider"
          >
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Journal
          </Link>

          <div className="flex items-center gap-3 mb-6">
            <span className="bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-300 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
              {post.category}
            </span>
            <span className="text-zinc-400 text-sm">{post.date}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-heading text-zinc-900 dark:text-white leading-tight mb-8">
            {post.title}
          </h1>

          <div className="flex items-center gap-3 mb-10 pb-10 border-b border-zinc-100 dark:border-zinc-800">
            <div className="w-10 h-10 rounded-full bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center font-bold text-zinc-500">
              {post.author.charAt(0)}
            </div>
            <div>
              <p className="text-sm font-bold text-zinc-900 dark:text-white">{post.author}</p>
              <p className="text-xs text-zinc-500">CraftNest Editorial</p>
            </div>
          </div>

          <div className="prose dark:prose-invert max-w-none prose-emerald prose-lg leading-relaxed text-zinc-600 dark:text-zinc-300 whitespace-pre-wrap">
            {post.content}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
