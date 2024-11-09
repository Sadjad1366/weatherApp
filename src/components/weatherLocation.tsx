import { useQuery } from "react-query";
import { fetchWeatherLocation } from "../apis/weather.api";
import { ReactNode, useState } from "react";
import WeatherInfo from "./weatherInfo";

interface WeatherLocationProps {
  country: string;
}

const WeatherLocation: React.FC<WeatherLocationProps> = ({ country }) => {
  const [latLon, setLatLon] = useState<{ lat: number; lon: number } | null>(null);

  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["weather", country],
    queryFn: async () => {
      return await fetchWeatherLocation(country);
    },
    enabled: !!country,
    onSuccess: (data) => {
      if (data) {
        setLatLon({ lat: data.lat, lon: data.lng });
      }
    },
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Something is wrong {error as ReactNode}</p>;

  return (
    <div>
      {latLon && <WeatherInfo lat={latLon.lat} lon={latLon.lon} />}
    </div>
  );
};

export default WeatherLocation;
