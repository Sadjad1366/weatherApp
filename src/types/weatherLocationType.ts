export interface IWeatherLocation{rate: {
      limit: null;
      remaining: number;
      reset: number;
      };
      results: [
      {
      bounds: {
      northeast: {
      lat: number;
      lng: number;
      };
      southwest: {
      lat: number;
      lng: number;
      };
      };
      components: {
      _category: string;
      _normalized_city: string;
      _type: string;
      city: string;
      city_district: string;
      continent: string;
      country: string;
      country_code: string;
      county: string;
      house_number: string;
      office: string;
      political_union: string;
      postcode: string;
      road: string;
      state: string;
      state_code: string;
      suburb: string;
      };
      confidence: number;
      distance_from_q: {
      meters: number;
      };
      formatted: string;
      geometry: {
      lat: number;
      lng: number;
      };
      }
      ];
      status: {
      code: number;
      message: string;
      };
      stay_informed: {
      blog: string;
      mastodon: string;
      };
      thanks: string;
      timestamp: {
      created_http: string;
      created_unix: number;
      };
      total_results: number;
}
