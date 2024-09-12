import React, { useState } from 'react';
import { TextField, Button, Typography, Link, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import naturegif from '../Background/nature1.gif';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Initialize navigate

  const handleSignUpClick = () => {
    navigate('/signup'); // Navigate to Sign Up page
  };

  const handleLoginSubmit = (event) => {
    event.preventDefault(); // Prevent the default form submission behavior

    // Simple authentication check
    if (email === 'test@gmail.com' && password === 'password') {
      navigate('/dashboardPage'); // Navigate to Dashboard page
    } else {
      alert('Invalid email or password'); // Show error message for invalid credentials
    }
  };

  return (
    <div
      style={{
        height: "100vh",
        width: "100%",
        backgroundImage: `url(${naturegif})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        filter: "contrast(1.5) brightness(1)"
      }}
    >
      <Box
        sx={{
          backgroundColor: 'rgba(255, 255, 255, 0.623)', // Slightly transparent background
          padding: 4,
          borderRadius: 2,
          boxShadow: 3,
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          margin: '20px',
          width:"300px"
        }}
      >
        <Typography variant="h4" gutterBottom>
          Login
        </Typography>
        <form onSubmit={handleLoginSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              mt: 2
            }}
          >
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{ width: '100%' }}
            >
              Login
            </Button>
          </Box>
          <Box mt={2}>
            <Link href="#" variant="body2">
              Forgot Password?
            </Link>
          </Box>
          <Box mt={2}>
            <Typography variant="body2">
              Don't have an account?{' '}
              <Link href="#" onClick={handleSignUpClick} variant="body2">
                Sign up
              </Link>
            </Typography>
          </Box>
        </form>
      </Box>
    </div>
  );
};

export default Login;
