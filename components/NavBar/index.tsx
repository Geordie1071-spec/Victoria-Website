"use client";

import { useState, useEffect, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";
import { Menu, X, MapPin, ChevronDown } from "lucide-react";
import Link from "next/link";
import GradientText from "../GradientText";
import { landmarks } from "@/data/landmarks";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/history", label: "History" },
  { href: "/reviews", label: "Reviews" },
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
  const [isLandmarksHovered, setIsLandmarksHovered] = useState(false);
  const [isMobileLandmarksOpen, setIsMobileLandmarksOpen] = useState(false);
  const landmarksRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();

  const navShadow = useTransform(
    scrollY,
    [0, 100],
    ["0px 0px 0px rgba(0, 0, 0, 0)", "0px 4px 20px rgba(0, 0, 0, 0.15)"]
  );

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsOpen(false);
        setIsMobileLandmarksOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        landmarksRef.current &&
        !landmarksRef.current.contains(e.target as Node)
      ) {
        setIsLandmarksHovered(false);
      }
    };
    if (isLandmarksHovered) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isLandmarksHovered]);

  const handleMobileLandmarkClick = () => {
    setIsOpen(false);
    setIsMobileLandmarksOpen(false);
  };

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 bg-white border-b border-gray-200 transition-all duration-300 ${
          isOpen ? "z-[60]" : "z-50"
        }`}
        style={{ boxShadow: navShadow as any }}
      >
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="p-2 bg-gradient-to-br from-amber-400 to-yellow-500 rounded-lg group-hover:scale-110 transition-transform">
                <MapPin className="text-white" size={24} />
              </div>
              <span className="text-2xl font-bold text-gray-900">Victoria</span>
            </Link>

            <div
              className="hidden md:flex items-center gap-1 relative"
              ref={landmarksRef}
            >
              {navItems.map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                >
                  <Link
                    href={item.href}
                    className="px-4 py-2 text-gray-700 hover:text-amber-600 font-semibold rounded-lg hover:bg-amber-50 transition-all relative group"
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}

              {/* Desktop Landmarks Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setIsLandmarksHovered(true)}
                onMouseLeave={() => setIsLandmarksHovered(false)}
              >
                <button className="px-4 py-2 text-gray-700 hover:text-amber-600 font-semibold rounded-lg hover:bg-amber-50 transition-all flex items-center gap-1">
                  Landmarks
                  <ChevronDown
                    size={16}
                    className={`transition-transform duration-200 ${
                      isLandmarksHovered ? "rotate-180" : ""
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {isLandmarksHovered && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute left-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50 overflow-hidden"
                    >
                      {landmarks.map((landmark, idx) => (
                        <Link
                          key={landmark.slug}
                          href={`/landmarks/${landmark.slug}`}
                          className="block px-4 py-3 text-gray-700 hover:text-amber-600 hover:bg-amber-50 transition-colors font-medium"
                          onClick={() => setIsLandmarksHovered(false)}
                        >
                          <div className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                            {landmark.name}
                          </div>
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* CTA Button */}
              <Link
                href="/reviews"
                className="ml-4 px-6 py-2.5 bg-gradient-to-r from-amber-400 to-yellow-500 text-white font-bold rounded-lg hover:from-amber-500 hover:to-yellow-600 shadow-md hover:shadow-lg transform hover:scale-105 transition-all"
              >
                Leave Review
              </Link>
            </div>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden text-gray-900 focus:outline-none focus:ring-2 focus:ring-amber-400 rounded-lg p-2 hover:bg-gray-100 transition-colors"
              aria-label={
                isOpen ? "Close navigation menu" : "Open navigation menu"
              }
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
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="mobile-nav"
            className="fixed inset-0 bg-white flex flex-col items-center justify-center space-y-6 md:hidden z-[55]"
            initial="hidden"
            animate="show"
            exit="exit"
            variants={container}
            onClick={() => setIsOpen(false)}
          >
            {navItems.map((item) => (
              <motion.div key={item.href} variants={itemElement}>
                <Link
                  href={item.href}
                  className="text-3xl font-bold text-gray-900 hover:text-amber-600 transition-colors"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsOpen(false);
                  }}
                >
                  {item.label}
                </Link>
              </motion.div>
            ))}

            {/* Mobile Landmarks Dropdown */}
            <motion.div variants={itemElement} className="relative">
              <button
                className="text-3xl font-bold text-gray-900 hover:text-amber-600 transition-colors flex items-center gap-2"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsMobileLandmarksOpen(!isMobileLandmarksOpen);
                }}
              >
                Landmarks
                <ChevronDown
                  size={28}
                  className={`transition-transform duration-300 ${
                    isMobileLandmarksOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              <AnimatePresence>
                {isMobileLandmarksOpen && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-4 space-y-3 text-xl overflow-hidden"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {landmarks.map((landmark) => (
                      <Link
                        key={landmark.slug}
                        href={`/landmarks/${landmark.slug}`}
                        className="block text-gray-700 hover:text-amber-600 transition-colors px-6 py-3 bg-gray-50 rounded-lg font-semibold"
                        onClick={handleMobileLandmarkClick}
                      >
                        {landmark.name}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Mobile CTA */}
            <motion.div variants={itemElement}>
              <Link
                href="/reviews"
                className="px-8 py-4 bg-gradient-to-r from-amber-400 to-yellow-500 text-white font-bold rounded-xl text-xl shadow-lg"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsOpen(false);
                }}
              >
                Leave Review
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
