import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWeatherByLocation, fetchWeatherByCity, fetchForecastByCity } from './redux/weatherSlice';
import WeatherCard from './components/WeatherCard';
import SearchWeather from './components/SearchWeather';
import MapView from './components/MapView';
import Forecast from './components/Forecast';
import BackgroundLayout from './components/BackgroundLayout';
import './App.css';

function App() {
  const dispatch = useDispatch();
  const weather = useSelector((state) => state.weather.currentWeather);
  const forecast = useSelector((state) => state.weather.forecast);
  const [location, setLocation] = useState({ lat: null, lon: null, city: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLocation({ lat: latitude, lon: longitude, city: '' });
        dispatch(fetchWeatherByLocation({ lat: latitude, lon: longitude }))
          .then(() => setLoading(false))
          .catch((err) => {
            console.error('Error fetching weather:', err);
            setError('Failed to fetch current weather');
            setLoading(false);
          });
      },
      (error) => {
        console.error('Error getting location:', error);
        setError('Failed to get location');
        setLoading(false);
      }
    );
  }, [dispatch]);

  const handleSearch = (city) => {
    setLoading(true);
    setError(null);
    dispatch(fetchWeatherByCity(city))
      .then((response) => {
        const { coord } = response.payload;
        setLocation({ lat: coord.lat, lon: coord.lon, city });
        dispatch(fetchForecastByCity(city));
      })
      .catch((err) => {
        console.error('Error fetching weather by city:', err);
        setError('Failed to fetch weather for the city');
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="app-container">
      <BackgroundLayout weather={weather} />
      <div className="search-container">
        <SearchWeather onSearch={handleSearch} />
      </div>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {weather && !loading && !error && (
        <div className="centered-container">
          <div className="weather-map-wrapper">
            <WeatherCard weather={weather} />
            {location.lat && location.lon && (
              <MapView lat={location.lat} lon={location.lon} />
            )}
          </div>
          {forecast && (
            <div className="forecast-container">
              <Forecast forecast={forecast} />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
