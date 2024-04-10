import React, { useState } from 'react';
import { Button, Typography, Box } from '@mui/material';
import { makeStyles } from '@mui/styles';

// Define custom styles for the button and the container
const useStyles = makeStyles((theme) => ({
  container: {
    minWidth: '200px', // Adjust the minimum width as necessary
    minHeight: '60px', // Adjust the minimum height as necessary
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: theme.spacing(4), // Add margin around the container
  },
  button: {
    background: theme.palette.primary.main,
    color: 'white',
    padding: theme.spacing(1, 4), // Adjust the padding as necessary
    fontSize: '1rem', // Adjust the font size as necessary
    borderRadius: theme.shape.borderRadius, // Use the border radius from the theme
    boxShadow: theme.shadows[2], // Use one of the elevation shadows from the theme
    '&:hover': {
      background: theme.palette.primary.dark, // Darken the button on hover
      boxShadow: theme.shadows[4], // Elevate the button on hover
    },
  },
  countdown: {
    color: theme.palette.primary.main,
    fontSize: '2rem', // Large font size for countdown
    fontWeight: 'bold',
  },
}));


const VideoEndButton = ({ onReady }) => {
  const [countdown, setCountdown] = useState(null);
  const classes = useStyles();

  const startCountdown = () => {
    let counter = 3;
    setCountdown(counter); // Initialize countdown
    const timer = setInterval(() => {
      counter -= 1;
      setCountdown(counter);

      if (counter < 0) {
        clearInterval(timer);
        onReady(); // Execute the callback function when countdown finishes
      }
    }, 1000);
  };

  return (
    <Box className={classes.container}>
      {countdown === null ? ( // Show button only if countdown hasn't started
        <Button
          variant="contained"
          onClick={startCountdown}
          className={classes.button}
          aria-label="Start the video recording"
        >
          Ready to start
        </Button>
      ) : (
        <Typography className={classes.countdown}>
          Video is recording in {countdown}...
        </Typography>
      )}
    </Box>
  );
};

export default VideoEndButton;