import React, { useEffect, useRef, useState } from 'react';
import { Button, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { startVideo, stopVideo } from './VideoUtils/VideoUtils';
import { startRecording, stopRecording } from './VideoUtils/RecordingUtils';

const useStyles = makeStyles((theme) => ({
  videoContainer: {
    position: 'relative', // Needed to position the timer and button at the bottom
    width: '450px',
    height: '450px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  videoElement: {
    maxWidth: '100%',
    maxHeight: '100%',
    objectFit: 'cover',
  },
  timerAndButton: {
    position: 'absolute', // This will place the timer and button at the bottom of the video container
    bottom: 0, // Align to the bottom
    width: '100%', // Match the width of the video container
    display: 'flex',
    justifyContent: 'space-between', // This will place the timer and button on opposite ends
    alignItems: 'center',
    padding: theme.spacing(1),
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background for better visibility
    color: 'white',
  },
}));

const UserVideoRecorder = ({ onRef }) => {
  const localVideoRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const [videoStarted, setVideoStarted] = useState(false);
  const [recording, setRecording] = useState(false);
  const [timer, setTimer] = useState(300); // Timer starts at 5 minutes (300 seconds)
  const classes = useStyles();

  useEffect(() => {
    startVideo(localVideoRef, setVideoStarted);

    const recordingDelay = setTimeout(() => {
      if (localVideoRef.current && localVideoRef.current.srcObject) {
        startRecording(localVideoRef, setRecording, mediaRecorderRef);
      }
    }, 1000);

    // Timer countdown
    const timerInterval = setInterval(() => {
      setTimer((prevTime) => prevTime - 1);
    }, 1000);

    if (onRef) {
      onRef(() => {
        if (recording) {
          stopRecording(mediaRecorderRef, setRecording);
        }
        stopVideo(localVideoRef, setVideoStarted);
      });
    }

    // Cleanup function
    return () => {
      clearTimeout(recordingDelay);
      clearInterval(timerInterval);
      if (recording) {
        stopRecording(mediaRecorderRef, setRecording);
      }
      stopVideo(localVideoRef, setVideoStarted);
    };
  }, [onRef]);

  // Function to handle "Next Question" button click
  const handleNextQuestion = () => {
    // Stop recording and video
    if (recording) {
      stopRecording(mediaRecorderRef, setRecording);
    }
    stopVideo(localVideoRef, setVideoStarted);
    // Implement your logic to go to the next question here
  };

  // Format the timer to display as mm:ss
  const formatTimer = () => {
    const minutes = Math.floor(timer / 60);
    const seconds = timer % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  // Check if timer has ended
  useEffect(() => {
    if (timer <= 0) {
      handleNextQuestion();
    }
  }, [timer]);

  return (
    <div className={classes.videoContainer}>
      <video ref={localVideoRef} autoPlay muted className={classes.videoElement} />
      <div className={classes.timerAndButton}>
      <Typography variant="body1">
        Please reply, next question in {formatTimer()}
        </Typography>
        <Button variant="contained" color="primary" onClick={handleNextQuestion}>
          Next Question
        </Button>
      </div>
    </div>
  );
};

export default UserVideoRecorder;
