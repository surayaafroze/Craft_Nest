"use client";

import React from "react";
import { motion } from "framer-motion";

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 pt-28 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-zinc-900 rounded-3xl p-8 sm:p-12 border border-zinc-200 dark:border-zinc-800 shadow-sm"
        >
          <div className="mb-10 pb-10 border-b border-zinc-100 dark:border-zinc-800">
            <h1 className="text-4xl font-extrabold font-heading text-zinc-900 dark:text-white mb-4">Privacy Policy</h1>
            <p className="text-zinc-500">Last updated: July 13, 2026</p>
          </div>

          <div className="prose dark:prose-invert max-w-none prose-emerald prose-headings:font-heading prose-headings:font-bold">
            <h2>1. Information We Collect</h2>
            <p>
              We collect information you provide directly to us when you create an account, update your profile, use the interactive features of our Services, participate in contests, promotions or surveys, communicate with us via third party social media sites, request customer support or otherwise communicate with us.
            </p>

            <h2>2. Use of Information</h2>
            <p>
              We may use the information we collect from and about you to:
            </p>
            <ul>
              <li>Provide, maintain, and improve our Services;</li>
              <li>Process transactions and send related information, including confirmations and receipts;</li>
              <li>Send you technical notices, updates, security alerts and support and administrative messages;</li>
              <li>Respond to your comments, questions and requests and provide customer service;</li>
            </ul>

            <h2>3. Sharing of Information</h2>
            <p>
              We do not share your personal information with third parties except as described in this privacy policy. We may share personal information with vendors, consultants and other service providers who need access to such information to carry out work on our behalf.
            </p>

            <h2>4. Security</h2>
            <p>
              CraftNest takes reasonable measures to help protect information about you from loss, theft, misuse and unauthorized access, disclosure, alteration and destruction.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
