"use client";

import dynamic from "next/dynamic";
import type { Coordinate } from "../VictoriaMap";

const VictoriaMap = dynamic(() => import("../VictoriaMap"), {
  ssr: false,
});

type Props = {
  coords: Coordinate[];
};

export default function VictoriaMapLoader({ coords }: Props) {
  return <VictoriaMap coords={coords} />;
}
