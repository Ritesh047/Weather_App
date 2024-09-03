import React, { useState } from 'react';
import { Box, Button, TextField } from '@mui/material';
import { styled } from '@mui/system';

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

  const handleSearch = () => {
    if (city.trim()) {
      onSearch(city.trim());
      setCity(''); // Clear input field after search
    }
  };

  return (
    <Container>
      <TextField
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter city or country"
        variant="outlined"
        size="small"
        fullWidth
      />
      <StyledButton variant="contained" color="primary" onClick={handleSearch}>
        Search
      </StyledButton>
    </Container>
  );
};

export default SearchWeather;
