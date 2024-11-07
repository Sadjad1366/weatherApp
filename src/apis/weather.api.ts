import axios from "axios";
import { IWeatherLocation } from "../types/weatherLocationType";

export const fetchWeatherLocation = async (country: string) => {
  try {
    const response = await axios.get<IWeatherLocation>(
      "https://api.opencagedata.com/geocode/v1/json",
      {
        params: {
          q: country,
          key: "49bb4a92534d4704a31bff083f6e09ce",
        },
      }
    );
    const coordination = response.data.results;

    if (coordination && coordination.length > 0) {
      const { geometry } = coordination[0];
      const { lat, lng } = geometry;
      return { lat, lng };
    } else return null;
  } catch (error) {
    console.error("Error fetching location:", error);
  }
};
