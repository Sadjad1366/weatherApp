import { useQuery } from "react-query";
import { fetchCurrentWeatherInfo } from "../apis/weather.api";
import { ReactNode, useState } from "react";
import "leaflet/dist/leaflet.css";
import { FaTemperatureThreeQuarters } from "react-icons/fa6";
import { FaNewspaper } from "react-icons/fa6";
import { IoIosTimer } from "react-icons/io";

interface IWeatherInfoProps {
  lat: number;
  lon: number;
}

const WeatherInfo: React.FC<IWeatherInfoProps> = ({ lat, lon }) => {
  const [clickedLocation, setClickedLocation] = useState<{
    lat: number;
    lon: number;
  } | null>(null);

  const { isLoading, isError, data, error } = useQuery({
    queryKey: [
      "weatherInfo",
      clickedLocation ? clickedLocation.lat : lat,
      clickedLocation ? clickedLocation.lon : lon,
    ],
    queryFn: async () => {
      return await fetchCurrentWeatherInfo(
        clickedLocation ? clickedLocation.lat : lat,
        clickedLocation ? clickedLocation.lon : lon
      );
    },
    enabled: !!(clickedLocation || (lat && lon)),
  });



  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Something is wrong {error as ReactNode}</p>;

  return (
    <div className="flex">
      <div className="w-full">
        {data && (
          <div className="w-full bg-red-400 rounded-lg mt-3 p-3">
            <img
              src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`}
              alt=""
            />
            <h2 className="text-white font-semibold text-2xl py-3">{data.name}</h2>
            {/* <p> {data.sys.sunrise}</p> */}
            <div className="text-blue-700 font-medium flex items-center"><FaTemperatureThreeQuarters />
            <p>Temperature: {data.main.temp}</p></div>
            <div className="text-blue-700 font-medium flex items-center gap-1"><FaNewspaper />
            <p>Description: {data.weather[0].description}</p></div>
            <div className="text-blue-700 font-medium flex items-center gap-1"><IoIosTimer />
            <p>Time Zone: {data.timezone}</p></div>

          </div>
        )}
      </div>

    </div>
  );
};

export default WeatherInfo;
