import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import axios from 'axios';

const redIcon = new L.Icon({
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-red.png',
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-red-2x.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  shadowSize: [41, 41],
});

const defaultIcon = new L.Icon({
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  shadowSize: [41, 41],
});

const Legend = () => {
  return (
    <div style={{
      position: 'absolute',
      bottom: '10px',
      left: '10px',
      background: '#fff',
      padding: '10px',
      borderRadius: '5px',
      boxShadow: '0 0 5px rgba(0,0,0,0.3)',
      fontSize: '12px',
      zIndex: 1000
    }}>
      <strong>Legend</strong>
      <div style={{ display: 'flex', alignItems: 'center', marginTop: '5px' }}>
        <div style={{ width: '12px', height: '12px', backgroundColor: 'red', marginRight: '8px' }}></div>
        Cyclone
      </div>
      <div style={{ display: 'flex', alignItems: 'center', marginTop: '5px' }}>
        <div style={{ width: '12px', height: '12px', backgroundColor: 'blue', marginRight: '8px' }}></div>
        Temperature
      </div>
      <div style={{ display: 'flex', alignItems: 'center', marginTop: '5px' }}>
        <div style={{ width: '12px', height: '12px', backgroundColor: 'green', marginRight: '8px' }}></div>
        Precipitation
      </div>
      <div style={{ display: 'flex', alignItems: 'center', marginTop: '5px' }}>
        <div style={{ width: '12px', height: '12px', backgroundColor: 'gray', marginRight: '8px' }}></div>
        Clouds
      </div>
    </div>
  );
};

const MapView = ({ lat, lon }) => {
  const [weatherCondition, setWeatherCondition] = useState(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=c0b230e43f64bd1be316ddcf919759bb`
        );
        const { weather } = response.data;
        const isCyclone = weather.some(condition => condition.description.includes('cyclone'));
        setWeatherCondition(isCyclone ? 'cyclone' : 'default');
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    fetchWeatherData();
  }, [lat, lon]);

  if (lat === undefined || lon === undefined) return null;

  return (
    <div style={{ position: 'relative' }}>
      <MapContainer center={[lat, lon]} zoom={6} style={{ height: '400px', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <TileLayer
          url="https://tile.openweathermap.org/map/precipitation_new/{z}/{x}/{y}.png?appid=c0b230e43f64bd1be316ddcf919759bb"
          attribution='&copy; <a href="https://openweathermap.org/">OpenWeatherMap</a>'
          opacity={0.6}
        />
        <TileLayer
          url="https://tile.openweathermap.org/map/clouds_new/{z}/{x}/{y}.png?appid=c0b230e43f64bd1be316ddcf919759bb"
          attribution='&copy; <a href="https://openweathermap.org/">OpenWeatherMap</a>'
          opacity={0.4}
        />
        <TileLayer
          url="https://tile.openweathermap.org/map/temp_new/{z}/{x}/{y}.png?appid=c0b230e43f64bd1be316ddcf919759bb"
          attribution='&copy; <a href="https://openweathermap.org/">OpenWeatherMap</a>'
          opacity={0.5}
        />
        <Marker position={[lat, lon]} icon={weatherCondition === 'cyclone' ? redIcon : defaultIcon} />
        <Legend />
      </MapContainer>
    </div>
  );
};

export default MapView;
