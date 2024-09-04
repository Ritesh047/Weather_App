import React, { useState } from 'react';
import { Box, Button, TextField, CircularProgress } from '@mui/material';
import { Autocomplete } from '@mui/lab';
import { styled } from '@mui/system';
import axios from 'axios';

const Container = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  width: '100%',
  maxWidth: '400px',
  gap: '10px',
  padding: '8px',
  background: 'rgba(255, 255, 255, 0.5)',
  backdropFilter: 'blur(20px)',
  borderRadius: '8px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Optional: Shadow for better visibility
});

const StyledButton = styled(Button)({
  marginLeft: '10px', // Adjust spacing as needed
});

const SearchWeather = ({ onSearch }) => {
  const [city, setCity] = useState('');
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchCities = async (query) => {
    setLoading(true);
    try {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/find`, {
        params: {
          q: query,
          type: 'like',
          sort: 'population',
          cnt: 10,
          appid: 'c0b230e43f64bd1be316ddcf919759bb', // Replace with your OpenWeatherMap API key
        },
      });
      const cities = response.data.list.map((city) => `${city.name}, ${city.sys.country}`);
      setOptions(cities);
    } catch (error) {
      console.error('Failed to fetch cities:', error);
    }
    setLoading(false);
  };

  const handleSearch = () => {
    if (city.trim()) {
      onSearch(city.trim());
      setCity(''); // Clear input field after search
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <Container>
      <Autocomplete
        freeSolo
        options={options}
        loading={loading}
        onInputChange={(event, value) => {
          setCity(value);
          if (value.length >= 3) {
            fetchCities(value);
          }
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            value={city}
            onChange={(e) => setCity(e.target.value)}
            onKeyDown={handleKeyDown} // Add onKeyDown event handler
            placeholder="Enter city or country"
            variant="outlined"
            size="small"
            fullWidth
            sx={{ width: '300px' }}
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <>
                  {loading ? <CircularProgress color="inherit" size={20} /> : null}
                  {params.InputProps.endAdornment}
                </>
              ),
            }}
          />
        )}
      />
      <StyledButton variant="contained" color="primary" onClick={handleSearch}>
        Search
      </StyledButton>
    </Container>
  );
};

export default SearchWeather;
