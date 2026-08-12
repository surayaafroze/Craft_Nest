"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Send } from "lucide-react";
import { Button } from "@/components/ui/Button";
import toast from "react-hot-toast";

export function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleNewsletter = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      toast.error("Please enter a valid email address");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`/api/backend/home/newsletter`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();

      if (data.success) {
        toast.success(data.message || "Subscribed successfully!");
        setEmail("");
      } else {
        toast.error(data.message || "Subscription failed");
      }
    } catch (err) {
      toast.error("Network error. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="rounded-3xl p-10 md:p-16 text-center relative overflow-hidden bg-[#0F6B66]"
      >
        <div className="absolute top-0 right-0 p-12 opacity-10 transform translate-x-1/2 -translate-y-1/2">
          <Mail className="w-64 h-64 text-white" />
        </div>
        <div className="relative z-10 max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-extrabold font-heading text-white mb-6">
            Join the Maker's Circle
          </h2>
          <p className="text-lg text-white/80 mb-10">
            Subscribe to our newsletter for exclusive interviews, crafting tips, and first access to unique artisan drops.
          </p>
          <form onSubmit={handleNewsletter} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className="flex-grow px-6 py-4 rounded-full border-none focus:ring-4 focus:ring-white/20 text-zinc-900 text-base shadow-inner outline-none placeholder:text-zinc-400 bg-white"
            />
            <Button
              type="submit"
              size="lg"
              loading={loading}
              className="rounded-full px-8 text-white text-base font-bold border-none shadow-lg bg-[#C1662F] hover:bg-[#a85727]"
            >
              <Send className="w-5 h-5 mr-2" /> Subscribe
            </Button>
          </form>
        </div>
      </motion.div>
    </section>
  );
}
