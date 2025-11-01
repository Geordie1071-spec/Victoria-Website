import { notFound } from "next/navigation";
import { landmarks } from "@/app/lib/data";
import { Navbar, LandmarkDetail } from "@/components";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return landmarks.map((landmark) => ({
    slug: landmark.slug,
  }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const landmark = landmarks.find((l) => l.slug === slug);

  if (!landmark) {
    return {
      title: "Landmark Not Found",
    };
  }

  return {
    title: `${landmark.name} | Victoria Landmarks`,
    description: landmark.description,
  };
}

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