'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Menu, X, MapPin } from 'lucide-react';
import Link from 'next/link';
import GradientText from '../GradientText';

const navItems = [
  { href: '#home', label: 'Home' },
  { href: '#landmarks', label: 'Landmarks' },
  { href: '#events', label: 'Events' },
  { href: '#community', label: 'Community' },
  { href: '#contact', label: 'Contact' },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.15 },
  },
  exit: {
    opacity: 0,
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
  },
};

const itemElement = {
  hidden: { y: 20, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { duration: 0.4 } },
  exit: { y: 20, opacity: 0, transition: { duration: 0.3 } },
};

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { scrollY } = useScroll();
  const navBackground = useTransform(scrollY, [0, 100], ['rgba(10, 10, 10, 0)', 'rgba(10, 10, 10, 0.95)']);

  // Close on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setIsOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      {/* Navbar — raised above overlay when open */}
      <nav
        className={`fixed top-0 left-0 right-0 backdrop-blur-md transition-colors duration-300 ${
          isOpen ? 'z-[60]' : 'z-50'
        }`}
        style={{ backgroundColor: navBackground as any }}
      >
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <Link href="/" className="flex items-center gap-2">
              <MapPin className="text-amber-500" size={28} />
              <span className="text-2xl font-bold">
                <GradientText>Victoria</GradientText>
              </span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8">
              {navItems.map((item, i) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  className="text-gray-300 hover:text-amber-400 font-medium relative group"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                >
                  {item.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-amber-400 group-hover:w-full transition-all duration-300" />
                </motion.a>
              ))}
            </div>

            {/* Mobile Menu Button — always visible and clickable */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden text-white focus:outline-none focus:ring-2 focus:ring-amber-400 rounded"
              aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
            >
              <AnimatePresence mode="wait" initial={false}>
                {isOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: 90, scale: 0.8 }}
                    animate={{ rotate: 0, scale: 1 }}
                    exit={{ rotate: -90, scale: 0.8 }}
                    transition={{ duration: 0.25 }}
                  >
                    <X size={24} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: -90, scale: 0.8 }}
                    animate={{ rotate: 0, scale: 1 }}
                    exit={{ rotate: 90, scale: 0.8 }}
                    transition={{ duration: 0.25 }}
                  >
                    <Menu size={24} />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </nav>

      {/* Full-screen Mobile Overlay — below navbar when open */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="mobile-nav"
            className="fixed inset-0 bg-black/50 flex flex-col items-center justify-center space-y-10 text-3xl font-bold text-white md:hidden z-[55]"
            initial="hidden"
            animate="show"
            exit="exit"
            variants={container}
            // Optional: close when clicking backdrop
            onClick={() => setIsOpen(false)}
          >
            {navItems.map((item) => (
              <motion.div key={item.href} variants={itemElement}>
                <Link
                  href={item.href}
                  className="hover:text-amber-300 transition-colors"
                  onClick={(e) => {
                    e.stopPropagation(); // prevent closing on link click
                    setIsOpen(false);
                  }}
                >
                  {item.label}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}