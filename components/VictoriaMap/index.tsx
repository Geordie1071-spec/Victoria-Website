export default function VictoriaMap({ lat, lon }: { lat: string; lon: string }) {
  const delta = 0.005; 
  const left = Number(lon) - delta;
  const right = Number(lon) + delta;
  const bottom = Number(lat) - delta;
  const top = Number(lat) + delta;

  const bbox = `${left}%2C${bottom}%2C${right}%2C${top}`;
  const marker = `${lat},${lon}`;

  return (
    <div className="rounded-xl overflow-hidden shadow-md">
      <iframe
        width="100%"
        height="500"
        loading="lazy"
        style={{ border: 0 }}
        src={`https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${marker}`}
      ></iframe>

      <small className="block text-center text-sm text-gray-500 mt-1">
        <a
          href={`https://www.openstreetmap.org/?mlat=${lat}&mlon=${lon}#map=16/${lat}/${lon}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          View Larger Map
        </a>
      </small>
    </div>
  );
}
