import React from "react";
import { useDebounce } from "../hooks/useDebounce";
import WeatherLocation from "./weatherLocation";

const Navbar: React.FC = () => {
  const [value, setValue] = React.useState<string>("");
  const [debounce] = useDebounce(value,2000);

  return (
    <div>
          {debounce}

      <div className="flex justify-center bg-gray-700 w-full container mx-auto p-4">
        <input
          className="border p-4"
          value={value}
          onChange={(event) => {
            setValue(event.target.value);
          }}
          type="text"
        />
      </div>
      <WeatherLocation country={debounce} />
    </div>
  );
};

export default Navbar;
