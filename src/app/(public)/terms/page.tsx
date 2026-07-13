"use client";

import React from "react";
import { motion } from "framer-motion";

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 pt-28 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-zinc-900 rounded-3xl p-8 sm:p-12 border border-zinc-200 dark:border-zinc-800 shadow-sm"
        >
          <div className="mb-10 pb-10 border-b border-zinc-100 dark:border-zinc-800">
            <h1 className="text-4xl font-extrabold font-heading text-zinc-900 dark:text-white mb-4">Terms of Service</h1>
            <p className="text-zinc-500">Last updated: July 13, 2026</p>
          </div>

          <div className="prose dark:prose-invert max-w-none prose-emerald prose-headings:font-heading prose-headings:font-bold">
            <h2>1. Acceptance of Terms</h2>
            <p>
              By accessing or using the CraftNest website, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any part of these terms, you may not use our services.
            </p>

            <h2>2. User Accounts</h2>
            <p>
              When you create an account with us, you must provide accurate, complete, and current information. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account on our Service.
            </p>

            <h2>3. Seller Responsibilities</h2>
            <p>
              Sellers on CraftNest must ensure that all items listed are authentic, handcrafted, vintage, or craft supplies. Sellers are responsible for accurately describing their items and setting their own prices.
            </p>

            <h2>4. Intellectual Property</h2>
            <p>
              The Service and its original content (excluding Content provided by users), features and functionality are and will remain the exclusive property of CraftNest and its licensors.
            </p>
            
            <h2>5. Termination</h2>
            <p>
              We may terminate or suspend your account immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
