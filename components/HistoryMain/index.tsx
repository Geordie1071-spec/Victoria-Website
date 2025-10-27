// components/History.tsx
"use client";

import Image from "next/image";

export default function History() {
  return (
    <section className="bg-white text-gray-800 py-16 px-6 md:px-10">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-5xl font-extrabold text-center mb-10 text-yellow-500">
          History of Victoria (Rabat), Gozo
        </h1>

        <div className="space-y-10">
          <p className="text-lg leading-relaxed">
            <strong>Victoria</strong> — locally still often called{" "}
            <em>Rabat</em> — is Gozo’s vibrant heart. The city rises around the
            fortified hilltop of the <strong>Ċittadella</strong>, a living
            monument whose story spans from ancient temple builders to modern
            Maltese life.
          </p>

          <Image
            src="/citadella.png"
            alt="View of the Cittadella in Victoria, Gozo"
            width={1200}
            height={700}
            className="rounded-3xl shadow-xl mx-auto border-4 border-yellow-400"
          />

          <h2 className="text-3xl font-bold text-yellow-700">
            Prehistory and Ancient Times
          </h2>
          <p className="text-lg leading-relaxed">
            Gozo is one of the oldest continuously inhabited places in Europe.
            Long before Rome or the Knights, its people built the monumental{" "}
            <strong>Ġgantija Temples</strong> — proof of a sophisticated society
            active as far back as 3600 BCE. The hill where the Citadel now
            stands was sacred and strategic, later serving as a classical
            acropolis during the Phoenician and Roman eras.
          </p>

          <h2 className="text-3xl font-bold text-yellow-700">
            Classical and Early Medieval Period
          </h2>
          <p className="text-lg leading-relaxed">
            In ancient times, Gozo was known as <em>Gaulos</em>. Its acropolis
            evolved into a fortified stronghold through the Middle Ages, first
            documented in the 13th century. Over time, the lower settlement grew
            into <strong>Rabat</strong>, forming the heart of the island’s
            community.
          </p>

          <h2 className="text-3xl font-bold text-yellow-700">
            Fortification and the Early Modern Era
          </h2>
          <p className="text-lg leading-relaxed">
            Positioned in the central Mediterranean, Gozo was frequently
            attacked by corsairs and invading fleets. Under the{" "}
            <strong>Knights of St. John</strong>, the Citadel’s bastions and
            curtain walls were reinforced, shaping the fortress we see today.
            These fortifications served as both a refuge and symbol of
            resilience for Gozitans.
          </p>

          <Image
            src="/citadel-inside.jpg"
            alt="Inside the Citadel, Victoria"
            width={1200}
            height={700}
            className="rounded-3xl shadow-xl mx-auto border-4 border-yellow-200"
          />

          <h2 className="text-3xl font-bold text-yellow-700">
            British Era and Modern Naming
          </h2>
          <p className="text-lg leading-relaxed">
            During British rule, Rabat was officially renamed{" "}
            <strong>Victoria</strong> on 10 June 1887, to commemorate Queen
            Victoria’s Golden Jubilee. The change united the Citadel and its
            surrounding suburbs under one name — though locals proudly continue
            to use <em>Rabat</em> in everyday life.
          </p>

          <h2 className="text-3xl font-bold text-yellow-700">
            20th Century to the Present
          </h2>
          <p className="text-lg leading-relaxed">
            The 20th century brought modernization, new infrastructure, and
            restoration of historic sites. Today, Victoria stands as Gozo’s
            administrative and cultural capital — a blend of medieval heritage
            and modern vibrancy. Its bustling squares, traditional festas, and
            timeless views from the Citadel capture the spirit of Gozo itself.
          </p>

          <Image
            src="/independence-square.png"
            alt="Pjazza Indipendenza (Independence Square), Victoria"
            width={1200}
            height={700}
            className="rounded-3xl shadow-xl mx-auto border-4 border-yellow-200"
          />

          <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded-2xl shadow-sm">
            <h2 className="text-2xl font-semibold text-yellow-800 mb-3">
              Quick Timeline
            </h2>
            <ul className="list-disc ml-6 text-lg space-y-2 text-gray-700">
              <li>
                <strong>3600–2500 BCE:</strong> Ġgantija temples built —
                evidence of organized ritual life.
              </li>
              <li>
                <strong>Classical Era:</strong> Island known as <em>Gaulos</em>;
                acropolis occupied.
              </li>
              <li>
                <strong>13th Century:</strong> First references to the Citadel.
              </li>
              <li>
                <strong>16th–18th Centuries:</strong> Major fortifications built
                under the Knights of St. John.
              </li>
              <li>
                <strong>1887:</strong> Rabat officially renamed{" "}
                <em>Victoria</em>.
              </li>
              <li>
                <strong>20th–21st Centuries:</strong> Modernization and cultural
                revival.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
