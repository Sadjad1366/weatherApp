import { useQuery } from "react-query";
import { fetchWeatherLocation } from "../apis/weather.api";
import { ReactNode } from "react";

interface WeatherLocationProps {
  country: string;
  onLatLonChange: (lat: number, lon: number) => void;
}

const WeatherLocation: React.FC<WeatherLocationProps> = ({ country, onLatLonChange }) => {
  const {
    // isLoading,
     isError, error } = useQuery({
    queryKey: ["weather", country],
    queryFn: async () => {
      return await fetchWeatherLocation(country);
    },
    enabled: !!country,
    onSuccess: (data) => {
      if (data) {
        onLatLonChange(data.lat, data.lng);

      }
    },
  });

  // if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Something is wrong {error as ReactNode}</p>;

  return null;
};

export default WeatherLocation;
