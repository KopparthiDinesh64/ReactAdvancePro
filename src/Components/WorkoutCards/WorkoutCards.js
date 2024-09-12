import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Lottie from 'lottie-react';
import Loading from '../WorkoutAnime/LoadingAnime.json'; // Replace with your animation JSON file
import './WorkoutCard.css';

const WorkoutCard = () => {
  const [open, setOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    bodyType: '',
    height: '',
    weight: '',
    gender: ''
  });
  const [formError, setFormError] = useState(false);

  const navigate = useNavigate(); // Hook for navigation

  const handleCardClick = (cardName) => {
    setSelectedCard(cardName);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedCard(null);
    setFormError(false);
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent form submission

    // Validate form data
    if (!formData.name || !formData.age || !formData.bodyType || !formData.height || !formData.weight || !formData.gender) {
      setFormError(true);
      return;
    }

    setIsSubmitting(true); // Start the Lottie animation

    // Simulate a delay for the animation
    setTimeout(() => {
      setIsSubmitting(false); // Stop the Lottie animation
      navigate('/WorkoutAnimation'); // Navigate to the desired route
    }, 3000); // Adjust this time to match your animation duration
  };

  const cardData = [
    {
      name: 'Basic Workout',
      imageUrl: 'https://res.cloudinary.com/dineshbruceleedineshk/image/upload/v1725269141/BasicWorkout_oejgfj.avif'
    },
    {
      name: 'Intermediate Workout',
      imageUrl: 'https://res.cloudinary.com/dineshbruceleedineshk/image/upload/v1725269142/intermidatemuscel_todmw0.jpg'
    },
    {
      name: 'Advance Workout',
      imageUrl: 'https://res.cloudinary.com/dineshbruceleedineshk/image/upload/v1725269141/AdvanceWorkout_elx1ed.jpg'
    }
  ];

  return (
    <div className="card-container" style={{marginTop:"100px"}}>
      {cardData.map((card) => (
        <div
          key={card.name}
          className="card"
          style={{ backgroundImage: `url(${card.imageUrl})` }}
          onClick={() => handleCardClick(card.name)}
        >
          <h3>{card.name}</h3>
        </div>
      ))}

      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            backgroundImage: 'url("https://res.cloudinary.com/dineshbruceleedineshk/image/upload/v1725270690/advance_bkbi8v.jpg")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            width: '80vw',
            height: '80vh',
            overflow: 'auto',
          }
        }}
      >
        <DialogTitle style={{ color: 'white', textAlign: "center" }}>{selectedCard} Form</DialogTitle>
        <DialogContent style={{ backgroundColor: "rgba(255, 255, 255, 0.619)"}}>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Name"
              name="name"
              variant="outlined"
              fullWidth
              margin="normal"
              onChange={handleInputChange}
              sx={{ backgroundColor: "rgba(255, 255, 255, 0.619)"}}
            />
            <TextField
              label="Age"
              name="age"
              type="number"
              variant="outlined"
              fullWidth
              margin="normal"
              onChange={handleInputChange}
              sx={{ backgroundColor: "rgba(255, 255, 255, 0.619)" }}
            />
            <TextField
              label="Body Type"
              name="bodyType"
              select
              SelectProps={{ native: true }}
              variant="outlined"
              fullWidth
              margin="normal"
              onChange={handleInputChange}
              sx={{ backgroundColor: "rgba(255, 255, 255, 0.619)" }}
            >
              <option value=""></option>
              <option value="belly">Belly</option>
              <option value="lean">Lean</option>
              <option value="medium">Medium Muscle</option>
            </TextField>
            <TextField
              label="Height"
              name="height"
              type="number"
              variant="outlined"
              fullWidth
              margin="normal"
              onChange={handleInputChange}
              sx={{ backgroundColor: "rgba(255, 255, 255, 0.619)" }}
            />
            <TextField
              label="Weight"
              name="weight"
              type="number"
              variant="outlined"
              fullWidth
              margin="normal"
              onChange={handleInputChange}
              sx={{ backgroundColor: "rgba(255, 255, 255, 0.619)" }}
            />
            <TextField
              label="Gender"
              name="gender"
              select
              SelectProps={{ native: true }}
              variant="outlined"
              fullWidth
              margin="normal"
              onChange={handleInputChange}
              sx={{ backgroundColor: "rgba(255, 255, 255, 0.619)" }}
            >
              <option value=""></option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </TextField>
            {formError && <p style={{ color: 'red' }}>Please fill out all fields.</p>}
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" sx={{backgroundColor:"rgba(255, 255, 255, 0.619)"}}>
            Close
          </Button>
          <Button type="submit" color="primary" sx={{backgroundColor:"rgba(255, 255, 255, 0.619)"}} onClick={handleSubmit}>
            Submit
          </Button>
        </DialogActions>
      </Dialog>

      {/* Show the Lottie animation if the form is submitting */}
      {isSubmitting && (
        <div className="lottie-container">
          <Lottie animationData={Loading} loop={false} />
          <p style={{ textAlign: 'center', marginTop: '20px' }}>We are preparing your Workout</p>
        </div>
      )}
    </div>
  );
};

export default WorkoutCard;
