// src/redux/weatherSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getCurrentWeatherByLocation, getWeatherByCity, getForecastByCity } from '../services/weatherApi';

export const fetchWeatherByLocation = createAsyncThunk(
  'weather/fetchWeatherByLocation',
  async ({ lat, lon }) => {
    const response = await getCurrentWeatherByLocation(lat, lon);
    return response.data;
  }
);

export const fetchWeatherByCity = createAsyncThunk(
  'weather/fetchWeatherByCity',
  async (city) => {
    const response = await getWeatherByCity(city);
    return response.data;
  }
);

export const fetchForecastByCity = createAsyncThunk(
  'weather/fetchForecastByCity',
  async (city) => {
    const response = await getForecastByCity(city);
    return response.data;
  }
);

const weatherSlice = createSlice({
  name: 'weather',
  initialState: {
    currentWeather: null,
    forecast: null,
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeatherByLocation.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchWeatherByLocation.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.currentWeather = action.payload;
      })
      .addCase(fetchWeatherByLocation.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchWeatherByCity.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchWeatherByCity.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.currentWeather = action.payload;
      })
      .addCase(fetchWeatherByCity.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchForecastByCity.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchForecastByCity.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.forecast = action.payload;
      })
      .addCase(fetchForecastByCity.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default weatherSlice.reducer;
