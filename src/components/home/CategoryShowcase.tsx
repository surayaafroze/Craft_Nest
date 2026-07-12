"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Badge from "@/components/ui/Badge";

const categories = [
  {
    name: "Ceramics",
    description: "Hand-thrown pottery and kilned clay works",
    image: "https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&q=80&w=800",
  },
  {
    name: "Woodworking",
    description: "Solid wood furniture and carved art",
    image: "https://images.unsplash.com/photo-1542013898-752178bd0268?auto=format&fit=crop&q=80&w=800",
  },
  {
    name: "Leather Goods",
    description: "Hand-stitched leather apparel and accessories",
    image: "https://images.unsplash.com/photo-1605333552097-fc6db2cdd74e?auto=format&fit=crop&q=80&w=800",
  },
  {
    name: "Jewelry",
    description: "Custom forged metals and stones",
    image: "https://images.unsplash.com/photo-1599643478514-4a4e09f52f75?auto=format&fit=crop&q=80&w=800",
  },
  {
    name: "Textiles",
    description: "Woven fabrics and hand-dyed yarns",
    image: "https://images.unsplash.com/photo-1558904541-efa843a96f13?auto=format&fit=crop&q=80&w=800",
  },
  {
    name: "Glass Art",
    description: "Blown glass and stained glass decor",
    image: "https://images.unsplash.com/photo-1579541355447-e179bc3ec36e?auto=format&fit=crop&q=80&w=800",
  },
];

export function CategoryShowcase() {
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
    </section>
  );
}
