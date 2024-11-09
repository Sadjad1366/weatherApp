import { useState } from "react";
import Navbar from "./navbar";
import WeatherInfo from "./weatherInfo";
import Map from "./map";

const HomePage: React.FC = () => {
  const [latLon, setLatLon] = useState<{ lat: number; lon: number } | null>(null);

  const handleLatLonChange = (lat: number, lon: number) => {
    setLatLon({ lat, lon });
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 p-8">
      <Navbar onLatLonChange={handleLatLonChange} />
      <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-8">
        {latLon && <WeatherInfo lat={latLon.lat} lon={latLon.lon} />}
        <Map />
      </div>
    </div>
  );
};

export default HomePage;
