"use client";

import { LandmarkSection, HeroSection, Navbar, Footer } from "@/components";
import { landmarks } from "@/app/lib/data";

export default function HomeClient() {
  return (
    <>
      <Navbar />
      <HeroSection />
      {landmarks.map((landmark, index) => (
        <LandmarkSection key={landmark.id} landmark={landmark} index={index} />
      ))}
      <Footer />
      <style jsx global>{`
        .glass-effect {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .gradient-text {
          background: linear-gradient(135deg, #f59e0b 0%, #f97316 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .bg-radial-gradient {
          background: radial-gradient(
            circle,
            transparent 40%,
            rgba(0, 0, 0, 0.8) 100%
          );
        }
      `}</style>
    </>
  );
}
