"use client";

import React from "react";
import { motion } from "framer-motion";

export default function RefundsPage() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 pt-28 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-8 text-center">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl sm:text-5xl font-extrabold font-heading text-zinc-900 dark:text-white"
        >
          Refunds & Returns
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-lg text-zinc-600 dark:text-zinc-400"
        >
          Our refunds and returns policy is being updated to better serve you. If you have any immediate concerns regarding a recent order, please contact our support team.
        </motion.p>
      </div>
    </div>
  );
}
