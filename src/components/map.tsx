import React, { useState } from "react";
import { MapContainer, TileLayer, useMapEvents } from "react-leaflet";
import { fetchCurrentWeatherInfo } from "../apis/weather.api";
import { IWeatherInfo } from "../types/weatherInfoType";
import { FaTemperatureEmpty } from "react-icons/fa6";
import { CiLocationOn } from "react-icons/ci";

const Map: React.FC = () => {
  const [weatherData, setWeatherData] = useState<IWeatherInfo | null>(null);

  const getClickedLocationInfo = async (lat: number, lon: number) => {
    try {
      const data = await fetchCurrentWeatherInfo(lat, lon);
      setWeatherData(data || null);
    } catch (error) {
      console.error("Failed to fetch weather data:", error);
      setWeatherData(null);
    }
  };

  const MapClickHandler = () => {
    useMapEvents({
      click: (event) => {
        getClickedLocationInfo(event.latlng.lat, event.latlng.lng);
      },
    });
    return null;
  };

  return (
    <div className="w-full relative flex flex-col items-center">
      <MapContainer center={[35.6892, 51.389]} zoom={5} style={{ height: "400px", width: "100%" }} className="rounded-lg shadow-lg">
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution='&copy; OpenStreetMap contributors' />
        <MapClickHandler />
      </MapContainer>

      {weatherData &&
        <div className="mt-6 w-full max-w-lg bg-gradient-to-bl from-blue-700 to-purple-700 text-white rounded-lg p-6 shadow-lg transition-all duration-300">
          <h3 className="text-lg font-bold flex items-center gap-2">
            {weatherData.name}, {weatherData.sys.country} <CiLocationOn />
          </h3>
          <div className="flex items-center mt-4">
            <img src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@4x.png`} alt={weatherData.weather[0].description} className="w-20 h-20" />
            <div className="ml-4">
              <div className="flex items-center gap-2">
                <FaTemperatureEmpty className="text-2xl" />
                <p className="text-6xl font-bold">{weatherData.main.temp}°C</p>
              </div>
              <p className="mt-2 text-gray-300 capitalize">{weatherData.weather[0].description}</p>
            </div>
          </div>
        </div>
      }
    </div>
  );
};

export default Map;
