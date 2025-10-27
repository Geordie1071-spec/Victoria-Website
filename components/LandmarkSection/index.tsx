"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import AnimatedButton from "../AnimatedButton";

interface Landmark {
  id: number;
  name: string;
  slug: string;
  description: string;
  image: string;
  position: "left" | "right";
}

interface LandmarkSectionProps {
  landmark: Landmark;
  index: number;
}

export default function LandmarkSection({
  landmark,
  index,
}: LandmarkSectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-200px" });

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], [-100, 100]);
  const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.2, 1, 1.2]);
  const textY = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const textOpacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [0, 1, 1, 0]
  );

  const isLeft = landmark.position === "left";

  return (
    <motion.section
      ref={ref}
      className="relative h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Full Background Image with Parallax */}
      <motion.div
        className="absolute inset-0"
        style={{ y: imageY, scale: imageScale }}
      >
        <motion.div
          initial={{ scale: 1.3, opacity: 0 }}
          animate={
            isInView ? { scale: 1, opacity: 1 } : { scale: 1.3, opacity: 0 }
          }
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="w-full h-full"
        >
          <img
            src={landmark.image}
            alt={landmark.name}
            className="w-full h-full object-cover"
          />
        </motion.div>
      </motion.div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70 z-10" />

      {/* Vignette Effect */}
      <div className="absolute inset-0 bg-radial-gradient from-transparent via-transparent to-black/80 z-10" />

      {/* Decorative Animated Blobs */}
      <motion.div
        className="absolute top-1/4 left-10 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl z-10"
        animate={
          isInView
            ? {
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3],
              }
            : {}
        }
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-1/4 right-10 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl z-10"
        animate={
          isInView
            ? {
                scale: [1, 1.3, 1],
                opacity: [0.3, 0.5, 0.3],
              }
            : {}
        }
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />

      {/* Content Overlay */}
      <motion.div
        className="relative z-20 max-w-6xl mx-auto px-6 md:px-12"
        style={{ y: textY, opacity: textOpacity }}
      >
        <div
          className={`flex flex-col ${
            isLeft ? "items-start text-left" : "items-end text-right"
          }`}
        >
          {/* Landmark Number Badge */}
          <motion.div
            className="mb-6"
            initial={{ opacity: 0, scale: 0, rotate: -180 }}
            animate={
              isInView
                ? { opacity: 1, scale: 1, rotate: 0 }
                : { opacity: 0, scale: 0, rotate: -180 }
            }
            transition={{ duration: 0.8, delay: 0.2, type: "spring" }}
          >
            <div className="w-24 h-24 rounded-full glass-effect flex items-center justify-center border-2 border-amber-500/30">
              <span className="text-5xl font-bold gradient-text">
                {String(index + 1).padStart(2, "0")}
              </span>
            </div>
          </motion.div>

          {/* Title */}
          <motion.h2
            className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 max-w-4xl leading-tight"
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            {landmark.name}
          </motion.h2>

          {/* Description */}
          <motion.p
            className="text-lg md:text-2xl text-gray-200 leading-relaxed mb-10 max-w-3xl"
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            {landmark.description}
          </motion.p>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            <AnimatedButton href={`/landmarks/${landmark.slug}`}>
              Discover More
            </AnimatedButton>
          </motion.div>
        </div>
      </motion.div>
    </motion.section>
  );
}
