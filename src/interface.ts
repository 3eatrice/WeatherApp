
export interface WeatherData {
    latitude: number;
    longitude: number;
    hourly: {
      temperature_2m: number[];
      time: string[];
    };
  }
  