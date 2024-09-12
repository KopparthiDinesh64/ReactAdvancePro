import React, { useState, useEffect } from 'react';
import Lottie from 'lottie-react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import Workout1 from '../WorkoutAnime/Workout1.json';
import Workout2 from '../WorkoutAnime/Workout2.json';
import Workout3 from '../WorkoutAnime/Workout3.json';
import Workout4 from '../WorkoutAnime/Workout4.json';
import Workout5 from '../WorkoutAnime/Workout5.json';
import Workout6 from '../WorkoutAnime/Workout6.json';
import Workout7 from '../WorkoutAnime/Workout7.json';
import { Modal, Button, Switch, FormControlLabel } from '@mui/material';

const workouts = [
  { id: '1', animationData: Workout1, name: 'Burpee', duration: 60 },
  { id: '2', animationData: Workout2, name: 'Jumping Squats', duration: 60 },
  { id: '3', animationData: Workout3, name: 'Staggered Push-Ups', duration: 60 },
  { id: '4', animationData: Workout4, name: 'Triceps Dips', duration: 60 },
  { id: '5', animationData: Workout5, name: 'Plank handraises', duration: 60 },
  { id: '6', animationData: Workout6, name: 'Triceps Dips', duration: 60 },
  { id: '7', animationData: Workout7, name: 'Crunches', duration: 60 }
];

const WorkoutAnimation = () => {
  const [currentWorkouts, setCurrentWorkouts] = useState(workouts);
  const [currentWorkout, setCurrentWorkout] = useState(null);
  const [timer, setTimer] = useState(0);
  const [isBreak, setIsBreak] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [totalTime, setTotalTime] = useState(0);
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [showCongrats, setShowCongrats] = useState(false);

  const startWorkout = () => {
    setCurrentWorkout(0);
    setTimer(currentWorkouts[0].duration);
    if (voiceEnabled) speak(`Starting ${currentWorkouts[0].name}`);
  };

  const handleSkipBreak = () => {
    nextWorkout();
  };

  const handleAdjustBreak = () => {
    const adjustedTime = prompt("Enter break time in seconds:", 15);
    if (adjustedTime) {
      setTimer(parseInt(adjustedTime, 10));
    }
  };

  const nextWorkout = () => {
    if (currentWorkout < currentWorkouts.length - 1) {
      setCurrentWorkout(currentWorkout + 1);
      if (voiceEnabled) speak(`Next workout: ${currentWorkouts[currentWorkout + 1].name}`);
      setTimer(currentWorkouts[currentWorkout + 1].duration);
      setIsBreak(false);
    } else {
      setCompleted(true);
    }
  };

  const speak = (text) => {
    const speech = new SpeechSynthesisUtterance(text);
    speechSynthesis.speak(speech);
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const reorderedWorkouts = Array.from(currentWorkouts);
    const [removed] = reorderedWorkouts.splice(result.source.index, 1);
    reorderedWorkouts.splice(result.destination.index, 0, removed);

    setCurrentWorkouts(reorderedWorkouts);
  };

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer(timer - 1);
        setTotalTime(totalTime + 1);
        if (timer === 10 && voiceEnabled) {
          speak('10 seconds remaining');
        } else if (timer === 30 && timer > 0 && voiceEnabled) {
          speak(`Half Of a minute`);
        } else if (timer === 1 && voiceEnabled){
          speak(`One`)
        } else if (timer === 2 && voiceEnabled){
          speak(`Two`)
        } else if (timer === 3 && voiceEnabled){
          speak(`Three`)
        }
      }, 1000);

      return () => clearInterval(interval);
    } else if (timer === 0 && currentWorkout !== null) {
      if (isBreak) {
        nextWorkout();
      } else {
        setIsBreak(true);
        setTimer(15); // 15 seconds break by default
        if (voiceEnabled) speak('Break time');
      }
    }
  }, [timer, voiceEnabled]);

  

  return (
    <div style={{ padding: '10px', marginTop: "100px" }}>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="workouts">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {currentWorkouts.map((workout, index) => (
                <Draggable key={workout.id} draggableId={workout.id} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        padding: '10px',
                        backgroundColor: '#fff',
                        border: '1px solid #e0e0e0',
                        borderRadius: '10px',
                        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                        ...provided.draggableProps.style,
                        cursor: 'pointer'
                      }}
                    >
                      <div style={{ width: '100px', height: '100px' }}>
                        <Lottie
                          animationData={workout.animationData}
                          loop={true}
                          autoplay={true}
                          style={{ width: '100%', height: '100%' }}
                        />
                      </div>
                      <div style={{ marginLeft: '20px' }}>
                        <h3 style={{ margin: '0 0 5px 0' }}>{workout.name}</h3>
                        <p style={{ margin: '0', color: '#4CAF50' }}>Sets: 1</p>
                        <p style={{ margin: '0', color: '#757575' }}>Duration: {workout.duration} seconds</p>
                      </div>
                      <div style={{ marginLeft: 'auto' }}>
                        <Button variant="outlined" size="small" style={{ textTransform: 'none' }}>Add Notation</Button>
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      <div style={{ textAlign: 'center', marginTop: 20 }}>
        {!currentWorkout && !completed && (
          <Button variant="contained" color="primary" onClick={startWorkout}>Start Workout</Button>
        )}
        <FormControlLabel
          control={
            <Switch
              checked={voiceEnabled}
              onChange={(e) => setVoiceEnabled(e.target.checked)}
              color="primary"
            />
          }
          label="Enable Voice Commands"
        />
      </div>

      <Modal
        open={currentWorkout !== null}
        onClose={() => setCurrentWorkout(null)}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '90%',
          maxWidth: 500,
          backgroundColor: 'white',
          padding: 20,
          outline: 'none',
          boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
          textAlign: 'center'
        }}>
          {currentWorkout !== null && (
            <div>
              {isBreak ? (currentWorkout !== 6 ? (
                <div>
                  <img
                    src="https://res.cloudinary.com/dineshbruceleedineshk/image/upload/v1725292530/break_kyaidp.png"
                    alt="Break"
                    style={{ width: '100%', height: '200px' }}
                  />
                  <p>Break for {timer} seconds</p>
                  <Button variant="contained" color="secondary" onClick={handleSkipBreak}>Skip Break</Button>
                  <Button variant="contained" onClick={handleAdjustBreak}>Adjust Break Time</Button>
                </div>):(<img src="https://res.cloudinary.com/dineshbruceleedineshk/image/upload/v1726050115/Congratulation_ghjbqk.png"/>)
              ) : (
                <>
                  <h2>{currentWorkouts[currentWorkout].name}</h2>
                  <Lottie
                    animationData={currentWorkouts[currentWorkout].animationData}
                    loop={true}
                    autoplay={true}
                    style={{ width: '100%', height: '200px' }}
                  />
                  <p>{timer} seconds left</p>
                  <Button variant="contained" color="primary" onClick={nextWorkout}>Next Workout</Button>
                </>
              )}
            </div>
          )}
        </div>
      </Modal>

      {completed && (
        <div style={{ textAlign: 'center', marginTop: 20 }}>
          <h2>Workout Complete!</h2>
          <p>Total time spent: {totalTime} seconds</p>
          <Button variant="contained" color="primary" onClick={() => window.location.reload()}>Restart Workout</Button>
        </div>
      )}
    </div>
  );
};

export default WorkoutAnimation;
