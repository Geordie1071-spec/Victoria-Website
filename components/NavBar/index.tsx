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
import { landmarks } from "@/app/lib/data";

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
  const navBackground = useTransform(
    scrollY,
    [0, 100],
    ["rgba(10, 10, 10, 0)", "rgba(10, 10, 10, 0.95)"]
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
      <nav
        className={`fixed top-0 left-0 right-0 backdrop-blur-md transition-colors duration-300 ${
          isOpen ? "z-[60]" : "z-50"
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

            <div
              className="hidden md:flex items-center gap-8 relative"
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
                    className="text-gray-300 hover:text-amber-400 font-medium relative group"
                  >
                    {item.label}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-amber-400 group-hover:w-full transition-all duration-300" />
                  </Link>
                </motion.div>
              ))}

              {/* Desktop Landmarks Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setIsLandmarksHovered(true)}
                onMouseLeave={() => setIsLandmarksHovered(false)}
              >
                <div className="text-gray-300 hover:text-amber-400 font-medium relative group cursor-pointer">
                  Landmarks
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-amber-400 group-hover:w-full transition-all duration-300" />
                </div>

                <AnimatePresence>
                  {isLandmarksHovered && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute left-0 mt-2 w-56 bg-gray-900/90 backdrop-blur-md rounded-lg shadow-lg py-2 z-50"
                    >
                      {landmarks.map((landmark) => (
                        <Link
                          key={landmark.slug}
                          href={`/landmarks/${landmark.slug}`}
                          className="block px-4 py-2 text-gray-300 hover:text-amber-400 hover:bg-gray-800/50 transition-colors"
                          onClick={() => setIsLandmarksHovered(false)}
                        >
                          {landmark.name}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden text-white focus:outline-none focus:ring-2 focus:ring-amber-400 rounded"
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
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="mobile-nav"
            className="fixed inset-0 bg-black/50 flex flex-col items-center justify-center space-y-8 text-3xl font-bold text-white md:hidden z-[55]"
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
                  className="hover:text-amber-300 transition-colors"
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
                className="hover:text-amber-300 transition-colors flex items-center gap-2"
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
                    className="mt-4 space-y-3 text-2xl overflow-hidden"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {landmarks.map((landmark) => (
                      <Link
                        key={landmark.slug}
                        href={`/landmarks/${landmark.slug}`}
                        className="block hover:text-amber-300 transition-colors pl-4 pr-2 border-2 rounded-lg text-sm"
                        onClick={handleMobileLandmarkClick}
                      >
                        {landmark.name}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
