import { notFound } from "next/navigation";
import { landmarks } from "@/data/landmarks";
import { LandmarkDetail } from "@/components";
import { getNearbyAttractions } from "@/lib/api";
import VictoriaMapLoader from "@/components/VictoriaMapLoader";

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function LandmarkDetailPage({ params }: Props) {
  const { slug } = await params;

  const landmark = landmarks.find((l) => l.slug === slug);
  if (!landmark) return notFound();

  const nearbyAttractions = await getNearbyAttractions(
    landmark.lat.toString(),
    landmark.lon.toString()
  );

  console.log("Raw nearby attractions:", nearbyAttractions); 

  // Create the coordinates array directly
  const nearbyCoords = nearbyAttractions.map((a: any) => ({
    lat: a.lat.toString(),
    lon: a.lng.toString(),
    title: a.name || a.title || 'Nearby Attraction', 
  }));

  console.log("Nearby coordinates:", nearbyCoords); 

  const coords = [
    ...nearbyCoords,
    {
      lat: landmark.lat.toString(),
      lon: landmark.lon.toString(),
      title: landmark.name,
      isMain: true,
    }
  ];

  console.log("Final coordinates for map:", coords);
  return (
    <>
      <LandmarkDetail
        landmark={landmark}
        nearbyAttractions={nearbyAttractions}
      />
      <VictoriaMapLoader coords={coords} />
    </>
  );
}