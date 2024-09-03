import axios from 'axios';

const API_KEY = '806fb9facf4afd9401522c69f7e1d4e7'; // OpenWeatherMap'ten aldığınız API anahtarını buraya yapıştırın
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

export interface WeatherData {
  name: string;
  main: {
    temp: number;
    humidity: number;
  };
  weather: {
    description: string;
    icon: string;
  }[];
}

export const getWeather = async (city: string): Promise<WeatherData> => {
  const response = await axios.get(BASE_URL, {
    params: {
      q: city,
      appid: API_KEY,
      units: 'metric' // Sıcaklık birimini Celsius yapmak için
    }
  });

  return response.data;
};
