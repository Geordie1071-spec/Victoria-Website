"use client";

import {
  LandmarkSection,
  HeroSection,
  VictoriaWeather,
} from "@/components";
import { landmarks } from "@/data/landmarks";

export default function HomeClient() {
  return (
    <>
      <HeroSection />
      {landmarks.map((landmark, index) => (
        <LandmarkSection key={landmark.id} landmark={landmark} index={index} />
      ))}
      <VictoriaWeather />
    </>
  );
}
