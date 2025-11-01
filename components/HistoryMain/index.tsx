"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Calendar, Landmark, Shield, Crown, Building2, Sparkles } from "lucide-react";

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

const timelineEvents = [
  {
    period: "3600–2500 BCE",
    title: "Temple Builders Era",
    description: "Ġgantija temples built — evidence of organized ritual life",
    icon: Landmark,
  },
  {
    period: "Classical Era",
    title: "Gaulos Acropolis",
    description: "Island known as Gaulos; strategic acropolis occupied",
    icon: Building2,
  },
  {
    period: "13th Century",
    title: "Medieval Citadel",
    description: "First documented references to the fortified Citadel",
    icon: Shield,
  },
  {
    period: "16th–18th Centuries",
    title: "Knights' Fortifications",
    description: "Major defensive walls built under the Knights of St. John",
    icon: Shield,
  },
  {
    period: "1887",
    title: "Royal Renaming",
    description: "Rabat officially renamed Victoria for Queen's Golden Jubilee",
    icon: Crown,
  },
  {
    period: "20th–21st Centuries",
    title: "Modern Revival",
    description: "Modernization, restoration, and cultural renaissance",
    icon: Sparkles,
  },
];

export default function HistoryMain() {
  return (
    <section className="bg-gradient-to-br from-amber-50 via-white to-yellow-50 py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Hero Header */}
        <motion.div
          initial="hidden"
          animate="visible"
          className="text-center mb-16"
        >
          <div className="inline-block mb-6">
            <span className="bg-gradient-to-r from-amber-400 to-yellow-500 text-white px-6 py-2 rounded-full text-sm font-bold uppercase tracking-wider shadow-md">
              Historical Journey
            </span>
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 bg-gradient-to-r from-amber-600 via-yellow-600 to-amber-700 bg-clip-text text-transparent">
            History of Victoria
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover the rich tapestry of <span className="font-semibold text-amber-700">Rabat</span>, 
            Gozo's timeless capital and living monument
          </p>
        </motion.div>

        {/* Introduction */}
        <motion.div
          initial="hidden"
          animate="visible"
          className="bg-white rounded-3xl shadow-xl p-8 md:p-10 mb-12 border border-gray-100"
        >
          <p className="text-lg md:text-xl leading-relaxed text-gray-700">
            <span className="font-bold text-amber-700 text-2xl">Victoria</span> — 
            locally still often called <em className="text-amber-600 font-semibold">Rabat</em> — 
            is Gozo's vibrant heart. The city rises around the fortified hilltop of the{" "}
            <span className="font-bold text-gray-900">Ċittadella</span>, a living monument 
            whose story spans from ancient temple builders to modern Maltese life.
          </p>
        </motion.div>

        {/* Main Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mb-16"
        >
          <div className="relative overflow-hidden rounded-3xl shadow-2xl border-4 border-amber-400">
            <Image
              src="/citadella.png"
              alt="View of the Cittadella in Victoria, Gozo"
              width={1200}
              height={700}
              className="w-full h-auto"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
              <p className="text-white text-lg font-semibold">
                The Ċittadella - Gozo's Ancient Fortress
              </p>
            </div>
          </div>
        </motion.div>

        {/* Historical Periods */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="space-y-12 mb-16"
        >
          {/* Prehistory */}
          <motion.div className="bg-white rounded-2xl shadow-lg p-8 border-l-4 border-blue-500">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-blue-100 rounded-xl">
                <Landmark className="text-blue-600" size={28} />
              </div>
              <h2 className="text-3xl font-bold text-blue-700">
                Prehistory and Ancient Times
              </h2>
            </div>
            <p className="text-lg leading-relaxed text-gray-700">
              Gozo is one of the oldest continuously inhabited places in Europe. Long before Rome 
              or the Knights, its people built the monumental <span className="font-bold">Ġgantija Temples</span> — 
              proof of a sophisticated society active as far back as 3600 BCE. The hill where the 
              Citadel now stands was sacred and strategic, later serving as a classical acropolis 
              during the Phoenician and Roman eras.
            </p>
          </motion.div>

          {/* Classical Era */}
          <motion.div className="bg-white rounded-2xl shadow-lg p-8 border-l-4 border-purple-500">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-purple-100 rounded-xl">
                <Building2 className="text-purple-600" size={28} />
              </div>
              <h2 className="text-3xl font-bold text-purple-700">
                Classical and Early Medieval Period
              </h2>
            </div>
            <p className="text-lg leading-relaxed text-gray-700">
              In ancient times, Gozo was known as <em className="text-purple-600 font-semibold">Gaulos</em>. 
              Its acropolis evolved into a fortified stronghold through the Middle Ages, first documented 
              in the 13th century. Over time, the lower settlement grew into{" "}
              <span className="font-bold">Rabat</span>, forming the heart of the island's community.
            </p>
          </motion.div>

          {/* Fortification Era */}
          <motion.div className="bg-white rounded-2xl shadow-lg p-8 border-l-4 border-red-500">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-red-100 rounded-xl">
                <Shield className="text-red-600" size={28} />
              </div>
              <h2 className="text-3xl font-bold text-red-700">
                Fortification and the Early Modern Era
              </h2>
            </div>
            <p className="text-lg leading-relaxed text-gray-700">
              Positioned in the central Mediterranean, Gozo was frequently attacked by corsairs and 
              invading fleets. Under the <span className="font-bold">Knights of St. John</span>, the 
              Citadel's bastions and curtain walls were reinforced, shaping the fortress we see today. 
              These fortifications served as both a refuge and symbol of resilience for Gozitans.
            </p>
          </motion.div>

          {/* Image 2 */}
          <motion.div
           
            className="relative overflow-hidden rounded-3xl shadow-xl"
          >
            <Image
              src="/citadel-inside.jpg"
              alt="Inside the Citadel, Victoria"
              width={1200}
              height={700}
              className="w-full h-auto"
            />
          </motion.div>

          {/* British Era */}
          <motion.div className="bg-white rounded-2xl shadow-lg p-8 border-l-4 border-amber-500">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-amber-100 rounded-xl">
                <Crown className="text-amber-600" size={28} />
              </div>
              <h2 className="text-3xl font-bold text-amber-700">
                British Era and Modern Naming
              </h2>
            </div>
            <p className="text-lg leading-relaxed text-gray-700">
              During British rule, Rabat was officially renamed{" "}
              <span className="font-bold">Victoria</span> on 10 June 1887, to commemorate Queen 
              Victoria's Golden Jubilee. The change united the Citadel and its surrounding suburbs 
              under one name — though locals proudly continue to use{" "}
              <em className="text-amber-600 font-semibold">Rabat</em> in everyday life.
            </p>
          </motion.div>

          {/* Modern Era */}
          <motion.div className="bg-white rounded-2xl shadow-lg p-8 border-l-4 border-green-500">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-green-100 rounded-xl">
                <Sparkles className="text-green-600" size={28} />
              </div>
              <h2 className="text-3xl font-bold text-green-700">
                20th Century to the Present
              </h2>
            </div>
            <p className="text-lg leading-relaxed text-gray-700">
              The 20th century brought modernization, new infrastructure, and restoration of historic 
              sites. Today, Victoria stands as Gozo's administrative and cultural capital — a blend of 
              medieval heritage and modern vibrancy. Its bustling squares, traditional festas, and 
              timeless views from the Citadel capture the spirit of Gozo itself.
            </p>
          </motion.div>

          {/* Image 3 */}
          <motion.div
            
            className="relative overflow-hidden rounded-3xl shadow-xl"
          >
            <Image
              src="/independence-square.png"
              alt="Pjazza Indipendenza (Independence Square), Victoria"
              width={1200}
              height={700}
              className="w-full h-auto"
            />
          </motion.div>
        </motion.div>

        {/* Timeline */}
        <motion.div
          initial="hidden"
          animate="visible"
          className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-3xl shadow-xl p-8 md:p-10 border-2 border-amber-200"
        >
          <div className="flex items-center gap-3 mb-8">
            <Calendar className="text-amber-600" size={32} />
            <h2 className="text-3xl font-bold text-amber-800">
              Historical Timeline
            </h2>
          </div>
          
          <div className="space-y-6">
            {timelineEvents.map((event, index) => {
              const Icon = event.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index, duration: 0.5 }}
                  className="flex gap-4 items-start group"
                >
                  <div className="flex-shrink-0 w-12 h-12 bg-white rounded-xl shadow-md flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Icon className="text-amber-600" size={24} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-baseline gap-3 mb-1">
                      <span className="font-bold text-amber-700 text-lg">
                        {event.period}
                      </span>
                      <span className="text-gray-400">•</span>
                      <span className="font-semibold text-gray-900">
                        {event.title}
                      </span>
                    </div>
                    <p className="text-gray-700 leading-relaxed">
                      {event.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}