import { notFound } from "next/navigation";
import Image from "next/image";
import { landmarks } from "@/app/lib/data";
import { use } from "react";
import { Navbar } from "@/components";

type Props = {
  params: Promise<{ slug: string }>;
};

export default function LandmarkDetailPage({ params }: Props) {
  const { slug } = use(params);
  const landmark = landmarks.find((l) => l.slug === slug);

  if (!landmark) {
    return notFound();
  }

  const { name, description, image, info } = landmark;

  return (
    <>
      <Navbar />
      <main className="mt-16 min-h-screen bg-gradient-to-br bg-white">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="mb-8">
            <div className="relative w-full h-64 mb-4 rounded-lg overflow-hidden shadow-lg">
              <Image
                src={image.replace("./", "/")}
                alt={name}
                fill
                className="object-cover"
                priority
                unoptimized
              />
            </div>
            <h1 className="text-4xl font-bold mb-2 text-purple-900">{name}</h1>
            <p className="text-lg text-purple-700">{description}</p>
          </div>

          <div className="space-y-6">
            {info.history && (
              <section className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500">
                <h2 className="text-2xl font-semibold mb-3 text-blue-600">
                  History
                </h2>
                <p className="text-gray-800 whitespace-pre-line">
                  {info.history}
                </p>
              </section>
            )}

            {info.architecture && (
              <section className="bg-white p-6 rounded-lg shadow-md border-l-4 border-purple-500">
                <h2 className="text-2xl font-semibold mb-3 text-purple-600">
                  Architecture
                </h2>
                <p className="text-gray-800 whitespace-pre-line">
                  {info.architecture}
                </p>
              </section>
            )}

            {info.highlights && (
              <section className="bg-white p-6 rounded-lg shadow-md border-l-4 border-pink-500">
                <h2 className="text-2xl font-semibold mb-3 text-pink-600">
                  Highlights
                </h2>
                <p className="text-gray-800 whitespace-pre-line">
                  {info.highlights}
                </p>
              </section>
            )}

            {info.visitorTips && (
              <section className="bg-white p-6 rounded-lg shadow-md border-l-4 border-amber-500">
                <h2 className="text-2xl font-semibold mb-3 text-amber-600">
                  Visitor Tips
                </h2>
                <p className="text-gray-800 whitespace-pre-line">
                  {info.visitorTips}
                </p>
              </section>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
