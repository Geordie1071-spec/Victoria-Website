export default function VictoriaMap() {
  return (
    <div className="rounded-xl overflow-hidden shadow-md">
      <iframe
        width="100%"
        height="500"
        loading="lazy"
        style={{ border: 0 }}
        src="https://www.openstreetmap.org/export/embed.html?bbox=14.233%2C36.040%2C14.246%2C36.049&layer=mapnik&marker=36.0443,14.2397"
      ></iframe>

      <small className="block text-center text-sm text-gray-500 mt-1">
        <a
          href="https://www.openstreetmap.org/?mlat=36.0443&mlon=14.2397#map=15/36.0443/14.2397"
          target="_blank"
          rel="noopener noreferrer"
        >
          View Larger Map
        </a>
      </small>
    </div>
  );
}
