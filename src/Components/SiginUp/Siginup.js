// SignUp.js
import React from 'react';
import { TextField, Button, Typography,  Box } from '@mui/material';
import naturegif from '../Background/nature1.gif';

const SignUp = () => {
  return (
    <div
      component="main"
      maxWidth="xs"
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
          backgroundColor: 'rgba(255, 255, 255, 0.498)', // Slightly transparent background
          padding: 4,
          borderRadius: 2,
          boxShadow: 3,
          textAlign: 'center',
          width: '100%',
          maxWidth: 400,
          margin: '20px'
        }}
      >
        <Typography variant="h4" gutterBottom>
          Sign Up
        </Typography>
        <form>
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
            autoComplete="new-password"
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            id="confirmPassword"
            autoComplete="new-password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
          >
            Sign Up
          </Button>
        </form>
      </Box>
    </div>
  );
};

export default SignUp;
