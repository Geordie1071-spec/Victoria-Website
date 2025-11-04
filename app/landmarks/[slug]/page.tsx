import { notFound } from "next/navigation";
import { landmarks } from "@/data/landmarks";
import { Navbar, LandmarkDetail } from "@/components";

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
      <Navbar />
      <LandmarkDetail landmark={landmark} />
    </>
  );
}
