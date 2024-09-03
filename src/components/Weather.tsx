import React, { useEffect, useState } from 'react';
import { getWeather, WeatherData } from '../services/WeatherService';

const weatherDescriptions: { [key: string]: string } = {
    "clear sky": "açık",
    "few clouds": "az bulutlu",
    "scattered clouds": "parçalı bulutlu",
    "broken clouds": "çok bulutlu",
    "overcast clouds": "kapalı",
    "shower rain": "sağanak yağışlı",
    "rain": "yağmurlu",
    "thunderstorm": "gök gürültülü fırtına",
    "snow": "karlı",
    "mist": "sisli",
    "light rain": "hafif yağmurlu",
    "moderate rain": "orta şiddetli yağmur",
    "heavy intensity rain": "şiddetli yağmur",
    "light snow": "hafif kar yağışlı",
    "fog": "sis"
  };
  

const Weather: React.FC = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [city, setCity] = useState<string>('Istanbul');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWeather = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getWeather(city);
        setWeather(data);
      } catch (error) {
        setError('Hava durumu verileri alınamadı.');
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [city]);

  const handleCityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCity(e.target.value);
  };

  return (
    <div className="weather-container">
      <h3>Hava Durumu</h3>
      <select value={city} onChange={handleCityChange}>
        <option value="Istanbul">İstanbul</option>
        <option value="Rize">Rize</option>
        <option value="Izmir">İzmir</option>
        <option value="Eskisehir">Eskişehir</option>
        <option value="Adana">Adana</option>
        <option value="Sivas">Sivas</option>
      </select>

      {loading ? (
        <p>Yükleniyor...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <div className="weather-info">
          <p>{weather?.name}</p>
          <p>{weatherDescriptions[weather?.weather[0].description || ""] || weather?.weather[0].description}</p>
          <p>Sıcaklık: {weather?.main.temp}°C</p>
          <p>Nem: {weather?.main.humidity}%</p>
          <img src={`http://openweathermap.org/img/wn/${weather?.weather[0].icon}.png`} alt="weather icon" />
        </div>
      )}
    </div>
  );
};

export default Weather;
