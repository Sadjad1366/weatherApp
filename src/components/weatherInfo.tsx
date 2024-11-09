import { useQuery } from "react-query";
import { fetchCurrentWeatherInfo } from "../apis/weather.api";
import { ReactNode } from "react";

interface IWeatherInfoProps {
  lat: number;
  lon: number;
}

const WeatherInfo: React.FC<IWeatherInfoProps> = ({ lat, lon }) => {
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["weatherInfo", lat, lon],
    queryFn: async () => {
      return await fetchCurrentWeatherInfo(lat, lon);
    },
    enabled: !!lat && !!lon,
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Something is wrong {error as ReactNode}</p>;

  return (
    <div>
      {data && (
        <div>
          <h2>Current Weather Information</h2>
          <p>Temperature: {data.main.temp}</p>
          <p>Description: {data.weather[0].description}</p>
          <p>icon: {data.weather[0].icon}</p>
          <p> {data.weather[0].main}</p>
          {/* Display other weather information as needed */}
        </div>
      )}
    </div>
  );
};

export default WeatherInfo;
