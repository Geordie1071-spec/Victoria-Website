"use client";

import { useEffect, useState } from "react";
import { fetchWeather } from "@/lib/api";
import {
  Sun,
  Cloud,
  CloudRain,
  CloudSnow,
  CloudLightning,
  CloudFog,
  Moon,
  Droplets,
  Wind,
} from "lucide-react";

// Weather icon mapping
const getWeatherIcon = (condition: string, isDay: boolean = true) => {
  const normalizedCondition = condition.toLowerCase();

  if (
    normalizedCondition.includes("clear") ||
    normalizedCondition.includes("sunny")
  ) {
    return isDay ? Sun : Moon;
  }
  if (normalizedCondition.includes("cloud")) {
    if (normalizedCondition.includes("rain")) return CloudRain;
    return Cloud;
  }
  if (normalizedCondition.includes("rain")) return CloudRain;
  if (normalizedCondition.includes("snow")) return CloudSnow;
  if (
    normalizedCondition.includes("thunder") ||
    normalizedCondition.includes("storm")
  )
    return CloudLightning;
  if (
    normalizedCondition.includes("mist") ||
    normalizedCondition.includes("fog") ||
    normalizedCondition.includes("haze")
  )
    return CloudFog;

  return Sun;
};

export default function VictoriaWeather() {
  const [weather, setWeather] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadWeather = async () => {
      try {
        setLoading(true);
        const data = await fetchWeather();
        setWeather(data);
      } catch (err) {
        console.error("Weather fetch error:", err);
        setError("Failed to load weather data");
      } finally {
        setLoading(false);
      }
    };

    loadWeather();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-40 ">
        <div className="animate-pulse flex flex-col items-center">
          <div className="w-16 h-16 bg-gray-200 rounded-full mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-24 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-16"></div>
        </div>
      </div>
    );
  }

  if (error || !weather) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-2xl p-6 w-full max-w-sm mx-auto shadow-lg">
        <div className="flex flex-col items-center justify-center text-center">
          <div className="text-4xl mb-2">⚠️</div>
          <p className="text-red-700 font-medium">Weather unavailable</p>
        </div>
      </div>
    );
  }

  const WeatherIcon = getWeatherIcon(weather.desc, weather.isDay !== false);
  const date = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
  });

  return (
    <div className="relative bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-100 rounded-3xl shadow-2xl w-full max-w-md mx-auto overflow-hidden mb-10 border border-yellow-200/50">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-300/20 rounded-full blur-3xl -z-0"></div>
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-orange-300/20 rounded-full blur-3xl -z-0"></div>

      {/* Header with location and date */}
      <div className="relative backdrop-blur-md bg-white/40 px-6 py-5 border-b border-yellow-200/50">
        <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
          {weather.city}
        </h2>
        <p className="text-sm text-gray-700 font-medium mt-1">{date}</p>
      </div>

      {/* Main weather content */}
      <div className="relative p-8 flex flex-col items-center">
        {/* Icon with glow effect */}
        <div className="relative mb-6">
          <div className="absolute inset-0 bg-yellow-400/30 rounded-full blur-2xl scale-150"></div>
          <div className="relative bg-gradient-to-br from-yellow-400 to-amber-500 p-6 rounded-full shadow-lg transform hover:scale-110 transition-transform duration-300">
            <WeatherIcon
              size={72}
              className="text-white drop-shadow-lg"
              strokeWidth={2.5}
            />
          </div>
        </div>

        <div className="text-center mb-6">
          <p className="text-base text-gray-700 capitalize font-semibold tracking-wide">
            {weather.desc}
          </p>
        </div>

        {/* Temperature display with enhanced styling */}
        <div className="text-center mb-8">
          <div className="flex items-start justify-center">
            <p className="text-7xl font-extrabold bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 bg-clip-text text-transparent">
              {Math.round(weather.temp)}
            </p>
            <span className="text-3xl font-bold text-gray-600 mt-2">°C</span>
          </div>
          <div className="mt-3 inline-block bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full">
            <p className="text-gray-700 font-medium">
              Feels like{" "}
              <span className="font-bold text-gray-900">
                {Math.round(weather.feelsLike)}°
              </span>
            </p>
          </div>
        </div>

        {/* Additional weather details with cards */}
        <div className="grid grid-cols-2 gap-4 w-full">
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 shadow-md hover:shadow-lg transition-shadow duration-300 border border-yellow-200/30">
            <div className="flex flex-col items-center">
              <div className="bg-gradient-to-br from-yellow-400 to-amber-500 p-3 rounded-full mb-3 shadow-md">
                <Droplets className="text-white" size={20} strokeWidth={2.5} />
              </div>
              <p className="text-xs text-gray-600 font-semibold uppercase tracking-wide mb-1">
                Humidity
              </p>
              <p className="text-2xl font-bold text-gray-900">
                {weather.humidity}%
              </p>
            </div>
          </div>
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 shadow-md hover:shadow-lg transition-shadow duration-300 border border-yellow-200/30">
            <div className="flex flex-col items-center">
              <div className="bg-gradient-to-br from-yellow-400 to-amber-500 p-3 rounded-full mb-3 shadow-md">
                <Wind className="text-white" size={20} strokeWidth={2.5} />
              </div>
              <p className="text-xs text-gray-600 font-semibold uppercase tracking-wide mb-1">
                Wind
              </p>
              <p className="text-2xl font-bold text-gray-900">
                {weather.windSpeed}
              </p>
              <p className="text-xs text-gray-600 font-medium">kts</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
