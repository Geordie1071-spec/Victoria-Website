'use client';

import { motion } from 'framer-motion';
import GradientText from '../GradientText';

export default function Footer() {
  return (
    <footer className="relative py-20 px-4 border-t border-gray-800 bg-gradient-to-b from-gray-950 to-gray-900">
      <div className="max-w-7xl mx-auto text-center text-gray-400">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h3 className="text-4xl font-bold mb-4">
            <GradientText>Discover Victoria, Gozo</GradientText>
          </h3>

          <p className="text-gray-400 text-lg mb-8 italic">
            Celebrating the heart of Gozo — its culture, history, and charm.
          </p>

          {/* Quick Navigation */}
          <div className="mb-6 space-x-4 text-sm">
            <a href="#landmarks" className="hover:text-gray-200 transition-colors">
              Landmarks
            </a>
            <span className="text-gray-600">·</span>
            <a href="#history" className="hover:text-gray-200 transition-colors">
              History
            </a>
            <span className="text-gray-600">·</span>
            <a href="#gallery" className="hover:text-gray-200 transition-colors">
              Gallery
            </a>
          </div>

          {/* Info / Sources */}
          <p className="text-sm text-gray-500 mb-4">
            Information sourced from local archives and{' '}
            <a
              href="https://www.visitgozo.com"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-gray-300"
            >
              visitgozo.com
            </a>
            .
          </p>

          {/* Copyright */}
          <p className="text-xs text-gray-600">
            © 2025 Discover Victoria, Gozo. All rights reserved.
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
