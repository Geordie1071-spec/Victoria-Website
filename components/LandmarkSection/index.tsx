"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import AnimatedButton from "../AnimatedButton";

interface Landmark {
  id: number;
  name: string;
  slug: string;
  description: string;
  image: string;
  position: string;
}

interface LandmarkSectionProps {
  landmark: Landmark;
  index: number;
}

export default function LandmarkSection({
  landmark,
  index,
}: LandmarkSectionProps) {
  const isLeft = landmark.position === "left";

  return (
    <motion.section
      className="relative min-h-[90vh]  flex items-center justify-center overflow-hidden border border-amber-400/30 rounded-2xl shadow-[0_0_40px_-10px_rgba(251,191,36,0.2)] mx-4 md:mx-10 my-10 backdrop-blur-[2px]"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: false, amount: 0.3 }}
    >
      {/* Background Image */}
      <motion.div
        className="absolute inset-0 will-change-transform"
        initial={{ scale: 1.2, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        exit={{ scale: 1.1, opacity: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        viewport={{ once: false, amount: 0.3 }}
      >
        <Image
          src={landmark.image}
          alt={landmark.name}
          fill
          priority={index === 0}
          placeholder="blur"
          blurDataURL="/placeholder.jpg"
          className="object-cover"
        />
      </motion.div>

      {/* Content */}
      <motion.div
        className={`relative z-10 w-full px-8 md:px-16 text-gray-100 flex flex-col ${
          isLeft ? "items-start text-left" : "items-end text-right"
        }`}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: false, amount: 0.3 }}
      >
        {/* Number Badge */}
        <motion.div
          className="mb-6 w-20 h-20 md:w-24 md:h-24 rounded-full bg-amber-500/20 border border-amber-500/30 flex items-center justify-center"
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          transition={{ duration: 0.6, type: "spring" }}
          viewport={{ once: false }}
        >
          <span className="text-4xl md:text-5xl font-bold text-amber-400">
            {String(index + 1).padStart(2, "0")}
          </span>
        </motion.div>

        {/* Title */}
        <motion.h2
          className="text-4xl  md:text-6xl lg:text-7xl font-bold mb-6 max-w-3xl leading-tight"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          viewport={{ once: false }}
        >
          {landmark.name}
        </motion.h2>

        {/* Description */}
        <motion.p
          className="text-base md:text-lg lg:text-xl text-gray-100 mb-8 max-w-2xl drop-shadow-[0_3px_10px_rgba(0,0,0,0.6)]"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: false }}
        >
          {landmark.description}
        </motion.p>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: false }}
        >
          <AnimatedButton href={`/landmarks/${landmark.slug}`}>
            Discover More
          </AnimatedButton>
        </motion.div>
      </motion.div>
    </motion.section>
  );
}
