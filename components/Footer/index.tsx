"use client";

import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="relative py-20 px-4 border-t border-yellow-800 bg-white">
      <div className="max-w-7xl mx-auto text-center text-yellow-400">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h3 className="text-4xl font-bold mb-4">
            Discover Victoria, Gozo
          </h3>

          <p className="text-yellow-400 text-lg mb-8 italic">
            Celebrating the heart of Gozo — its culture, history, and charm.
          </p>

          {/* Quick Navigation */}
          <div className="mb-6 space-x-4 text-sm">
            <a
              href="/history"
              className="hover:text-yellow-200 transition-colors"
            >
              History
            </a>
            <span className="text-yellow-600">·</span>
            <a
              href="/reviews"
              className="hover:text-yellow-200 transition-colors"
            >
              Reviews
            </a>
          </div>

          <p className="text-sm text-yellow-500 mb-4">
            Information sourced from local archives and{" "}
            <a
              href="https://www.visitgozo.com"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-yellow-300"
            >
              visitgozo.com
            </a>
            .
          </p>

          <p className="text-xs text-yellow-600">
            © 2025 Discover Victoria, Gozo. All rights reserved.
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
