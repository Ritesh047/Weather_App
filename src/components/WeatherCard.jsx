import React from 'react';
import './WeatherCard.css';
import sun from '../assets/icons/sun.png';
import cloud from '../assets/icons/cloud.png';
import fog from '../assets/icons/fog.png';
import rain from '../assets/icons/rain.png';
import snow from '../assets/icons/snow.png';
import storm from '../assets/icons/storm.png';

const WeatherCard = ({ weather }) => {
  const { name, sys, main, weather: weatherDetails, wind, dt } = weather;
  const { temp, feels_like, humidity } = main;
  const { description } = weatherDetails[0];
  const windSpeed = wind.speed;
  const country = sys?.country;

  const date = new Date(dt * 1000);
  const formattedDate = date.toLocaleDateString();
  const formattedTime = date.toLocaleTimeString();

  const getIcon = (description) => {
    const desc = description.toLowerCase();
    if (desc.includes('cloud')) {
      return cloud;
    } else if (desc.includes('rain') || desc.includes('drizzle')) {
      return rain;
    } else if (desc.includes('clear')) {
      return sun;
    } else if (desc.includes('thunder')) {
      return storm;
    } else if (desc.includes('fog')) {
      return fog;
    } else if (desc.includes('snow')) {
      return snow;
    } else if (desc.includes('wind')) {
      return wind;
    } else {
      return sun;
    }
  };

  const icon = getIcon(description);

  return (
    <div className="glassCard">
      <div className="weatherSection flex-center">
        <img src={icon} alt={description} className="weatherIcon" />
        <p className="temperature">{temp} &deg;C</p>
      </div>
      <div className="location text-center">
        {name}, {country}
      </div>
      <div className="dateTime flex-between">
        <p>{formattedDate}</p>
        <p>{formattedTime}</p>
      </div>
      <div className="windHumidity flex-between">
        <p className="windSpeed">Wind Speed <span>{windSpeed} m/s</span></p>
        <p className="humidity">Humidity <span>{humidity} %</span></p>
      </div>
      <div className="heatIndex">
        <p className="heatIndexLabel">Heat Index</p>
        <p className="heatIndexValue">{feels_like ? feels_like : 'N/A'}</p>
      </div>
      <hr className="separator" />
      <div className="condition text-center">{description}</div>
    </div>
  );
};

export default WeatherCard;
