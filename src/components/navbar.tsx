import React, { useState } from "react";
import { useDebounce } from "../hooks/useDebounce";
import WeatherLocation from "./weatherLocation";

interface NavbarProps {
  onLatLonChange: (lat: number, lon: number) => void;
}

const Navbar: React.FC<NavbarProps> = ({ onLatLonChange }) => {
  const [value, setValue] = useState<string>("");
  const [debounce] = useDebounce(value, 2000);

  return (
    <nav className="w-full bg-gray-700 py-4 rounded-lg">
      <div className="container mx-auto flex flex-col items-center gap-4">
        <h1 className="text-white text-3xl font-bold">Weather Tracker</h1>

        <div className="relative w-full max-w-md">
          <input
            className="w-full p-4 pr-10 text-lg text-gray-800 placeholder-gray-400 bg-white rounded-lg border-none shadow-md outline-none focus:ring-2 focus:ring-purple-500"
            value={value}
            onChange={(event) => setValue(event.target.value)}
            placeholder="Enter location for weather info..."
            type="text"
          />
          {debounce && (
            <WeatherLocation country={debounce} onLatLonChange={onLatLonChange} />
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
