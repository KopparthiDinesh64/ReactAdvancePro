import React from 'react';
import { TextField, Button, Container, Typography, Paper } from '@mui/material';
import emailjs from 'emailjs-com';
import { NavLink } from 'react-router-dom';

const EmailForm = () => {
  const handleSend = (e) => {
    e.preventDefault();

    // Replace these with your EmailJS service ID, template ID, and user ID
    const serviceID = 'service_px22j1w';
    const templateID = 'template_112y3rp';
    const userID = 'pycHtlk-vkmWvITWh';

    // Construct email data
    const formData = new FormData(e.target);
    const emailData = {
      from_name: formData.get('from_name'),
      from_email: formData.get('from_email'),
      message: formData.get('message'),
      subject: `New message from ${formData.get('from_name')}`
    };

    // Send email using EmailJS
    emailjs.send(serviceID, templateID, emailData, userID)
      .then((result) => {
        alert('Email sent successfully!');
      }, (error) => {
        alert('Failed to send email. Please try again.');
        console.error(error);
      });
  };

  return (
    <Container component="main" maxWidth="xs" style={{marginTop:"90px"}}>
      <Paper elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
        <Typography variant="h5" component="h1">
          Send Feed back
        </Typography>
        <form onSubmit={handleSend}>
          
          <TextField
            label="Message"
            name="message"
            multiline
            rows={4}
            fullWidth
            required
            margin="normal"
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            style={{ marginTop: '20px' }}
          >
            Send
          </Button>
          <Button
          component={NavLink}
          to="/TableForm"
          variant="outlined"
          color="secondary"
          fullWidth
          style={{ marginTop: '10px' }}
        >
          Go to Next Page
        </Button>
        </form>

      </Paper>
    </Container>
  );
};

export default EmailForm;
