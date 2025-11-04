"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Clock, MapPin, Camera, Info } from "lucide-react";

type LandmarkInfo = {
  history?: string;
  architecture?: string;
  highlights?: string;
  visitorTips?: string;
};

type Landmark = {
  name: string;
  description: string;
  image: string;
  info: LandmarkInfo;
};

type Props = {
  landmark: Landmark;
};

const sections = [
  {
    key: "history",
    title: "History",
    icon: Clock,
    gradient: "from-blue-500 to-blue-600",
    bgColor: "bg-blue-50",
    textColor: "text-blue-900",
  },
  {
    key: "architecture",
    title: "Architecture",
    icon: MapPin,
    gradient: "from-purple-500 to-purple-600",
    bgColor: "bg-purple-50",
    textColor: "text-purple-900",
  },
  {
    key: "highlights",
    title: "Highlights",
    icon: Camera,
    gradient: "from-pink-500 to-pink-600",
    bgColor: "bg-pink-50",
    textColor: "text-pink-900",
  },
  {
    key: "visitorTips",
    title: "Visitor Tips",
    icon: Info,
    gradient: "from-amber-500 to-amber-600",
    bgColor: "bg-amber-50",
    textColor: "text-amber-900",
  },
];

export default function LandmarkDetail({ landmark }: Props) {
  const { name, description, image, info } = landmark;

  return (
    <main className="mt-16 sm:mt-20 min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-5xl mx-auto px-3 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-10 sm:mb-12"
        >
          <div className="relative w-full h-64 sm:h-96 mb-6 sm:mb-8 rounded-2xl overflow-hidden shadow-xl">
            <Image
              src={image.replace("./", "/")}
              alt={name}
              fill
              className="object-cover"
              priority
              unoptimized
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-8 text-white">
              <h1 className="text-3xl sm:text-5xl font-bold mb-2 sm:mb-3 drop-shadow-lg">
                {name}
              </h1>
              <p className="text-base sm:text-xl font-medium drop-shadow-md max-w-3xl leading-relaxed">
                {description}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Information Sections */}
        <div className="space-y-5 sm:space-y-6">
          {sections.map((section, index) => {
            const content = info[section.key as keyof LandmarkInfo];
            if (!content) return null;
            const Icon = section.icon;

            return (
              <motion.section
                key={section.key}
                custom={index}
                initial="hidden"
                animate="visible"
                className="bg-white rounded-xl sm:rounded-2xl shadow-md sm:shadow-lg overflow-hidden border border-gray-200"
              >
                <div
                  className={`bg-gradient-to-r ${section.gradient} px-4 sm:px-6 py-3 sm:py-4 flex items-center gap-2 sm:gap-3`}
                >
                  <div className="p-1.5 sm:p-2 bg-white/20 rounded-md sm:rounded-lg backdrop-blur-sm">
                    <Icon className="text-white" size={20} />
                  </div>
                  <h2 className="text-lg sm:text-2xl font-bold text-white">
                    {section.title}
                  </h2>
                </div>
                <div className={`${section.bgColor} p-4 sm:p-6`}>
                  <p
                    className={`${section.textColor} text-base sm:text-lg leading-relaxed whitespace-pre-line`}
                  >
                    {content}
                  </p>
                </div>
              </motion.section>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="mt-10 sm:mt-12 text-center"
        >
          <div className="bg-gradient-to-r from-amber-400 to-yellow-500 rounded-xl sm:rounded-2xl p-6 sm:p-8 shadow-lg sm:shadow-xl">
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 sm:mb-3">
              Visited {name}?
            </h3>
            <p className="text-white/90 mb-5 sm:mb-6 text-base sm:text-lg">
              Share your experience with other travelers
            </p>
            <a
              href="/reviews"
              className="inline-block bg-white text-amber-600 font-bold px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg sm:rounded-xl hover:bg-gray-50 transform hover:scale-105 transition-all shadow-md sm:shadow-lg text-sm sm:text-base"
            >
              Leave a Review
            </a>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
