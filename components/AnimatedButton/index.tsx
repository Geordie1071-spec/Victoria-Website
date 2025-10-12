'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface AnimatedButtonProps {
  href: string;
  children: React.ReactNode;
}

export default function AnimatedButton({ href, children }: AnimatedButtonProps) {
  return (
    <Link href={href} className="inline-block">
      <motion.button
        className="cursor-pointer group relative px-8 py-4 rounded-full font-semibold text-lg text-white
                   border border-white/30 backdrop-blur-sm bg-white/5
                   transition-all duration-300 ease-out
                   hover:border-amber-400/60"
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.98 }}
      >
        <span className="flex items-center gap-2.5">
          {children}
          <motion.span
            className="inline-block"
            initial={{ x: 0 }}
            whileHover={{ x: 6 }}
            transition={{ type: 'spring', stiffness: 400, damping: 15 }}
          >
            <ArrowRight size={20} className="text-amber-400" />
          </motion.span>
        </span>
      </motion.button>
    </Link>
  );
}