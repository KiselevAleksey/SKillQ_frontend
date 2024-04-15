import React, { useState } from 'react';
import { Button, Typography, Box } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  container: {
    minWidth: '200px',
    minHeight: '60px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: theme.spacing(4),
  },
  button: {
    background: theme.palette.primary.main,
    color: 'white',
    padding: theme.spacing(1, 4),
    fontSize: '1rem',
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.shadows[2],
    '&:hover': {
      background: theme.palette.primary.dark,
      boxShadow: theme.shadows[4],
    },
  },
  countdown: {
    color: theme.palette.primary.main,
    fontSize: '2rem',
    fontWeight: 'bold',
  },
}));

const VideoEndButton = ({ onReady, currentQuestionIndex }) => {
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
      {countdown === null ? (
        <Button
          variant="contained"
          onClick={startCountdown}
          className={classes.button}
          aria-label="Start the video recording"
        >
          {currentQuestionIndex > 0 ? 'Ready for next question' : 'Ready to start'}
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
