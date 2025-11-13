import { notFound } from "next/navigation";
import { landmarks } from "@/data/landmarks";
import { LandmarkDetail, VictoriaMap  } from "@/components";

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function LandmarkDetailPage({ params }: Props) {
  const { slug } = await params;
  const landmark = landmarks.find((l) => l.slug === slug);

  if (!landmark) {
    return notFound();
  }

  return (
    <>
      <LandmarkDetail landmark={landmark} />
      <VictoriaMap lat={landmark.lat.toString()} lon={landmark.lon.toString()} />
    </>
  );
}
