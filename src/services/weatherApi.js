
import axios from 'axios';

const API_KEY = 'c0b230e43f64bd1be316ddcf919759bb';  
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export const getCurrentWeatherByLocation = (lat, lon) => {
  return axios.get(`${BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`);
};

export const getWeatherByCity = (city) => {
  return axios.get(`${BASE_URL}/weather?q=${city}&appid=${API_KEY}&units=metric`);
};

export const getForecastByCity = (city) => {
  return axios.get(`${BASE_URL}/forecast?q=${city}&appid=${API_KEY}&units=metric`);
};
