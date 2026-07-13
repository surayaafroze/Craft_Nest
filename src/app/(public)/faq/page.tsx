"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const FAQS = [
  {
    question: "How do I purchase an item?",
    answer: "CraftNest connects you directly with artisans. Currently, we act as a portfolio and discovery platform. To purchase, you can contact the artisan directly through the links provided on their profile or item page."
  },
  {
    question: "How do I become a seller?",
    answer: "Anyone can become a seller! Simply create an account, go to your Dashboard, and click 'Add New Item'. You can immediately start listing your handcrafted goods."
  },
  {
    question: "What types of items are allowed on CraftNest?",
    answer: "We strictly allow only handmade, vintage, or custom-crafted items. Mass-produced goods are not permitted on the platform to maintain the integrity of our artisan community."
  },
  {
    question: "Is there a fee to list items?",
    answer: "No, listing items on CraftNest is completely free. We believe in empowering artisans without upfront costs."
  },
  {
    question: "How do reviews work?",
    answer: "Any registered user can leave a review on an item, provided they are not the owner of that item. Reviews help build trust within the community."
  }
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center space-y-4 mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-extrabold font-heading text-zinc-900 dark:text-white"
          >
            Frequently Asked Questions
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-zinc-600 dark:text-zinc-400"
          >
            Everything you need to know about using CraftNest.
          </motion.p>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-4"
        >
          {FAQS.map((faq, index) => (
            <div 
              key={index} 
              className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl overflow-hidden shadow-sm"
            >
              <button
                className="w-full text-left px-6 py-5 flex items-center justify-between focus:outline-none"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span className="font-bold text-zinc-900 dark:text-white text-lg">{faq.question}</span>
                <ChevronDown className={`w-5 h-5 text-zinc-500 transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''}`} />
              </button>
              
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="px-6 pb-6 text-zinc-600 dark:text-zinc-300 leading-relaxed border-t border-zinc-100 dark:border-zinc-800 pt-4 mt-2">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
