import { notFound } from "next/navigation";
import { landmarks } from "@/data/landmarks";
import { LandmarkDetail, VictoriaMap  } from "@/components";
import { getNearbyAttractions } from "@/lib/api";

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function LandmarkDetailPage({ params }: Props) {
  const { slug } = await params;
  const landmark = landmarks.find((l) => l.slug === slug);
  const nearbyAttractions = landmark ? await getNearbyAttractions(landmark.lat.toString(), landmark.lon.toString()) : [];

  if (!landmark) {
    return notFound();
  }

  return (
    <>
      <LandmarkDetail landmark={landmark} nearbyAttractions={nearbyAttractions}/>
      <VictoriaMap lat={landmark.lat.toString()} lon={landmark.lon.toString()} />
    </>
  );
}
