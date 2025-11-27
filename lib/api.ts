const OVERPASS_API = "https://overpass-api.de/api/interpreter";
const OPENWEATHER_API = "https://api.openweathermap.org/data/2.5/weather";

const VICTORIA_COORDS = {
  lat: 36.0443,
  lon: 14.2397,
};

export async function fetchWeather() {
  const apiKey = process.env.NEXT_PUBLIC_WEATHER_API_KEY;
  if (!apiKey) throw new Error("Missing OpenWeather API key");

  const url = `${OPENWEATHER_API}?lat=${VICTORIA_COORDS.lat}&lon=${VICTORIA_COORDS.lon}&units=metric&appid=${apiKey}`;

  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch weather");

  const data = await res.json();
  return {
    city: data.name || "Victoria",
    temp: data.main.temp,
    feelsLike: data.main.feels_like,
    humidity: data.main.humidity,
    windSpeed: data.wind.speed,
    condition: data.weather[0].main,
    desc: data.weather[0].description,
    icon: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
  };
}

export async function fetchLandmarks() {
  const query = `
    [out:json];
    area["name"="Victoria"]["admin_level"="8"];
    node(area)["tourism"~"attraction|museum|viewpoint|artwork|gallery|information|historic"];
    out center;
  `;

  const res = await fetch(OVERPASS_API, {
    method: "POST",
    body: query,
  });

  if (!res.ok) throw new Error("Failed to fetch landmarks");

  const data = await res.json();

  return data.elements.map((el: any) => ({
    id: el.id,
    name: el.tags.name || "Unnamed Landmark",
    lat: el.lat,
    lon: el.lon,
    type: el.tags.tourism || el.tags.historic || "unknown",
    description: el.tags.description || null,
  }));
}

export async function getNearbyAttractions(lat : string, lng: string, radius = 10 , maxRows = 20) {
    const username = "geordie1071"; 

    const params = new URLSearchParams({
        lat ,
        lng,
        radius: radius.toString(),
        maxRows: maxRows.toString(),
        username
    });

    const url = `http://api.geonames.org/findNearbyWikipediaJSON?${params}`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`GeoNames request failed: ${response.status}`);
        }

        const data = await response.json();

        return data.geonames ? data.geonames : [];
        
    } catch (error) {
        console.error("Error fetching GeoNames data:", error);
        return [];
    }
}

