import React, { useEffect, useState } from 'react';
// images
import Clear from '../assets/images/Clear.jpg';
import Fog from '../assets/images/fog.png';
import Cloudy from '../assets/images/Cloudy.jpg';
import Rainy from '../assets/images/Rainy.jpg';
import Snow from '../assets/images/snow.jpg';
import Stormy from '../assets/images/Stormy.jpg';

const BackgroundLayout = ({ weather }) => {
  const [image, setImage] = useState(Clear);

  useEffect(() => {
    if (weather && weather.weather && weather.weather.length > 0) {
      const condition = weather.weather[0].main.toLowerCase();

      switch (condition) {
        case 'clear':
          setImage(Clear);
          break;
        case 'clouds':
          setImage(Cloudy);
          break;
        case 'rain':
        case 'drizzle':
          setImage(Rainy);
          break;
        case 'snow':
          setImage(Snow);
          break;
        case 'fog':
        case 'mist':
          setImage(Fog);
          break;
        case 'thunderstorm':
          setImage(Stormy);
          break;
        default:
          setImage(Clear);
          break;
      }
    }
  }, [weather]);

  return (
    <div 
      className="background-image"
      style={{ backgroundImage: `url(${image})` }}
    />
  );
};

export default BackgroundLayout;
