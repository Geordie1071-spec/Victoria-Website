'use client';

import { motion } from 'framer-motion';

interface GlassEffectBadgeProps {
  children: React.ReactNode;
  className?: string;
}

export default function GlassEffectBadge({ children, className = '' }: GlassEffectBadgeProps) {
  return (
    <motion.div
      className={`inline-block rounded-full glass-effect border border-amber-500/20 ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {children}
    </motion.div>
  );
}