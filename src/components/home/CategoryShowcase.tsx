"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import Badge from "@/components/ui/Badge";
import Spinner from "@/components/ui/Spinner";

interface Category {
  name: string;
  description: string;
  image: string;
}

export function CategoryShowcase() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:5000";
        const res = await fetch(`${serverUrl}/api/categories`);
        const data = await res.json();
        if (data.success) {
          setCategories(data.data);
        }
      } catch (err) {
        console.error("Failed to fetch categories", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center space-y-4 mb-12">
        <Badge variant="success" className="px-3 py-1">
          Explore by Medium
        </Badge>
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-950 dark:text-white font-heading">
          Shop by Category
        </h2>
        <p className="text-zinc-500 dark:text-zinc-400 max-w-md mx-auto">
          Discover unique handcrafted goods curated into specialized mediums by expert artisans.
        </p>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Spinner className="h-8 w-8 text-emerald-600" />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, idx) => (
            <Link key={category.name} href={`/explore?category=${category.name}`}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                whileHover="hover"
                className="relative h-64 w-full rounded-3xl overflow-hidden group shadow-sm hover:shadow-xl transition-shadow cursor-pointer"
              >
                <motion.img
                  src={category.image}
                  alt={category.name}
                  className="absolute inset-0 h-full w-full object-cover"
                  variants={{
                    hover: { scale: 1.1 },
                  }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10 flex flex-col justify-end p-6">
                  <motion.div
                    variants={{
                      hover: { y: -5 },
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <h3 className="text-white text-2xl font-bold font-heading mb-1">
                      {category.name}
                    </h3>
                    <p className="text-zinc-300 text-sm">
                      {category.description}
                    </p>
                  </motion.div>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}
