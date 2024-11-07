import { useQuery } from "react-query";
import { fetchWeatherLocation } from "../apis/weather.api";
import { ReactNode } from "react";

interface WeatherLocationProps {
  country: string;
}

const WeatherLocation: React.FC<WeatherLocationProps> = ({ country }) => {
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["weather", country],
    queryFn: async () => {
      return await fetchWeatherLocation(country);
    },
    enabled: !!country,
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Something is wrong {error as ReactNode}</p>;
  console.log(data);

  return <div>weatherlocation</div>;
};

export default WeatherLocation;
