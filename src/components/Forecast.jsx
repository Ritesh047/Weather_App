import React, { useEffect, useState } from 'react';
import sun from '../assets/icons/sun.png';
import cloud from '../assets/icons/cloud.png';
import fog from '../assets/icons/fog.png';
import rain from '../assets/icons/rain.png';
import snow from '../assets/icons/snow.png';
import storm from '../assets/icons/storm.png';
import wind from '../assets/icons/windy.png';
import './Forecast.css'; 

const getDayIndex = (dayName) => {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  return days.indexOf(dayName);
};

const getDayName = (date) => {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  return days[date.getDay()];
};

const MiniCard = ({ dayName, temp, icon }) => {
  return (
    <div className='miniCard'>
      <p className='miniCardDay'>{dayName}</p>
      <hr className='miniCardSeparator' />
      <div className='w-full flex justify-center items-center flex-1'>
        <img src={icon} alt="weather icon" className='miniCardIcon' />
      </div>
      <p className='miniCardTemp'>{temp}&deg;C</p>
    </div>
  );
};

const Forecast = ({ forecast }) => {
  const [sevenDayForecast, setSevenDayForecast] = useState([]);

  useEffect(() => {
    if (forecast?.list) {
      const forecastByDay = forecast.list.reduce((acc, item) => {
        const date = new Date(item.dt_txt);
        const dayName = getDayName(date);

        if (!acc[dayName]) {
          acc[dayName] = {
            temp: item.main.temp,
            iconString: item.weather[0].description,
            dayName,
            count: 1, // Add count to calculate the correct average
          };
        } else {
          // Update the temperature by summing and dividing by the count
          acc[dayName].temp = (acc[dayName].temp * acc[dayName].count + item.main.temp) / (acc[dayName].count + 1);
          acc[dayName].count += 1; // Increment count
        }

        return acc;
      }, {});

      const daysArray = Object.values(forecastByDay)
        .sort((a, b) => getDayIndex(a.dayName) - getDayIndex(b.dayName))
        .slice(0, 7); // Get the next 7 days

      setSevenDayForecast(daysArray);
    }
  }, [forecast]);

  const getIcon = (iconString) => {
    if (iconString.toLowerCase().includes('cloud')) {
      return cloud;
    } else if (iconString.toLowerCase().includes('rain')) {
      return rain;
    } else if (iconString.toLowerCase().includes('clear')) {
      return sun;
    } else if (iconString.toLowerCase().includes('thunder')) {
      return storm;
    } else if (iconString.toLowerCase().includes('fog')) {
      return fog;
    } else if (iconString.toLowerCase().includes('snow')) {
      return snow;
    } else if (iconString.toLowerCase().includes('wind')) {
      return wind;
    } else {
      return sun; // Default icon
    }
  };

  return (
    <div className='forecastContainer'>
      <div className='forecastFlexContainer'>
        {sevenDayForecast.map((day, index) => (
          <MiniCard
            key={index}
            dayName={day.dayName}
            temp={Math.round(day.temp)}
            icon={getIcon(day.iconString)}
          />
        ))}
      </div>
    </div>
  );
};

export default Forecast;
