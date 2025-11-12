"use client";

import {
  LandmarkSection,
  HeroSection,
  Navbar,
  Footer,
  VictoriaWeather,
} from "@/components";
import { landmarks } from "@/data/landmarks";

export default function HomeClient() {
  return (
    <>
      <Navbar />
      <HeroSection />
      {landmarks.map((landmark, index) => (
        <LandmarkSection key={landmark.id} landmark={landmark} index={index} />
      ))}
      <VictoriaWeather />
      <Footer />
    </>
  );
}
