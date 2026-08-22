"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { RotateCcw, ShieldCheck, CheckCircle2, XCircle, ArrowRight, HelpCircle, Sparkles, AlertCircle } from "lucide-react";
import Button from "@/components/ui/Button";

const PROCESS_STEPS = [
  {
    step: "01",
    title: "Initiate Request",
    desc: "Contact the maker or our support team within 30 days of package delivery with your order ID and brief reason."
  },
  {
    step: "02",
    title: "Receive Return Label",
    desc: "We will provide you with a pre-paid or designated return shipping label with the artisan studio's verified return address."
  },
  {
    step: "03",
    title: "Safe Repackaging",
    desc: "Pack the item securely in its original protective packaging to prevent transit breakage or surface abrasions."
  },
  {
    step: "04",
    title: "Refund or Replacement",
    desc: "Upon delivery and studio inspection, your full refund is processed within 3-5 business days to your original payment method."
  }
];

export default function RefundsPage() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 pt-28 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-100/70 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs font-semibold uppercase tracking-wider"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            30-Day Artisan Guarantee
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl sm:text-5xl font-extrabold font-heading text-zinc-900 dark:text-white"
          >
            Refunds & Return Policy
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="max-w-2xl mx-auto text-base sm:text-lg text-zinc-600 dark:text-zinc-400"
          >
            We take immense pride in the craft and uniqueness of every piece. If you are not completely enchanted with your purchase, we are here to make it right.
          </motion.p>
        </div>

        {/* 3 Pillars Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white dark:bg-zinc-900 rounded-3xl p-6 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-3"
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/70 border border-emerald-200 dark:border-emerald-800 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-zinc-900 dark:text-white text-base">30-Day Peace of Mind</h3>
            <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
              Standard ready-to-ship catalog items are eligible for a no-hassle return within 30 days of verified delivery.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="bg-white dark:bg-zinc-900 rounded-3xl p-6 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-3"
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/70 border border-emerald-200 dark:border-emerald-800 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-zinc-900 dark:text-white text-base">Damaged in Transit Coverage</h3>
            <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
              If fragile art arrives broken or compromised, we dispatch a complimentary replacement or instant 100% refund.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white dark:bg-zinc-900 rounded-3xl p-6 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-3"
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/70 border border-emerald-200 dark:border-emerald-800 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
              <RotateCcw className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-zinc-900 dark:text-white text-base">Direct Maker Concierge</h3>
            <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
              Our team coordinates seamlessly between you and the artisan to ensure exchanges and adjustments are rapid and respectful.
            </p>
          </motion.div>
        </div>

        {/* Step-by-Step Return Process */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="bg-white dark:bg-zinc-900 rounded-3xl p-6 sm:p-10 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-8"
        >
          <div>
            <h2 className="text-2xl font-bold font-heading text-zinc-900 dark:text-white">How Returns Work</h2>
            <p className="text-xs sm:text-sm text-zinc-500 mt-1">Four simple steps to return or exchange your handcrafted order.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {PROCESS_STEPS.map((step, idx) => (
              <div key={idx} className="relative p-5 rounded-2xl bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200 dark:border-zinc-800 flex flex-col justify-between space-y-4">
                <div>
                  <span className="text-2xl font-black text-emerald-600 dark:text-emerald-400 font-heading">{step.step}</span>
                  <h4 className="font-bold text-zinc-900 dark:text-white text-sm mt-1">{step.title}</h4>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-2 leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Eligibility Breakdown */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-zinc-900 rounded-3xl p-6 sm:p-8 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-4">
            <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
              <CheckCircle2 className="w-5 h-5" />
              <h3 className="font-bold text-zinc-900 dark:text-white text-lg">Eligible for Full Return</h3>
            </div>
            <ul className="space-y-3 text-xs sm:text-sm text-zinc-600 dark:text-zinc-400">
              <li className="flex items-start gap-2">
                <span className="text-emerald-500 font-bold">•</span>
                <span>Unused items in original condition with tags and artisan certificates.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-500 font-bold">•</span>
                <span>Items damaged or broken during transit (photo proof requested within 48h).</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-500 font-bold">•</span>
                <span>Ready-to-ship standard pottery, textiles, leather goods, and decor.</span>
              </li>
            </ul>
          </div>

          <div className="bg-white dark:bg-zinc-900 rounded-3xl p-6 sm:p-8 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-4">
            <div className="flex items-center gap-2 text-rose-500">
              <XCircle className="w-5 h-5" />
              <h3 className="font-bold text-zinc-900 dark:text-white text-lg">Non-Refundable Exceptions</h3>
            </div>
            <ul className="space-y-3 text-xs sm:text-sm text-zinc-600 dark:text-zinc-400">
              <li className="flex items-start gap-2">
                <span className="text-rose-500 font-bold">•</span>
                <span>Custom engraved or personalized commissioned pieces made to specific custom measurements.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-500 font-bold">•</span>
                <span>Pierced earrings or intimate wearable jewelry (for hygienic health compliance).</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-500 font-bold">•</span>
                <span>Items returned damaged due to improper buyer packaging.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Support Help Banner */}
        <div className="bg-emerald-50 dark:bg-emerald-950/40 rounded-3xl p-8 border border-emerald-200 dark:border-emerald-800/60 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center sm:text-left">
            <div className="inline-flex items-center gap-2 text-emerald-800 dark:text-emerald-300 font-bold text-sm">
              <AlertCircle className="w-4 h-4" />
              Need to request a return or replace a broken piece?
            </div>
            <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400">
              Our support team answers all requests within 24 business hours.
            </p>
          </div>
          <Link href="/contact">
            <Button variant="primary" className="rounded-2xl px-6 py-2.5">
              Contact Support Concierge
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
