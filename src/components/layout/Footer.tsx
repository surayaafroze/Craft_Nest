import React from "react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-zinc-200 bg-white text-zinc-600 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-400">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo & Intro */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-emerald-600 dark:text-emerald-400">CraftNest</h3>
            <p className="text-sm">
              Discover unique artisan creations and handcrafted products built by creators all over the world.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 uppercase tracking-wider mb-4">
              Marketplace
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/explore" className="hover:text-emerald-600 dark:hover:text-emerald-400">
                  Explore Crafts
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-emerald-600 dark:hover:text-emerald-400">
                  Artisan Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Company links */}
          <div>
            <h4 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 uppercase tracking-wider mb-4">
              Company
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="hover:text-emerald-600 dark:hover:text-emerald-400">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-emerald-600 dark:hover:text-emerald-400">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 uppercase tracking-wider mb-4">
              Contact
            </h4>
            <p className="text-sm leading-6">
              Email: support@craftnest.com<br />
              Dhaka, Bangladesh
            </p>
          </div>
        </div>

        <div className="mt-8 border-t border-zinc-200 pt-8 dark:border-zinc-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs">
            &copy; {new Date().getFullYear()} CraftNest Inc. All rights reserved.
          </p>
          <div className="flex space-x-6 text-sm">
            <Link href="/privacy" className="hover:text-zinc-900 dark:hover:text-zinc-100">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-zinc-900 dark:hover:text-zinc-100">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
