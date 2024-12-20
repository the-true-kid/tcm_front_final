import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Button,
  Container,
  TextField,
  Typography,
  Paper,
  Box,
} from '@mui/material';
import { fetchUserDetails } from '../utils/api'; // Add API call to fetch user details

function Login({ setUser }) {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email) {
      setError('Email is required');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const result = await response.json();

      if (!response.ok) {
        setError(result.error || 'Login failed');
        return;
      }

      // Save user info to local storage and update parent state
      localStorage.setItem('user', JSON.stringify(result)); // Assuming `result` is the user object
      setUser(result); // Update parent component's user state

      // Fetch and save additional user details
      const userDetails = await fetchUserDetails(result.id);
      if (userDetails?.lastSubmissionId) {
        localStorage.setItem('lastSubmissionId', userDetails.lastSubmissionId);
      }

      navigate('/dashboard'); // Redirect to dashboard
    } catch (err) {
      setError('An error occurred during login');
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h5" gutterBottom>
          Login
        </Typography>
        <Box component="form" noValidate autoComplete="off">
          <TextField
            fullWidth
            label="Email"
            variant="outlined"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={!!error}
            helperText={error}
            sx={{ mt: 2, mb: 2 }}
          />
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Button
              variant="contained"
              color="primary"
              onClick={handleLogin}
            >
              Login
            </Button>
            <Button
              variant="text"
              color="secondary"
              onClick={() => navigate('/register')}
            >
              Register
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
}

export default Login;
